"use server";

import db from "@/app/lib/db";
import { hash } from "@node-rs/argon2";
import { revalidatePath } from "next/cache";

export type AgencyStaffProps = {
  firstName:    string;
  lastName:     string;
  email:        string;
  phone?:       string;
  password:     string;
  role:         "ADMIN" | "SECRETARY" | "ACCOUNTANT";
  agencyId:     string;
  agencyName:   string;
};

const PATH = "/estate/dashboard/users";

// ==================== CREATE ====================
export async function createAgencyStaff(data: AgencyStaffProps) {
  const exists = await db.user.findUnique({ where: { email: data.email } });
  if (exists) throw new Error("Bu e-posta adresi zaten kullanılıyor.");

  const passwordHash = await hash(data.password);

  const user = await db.user.create({
    data: {
      name:            `${data.firstName} ${data.lastName}`,
      firstName:       data.firstName,
      lastName:        data.lastName,
      email:           data.email,
      phone:           data.phone   ?? null,
      passwordHash,
      agencyId:        data.agencyId,
      agencyName:      data.agencyName,
      roleGayrimenkul: data.role as any,
      isActive:        true,
    },
  });

  revalidatePath(PATH);
  return user;
}

// ==================== UPDATE ROLE ====================
export async function updateAgencyUserRole(
  userId:  string,
  role:    "ADMIN" | "AGENT" | "CLIENT" | "SECRETARY" | "ACCOUNTANT",
) {
  await db.user.update({
    where: { id: userId },
    data:  { roleGayrimenkul: role as any },
  });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== DELETE ====================
export async function deleteAgencyUser(userId: string) {
  await db.user.delete({ where: { id: userId } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL STAFF ====================
export async function getAllAgencyUsers(agencyId: string) {
  return db.user.findMany({
    where:   { agencyId },
    select: {
      id: true, name: true, firstName: true, lastName: true,
      email: true, phone: true, image: true, isActive: true,
      roleGayrimenkul: true, createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== TÜM KULLANICILARI GETİR ====================
export async function getAvailableUsers() {
  return db.user.findMany({
    select: {
      id: true, name: true, firstName: true, lastName: true,
      email: true, phone: true, image: true,
    },
    orderBy: { name: "asc" },
    take: 500,
  });
}

// ==================== MEVCUT KULLANICIYA ROL ATA ====================
export async function assignRoleToUser(
  userId:    string,
  role:      "ADMIN" | "AGENT" | "CLIENT" | "SECRETARY" | "ACCOUNTANT",
  agencyId:  string,
  agencyName: string,
) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("Kullanıcı bulunamadı.");
  if (user.agencyId && user.agencyId !== agencyId) {
    throw new Error("Bu kullanıcı başka bir ajansa bağlı.");
  }

  await db.user.update({
    where: { id: userId },
    data:  {
      agencyId,
      agencyName,
      roleGayrimenkul: role as any,
      isActive: true,
    },
  });

  revalidatePath(PATH);
  return { ok: true };
}
