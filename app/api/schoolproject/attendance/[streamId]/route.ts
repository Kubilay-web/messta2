import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { streamId: string } }
) {
  try {
    const { streamId } = params;
    const searchParams = request.nextUrl.searchParams;
    const dateString = searchParams.get("date");

    if (!streamId) {
      return NextResponse.json(
        { error: "Stream ID is required" },
        { status: 400 }
      );
    }

    if (!dateString) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const attendanceLogs = await db.attendanceLog.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
        streamId,
      },
      include: {
        records: {
          include: {
            student: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    if (!attendanceLogs.length) {
      return NextResponse.json({ headers: [], students: [] }, { status: 200 });
    }

    const studentMap = new Map();

    attendanceLogs.forEach((log) => {
      log.records.forEach((record) => {
        if (!studentMap.has(record.studentId)) {
          studentMap.set(record.studentId, {
            id: record.studentId,
            name: record.studentName,
            regNo: record.studentRegNo,
            attendanceBySubject: {},
          });
        }
      });
    });

    const headers = attendanceLogs.map((log) => ({
      subjectId: log.subjectId,
      subjectName: log.subjectName,
      startTime: log.startTime,
      endTime: log.endTime,
      logId: log.id,
    }));

    const students = Array.from(studentMap.values()).map((student: any) => {
      const studentObj: any = {
        id: student.id,
        name: student.name,
        regNo: student.regNo,
        attendance: {},
      };

      headers.forEach((header) => {
        studentObj.attendance[header.subjectId] = {
          status: "ABSENT",
          note: null,
          logId: header.logId,
        };
      });

      attendanceLogs.forEach((log) => {
        const record = log.records.find((r: any) => r.studentId === student.id);
        if (record) {
          studentObj.attendance[log.subjectId] = {
            status: record.status,
            note: record.note,
            logId: log.id,
            recordId: record.id,
          };
        }
      });

      return studentObj;
    });

    students.sort((a: any, b: any) => a.regNo.localeCompare(b.regNo));

    const responseData = {
      date: attendanceLogs[0].date,
      stream: {
        id: attendanceLogs[0].streamId,
        name: attendanceLogs[0].streamName,
      },
      class: {
        id: attendanceLogs[0].classId,
        name: attendanceLogs[0].className,
      },
      headers,
      students,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data" },
      { status: 500 }
    );
  }
}