import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { MeetingStatus, IntegrationAppTypeEnum } from "@prisma/client";
import { google } from "googleapis";
import { googleOAuth2Client } from "@/app/config/oauth.config";
import { validateGoogleToken } from "@/app/services/integration.service";

export async function POST(req: NextRequest, { params }: { params: { meetingId: string } }) {
  try {
    const { meetingId } = params;
    const meeting = await db.meeting.findUnique({
      where: { id: meetingId },
    });
    if (!meeting) return NextResponse.json({ message: "Meeting not found" }, { status: 404 });

    // Google Calendar integration
    const integration = await db.integration.findFirst({
      where: {
        userId: meeting.userId,
        app_type: IntegrationAppTypeEnum.GOOGLE_MEET_AND_CALENDAR,
        isConnected: true
      }
    });

    if (integration) {
      const validToken = await validateGoogleToken(
        integration.access_token,
        integration.refresh_token,
        integration.expiry_date ? Number(integration.expiry_date) : null
      );
      googleOAuth2Client.setCredentials({ access_token: validToken });
      const calendar = google.calendar({ version: "v3", auth: googleOAuth2Client });

      await calendar.events.delete({
        calendarId: "primary",
        eventId: meeting.calendarEventId
      });
    }

    await db.meeting.update({
      where: { id: meetingId },
      data: { status: MeetingStatus.CANCELLED }
    });

    return NextResponse.json({ message: "Meeting cancelled successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
