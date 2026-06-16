"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type PayrollProps = {
  agentId:     string;
  periodMonth: number;
  periodYear:  number;
  baseSalary?: number;
  commission?: number;
  bonus?:      number;
  deductions?: number;
  currency?:   string;
  status:      "PENDING" | "PAID" | "CANCELLED";
  paidAt?:     string;
  notes?:      string;
  agencyId:    string;
};

const PATH = "/estate/dashboard/finance/payroll";

function num(v: any) { return v === undefined || v === null || v === "" ? 0 : Number(v); }
function net(d: Partial<PayrollProps>) {
  return num(d.baseSalary) + num(d.commission) + num(d.bonus) - num(d.deductions);
}

// ==================== CREATE ====================
export async function createPayroll(data: PayrollProps) {
  await requirePermission("finance.manage");
  const payroll = await db.agentPayroll.create({
    data: {
      agentId:     data.agentId,
      periodMonth: Number(data.periodMonth),
      periodYear:  Number(data.periodYear),
      baseSalary:  num(data.baseSalary),
      commission:  num(data.commission),
      bonus:       num(data.bonus),
      deductions:  num(data.deductions),
      netPay:      net(data),
      currency:    data.currency || "TRY",
      status:      data.status,
      paidAt:      data.paidAt ? new Date(data.paidAt) : (data.status === "PAID" ? new Date() : null),
      notes:       data.notes ?? null,
      agencyId:    data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "AgentPayroll", entityId: payroll.id, summary: `Yeni bordro oluşturuldu (${payroll.periodMonth}/${payroll.periodYear})` });
  revalidatePath(PATH);
  return payroll;
}

// ==================== UPDATE ====================
export async function updatePayroll(id: string, data: Partial<PayrollProps>) {
  await requirePermission("finance.manage");
  const current = await db.agentPayroll.findUnique({ where: { id } });
  if (!current) throw new Error("Bordro bulunamadı.");

  const merged = {
    baseSalary: data.baseSalary ?? current.baseSalary,
    commission: data.commission ?? current.commission,
    bonus:      data.bonus      ?? current.bonus,
    deductions: data.deductions ?? current.deductions,
  };

  const payroll = await db.agentPayroll.update({
    where: { id },
    data: {
      ...(data.agentId && { agentId: data.agentId }),
      ...(data.periodMonth !== undefined && { periodMonth: Number(data.periodMonth) }),
      ...(data.periodYear  !== undefined && { periodYear: Number(data.periodYear) }),
      baseSalary: num(merged.baseSalary),
      commission: num(merged.commission),
      bonus:      num(merged.bonus),
      deductions: num(merged.deductions),
      netPay:     net(merged),
      ...(data.currency && { currency: data.currency }),
      ...(data.status && { status: data.status, paidAt: data.status === "PAID" ? (data.paidAt ? new Date(data.paidAt) : new Date()) : null }),
      ...(data.notes !== undefined && { notes: data.notes ?? null }),
    },
  });
  await recordAudit({ agencyId: payroll.agencyId, action: data.status ? "STATUS_CHANGE" : "UPDATE", entity: "AgentPayroll", entityId: payroll.id, summary: `Bordro güncellendi (${payroll.periodMonth}/${payroll.periodYear})` });
  revalidatePath(PATH);
  return payroll;
}

// ==================== DELETE ====================
export async function deletePayroll(id: string) {
  await requirePermission("finance.manage");
  const existing = await db.agentPayroll.findUnique({ where: { id }, select: { agencyId: true, periodMonth: true, periodYear: true } });
  await db.agentPayroll.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "AgentPayroll", entityId: id, summary: `Bordro silindi (${existing.periodMonth}/${existing.periodYear})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllPayrolls(agencyId: string) {
  const payrolls = await db.agentPayroll.findMany({
    where: { agencyId },
    orderBy: [{ periodYear: "desc" }, { periodMonth: "desc" }],
  });

  const agentIds = [...new Set(payrolls.map((p) => p.agentId).filter(Boolean))];
  const agents = agentIds.length
    ? await db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } })
    : [];
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));

  return payrolls.map((p) => ({ ...p, agent: am[p.agentId] ?? null }));
}

// ==================== GET BY ID ====================
export async function getPayrollById(id: string) {
  return db.agentPayroll.findUnique({ where: { id } });
}
