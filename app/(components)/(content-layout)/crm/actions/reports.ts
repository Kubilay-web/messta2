"use server";

import db from "@/app/lib/db";

const MONTHS_TR = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export type CrmReports = Awaited<ReturnType<typeof getCrmReports>>;

export async function getCrmReports(agencyId: string) {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [agents, leads, bySource, contracts, allLeads] = await Promise.all([
    db.agent.findMany({
      where: { agencyId, isActive: true },
      select: { id: true, firstName: true, lastName: true, imageUrl: true, commissionRate: true },
    }),
    // Son 6 ay trend için
    db.lead.findMany({
      where: { agencyId, createdAt: { gte: sixMonthsAgo } },
      select: { id: true, createdAt: true, wonAt: true, status: true, value: true },
    }),
    db.lead.groupBy({ by: ["source"], where: { agencyId }, _count: { _all: true } }),
    // Gerçekleşen komisyon (sözleşmelerden)
    db.propertyContract.findMany({
      where: { agencyId, status: { in: ["ACTIVE", "COMPLETED"] } },
      select: { agentId: true, commission: true, currency: true },
    }),
    // Genel toplamlar için
    db.lead.findMany({
      where: { agencyId },
      select: { status: true, value: true, createdAt: true, wonAt: true },
    }),
  ]);

  // ---- Aylık trend ----
  const buckets: { key: string; label: string; created: number; won: number; wonValue: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: MONTHS_TR[d.getMonth()],
      created: 0,
      won: 0,
      wonValue: 0,
    });
  }
  const idx = (d: Date) => buckets.findIndex((b) => b.key === `${d.getFullYear()}-${d.getMonth()}`);
  for (const l of leads) {
    const ci = idx(new Date(l.createdAt));
    if (ci >= 0) buckets[ci].created++;
    if (l.status === "WON" && l.wonAt) {
      const wi = idx(new Date(l.wonAt));
      if (wi >= 0) {
        buckets[wi].won++;
        buckets[wi].wonValue += l.value ?? 0;
      }
    }
  }

  // ---- Danışman performansı + komisyon ----
  const contractCommissionByAgent = new Map<string, number>();
  for (const c of contracts) {
    if (!c.agentId) continue;
    contractCommissionByAgent.set(
      c.agentId,
      (contractCommissionByAgent.get(c.agentId) ?? 0) + (c.commission ?? 0)
    );
  }

  const agentStats = await Promise.all(
    agents.map(async (a) => {
      const [assigned, won, openCount, wonAgg, openAgg] = await Promise.all([
        db.lead.count({ where: { agencyId, agentId: a.id } }),
        db.lead.count({ where: { agencyId, agentId: a.id, status: "WON" } }),
        db.lead.count({ where: { agencyId, agentId: a.id, status: "OPEN" } }),
        db.lead.aggregate({
          where: { agencyId, agentId: a.id, status: "WON" },
          _sum: { value: true },
        }),
        db.lead.aggregate({
          where: { agencyId, agentId: a.id, status: "OPEN" },
          _sum: { value: true },
        }),
      ]);
      const wonValue = wonAgg._sum.value ?? 0;
      const rate = a.commissionRate ?? 0;
      const estimatedCommission = (wonValue * rate) / 100;
      const actualCommission = contractCommissionByAgent.get(a.id) ?? 0;
      return {
        id: a.id,
        name: `${a.firstName} ${a.lastName}`,
        imageUrl: a.imageUrl,
        commissionRate: rate,
        assigned,
        won,
        openCount,
        wonValue,
        openValue: openAgg._sum.value ?? 0,
        estimatedCommission,
        actualCommission,
        winRate: assigned ? Math.round((won / assigned) * 100) : 0,
      };
    })
  );
  agentStats.sort((a, b) => b.wonValue - a.wonValue);

  // ---- Genel toplamlar ----
  const wonLeads = allLeads.filter((l) => l.status === "WON");
  const lostCount = allLeads.filter((l) => l.status === "LOST").length;
  const totalWonValue = wonLeads.reduce((acc, l) => acc + (l.value ?? 0), 0);
  const avgDealSize = wonLeads.length ? totalWonValue / wonLeads.length : 0;

  // Ortalama satış döngüsü (gün)
  const cycles = wonLeads
    .filter((l) => l.wonAt)
    .map((l) => (new Date(l.wonAt!).getTime() - new Date(l.createdAt).getTime()) / 86400000);
  const avgCycle = cycles.length
    ? Math.round(cycles.reduce((a, b) => a + b, 0) / cycles.length)
    : 0;

  const totalEstCommission = agentStats.reduce((acc, a) => acc + a.estimatedCommission, 0);
  const totalActualCommission = agentStats.reduce((acc, a) => acc + a.actualCommission, 0);

  return {
    totals: {
      totalWonValue,
      avgDealSize,
      avgCycle,
      wonCount: wonLeads.length,
      lostCount,
      conversionRate:
        wonLeads.length + lostCount
          ? Math.round((wonLeads.length / (wonLeads.length + lostCount)) * 100)
          : 0,
      totalEstCommission,
      totalActualCommission,
    },
    trend: buckets.map((b) => ({ label: b.label, created: b.created, won: b.won, wonValue: b.wonValue })),
    sources: bySource.map((s) => ({ source: s.source, count: s._count._all })),
    agentStats,
  };
}
