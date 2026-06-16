"use server";

import db from "@/app/lib/db";
import { hash } from "@node-rs/argon2";
import { UserRoleSchool } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ParentProps } from "../components/dashboard/forms/users/parent-form";
import { BriefStudent } from "../components/portal/parents/StudentList";

function toIso(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Invalid date format. Expected "YYYY-MM-DD".');
  }
  return `${dateStr}T00:00:00.000Z`;
}

export async function createParent(data: ParentProps) {
  if (!data.email || !data.password || !data.NIN || !data.phone) {
    throw new Error("Missing required fields: email, password, NIN, phone");
  }

  const dob = data.dob ? toIso(data.dob) : null;

  const [existingNIN, existingEmail, existingPhone, existingUser] =
    await Promise.all([
      db.parent.findUnique({ where: { NIN: data.NIN } }),
      db.parent.findUnique({ where: { email: data.email } }),
      db.parent.findUnique({ where: { phone: data.phone } }),
      db.user.findUnique({ where: { email: data.email } }),
    ]);

  if (existingNIN) throw new Error("Parent with this NIN already exists");
  if (existingEmail) throw new Error("Parent with this email already exists");
  if (existingPhone) throw new Error("Parent with this Phone already exists");
  if (existingUser) throw new Error("Email already exists");

  const hashedPassword = await hash(data.password);

  const user = await db.user.create({
    data: {
      name: `${data.firstName} ${data.lastName}`,
      username: data.email,
      email: data.email,
      phone: data.phone,
      passwordHash: hashedPassword,
      image: data.imageUrl,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      role: "USER",
      roleschool: "PARENT" as UserRoleSchool,
    },
  });

  const newParent = await db.parent.create({
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      relationship: data.relationship,
      email: data.email,
      NIN: data.NIN,
      gender: data.gender,
      dob: dob as any,
      phone: data.phone,
      nationality: data.nationality,
      whatsapNo: data.whatsapNo,
      imageUrl: data.imageUrl,
      contactMethod: data.contactMethod,
      occupation: data.occupation,
      address: data.address,
      password: data.password,
      schoolId: data.schoolId,
      schoolName: data.schoolName,
      userId: user.id,
    },
    include: {
      user: { select: { email: true, image: true } },
      students: true,
    },
  });

  revalidatePath("/management/dashboard/users/parents");
  return newParent;
}

export async function updateParent(id: string, data: Partial<ParentProps>) {
  const dob = data.dob ? toIso(data.dob) : undefined;

  const updatedParent = await db.parent.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.relationship && { relationship: data.relationship }),
      ...(data.NIN && { NIN: data.NIN }),
      ...(data.gender && { gender: data.gender }),
      ...(dob && { dob: dob as any }),
      ...(data.phone && { phone: data.phone }),
      ...(data.nationality && { nationality: data.nationality }),
      ...(data.whatsapNo !== undefined && { whatsapNo: data.whatsapNo }),
      ...(data.imageUrl && { imageUrl: data.imageUrl }),
      ...(data.contactMethod && { contactMethod: data.contactMethod }),
      ...(data.occupation && { occupation: data.occupation }),
      ...(data.address && { address: data.address }),
    },
    include: {
      user: { select: { email: true, image: true } },
      students: true,
    },
  });

  if (data.firstName || data.lastName || data.phone || data.imageUrl) {
    await db.user.update({
      where: { id: updatedParent.userId },
      data: {
        ...(data.firstName &&
          data.lastName && {
            name: `${data.firstName} ${data.lastName}`,
          }),
        ...(data.phone && { phone: data.phone }),
        ...(data.imageUrl && { image: data.imageUrl }),
      },
    });
  }

  revalidatePath("/management/dashboard/users/parents");
  return updatedParent;
}

export async function deleteParent(id: string) {
  const parent = await db.parent.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!parent) throw new Error("Parent not found");

  await db.$transaction([
    db.schoolFeePayment.deleteMany({ where: { parentProfileId: id } }),
    db.parent.delete({ where: { id } }),
    db.user.delete({ where: { id: parent.userId } }),
  ]);

  revalidatePath("/management/dashboard/users/parents");
  return { ok: true };
}

export async function getAllParents(schoolId: string) {
  return db.parent.findMany({
    where: { schoolId },
    include: {
      user: { select: { email: true, image: true } },
      students: { select: { id: true, name: true, regNo: true } },
      _count: { select: { students: true, schoolFeesPayments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getStudentsByParentId(
  parentId: string
): Promise<BriefStudent[]> {
  if (!parentId) return [];

  const parent = await db.parent.findUnique({
    where: { id: parentId },
    include: {
      students: {
        select: {
          id: true,
          name: true,
          regNo: true,
          dob: true,
          imageUrl: true,
          class: { select: { title: true } },
          stream: { select: { title: true } },
        },
      },
    },
  });

  if (!parent?.students?.length) return [];

  return parent.students.map((s: any) => ({
    id: s.id,
    name: s.name,
    regNo: s.regNo,
    dob: s.dob ? new Date(s.dob).toISOString().split("T")[0] : "",
    classTitle: s.class?.title || "Not assigned",
    streamTitle: s.stream?.title || "Not assigned",
    imageUrl: s.imageUrl || "/placeholder-avatar.png",
  }));
}

export async function getParentIdFromUserId(
  userId: string
): Promise<string | null> {
  if (!userId) return null;

  const parent = await db.parent.findFirst({
    where: { userId },
    select: { id: true },
  });

  return parent?.id ?? null;
}
