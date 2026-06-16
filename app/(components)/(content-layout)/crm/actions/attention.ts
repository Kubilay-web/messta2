"use server";

import db from "@/app/lib/db";
import { getScopedAgentId } from "../lib/auth";

export type CrmAttention = Awaited<ReturnType<typeof getCrmAttention>>;

export async function getCrmAttention(agencyId: string) {
  const scope = await getScopedAgentId();
  const leadScope = scope ? { agentId: scope } : {};
  const now = new Date();
  const in1 = new Date(); in1.setHours(23, 59, 59, 999);
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const staleDate = new Date(); staleDate.setDate(staleDate.getDate() - 14);

  const [openLeads, overdueTasks, todayTasks] = await Promise.all([
    // Açık fırsatlar (çürük + bayat hesaplaması için aşama bilgisiyle)
    db.lead.findMany({
      where: { agencyId, status: "OPEN", ...leadScope },
      select: {
        id: true, title: true, contactName: true, lastActivityAt: true,
        agentName: true, value: true, currency: true, score: true,
        stage: { select: { name: true, rottenDays: true, color: true } },
      },
      orderBy: { lastActivityAt: "asc" },
      take: 500,
    }),
    db.crmTask.findMany({
      where: {
        agencyId,
        status: { in: ["TODO", "IN_PROGRESS"] },
        dueDate: { lt: todayStart },
        ...leadScope,
      },
      orderBy: { dueDate: "asc" },
      take: 100,
      select: { id: true, title: true, dueDate: true, priority: true, agentName: true, leadId: true },
    }),
    db.crmTask.findMany({
      where: {
        agencyId,
        status: { in: ["TODO", "IN_PROGRESS"] },
        dueDate: { gte: todayStart, lte: in1 },
        ...leadScope,
      },
      orderBy: { dueDate: "asc" },
      take: 100,
      select: { id: true, title: true, dueDate: true, priority: true, agentName: true, leadId: true },
    }),
  ]);

  const daysSince = (d: Date | string) => Math.floor((now.getTime() - new Date(d).getTime()) / 86400000);

  // Çürük: aşamanın rottenDays'i tanımlı ve son aktivite o günden eski
  const rotten = openLeads
    .filter((l) => l.stage?.rottenDays != null && daysSince(l.lastActivityAt) >= (l.stage!.rottenDays as number))
    .map((l) => ({ ...l, idleDays: daysSince(l.lastActivityAt) }));

  // Bayat: rottenDays tanımsız ama 14 günden uzun aktivitesiz
  const rottenIds = new Set(rotten.map((r) => r.id));
  const stale = openLeads
    .filter((l) => !rottenIds.has(l.id) && (l.stage?.rottenDays == null) && new Date(l.lastActivityAt) < staleDate)
    .map((l) => ({ ...l, idleDays: daysSince(l.lastActivityAt) }));

  return {
    rotten,
    stale,
    overdueTasks,
    todayTasks,
    counts: {
      rotten: rotten.length,
      stale: stale.length,
      overdueTasks: overdueTasks.length,
      todayTasks: todayTasks.length,
    },
  };
}
