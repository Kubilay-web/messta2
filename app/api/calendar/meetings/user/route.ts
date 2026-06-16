import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { MeetingStatus } from "@prisma/client";
import { validateRequest } from "@/app/auth";

export async function GET(req: NextRequest) {
  try {
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 401 }
      );
    }

    const rawFilter = req.nextUrl.searchParams.get("filter");
    const filter = ["UPCOMING", "PAST", "CANCELLED"].includes(rawFilter!)
      ? rawFilter
      : "UPCOMING";

    const now = new Date();
    let where: any = { userId };

    if (filter === "UPCOMING") {
      where.status = MeetingStatus.SCHEDULED;
      where.startTime = { gt: now };
    } else if (filter === "PAST") {
      where.status = MeetingStatus.SCHEDULED;
      where.startTime = { lt: now };
    } else if (filter === "CANCELLED") {
      where.status = MeetingStatus.CANCELLED;
    }

    const meetings = await db.meeting.findMany({
      where,
      include: { event: true },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json(
      { message: "Meetings fetched successfully", meetings },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
