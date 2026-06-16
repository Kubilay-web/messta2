"use server";

import db from "@/app/lib/db";
import { hash } from "@node-rs/argon2";
import { UserRoleSchool } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { StudentProps } from "../components/dashboard/forms/students/student-form";
import { GuardianFormData } from "../components/dashboard/forms/students/GuadianForm";
import { MarkSheetCreateProps } from "../components/dashboard/exams/MarkSheetForm";
import { StudentByClassProps } from "../components/dashboard/StudentListingByClass";

function toIso(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Invalid date format. Expected "YYYY-MM-DD".');
  }
  return `${dateStr}T00:00:00.000Z`;
}

export async function createStudent(data: StudentProps) {
  if (data.dob) data.dob = toIso(data.dob);
  if (data.admissionDate) data.admissionDate = toIso(data.admissionDate);

  const [existingEmail, existingBCN, existingRegNo, existingRollNo, existingUser] =
    await Promise.all([
      db.student.findUnique({ where: { email: data.email } }),
      db.student.findUnique({ where: { BCN: data.BCN } }),
      db.student.findUnique({ where: { regNo: data.regNo } }),
      db.student.findUnique({ where: { rollNo: data.rollNo } }),
      db.user.findUnique({ where: { email: data.email } }),
    ]);

  if (existingBCN) throw new Error("Student with this BCN already exists");
  if (existingEmail) throw new Error("Student with this email already exists");
  if (existingRegNo) throw new Error("Student with this RegNo already exists");
  if (existingRollNo) throw new Error("Student with this RollNo already exists");
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await hash(data.password);

  const user = await db.user.create({
    data: {
      username: data.email,
      email: data.email,
      name: data.name,
      firstName: data.name.split(" ")[0] || "",
      lastName: data.name.split(" ").slice(1).join(" ") || "",
      phone: data.phone || null,
      image: data.imageUrl || null,
      passwordHash: hashedPassword,
      roleschool: "STUDENT" as UserRoleSchool,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      role: "USER",
    },
  });

  const newStudent = await db.student.create({
    data: {
      name: data.name,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      parentId: data.parentId,
      parentName: data.parentName,
      classId: data.classId,
      classTitle: data.classTitle,
      streamId: data.streamId,
      streamTitle: data.streamTitle,
      studentType: data.studentType,
      password: data.password,
      imageUrl: data.imageUrl,
      phone: data.phone,
      state: data.state,
      BCN: data.BCN,
      nationality: data.nationality,
      religion: data.religion,
      gender: data.gender,
      dob: data.dob as any,
      rollNo: data.rollNo,
      regNo: data.regNo,
      admissionDate: data.admissionDate as any,
      address: data.address,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      userId: user.id,
    },
    include: {
      class: { select: { title: true } },
      stream: { select: { title: true } },
      parent: { select: { firstName: true, lastName: true } },
    },
  });

  revalidatePath("/management/dashboard/students");
  return newStudent;
}

export async function updateStudent(id: string, data: Partial<StudentProps>) {
  if (data.dob) data.dob = toIso(data.dob);
  if (data.admissionDate) data.admissionDate = toIso(data.admissionDate);

  const { password, schoolId, schoolName, ...updateData } = data as any;

  const updatedStudent = await db.student.update({
    where: { id },
    data: updateData,
    include: {
      class: { select: { title: true } },
      stream: { select: { title: true } },
    },
  });

  if (data.name) {
    await db.user.update({
      where: { id: updatedStudent.userId },
      data: { name: data.name, ...(data.phone && { phone: data.phone }), ...(data.imageUrl && { image: data.imageUrl }) },
    });
  }

  revalidatePath("/management/dashboard/students");
  return updatedStudent;
}

export async function deleteStudent(id: string) {
  const student = await db.student.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!student) throw new Error("Student not found");

  await db.$transaction([
    db.studentDocument.deleteMany({ where: { studentId: id } }),
    db.studentMark.deleteMany({ where: { studentId: id } }),
    db.attendance.deleteMany({ where: { studentId: id } }),
    db.guardianInfo.deleteMany({ where: { studentId: id } }),
    db.student.delete({ where: { id } }),
    db.user.delete({ where: { id: student.userId } }),
  ]);

  revalidatePath("/management/dashboard/students");
  return { ok: true };
}

export async function getAllStudents(schoolId: string) {
  return db.student.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    include: {
      class: { select: { title: true } },
      stream: { select: { title: true } },
      parent: { select: { firstName: true, lastName: true } },
    },
  });
}

export async function getAllBriefStudents(schoolId: string) {
  return db.student.findMany({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, regNo: true },
  });
}

export async function getStudentsByClass(data: StudentByClassProps) {
  const where: any = { schoolId: data.schoolId, classId: data.classId };
  if (data.streamId && data.streamId !== "all") where.streamId = data.streamId;

  return db.student.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      class: { select: { title: true } },
      stream: { select: { title: true } },
      parent: { select: { firstName: true, lastName: true } },
    },
  });
}

export async function getStudentNextSequence(schoolId: string): Promise<number> {
  const last = await db.student.findFirst({
    where: { schoolId },
    orderBy: { createdAt: "desc" },
    select: { regNo: true },
  });

  const seq = last?.regNo.split("/")[3];
  return seq ? parseInt(seq) + 1 : 1;
}

export async function getStudentById(studentId: string) {
  return db.student.findUnique({
    where: { id: studentId },
    include: { guardian: true },
  });
}

export async function getStudentByUserId(studentUserId: string) {
  return db.student.findUnique({
    where: { userId: studentUserId },
    include: { guardian: true },
  });
}

export async function createGuardian(data: GuardianFormData) {
  const existing = await db.guardianInfo.findUnique({
    where: { studentId: data.studentId },
  });
  if (existing) throw new Error("Guardian already exists");

  const newGuardian = await db.guardianInfo.create({ data: data as any });
  revalidatePath("/management/dashboard/students");
  return newGuardian;
}

export async function updatedGuardian(id: string, data: GuardianFormData) {
  const updated = await db.guardianInfo.update({
    where: { id },
    data: data as any,
  });
  revalidatePath("/management/dashboard/students");
  return updated;
}

export async function getBriefStudentsByClassId(data: MarkSheetCreateProps) {
  let markSheetId: string;

  const existing = await db.marksheet.findFirst({
    where: {
      subjectId: data.subjectId,
      classId: data.classId,
      examId: data.examId,
      termId: data.termId,
    },
  });

  if (existing) {
    markSheetId = existing.id;
  } else {
    const created = await db.marksheet.create({ data: data as any });
    markSheetId = created.id;
  }

  const markedIds = await db.studentMark.findMany({
    where: {
      subjectId: data.subjectId,
      classId: data.classId,
      examId: data.examId,
      termId: data.termId,
      marks: { not: null },
    },
    select: { studentId: true },
  });

  const excludedIds = markedIds.map((m: any) => m.studentId);

  const students = await db.student.findMany({
    where: { classId: data.classId, id: { notIn: excludedIds } },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
    take: 4,
  });

  return { students, markSheetId } as any;
}
