"use server";

import db from "@/app/lib/db";
import { getLeadScopeWhere } from "../lib/auth";

export type CrmDashboardData = Awaited<ReturnType<typeof getCrmDashboard>>;

export async function getCrmDashboard(agencyId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // AGENT ise yalnızca kendi kayıtları
  const scope = await getLeadScopeWhere();
  const base = { agencyId, ...scope };

  const [
    totalLeads,
    openLeads,
    wonLeads,
    lostLeads,
    wonThisMonth,
    openAgg,
    wonValueAgg,
    bySource,
    pipelines,
    stageCounts,
    agents,
    overdueTasks,
    openTasks,
  ] = await Promise.all([
    db.lead.count({ where: { ...base } }),
    db.lead.count({ where: { ...base, status: "OPEN" } }),
    db.lead.count({ where: { ...base, status: "WON" } }),
    db.lead.count({ where: { ...base, status: "LOST" } }),
    db.lead.count({ where: { ...base, status: "WON", wonAt: { gte: startOfMonth } } }),
    db.lead.aggregate({ where: { ...base, status: "OPEN" }, _sum: { value: true } }),
    db.lead.aggregate({
      where: { ...base, status: "WON", wonAt: { gte: startOfMonth } },
      _sum: { value: true },
    }),
    db.lead.groupBy({ by: ["source"], where: { ...base }, _count: { _all: true } }),
    db.crmPipeline.findMany({
      where: { agencyId },
      orderBy: { order: "asc" },
      include: { stages: { orderBy: { order: "asc" } } },
    }),
    db.lead.groupBy({ by: ["stageId"], where: { ...base }, _count: { _all: true } }),
    db.agent.findMany({
      where: { agencyId, isActive: true, ...(scope.agentId ? { id: scope.agentId } : {}) },
      select: { id: true, firstName: true, lastName: true, imageUrl: true },
    }),
    db.crmTask.count({
      where: { ...base, status: { in: ["TODO", "IN_PROGRESS"] }, dueDate: { lt: now } },
    }),
    db.crmTask.count({ where: { ...base, status: { in: ["TODO", "IN_PROGRESS"] } } }),
  ]);

  const stageCountMap = new Map(stageCounts.map((s) => [s.stageId, s._count._all]));

  // Funnel: varsayılan/ilk hattın aşama dağılımı (kapsama göre)
  const primary = pipelines.find((p) => p.isDefault) ?? pipelines[0];
  const funnel =
    primary?.stages
      .filter((s) => !s.isLost)
      .map((s) => ({ name: s.name, color: s.color, count: stageCountMap.get(s.id) ?? 0 })) ?? [];

  // Danışman performansı (kapsamlıysa yalnızca kendisi)
  const agentStats = await Promise.all(
    agents.map(async (a) => {
      const [assigned, won, wonValue] = await Promise.all([
        db.lead.count({ where: { agencyId, agentId: a.id } }),
        db.lead.count({ where: { agencyId, agentId: a.id, status: "WON" } }),
        db.lead.aggregate({
          where: { agencyId, agentId: a.id, status: "WON" },
          _sum: { value: true },
        }),
      ]);
      return {
        id: a.id,
        name: `${a.firstName} ${a.lastName}`,
        imageUrl: a.imageUrl,
        assigned,
        won,
        wonValue: wonValue._sum.value ?? 0,
        winRate: assigned ? Math.round((won / assigned) * 100) : 0,
      };
    })
  );
  agentStats.sort((a, b) => b.wonValue - a.wonValue);

  const closed = wonLeads + lostLeads;
  const conversionRate = closed ? Math.round((wonLeads / closed) * 100) : 0;

  return {
    kpi: {
      totalLeads,
      openLeads,
      wonLeads,
      lostLeads,
      wonThisMonth,
      openValue: openAgg._sum.value ?? 0,
      wonValueThisMonth: wonValueAgg._sum.value ?? 0,
      conversionRate,
      overdueTasks,
      openTasks,
    },
    funnel,
    sources: bySource.map((s) => ({ source: s.source, count: s._count._all })),
    agentStats: agentStats.slice(0, 8),
    pipelines: pipelines.map((p) => ({
      id: p.id,
      name: p.name,
      color: p.color,
      leadCount: p.stages.reduce((acc, s) => acc + (stageCountMap.get(s.id) ?? 0), 0),
    })),
  };
}

/** Son aktiviteler (gösterge paneli akışı) */
export async function getRecentActivities(agencyId: string, limit = 12) {
  const scope = await getLeadScopeWhere();
  return db.crmActivity.findMany({
    where: { agencyId, ...scope },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { lead: { select: { id: true, title: true, contactName: true } } },
  });
}
