import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { schoolId: string } }
) {
  try {
    const { schoolId } = params;

    // Count statistics for teacher dashboard
    const students = await db.student.count({
      where: {
        schoolId,
      },
    });

    const exams = await db.exam.count({
      where: {
        schoolId,
      },
    });

    const reminders = await db.reminder.count({
      where: {
        schoolId,
      },
    });

    // Get recent students
    const recentStudents = await db.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        schoolId,
      },
      take: 3,
      select: {
        id: true,
        name: true,
        regNo: true,
        gender: true,
        class: {
          select: {
            title: true,
          },
        },
      },
    });

    // Get recent events
    const recentEvents = await db.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      where: {
        schoolId,
      },
      select: {
        id: true,
        title: true,
        startTime: true,
        date: true,
        endTime: true,
        location: true,
      },
    });

    const result = {
      students,
      exams,
      reminders,
      recentStudents,
      recentEvents,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        students: 0,
        reminders: 0,
        exams: 0,
        recentStudents: [],
        recentEvents: [],
      },
      { status: 500 }
    );
  }
}