"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../../../lib/db";
import { generateSlug } from "../lib/generateSlug";
import {
  AssignClassTeacherProps,
  Class,
  ClassBrief,
  ClassCreateProps,
  Stream,
  StreamCreateProps,
} from "../types/types";

const PATH = "/management/dashboard/classes";

// ── CLASS ──────────────────────────────────────────────

export async function createClass(data: ClassCreateProps) {
  try {
    const slug = generateSlug(`${data.title}-${Date.now()}`);
    await prisma.class.create({
      data: { title: data.title, slug, schoolId: data.schoolId },
    });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("createClass:", error);
    throw error;
  }
}

export async function updateClass(id: string, title: string) {
  try {
    await prisma.class.update({ where: { id }, data: { title } });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("updateClass:", error);
    throw error;
  }
}

export async function deleteClass(id: string) {
  try {
    await prisma.class.delete({ where: { id } });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("deleteClass:", error);
    return { ok: false };
  }
}

export async function getAllClasses(schoolId: string) {
  try {
    const classes = await prisma.class.findMany({
      where: { schoolId },
      include: {
        streams: { include: { _count: { select: { students: true } } } },
        _count: { select: { students: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    return classes as unknown as Class[];
  } catch (error) {
    console.error("getAllClasses:", error);
  }
}

export async function getBriefClasses(schoolId: string) {
  try {
    const classes = await prisma.class.findMany({
      where: { schoolId },
      select: { id: true, title: true },
      orderBy: { title: "asc" },
    });
    return classes as ClassBrief[];
  } catch (error) {
    console.error("getBriefClasses:", error);
  }
}

// ── STREAM ─────────────────────────────────────────────

export async function createStream(data: StreamCreateProps) {
  try {
    const slug = generateSlug(`${data.title}-${Date.now()}`);
    await prisma.stream.create({
      data: { title: data.title, slug, classId: data.classId, schoolId: data.schoolId },
    });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("createStream:", error);
    throw error;
  }
}

export async function updateStream(id: string, title: string) {
  try {
    await prisma.stream.update({ where: { id }, data: { title } });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("updateStream:", error);
    throw error;
  }
}

export async function deleteStream(id: string) {
  try {
    await prisma.stream.delete({ where: { id } });
    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("deleteStream:", error);
    return { ok: false };
  }
}

export async function getAllStreams() {
  try {
    const streams = await prisma.stream.findMany({ orderBy: { createdAt: "asc" } });
    return streams as unknown as Stream[];
  } catch (error) {
    console.error("getAllStreams:", error);
  }
}

// ── TEACHER ASSIGNMENT ─────────────────────────────────

export async function assignClassTeacher(data: AssignClassTeacherProps) {
  try {
    const { classId, classTeacherId, classTeacherName, oldClassTeacherId } = data;

    if (oldClassTeacherId) {
      await prisma.teacher.update({
        where: { id: oldClassTeacherId },
        data: { isClassTeacher: false },
      });
    }

    await Promise.all([
      prisma.class.update({
        where: { id: classId },
        data: { classTeacherId, classTeacherName },
      }),
      prisma.teacher.update({
        where: { id: classTeacherId },
        data: { isClassTeacher: true },
      }),
    ]);

    revalidatePath(PATH);
    return { ok: true };
  } catch (error) {
    console.error("assignClassTeacher:", error);
    throw error;
  }
}
