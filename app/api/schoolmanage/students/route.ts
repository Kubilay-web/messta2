import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import {
  StudentCreateProps,
  GuardianCreateProps,
  MarkSheetCreateProps,
} from "../types/types";

import { convertDateToIso } from "../exams/convertDateToIso";
import { UserRoleSchool } from "@prisma/client";
// import bcrypt from 'bcrypt';


import { hash } from "@node-rs/argon2";

// ==================== YARDIMCI FONKSİYONLAR ====================

async function createUserService(data: {
  email: string;
  password: string;
  role: UserRoleSchool;
  name: string;
  phone?: string;
  image?: string;
  schoolId: string;
  schoolName: string;
}) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash password
    // const hashedPassword = await bcrypt.hash(data.password, 10);

    const hashedPassword = await hash(data.password);

    // Manuel ID oluştur (CUID formatında)
    const { v4: uuidv4 } = require("uuid");
    const customId = uuidv4(); // veya cuid() kullanabilirsiniz

    // User modeline uygun veri hazırla
    const userData = {
      id: customId, // <-- MANUEL ID EKLE!
      username: data.name, // required field
      email: data.email,
      name: data.name,
      firstName: data.name?.split(" ")[0] || "",
      lastName: data.name?.split(" ").slice(1).join(" ") || "",
      phone: data.phone || null,
      image: data.image || null,
      passwordHash: hashedPassword,
      roleschool: data.role, // enum olarak
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      role: "USER", // default role
      isActive: true,
    };

    console.log("Creating user with data:", JSON.stringify(userData, null, 2));

    const newUser = await db.user.create({
      data: userData,
    });

    console.log(`User created successfully: ${newUser.name} (${newUser.id})`);
    return newUser;
  } catch (error) {
    console.error("Error in createUserService:", error);
    throw error;
  }
}

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get("schoolId");
    const studentId = searchParams.get("id");
    const userId = searchParams.get("userId");
    const parentId = searchParams.get("parentId");
    const classId = searchParams.get("classId");
    const streamId = searchParams.get("streamId");
    const type = searchParams.get("type"); // 'brief', 'by-class', 'next-seq', 'by-user', 'by-parent'

    // Next sequence number
    if (type === "next-seq" && schoolId) {
      const lastStudent = await db.student.findFirst({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
      });

      const stringSeq = lastStudent?.regNo.split("/")[3];
      const lastSeq = stringSeq ? parseInt(stringSeq) : 0;
      const nextSeq = lastSeq + 1;

      return NextResponse.json({
        data: nextSeq,
        error: null,
      });
    }

    // Student by user ID
    if (userId && type === "by-user") {
      const student = await db.student.findUnique({
        where: { userId },
        include: { guardian: true },
      });

      if (!student) {
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        data: student,
        error: null,
      });
    }

    // Students by parent ID
    if (parentId && type === "by-parent") {
      const students = await db.student.findMany({
        orderBy: { createdAt: "desc" },
        where: { parentId },
        select: {
          id: true,
          name: true,
          regNo: true,
          classTitle: true,
          streamTitle: true,
          dob: true,
          imageUrl: true,
        },
      });

      return NextResponse.json({
        data: students,
        error: null,
      });
    }

    // Students by class and stream
    if (type === "by-class" && schoolId && classId) {
      let students = [];

      if (streamId === "all") {
        students = await db.student.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            schoolId,
            classId: classId as string,
          },
        });
      } else if (streamId) {
        students = await db.student.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            schoolId,
            classId: classId as string,
            streamId: streamId as string,
          },
        });
      }

      return NextResponse.json({
        data: students,
        error: null,
      });
    }

    // Brief students list
    if (type === "brief" && schoolId) {
      const students = await db.student.findMany({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
        select: {
          id: true,
          name: true,
          regNo: true,
        },
      });

      return NextResponse.json({
        data: students,
        error: null,
      });
    }

    // Single student by ID
    if (studentId) {
      const student = await db.student.findUnique({
        where: { id: studentId },
        include: { guardian: true },
      });

      if (!student) {
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({
        data: student,
        error: null,
      });
    }

    // Students by school ID
    if (schoolId) {
      const students = await db.student.findMany({
        orderBy: { createdAt: "desc" },
        where: { schoolId },
        include: {
          class: { select: { title: true } },
          stream: { select: { title: true } },
          parent: { select: { firstName: true, lastName: true } },
        },
      });

      return NextResponse.json({
        data: students,
        error: null,
      });
    }

    // All students
    const students = await db.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      data: students,
      error: null,
    });
  } catch (error) {
    console.error("GET students error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== POST İŞLEMLERİ ====================

// ==================== POST İŞLEMLERİ ====================
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const body = await request.json();

    // ÖNCE: GET STUDENTS BY CLASS (body'den gelen type ile)
    if (body.type === "by-class" || action === "get-students") {
      console.log("Getting students by class with data:", body);

      const { classId, streamId, schoolId } = body;

      if (!classId || !schoolId) {
        return NextResponse.json(
          {
            data: null,
            error: "classId and schoolId are required",
          },
          { status: 400 },
        );
      }

      let students = [];

      if (streamId === "all" || !streamId) {
        // Tüm stream'lerden öğrencileri getir
        students = await db.student.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            schoolId: schoolId,
            classId: classId,
          },
          include: {
            class: { select: { title: true } },
            stream: { select: { title: true } },
            parent: { select: { firstName: true, lastName: true } },
          },
        });
      } else {
        // Belirli stream'den öğrencileri getir
        students = await db.student.findMany({
          orderBy: { createdAt: "desc" },
          where: {
            schoolId: schoolId,
            classId: classId,
            streamId: streamId,
          },
          include: {
            class: { select: { title: true } },
            stream: { select: { title: true } },
            parent: { select: { firstName: true, lastName: true } },
          },
        });
      }

      console.log(`Found ${students.length} students`);

      return NextResponse.json({
        data: students,
        error: null,
      });
    }

    // CREATE MARKSHEET AND FETCH STUDENTS
    if (action === "marksheet-prep") {
      const marksheetData = body as MarkSheetCreateProps;

      let markSheetId = "";
      const subjectId = marksheetData.subjectId;

      const existingMarkSheet = await db.marksheet.findFirst({
        where: {
          subjectId: subjectId,
          classId: marksheetData.classId,
          examId: marksheetData.examId,
          termId: marksheetData.termId,
        },
      });

      if (existingMarkSheet) {
        markSheetId = existingMarkSheet.id;
        console.log("Marksheet already exists", markSheetId);
      } else {
        const markSheet = await db.marksheet.create({
          data: marksheetData,
        });
        markSheetId = markSheet.id;
        console.log("New Marksheet Created", markSheetId);
      }

      const studentMarks = await db.studentMark.findMany({
        where: {
          subjectId: marksheetData.subjectId,
          classId: marksheetData.classId,
          examId: marksheetData.examId,
          termId: marksheetData.termId,
          marks: { not: null },
        },
        select: { studentId: true },
      });

      const excludedStudentIds = studentMarks.map((item) => item.studentId);

      const students = await db.student.findMany({
        orderBy: { name: "asc" },
        where: {
          classId: marksheetData.classId,
          id: { notIn: excludedStudentIds },
        },
        select: { name: true, id: true },
        take: 4,
      });

      return NextResponse.json({
        data: {
          students,
          markSheetId,
        },
        error: null,
      });
    }

    // CREATE GUARDIAN
    if (action === "create-guardian") {
      const guardianData = body as GuardianCreateProps;

      const existingGuardian = await db.guardianInfo.findUnique({
        where: { studentId: guardianData.studentId },
      });

      if (existingGuardian) {
        return NextResponse.json(
          {
            data: null,
            error: "Guardian already exists",
          },
          { status: 409 },
        );
      }

      const newGuardian = await db.guardianInfo.create({
        data: guardianData,
      });

      return NextResponse.json(
        {
          data: newGuardian,
          error: null,
        },
        { status: 201 },
      );
    }

    // CREATE STUDENT (default)
    const studentData = body as StudentCreateProps;

    // Format dates
    if (studentData.dob) {
      studentData.dob = convertDateToIso(studentData.dob);
    }
    if (studentData.admissionDate) {
      studentData.admissionDate = convertDateToIso(studentData.admissionDate);
    }

    // Check uniqueness
    const [existingEmail, existingBCN, existingRegNo, existingRollNo] =
      await Promise.all([
        db.student.findUnique({ where: { email: studentData.email } }),
        db.student.findUnique({ where: { BCN: studentData.BCN } }),
        db.student.findUnique({ where: { regNo: studentData.regNo } }),
        db.student.findUnique({ where: { rollNo: studentData.rollNo } }),
      ]);

    if (existingBCN) {
      return NextResponse.json(
        { data: null, error: "Student with this BCN already exists" },
        { status: 409 },
      );
    }
    if (existingEmail) {
      return NextResponse.json(
        { data: null, error: "Student with this email already exists" },
        { status: 409 },
      );
    }
    if (existingRegNo) {
      return NextResponse.json(
        { data: null, error: "Student with this RegNo already exists" },
        { status: 409 },
      );
    }
    if (existingRollNo) {
      return NextResponse.json(
        { data: null, error: "Student with this RollNo already exists" },
        { status: 409 },
      );
    }

    // Create user
    const userData = {
      email: studentData.email,
      password: studentData.password,
      role: "STUDENT" as UserRoleSchool,
      name: studentData.name,
      phone: studentData.phone,
      image: studentData.imageUrl,
      schoolId: studentData.schoolId,
      schoolName: studentData.schoolName,
    };

    const user = await createUserService(userData);
    studentData.userId = user.id;

    // Create student
    const newStudent = await db.student.create({
      data: studentData,
      include: {
        class: { select: { title: true } },
        stream: { select: { title: true } },
        parent: { select: { firstName: true, lastName: true } },
      },
    });

    return NextResponse.json(
      {
        data: newStudent,
        error: null,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST students error:", error);
    return NextResponse.json(
      {
        data: null,
        error: error instanceof Error ? error.message : "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== PUT İŞLEMLERİ (Tam Güncelleme) ====================
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("id");
    const guardianId = searchParams.get("guardianId");

    // Update guardian
    if (guardianId) {
      const data = (await request.json()) as GuardianCreateProps;

      const existingGuardian = await db.guardianInfo.findUnique({
        where: { id: guardianId },
      });

      if (!existingGuardian) {
        return NextResponse.json(
          { data: null, error: "Guardian does not exist" },
          { status: 404 },
        );
      }

      const updatedGuardian = await db.guardianInfo.update({
        where: { id: guardianId },
        data,
      });

      console.log(`Guardian updated successfully: ${updatedGuardian.id}`);

      return NextResponse.json({
        data: updatedGuardian,
        error: null,
      });
    }

    // Update student
    if (studentId) {
      const data = (await request.json()) as Partial<StudentCreateProps>;

      // Format dates if provided
      if (data.dob) data.dob = convertDateToIso(data.dob);
      if (data.admissionDate)
        data.admissionDate = convertDateToIso(data.admissionDate);

      const updatedStudent = await db.student.update({
        where: { id: studentId },
        data,
        include: {
          class: { select: { title: true } },
          stream: { select: { title: true } },
        },
      });

      // Update user name if changed
      if (data.name) {
        await db.user.update({
          where: { id: updatedStudent.userId },
          data: { name: data.name },
        });
      }

      return NextResponse.json({
        data: updatedStudent,
        error: null,
      });
    }

    return NextResponse.json(
      { error: "Student ID or Guardian ID is required" },
      { status: 400 },
    );
  } catch (error) {
    console.error("PUT students error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== PATCH İŞLEMLERİ (Kısmi Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("id");
    const guardianId = searchParams.get("guardianId");

    if (guardianId) {
      const data = await request.json();
      const updatedGuardian = await db.guardianInfo.update({
        where: { id: guardianId },
        data,
      });

      return NextResponse.json({
        data: updatedGuardian,
        error: null,
      });
    }

    if (studentId) {
      const data = await request.json();

      // Format dates if provided
      if (data.dob) data.dob = convertDateToIso(data.dob);
      if (data.admissionDate)
        data.admissionDate = convertDateToIso(data.admissionDate);

      const updatedStudent = await db.student.update({
        where: { id: studentId },
        data,
        include: {
          class: { select: { title: true } },
          stream: { select: { title: true } },
        },
      });

      return NextResponse.json({
        data: updatedStudent,
        error: null,
      });
    }

    return NextResponse.json(
      { error: "Student ID or Guardian ID is required" },
      { status: 400 },
    );
  } catch (error) {
    console.error("PATCH students error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("id");
    const guardianId = searchParams.get("guardianId");

    if (guardianId) {
      const deletedGuardian = await db.guardianInfo.delete({
        where: { id: guardianId },
      });

      return NextResponse.json({
        data: deletedGuardian,
        error: null,
      });
    }

    if (studentId) {
      // Get student to find userId
      const student = await db.student.findUnique({
        where: { id: studentId },
        select: { userId: true, name: true, schoolId: true },
      });

      if (!student) {
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 },
        );
      }

      // Delete student and user in transaction
      await db.$transaction([
        db.studentDocument.deleteMany({ where: { studentId } }),
        db.studentMark.deleteMany({ where: { studentId } }),
        db.attendance.deleteMany({ where: { studentId } }),
        db.guardianInfo.deleteMany({ where: { studentId } }),
        db.student.delete({ where: { id: studentId } }),
        db.user.delete({ where: { id: student.userId } }),
      ]);

      console.log(`Student deleted successfully: ${student.name}`);

      return NextResponse.json({
        data: { message: "Student deleted successfully" },
        error: null,
      });
    }

    return NextResponse.json(
      { error: "Student ID or Guardian ID is required" },
      { status: 400 },
    );
  } catch (error) {
    console.error("DELETE students error:", error);
    return NextResponse.json(
      {
        data: null,
        error: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
