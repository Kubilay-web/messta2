"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type MaintenanceProps = {
  title:       string;
  description?: string;
  priority:    "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status:      "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";
  cost?:       number;
  currency?:   string;
  vendor?:     string;
  scheduledAt?: string;
  resolvedAt?: string;
  resolution?: string;
  propertyId:  string;
  contractId?: string;
  clientId?:   string;
  agentId?:    string;
  agencyId:    string;
};

const PATH = "/estate/dashboard/maintenance";

function n(v: any) { return v === undefined || v === null || v === "" ? null : Number(v); }
function d(s?: string) { return s ? new Date(s) : null; }

async function generateRequestNo(agencyId: string): Promise<string> {
  const count = await db.maintenanceRequest.count({ where: { agencyId } });
  const year  = new Date().getFullYear();
  return `MNT-${year}-${String(count + 1).padStart(4, "0")}`;
}

// ==================== CREATE ====================
export async function createMaintenance(data: MaintenanceProps) {
  await requirePermission("maintenance.manage");
  const req = await db.maintenanceRequest.create({
    data: {
      requestNo:   await generateRequestNo(data.agencyId),
      title:       data.title,
      description: data.description ?? null,
      priority:    data.priority,
      status:      data.status,
      cost:        n(data.cost),
      currency:    data.currency || "TRY",
      vendor:      data.vendor ?? null,
      scheduledAt: d(data.scheduledAt),
      resolvedAt:  data.status === "RESOLVED" ? (d(data.resolvedAt) ?? new Date()) : d(data.resolvedAt),
      resolution:  data.resolution ?? null,
      propertyId:  data.propertyId,
      contractId:  data.contractId || null,
      clientId:    data.clientId || null,
      agentId:     data.agentId || null,
      agencyId:    data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "MaintenanceRequest", entityId: req.id, summary: `Yeni bakım talebi (${req.requestNo}): ${req.title}` });
  revalidatePath(PATH);
  return req;
}

// ==================== UPDATE ====================
export async function updateMaintenance(id: string, data: Partial<MaintenanceProps>) {
  await requirePermission("maintenance.manage");
  const req = await db.maintenanceRequest.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description !== undefined && { description: data.description ?? null }),
      ...(data.priority && { priority: data.priority }),
      ...(data.status && { status: data.status, resolvedAt: data.status === "RESOLVED" ? (d(data.resolvedAt) ?? new Date()) : (data.resolvedAt !== undefined ? d(data.resolvedAt) : undefined) }),
      ...(data.cost !== undefined && { cost: n(data.cost) }),
      ...(data.currency && { currency: data.currency }),
      ...(data.vendor      !== undefined && { vendor: data.vendor ?? null }),
      ...(data.scheduledAt !== undefined && { scheduledAt: d(data.scheduledAt) }),
      ...(data.resolution  !== undefined && { resolution: data.resolution ?? null }),
      ...(data.propertyId && { propertyId: data.propertyId }),
      ...(data.contractId !== undefined && { contractId: data.contractId || null }),
      ...(data.clientId   !== undefined && { clientId: data.clientId || null }),
      ...(data.agentId    !== undefined && { agentId: data.agentId || null }),
    },
  });
  await recordAudit({ agencyId: req.agencyId, action: data.status ? "STATUS_CHANGE" : "UPDATE", entity: "MaintenanceRequest", entityId: req.id, summary: `Bakım talebi güncellendi (${req.requestNo})` });
  revalidatePath(PATH);
  return req;
}

// ==================== DELETE ====================
export async function deleteMaintenance(id: string) {
  await requirePermission("maintenance.manage");
  const existing = await db.maintenanceRequest.findUnique({ where: { id }, select: { agencyId: true, requestNo: true } });
  await db.maintenanceRequest.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "MaintenanceRequest", entityId: id, summary: `Bakım talebi silindi (${existing.requestNo})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllMaintenance(agencyId: string) {
  const reqs = await db.maintenanceRequest.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
  });

  const propIds  = [...new Set(reqs.map((r) => r.propertyId).filter(Boolean))];
  const agentIds = [...new Set(reqs.map((r) => r.agentId).filter(Boolean) as string[])];

  const [props, agents] = await Promise.all([
    propIds.length  ? db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [],
    agentIds.length ? db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));

  return reqs.map((r) => ({ ...r, property: pm[r.propertyId] ?? null, agent: r.agentId ? am[r.agentId] ?? null : null }));
}

// ==================== GET BY ID ====================
export async function getMaintenanceById(id: string) {
  return db.maintenanceRequest.findUnique({ where: { id } });
}
