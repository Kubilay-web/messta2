"use server";

import db from "@/app/lib/db";

export async function getRevenueOverview(agencyId: string, year: number) {
  const start = new Date(year, 0, 1);
  const end   = new Date(year, 11, 31, 23, 59, 59);

  // Tüm sözleşme ödemelerini çek
  const payments = await db.contractPayment.findMany({
    where:   { contract: { agencyId }, dueDate: { gte: start, lte: end } },
    orderBy: { dueDate: "desc" },
    select: {
      id: true, contractId: true, title: true, amount: true,
      dueDate: true, paidDate: true, status: true,
      paymentMethod: true, receiptNo: true,
    },
  });

  // Sözleşme detaylarını ayrı çek
  const contractIds = [...new Set(payments.map((p) => p.contractId))];
  const contracts   = contractIds.length
    ? await db.propertyContract.findMany({
        where:  { id: { in: contractIds } },
        select: { id: true, contractNo: true, clientName: true, agentName: true, currency: true, contractType: true },
      })
    : [];
  const cMap = Object.fromEntries(contracts.map((c) => [c.id, c]));

  const enriched = payments.map((p) => ({ ...p, contract: cMap[p.contractId] ?? null }));

  // KPI hesapları
  const paid      = enriched.filter((p) => p.status === "PAID");
  const pending   = enriched.filter((p) => p.status === "PENDING");
  const overdue   = pending.filter((p) => new Date(p.dueDate) < new Date());
  const partial   = enriched.filter((p) => p.status === "PARTIAL");

  const totalPaid    = paid.reduce((s, p) => s + p.amount, 0);
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);
  const totalOverdue = overdue.reduce((s, p) => s + p.amount, 0);
  const totalAll     = enriched.reduce((s, p) => s + p.amount, 0);

  // Aylık gelir (ödenen)
  const monthly = Array.from({ length: 12 }, (_, i) => {
    const monthPaid = paid.filter((p) => new Date(p.paidDate ?? p.dueDate).getMonth() === i);
    return {
      month: i,
      label: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"][i],
      amount: monthPaid.reduce((s, p) => s + p.amount, 0),
      count:  monthPaid.length,
    };
  });

  const currency = contracts[0]?.currency ?? "TRY";

  return {
    payments: enriched,
    kpi: {
      totalAll, totalPaid, totalPending, totalOverdue,
      countAll: enriched.length, countPaid: paid.length,
      countPending: pending.length, countOverdue: overdue.length,
      countPartial: partial.length, currency,
    },
    monthly,
  };
}
