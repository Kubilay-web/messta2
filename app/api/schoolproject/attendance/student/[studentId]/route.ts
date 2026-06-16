import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";


export async function GET(
  request: NextRequest,
  { params }: { params: { studentId: string } }
) {
  try {
    const { studentId } = params;
    const searchParams = request.nextUrl.searchParams;
    const dateString = searchParams.get("date");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    if (!dateString) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Parse date safely
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    // Create date range for the selected day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    // 1. First get the student to ensure they exist and get their details
    const student = await db.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // 2. Find all attendance logs for that day where the student has a record
    const attendanceLogs = await db.attendanceLog.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
        records: {
          some: {
            studentId,
          },
        },
      },
      include: {
        records: {
          where: {
            studentId,
          },
        },
        subject: {
          select: {
            id: true,
            name: true,
          },
        },
        class: {
          select: {
            id: true,
            title: true,
          },
        },
        stream: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        startTime: "asc", // Order by start time
      },
    });

    if (!attendanceLogs.length) {
      // Return empty records structure
      return NextResponse.json(
        {
          student: {
            id: student.id,
            name: student.name,
            regNo: student.regNo,
          },
          date: dateString,
          subjects: [],
        },
        { status: 200 }
      );
    }

    // 3. Format the data for the response
    const subjects = attendanceLogs.map((log) => {
      const record = log.records[0]; // We filtered to have only this student's records

      return {
        id: log.subjectId,
        name: log.subjectName || log.subject.name,
        startTime: log.startTime,
        endTime: log.endTime,
        classId: log.classId,
        className: log.className || log.class.title,
        streamId: log.streamId,
        streamName: log.streamName || log.stream.title,
        attendance: {
          status: record?.status || null,
          note: record?.note || null,
          recordId: record?.id || null,
          logId: log.id,
        },
      };
    });

    // 4. Create the response structure
    const responseData = {
      student: {
        id: student.id,
        name: student.name,
        regNo: student.regNo,
      },
      date: date.toISOString(),
      subjects: subjects,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching student attendance data:", error);
    return NextResponse.json(
      { error: "Failed to fetch student attendance data" },
      { status: 500 }
    );
  }
}