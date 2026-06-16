"use server";

import db from "@/app/lib/db";

/** Danışman listesi + CRM performans özetleri */
export async function getCrmAgents(agencyId: string) {
  const agents = await db.agent.findMany({
    where: { agencyId },
    orderBy: { firstName: "asc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      imageUrl: true,
      designation: true,
      departmentName: true,
      commissionRate: true,
      isActive: true,
      _count: { select: { listings: true, contracts: true, visits: true } },
    },
  });

  const stats = await Promise.all(
    agents.map(async (a) => {
      const [assigned, open, won, openAgg, wonAgg, openTasks] = await Promise.all([
        db.lead.count({ where: { agencyId, agentId: a.id } }),
        db.lead.count({ where: { agencyId, agentId: a.id, status: "OPEN" } }),
        db.lead.count({ where: { agencyId, agentId: a.id, status: "WON" } }),
        db.lead.aggregate({ where: { agencyId, agentId: a.id, status: "OPEN" }, _sum: { value: true } }),
        db.lead.aggregate({ where: { agencyId, agentId: a.id, status: "WON" }, _sum: { value: true } }),
        db.crmTask.count({
          where: { agencyId, agentId: a.id, status: { in: ["TODO", "IN_PROGRESS"] } },
        }),
      ]);
      const wonValue = wonAgg._sum.value ?? 0;
      const rate = a.commissionRate ?? 0;
      return {
        ...a,
        name: `${a.firstName} ${a.lastName}`,
        assigned,
        open,
        won,
        openValue: openAgg._sum.value ?? 0,
        wonValue,
        estimatedCommission: (wonValue * rate) / 100,
        winRate: assigned ? Math.round((won / assigned) * 100) : 0,
        openTasks,
      };
    })
  );

  // Aktifler önce, sonra kazanılan ciroya göre
  stats.sort((a, b) => Number(b.isActive) - Number(a.isActive) || b.wonValue - a.wonValue);
  return stats;
}

/** Tek danışman detayı (yönetim görünümü) */
export async function getAgentDetail(agencyId: string, agentId: string) {
  const agent = await db.agent.findUnique({
    where: { id: agentId },
    include: {
      _count: { select: { listings: true, contracts: true, visits: true } },
    },
  });
  if (!agent || agent.agencyId !== agencyId) return null;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    assigned,
    open,
    won,
    lost,
    wonThisMonth,
    openAgg,
    wonAgg,
    wonMonthAgg,
    contractCommission,
    stageGroups,
    recentLeads,
    openTasksList,
    recentActivities,
  ] = await Promise.all([
    db.lead.count({ where: { agencyId, agentId } }),
    db.lead.count({ where: { agencyId, agentId, status: "OPEN" } }),
    db.lead.count({ where: { agencyId, agentId, status: "WON" } }),
    db.lead.count({ where: { agencyId, agentId, status: "LOST" } }),
    db.lead.count({ where: { agencyId, agentId, status: "WON", wonAt: { gte: startOfMonth } } }),
    db.lead.aggregate({ where: { agencyId, agentId, status: "OPEN" }, _sum: { value: true } }),
    db.lead.aggregate({ where: { agencyId, agentId, status: "WON" }, _sum: { value: true } }),
    db.lead.aggregate({
      where: { agencyId, agentId, status: "WON", wonAt: { gte: startOfMonth } },
      _sum: { value: true },
    }),
    db.propertyContract.aggregate({
      where: { agencyId, agentId, status: { in: ["ACTIVE", "COMPLETED"] } },
      _sum: { commission: true },
    }),
    db.lead.groupBy({
      by: ["stageId"],
      where: { agencyId, agentId, status: "OPEN" },
      _count: { _all: true },
      _sum: { value: true },
    }),
    db.lead.findMany({
      where: { agencyId, agentId },
      orderBy: { lastActivityAt: "desc" },
      take: 10,
      include: { stage: { select: { name: true, color: true } } },
    }),
    db.crmTask.findMany({
      where: { agencyId, agentId, status: { in: ["TODO", "IN_PROGRESS"] } },
      orderBy: { dueDate: "asc" },
      take: 10,
      include: { lead: { select: { id: true, title: true } } },
    }),
    db.crmActivity.findMany({
      where: { agencyId, agentId },
      orderBy: { createdAt: "desc" },
      take: 12,
      include: { lead: { select: { id: true, title: true, contactName: true } } },
    }),
  ]);

  // Aşama adlarını çöz
  const stageIds = stageGroups.map((g) => g.stageId);
  const stages = stageIds.length
    ? await db.crmStage.findMany({
        where: { id: { in: stageIds } },
        select: { id: true, name: true, color: true },
      })
    : [];
  const stageMap = new Map(stages.map((s) => [s.id, s]));
  const pipelineBreakdown = stageGroups
    .map((g) => ({
      name: stageMap.get(g.stageId)?.name ?? "—",
      color: stageMap.get(g.stageId)?.color ?? "#94a3b8",
      count: g._count._all,
      value: g._sum.value ?? 0,
    }))
    .sort((a, b) => b.count - a.count);

  const wonValue = wonAgg._sum.value ?? 0;
  const rate = agent.commissionRate ?? 0;

  return {
    agent: {
      id: agent.id,
      name: `${agent.firstName} ${agent.lastName}`,
      title: agent.title,
      email: agent.email,
      phone: agent.phone,
      whatsappNo: agent.whatsappNo,
      imageUrl: agent.imageUrl,
      designation: agent.designation,
      departmentName: agent.departmentName,
      employeeId: agent.employeeId,
      commissionRate: rate,
      experience: agent.experience,
      bio: agent.bio,
      isActive: agent.isActive,
      specializationCities: agent.specializationCities,
      specializationTypes: agent.specializationTypes,
      counts: agent._count,
    },
    kpi: {
      assigned,
      open,
      won,
      lost,
      wonThisMonth,
      openValue: openAgg._sum.value ?? 0,
      wonValue,
      wonValueThisMonth: wonMonthAgg._sum.value ?? 0,
      estimatedCommission: (wonValue * rate) / 100,
      actualCommission: contractCommission._sum.commission ?? 0,
      winRate: won + lost ? Math.round((won / (won + lost)) * 100) : 0,
    },
    pipelineBreakdown,
    recentLeads: recentLeads.map((l) => ({
      id: l.id,
      title: l.title,
      contactName: l.contactName,
      value: l.value,
      currency: l.currency,
      status: l.status,
      stageName: l.stage?.name ?? "—",
      stageColor: l.stage?.color ?? "#94a3b8",
      lastActivityAt: l.lastActivityAt.toISOString(),
    })),
    openTasks: openTasksList.map((t) => ({
      id: t.id,
      title: t.title,
      priority: t.priority,
      dueDate: t.dueDate ? t.dueDate.toISOString() : null,
      leadId: t.leadId,
      leadTitle: t.lead?.title ?? null,
    })),
    recentActivities: recentActivities.map((a) => ({
      id: a.id,
      type: a.type,
      title: a.title,
      leadId: a.leadId,
      leadTitle: a.lead?.title ?? null,
      contactName: a.lead?.contactName ?? null,
      createdAt: a.createdAt.toISOString(),
    })),
  };
}
