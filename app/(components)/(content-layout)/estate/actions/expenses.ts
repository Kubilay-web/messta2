"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type ExpenseProps = {
  category:      "RENT" | "SALARY" | "MARKETING" | "UTILITIES" | "COMMISSION" | "MAINTENANCE" | "TAX" | "OTHER";
  title:         string;
  amount:        number;
  currency?:     string;
  date?:         string;
  paymentMethod?: string;
  receiptUrl?:   string;
  vendor?:       string;
  notes?:        string;
  agentId?:      string;
  agencyId:      string;
};

const PATH = "/estate/dashboard/finance/expenses";

function d(s?: string) { return s ? new Date(s) : null; }

// ==================== CREATE ====================
export async function createExpense(data: ExpenseProps) {
  await requirePermission("finance.manage");
  const expense = await db.agencyExpense.create({
    data: {
      category:      data.category,
      title:         data.title,
      amount:        Number(data.amount),
      currency:      data.currency || "TRY",
      date:          d(data.date) ?? new Date(),
      paymentMethod: data.paymentMethod ?? null,
      receiptUrl:    data.receiptUrl ?? null,
      vendor:        data.vendor ?? null,
      notes:         data.notes ?? null,
      agentId:       data.agentId || null,
      agencyId:      data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "AgencyExpense", entityId: expense.id, summary: `Yeni gider eklendi: ${expense.title}` });
  revalidatePath(PATH);
  return expense;
}

// ==================== UPDATE ====================
export async function updateExpense(id: string, data: Partial<ExpenseProps>) {
  await requirePermission("finance.manage");
  const expense = await db.agencyExpense.update({
    where: { id },
    data: {
      ...(data.category && { category: data.category }),
      ...(data.title    && { title: data.title }),
      ...(data.amount !== undefined && { amount: Number(data.amount) }),
      ...(data.currency && { currency: data.currency }),
      ...(data.date && { date: new Date(data.date) }),
      ...(data.paymentMethod !== undefined && { paymentMethod: data.paymentMethod ?? null }),
      ...(data.receiptUrl    !== undefined && { receiptUrl: data.receiptUrl ?? null }),
      ...(data.vendor        !== undefined && { vendor: data.vendor ?? null }),
      ...(data.notes         !== undefined && { notes: data.notes ?? null }),
      ...(data.agentId       !== undefined && { agentId: data.agentId || null }),
    },
  });
  await recordAudit({ agencyId: expense.agencyId, action: "UPDATE", entity: "AgencyExpense", entityId: expense.id, summary: `Gider güncellendi: ${expense.title}` });
  revalidatePath(PATH);
  return expense;
}

// ==================== DELETE ====================
export async function deleteExpense(id: string) {
  await requirePermission("finance.manage");
  const existing = await db.agencyExpense.findUnique({ where: { id }, select: { agencyId: true, title: true } });
  await db.agencyExpense.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "AgencyExpense", entityId: id, summary: `Gider silindi: ${existing.title}` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllExpenses(agencyId: string) {
  const expenses = await db.agencyExpense.findMany({
    where: { agencyId },
    orderBy: { date: "desc" },
  });

  const agentIds = [...new Set(expenses.map((e) => e.agentId).filter(Boolean) as string[])];
  const agents = agentIds.length
    ? await db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } })
    : [];
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));

  return expenses.map((e) => ({ ...e, agent: e.agentId ? am[e.agentId] ?? null : null }));
}

// ==================== GET BY ID ====================
export async function getExpenseById(id: string) {
  return db.agencyExpense.findUnique({ where: { id } });
}
