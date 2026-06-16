"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type CommLogProps = {
  channel:     "CALL" | "EMAIL" | "SMS" | "WHATSAPP" | "MEETING" | "NOTE";
  direction:   "INBOUND" | "OUTBOUND";
  subject?:    string;
  content?:    string;
  occurredAt?: string;
  durationSec?: number;
  outcome?:    string;
  clientId?:   string;
  agentId?:    string;
  listingId?:  string;
  agencyId:    string;
};

const PATH = "/estate/dashboard/communication/logs";

function n(v: any) { return v === undefined || v === null || v === "" ? null : Number(v); }

// ==================== CREATE ====================
export async function createCommLog(data: CommLogProps) {
  await requirePermission("communications.manage");
  const log = await db.communicationLog.create({
    data: {
      channel:     data.channel,
      direction:   data.direction,
      subject:     data.subject ?? null,
      content:     data.content ?? null,
      occurredAt:  data.occurredAt ? new Date(data.occurredAt) : new Date(),
      durationSec: n(data.durationSec),
      outcome:     data.outcome ?? null,
      clientId:    data.clientId || null,
      agentId:     data.agentId || null,
      listingId:   data.listingId || null,
      agencyId:    data.agencyId,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "CommunicationLog", entityId: log.id, summary: `İletişim kaydı eklendi (${log.channel})` });
  revalidatePath(PATH);
  return log;
}

// ==================== UPDATE ====================
export async function updateCommLog(id: string, data: Partial<CommLogProps>) {
  await requirePermission("communications.manage");
  const log = await db.communicationLog.update({
    where: { id },
    data: {
      ...(data.channel && { channel: data.channel }),
      ...(data.direction && { direction: data.direction }),
      ...(data.subject  !== undefined && { subject: data.subject ?? null }),
      ...(data.content  !== undefined && { content: data.content ?? null }),
      ...(data.occurredAt && { occurredAt: new Date(data.occurredAt) }),
      ...(data.durationSec !== undefined && { durationSec: n(data.durationSec) }),
      ...(data.outcome  !== undefined && { outcome: data.outcome ?? null }),
      ...(data.clientId !== undefined && { clientId: data.clientId || null }),
      ...(data.agentId  !== undefined && { agentId: data.agentId || null }),
      ...(data.listingId !== undefined && { listingId: data.listingId || null }),
    },
  });
  await recordAudit({ agencyId: log.agencyId, action: "UPDATE", entity: "CommunicationLog", entityId: log.id, summary: `İletişim kaydı güncellendi (${log.channel})` });
  revalidatePath(PATH);
  return log;
}

// ==================== DELETE ====================
export async function deleteCommLog(id: string) {
  await requirePermission("communications.manage");
  const existing = await db.communicationLog.findUnique({ where: { id }, select: { agencyId: true, channel: true } });
  await db.communicationLog.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "CommunicationLog", entityId: id, summary: `İletişim kaydı silindi (${existing.channel})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllCommLogs(agencyId: string) {
  const logs = await db.communicationLog.findMany({
    where: { agencyId },
    orderBy: { occurredAt: "desc" },
  });

  const clientIds = [...new Set(logs.map((l) => l.clientId).filter(Boolean) as string[])];
  const agentIds  = [...new Set(logs.map((l) => l.agentId).filter(Boolean) as string[])];

  const [clients, agents] = await Promise.all([
    clientIds.length ? db.propertyClient.findMany({ where: { id: { in: clientIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
    agentIds.length  ? db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);
  const cm = Object.fromEntries(clients.map((c) => [c.id, c]));
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));

  return logs.map((l) => ({
    ...l,
    client: l.clientId ? cm[l.clientId] ?? null : null,
    agent:  l.agentId ? am[l.agentId] ?? null : null,
  }));
}

// ==================== GET BY ID ====================
export async function getCommLogById(id: string) {
  return db.communicationLog.findUnique({ where: { id } });
}
