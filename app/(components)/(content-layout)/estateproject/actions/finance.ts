"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { ProjectExpenseCategory, ProjectExpenseStatus } from "@prisma/client";
import { assertProjectAdmin } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

/* ============================ HARCAMALAR ============================ */

export async function createExpense(data: {
  agencyId: string;
  projectId: string;
  title: string;
  category?: ProjectExpenseCategory;
  status?: ProjectExpenseStatus;
  amount: number;
  currency?: string;
  date?: string | null;
  vendor?: string;
  notes?: string;
}) {
  await assertProjectAdmin(data.agencyId);
  const expense = await db.projectExpense.create({
    data: {
      agencyId: data.agencyId,
      projectId: data.projectId,
      title: data.title,
      category: data.category ?? "OTHER",
      status: data.status ?? "PLANNED",
      amount: data.amount,
      currency: data.currency ?? "TRY",
      date: data.date ? new Date(data.date) : null,
      vendor: data.vendor || null,
      notes: data.notes || null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return expense;
}

export async function updateExpense(
  id: string,
  data: {
    title?: string;
    category?: ProjectExpenseCategory;
    status?: ProjectExpenseStatus;
    amount?: number;
    date?: string | null;
    vendor?: string;
    notes?: string;
  }
) {
  const existing = await db.projectExpense.findUnique({ where: { id } });
  if (!existing) throw new Error("Harcama bulunamadı.");
  await assertProjectAdmin(existing.agencyId);
  const expense = await db.projectExpense.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.date !== undefined && { date: data.date ? new Date(data.date) : null }),
      ...(data.vendor !== undefined && { vendor: data.vendor || null }),
      ...(data.notes !== undefined && { notes: data.notes || null }),
    },
  });
  revalidate(existing.agencyId, existing.projectId);
  return expense;
}

export async function deleteExpense(id: string) {
  const existing = await db.projectExpense.findUnique({
    where: { id },
    select: { agencyId: true, projectId: true },
  });
  if (!existing) return;
  await assertProjectAdmin(existing.agencyId);
  await db.projectExpense.delete({ where: { id } });
  revalidate(existing.agencyId, existing.projectId);
}

export async function getExpenses(projectId: string) {
  return db.projectExpense.findMany({
    where: { projectId },
    orderBy: [{ date: "desc" }, { createdAt: "desc" }],
  });
}

export async function getExpenseSummary(projectId: string) {
  const [byCategory, paid, committed, planned, total] = await Promise.all([
    db.projectExpense.groupBy({ by: ["category"], where: { projectId }, _sum: { amount: true } }),
    db.projectExpense.aggregate({ where: { projectId, status: "PAID" }, _sum: { amount: true } }),
    db.projectExpense.aggregate({ where: { projectId, status: "COMMITTED" }, _sum: { amount: true } }),
    db.projectExpense.aggregate({ where: { projectId, status: "PLANNED" }, _sum: { amount: true } }),
    db.projectExpense.aggregate({ where: { projectId }, _sum: { amount: true } }),
  ]);
  return {
    byCategory: byCategory.map((c) => ({ category: c.category, amount: c._sum.amount ?? 0 })),
    paid: paid._sum.amount ?? 0,
    committed: committed._sum.amount ?? 0,
    planned: planned._sum.amount ?? 0,
    total: total._sum.amount ?? 0,
  };
}

/* ============================ MÜTEAHHİTLER ============================ */

export async function createContractor(data: {
  agencyId: string;
  projectId: string;
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  specialty?: string;
  taxNumber?: string;
  contractAmount?: number | null;
  notes?: string;
}) {
  await assertProjectAdmin(data.agencyId);
  const c = await db.projectContractor.create({
    data: {
      projectId: data.projectId,
      name: data.name,
      contactName: data.contactName || null,
      phone: data.phone || null,
      email: data.email || null,
      specialty: data.specialty || null,
      taxNumber: data.taxNumber || null,
      contractAmount: data.contractAmount ?? null,
      notes: data.notes || null,
    },
  });
  revalidate(data.agencyId, data.projectId);
  return c;
}

export async function updateContractor(
  id: string,
  agencyId: string,
  data: {
    name?: string;
    contactName?: string;
    phone?: string;
    email?: string;
    specialty?: string;
    taxNumber?: string;
    contractAmount?: number | null;
    notes?: string;
  }
) {
  await assertProjectAdmin(agencyId);
  const existing = await db.projectContractor.findUnique({ where: { id }, select: { projectId: true } });
  if (!existing) throw new Error("Müteahhit bulunamadı.");
  const c = await db.projectContractor.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.contactName !== undefined && { contactName: data.contactName || null }),
      ...(data.phone !== undefined && { phone: data.phone || null }),
      ...(data.email !== undefined && { email: data.email || null }),
      ...(data.specialty !== undefined && { specialty: data.specialty || null }),
      ...(data.taxNumber !== undefined && { taxNumber: data.taxNumber || null }),
      ...(data.contractAmount !== undefined && { contractAmount: data.contractAmount }),
      ...(data.notes !== undefined && { notes: data.notes || null }),
    },
  });
  revalidate(agencyId, existing.projectId);
  return c;
}

export async function deleteContractor(id: string, agencyId: string) {
  await assertProjectAdmin(agencyId);
  const c = await db.projectContractor.findUnique({ where: { id }, select: { projectId: true } });
  if (!c) return;
  await db.projectContractor.delete({ where: { id } });
  revalidate(agencyId, c.projectId);
}

export async function getContractors(projectId: string) {
  return db.projectContractor.findMany({ where: { projectId }, orderBy: { createdAt: "desc" } });
}
