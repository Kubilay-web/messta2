import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { google } from "googleapis";
import { googleOAuth2Client } from "@/app/config/oauth.config";
import { validateGoogleToken } from "@/app/services/integration.service";
import {
  IntegrationAppTypeEnum,
  MeetingStatus,
  EventLocationEnumType,
} from "@prisma/client";

interface CreateMeetingDto {
  eventId?: string;
  guestName: string;
  guestEmail: string;
  startTime: string;
  endTime: string;
  additionalInfo?: string;
  userId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateMeetingDto = await req.json();
    const {
      eventId,
      guestName,
      guestEmail,
      startTime,
      endTime,
      additionalInfo,
      userId,
    } = body;

    // ✅ Validation
    if (!guestName || !guestEmail || !startTime || !endTime) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start >= end) {
      return NextResponse.json(
        { message: "Invalid date range" },
        { status: 400 }
      );
    }

    // ✅ Event bul veya oluştur
    let event = null;
    if (eventId) {
      event = await db.event.findUnique({
        where: { id: eventId },
        include: { user: true },
      });
    }

    if (!event) {
      if (!userId) {
        return NextResponse.json(
          { message: "Event not found and userId not provided" },
          { status: 400 }
        );
      }

      event = await db.event.create({
        data: {
          title: "Auto-created Event",
          slug: `auto-${Date.now()}`,
          userId,
          isPrivate: false,
          locationType: EventLocationEnumType.GOOGLE_MEET_AND_CALENDAR,
        },
      });

      const user = await db.user.findUnique({ where: { id: userId } });
      event.user = user!;
    }

    // ✅ Çakışma kontrolü
    const conflict = await db.meeting.findFirst({
      where: {
        eventId: event.id,
        status: MeetingStatus.SCHEDULED,
        startTime: { lt: end },
        endTime: { gt: start },
      },
    });
    if (conflict) {
      return NextResponse.json(
        { message: "Time slot not available" },
        { status: 409 }
      );
    }

    // ✅ Google integration
    const integration = await db.integration.findFirst({
      where: {
        userId: event.userId,
        app_type: IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
        isConnected: true,
      },
    });
    if (!integration) {
      return NextResponse.json(
        { message: "No Google integration found" },
        { status: 400 }
      );
    }

    const validToken = await validateGoogleToken(
      integration.access_token,
      integration.refresh_token,
      integration.expiry_date ? Number(integration.expiry_date) : null
    );

    googleOAuth2Client.setCredentials({ access_token: validToken });
    const calendar = google.calendar({ version: "v3", auth: googleOAuth2Client });

    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${guestName} - ${event.title}`,
        description: additionalInfo,
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        attendees: [{ email: guestEmail }, { email: event.user.email }],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = response.data.hangoutLink!;
    const calendarEventId = response.data.id!;

    // ✅ Meeting kaydet
    const meeting = await db.meeting.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        guestName,
        guestEmail,
        additionalInfo,
        startTime: start,
        endTime: end,
        meetLink,
        calendarEventId,
        calendarAppType: IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
        status: MeetingStatus.SCHEDULED,
      },
    });

    return NextResponse.json(
      { message: "Meeting scheduled successfully", data: { meetLink, meeting } },
      { status: 201 }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
