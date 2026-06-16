import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import {
  AttendanceHeader,
  AttendanceResponseData,
  StudentMapEntry,
  StudentWithAttendance,
} from '../types/attendance';

// CREATE Attendance - POST /api/attendance
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Create attendance log
    const attendanceLog = await db.attendanceLog.create({
      data: data.log,
    });

    // Create attendance records
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
    console.error('Create attendance error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// GET Attendance - /api/attendance?streamId=xxx&date=yyyy-mm-dd&studentId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const streamId = searchParams.get('streamId');
    const studentId = searchParams.get('studentId');
    const dateString = searchParams.get('date');

    if (!dateString) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Parse date safely
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Student attendance by date
    if (studentId) {
      return await getStudentAttendanceByDate(studentId, date);
    }

    // Stream attendance by date
    if (streamId) {
      return await getAttendanceByStreamId(streamId, date);
    }

    return NextResponse.json(
      { error: 'Either streamId or studentId is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Attendance GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}

// Stream bazlı attendance getirme
async function getAttendanceByStreamId(streamId: string, date: Date) {
  try {
    // Create date range for the selected day
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
        startTime: 'asc',
      },
    });

    if (!attendanceLogs.length) {
      return NextResponse.json({ headers: [], students: [] });
    }

    // Get unique list of students from all records
    const studentMap = new Map<string, StudentMapEntry>();

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

    // Create headers for the table (subject columns)
    const headers: AttendanceHeader[] = attendanceLogs.map((log) => ({
      subjectId: log.subjectId,
      subjectName: log.subjectName,
      startTime: log.startTime,
      endTime: log.endTime,
      logId: log.id,
    }));

    // Create student records with attendance status for each subject
    const students: StudentWithAttendance[] = Array.from(
      studentMap.values()
    ).map((student) => {
      const studentObj: StudentWithAttendance = {
        id: student.id,
        name: student.name,
        regNo: student.regNo,
        attendance: {},
      };

      // Initialize attendance status for each subject
      headers.forEach((header) => {
        studentObj.attendance[header.subjectId] = {
          status: 'ABSENT',
          note: null,
          logId: header.logId,
        };
      });

      // Fill in actual attendance statuses
      attendanceLogs.forEach((log) => {
        const record = log.records.find((r) => r.studentId === student.id);
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

    // Sort students by registration number
    students.sort((a, b) => a.regNo.localeCompare(b.regNo));

    const responseData: AttendanceResponseData = {
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

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}

// Student bazlı attendance getirme
async function getStudentAttendanceByDate(studentId: string, date: Date) {
  try {
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
        { error: 'Student not found' },
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
        startTime: 'asc',
      },
    });

    if (!attendanceLogs.length) {
      // Return empty records structure
      return NextResponse.json({
        student: {
          id: student.id,
          name: student.name,
          regNo: student.regNo,
        },
        date: date.toISOString(),
        subjects: [],
      });
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

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching student attendance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student attendance data' },
      { status: 500 }
    );
  }
}

// UPDATE Attendance - PUT /api/attendance?id=xxx
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recordId = searchParams.get('recordId');
    const logId = searchParams.get('logId');

    if (!recordId && !logId) {
      return NextResponse.json(
        { error: 'Either recordId or logId is required' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Update single attendance record
    if (recordId) {
      const updated = await db.attendance.update({
        where: { id: recordId },
        data: {
          status: data.status,
          note: data.note,
        },
      });
      return NextResponse.json(updated);
    }

    // Update entire attendance log (bulk update)
    if (logId) {
      const { records } = data;
      const updated = await db.$transaction(
        records.map((record: any) =>
          db.attendance.update({
            where: { id: record.id },
            data: {
              status: record.status,
              note: record.note,
            },
          })
        )
      );
      return NextResponse.json(updated);
    }
  } catch (error) {
    console.error('Update attendance error:', error);
    return NextResponse.json(
      { error: 'Failed to update attendance' },
      { status: 500 }
    );
  }
}

// DELETE Attendance - DELETE /api/attendance?logId=xxx
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('logId');
    const recordId = searchParams.get('recordId');

    // Delete single record
    if (recordId) {
      await db.attendance.delete({
        where: { id: recordId },
      });
      return NextResponse.json(
        { message: 'Attendance record deleted successfully' },
        { status: 200 }
      );
    }

    // Delete entire attendance log and all its records
    if (logId) {
      await db.$transaction([
        db.attendance.deleteMany({
          where: { attendanceLogId: logId },
        }),
        db.attendanceLog.delete({
          where: { id: logId },
        }),
      ]);
      return NextResponse.json(
        { message: 'Attendance log deleted successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Either logId or recordId is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Delete attendance error:', error);
    return NextResponse.json(
      { error: 'Failed to delete attendance' },
      { status: 500 }
    );
  }
}