"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type CommissionProps = {
  contractId: string;
  agentId:    string;
  side:       "BUYER" | "SELLER" | "TENANT" | "LANDLORD";
  baseAmount: number;
  percentage?: number;
  amount:     number;
  currency?:  string;
  status:     "PENDING" | "INVOICED" | "PAID" | "PARTIAL" | "CANCELLED";
  paidAt?:    string;
  notes?:     string;
  agencyId:   string;
};

const PATH = "/estate/dashboard/finance/commission-records";

async function agentName(agentId: string) {
  const a = await db.agent.findUnique({ where: { id: agentId }, select: { firstName: true, lastName: true } });
  return a ? `${a.firstName} ${a.lastName}` : "—";
}

// ==================== CREATE ====================
export async function createCommission(data: CommissionProps) {
  await requirePermission("finance.manage");
  const commission = await db.commission.create({
    data: {
      contractId: data.contractId,
      agentId:    data.agentId,
      agentName:  await agentName(data.agentId),
      side:       data.side,
      baseAmount: Number(data.baseAmount),
      percentage: data.percentage === undefined || data.percentage === null ? null : Number(data.percentage),
      amount:     Number(data.amount),
      currency:   data.currency || "TRY",
      status:     data.status,
      paidAt:     data.paidAt ? new Date(data.paidAt) : (data.status === "PAID" ? new Date() : null),
      notes:      data.notes ?? null,
      agencyId:   data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "Commission", entityId: commission.id, summary: `Komisyon kaydı oluşturuldu (${commission.amount} ${commission.currency})` });
  revalidatePath(PATH);
  return commission;
}

// ==================== UPDATE ====================
export async function updateCommission(id: string, data: Partial<CommissionProps>) {
  await requirePermission("finance.manage");
  const commission = await db.commission.update({
    where: { id },
    data: {
      ...(data.contractId && { contractId: data.contractId }),
      ...(data.agentId && { agentId: data.agentId, agentName: await agentName(data.agentId) }),
      ...(data.side && { side: data.side }),
      ...(data.baseAmount !== undefined && { baseAmount: Number(data.baseAmount) }),
      ...(data.percentage !== undefined && { percentage: data.percentage === null ? null : Number(data.percentage) }),
      ...(data.amount !== undefined && { amount: Number(data.amount) }),
      ...(data.currency && { currency: data.currency }),
      ...(data.status && { status: data.status, paidAt: data.status === "PAID" ? (data.paidAt ? new Date(data.paidAt) : new Date()) : null }),
      ...(data.notes !== undefined && { notes: data.notes ?? null }),
    },
  });
  await recordAudit({ agencyId: commission.agencyId, action: data.status ? "STATUS_CHANGE" : "UPDATE", entity: "Commission", entityId: commission.id, summary: `Komisyon kaydı güncellendi` });
  revalidatePath(PATH);
  return commission;
}

// ==================== DELETE ====================
export async function deleteCommission(id: string) {
  await requirePermission("finance.manage");
  const existing = await db.commission.findUnique({ where: { id }, select: { agencyId: true } });
  await db.commission.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "Commission", entityId: id, summary: `Komisyon kaydı silindi` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllCommissionRecords(agencyId: string) {
  const commissions = await db.commission.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
  });

  const contractIds = [...new Set(commissions.map((c) => c.contractId).filter(Boolean))];
  const contracts = contractIds.length
    ? await db.propertyContract.findMany({ where: { id: { in: contractIds } }, select: { id: true, contractNo: true } })
    : [];
  const cm = Object.fromEntries(contracts.map((c) => [c.id, c]));

  return commissions.map((c) => ({ ...c, contract: cm[c.contractId] ?? null }));
}

// ==================== GET BY ID ====================
export async function getCommissionById(id: string) {
  return db.commission.findUnique({ where: { id } });
}
