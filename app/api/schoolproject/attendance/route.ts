import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create attendance log
    const attendanceLog = await db.attendanceLog.create({
      data: data.log,
    });

    // Create attendance records for each student
    for (const attendance of data.records) {
      await db.attendance.create({
        data: {
          status: attendance.status,
          studentId: attendance.studentId,
          studentName: attendance.studentName,
          studentRegNo: attendance.studentRegNo,
          attendanceLogId: attendanceLog.id,
        },
      });
    }

    return NextResponse.json(
      {
        data: attendanceLog,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}