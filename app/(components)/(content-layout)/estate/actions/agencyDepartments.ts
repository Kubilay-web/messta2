"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./generateSlug";

export type DepartmentProps = {
  name:             string;
  managerId?:       string;
  managerName?:     string;
  managerStartDate?: string;
  budget?:          number;
  budgetYear?:      string;
  agencyId:         string;
};

const PATH = "/estate/dashboard/users/departments";

// ==================== CREATE ====================
export async function createAgencyDepartment(data: DepartmentProps) {
  const slug = generateSlug(data.name);

  const existing = await db.agencyDepartment.findUnique({ where: { slug } });
  if (existing) throw new Error("Bu isimde bir departman zaten mevcut.");

  const dept = await db.agencyDepartment.create({
    data: {
      name:             data.name,
      slug,
      agencyId:         data.agencyId,
      managerId:        data.managerId       ?? null,
      managerName:      data.managerName     ?? null,
      managerStartDate: data.managerStartDate
        ? new Date(data.managerStartDate)
        : null,
      budget:           data.budget    ? parseFloat(String(data.budget))    : null,
      budgetYear:       data.budgetYear ?? null,
    },
  });

  revalidatePath(PATH);
  return dept;
}

// ==================== UPDATE ====================
export async function updateAgencyDepartment(id: string, data: Partial<DepartmentProps>) {
  const dept = await db.agencyDepartment.update({
    where: { id },
    data: {
      ...(data.name        && { name: data.name }),
      ...(data.managerId   !== undefined && { managerId:   data.managerId   ?? null }),
      ...(data.managerName !== undefined && { managerName: data.managerName ?? null }),
      ...(data.managerStartDate && {
        managerStartDate: new Date(data.managerStartDate),
      }),
      ...(data.budget !== undefined && {
        budget: data.budget ? parseFloat(String(data.budget)) : null,
      }),
      ...(data.budgetYear !== undefined && { budgetYear: data.budgetYear ?? null }),
    },
  });

  revalidatePath(PATH);
  return dept;
}

// ==================== DELETE ====================
export async function deleteAgencyDepartment(id: string) {
  const agentCount = await db.agent.count({ where: { departmentId: id } });
  if (agentCount > 0)
    throw new Error(
      `Bu departmana bağlı ${agentCount} danışman var. Önce danışmanları başka departmana atayın.`
    );

  await db.agencyDepartment.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllAgencyDepartments(agencyId: string) {
  return db.agencyDepartment.findMany({
    where: { agencyId },
    include: { _count: { select: { agents: true } } },
    orderBy: { name: "asc" },
  });
}

// ==================== GET BY ID ====================
export async function getAgencyDepartmentById(id: string) {
  return db.agencyDepartment.findUnique({
    where: { id },
    include: {
      agents: {
        select: { id: true, firstName: true, lastName: true, designation: true, imageUrl: true, isActive: true },
      },
      _count: { select: { agents: true } },
    },
  });
}
