"use server";

import db from "@/app/lib/db";

function tally<T extends string>(rows: { [k: string]: any }[], key: string): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rows) {
    const k = String(r[key] ?? "—");
    m[k] = (m[k] ?? 0) + 1;
  }
  return m;
}
function sum(rows: any[], key: string) {
  return rows.reduce((s, r) => s + (Number(r[key]) || 0), 0);
}

export type AdvancedAnalytics = Awaited<ReturnType<typeof getAdvancedAnalytics>>;

export type DateRange = { from?: string; to?: string };

function buildDateWhere(range?: DateRange) {
  if (!range || (!range.from && !range.to)) return {};
  const createdAt: any = {};
  if (range.from) createdAt.gte = new Date(range.from);
  if (range.to)   { const end = new Date(range.to); end.setHours(23, 59, 59, 999); createdAt.lte = end; }
  return { createdAt };
}

export async function getAdvancedAnalytics(agencyId: string, range?: DateRange) {
  if (!agencyId) {
    return {
      offers: { total: 0, byStatus: {}, accepted: 0, conversionRate: 0 },
      reservations: { total: 0, active: 0, byStatus: {}, depositTotal: 0 },
      commissions: { total: 0, paid: 0, pending: 0, byStatus: {} },
      invoices: { total: 0, billed: 0, collected: 0, byStatus: {} },
      expenses: { total: 0, byCategory: {} },
      payroll: { netTotal: 0, paid: 0, pending: 0 },
      maintenance: { total: 0, open: 0, byStatus: {} },
      communications: { total: 0, byChannel: {} },
    };
  }

  const dw = buildDateWhere(range);
  const where = { agencyId, ...dw };

  const [offers, reservations, commissions, invoices, expenses, payrolls, maintenance, comms] = await Promise.all([
    db.propertyOffer.findMany({ where, select: { status: true, amount: true } }),
    db.propertyReservation.findMany({ where, select: { status: true, depositAmount: true } }),
    db.commission.findMany({ where, select: { status: true, amount: true } }),
    db.agencyInvoice.findMany({ where, select: { status: true, total: true } }),
    db.agencyExpense.findMany({ where, select: { category: true, amount: true } }),
    db.agentPayroll.findMany({ where, select: { status: true, netPay: true } }),
    db.maintenanceRequest.findMany({ where, select: { status: true } }),
    db.communicationLog.findMany({ where, select: { channel: true } }),
  ]);

  const offerAccepted = offers.filter((o) => o.status === "ACCEPTED").length;

  // Gider kategori toplamları (adet değil tutar)
  const expByCategory: Record<string, number> = {};
  for (const e of expenses) {
    const k = String(e.category);
    expByCategory[k] = (expByCategory[k] ?? 0) + (Number(e.amount) || 0);
  }

  return {
    offers: {
      total: offers.length,
      byStatus: tally(offers, "status"),
      accepted: offerAccepted,
      conversionRate: offers.length ? Math.round((offerAccepted / offers.length) * 100) : 0,
    },
    reservations: {
      total: reservations.length,
      active: reservations.filter((r) => r.status === "ACTIVE").length,
      byStatus: tally(reservations, "status"),
      depositTotal: sum(reservations, "depositAmount"),
    },
    commissions: {
      total: sum(commissions, "amount"),
      paid: sum(commissions.filter((c) => c.status === "PAID"), "amount"),
      pending: sum(commissions.filter((c) => c.status === "PENDING"), "amount"),
      byStatus: tally(commissions, "status"),
    },
    invoices: {
      total: invoices.length,
      billed: sum(invoices, "total"),
      collected: sum(invoices.filter((i) => i.status === "PAID"), "total"),
      byStatus: tally(invoices, "status"),
    },
    expenses: {
      total: sum(expenses, "amount"),
      byCategory: expByCategory,
    },
    payroll: {
      netTotal: sum(payrolls, "netPay"),
      paid: sum(payrolls.filter((p) => p.status === "PAID"), "netPay"),
      pending: sum(payrolls.filter((p) => p.status === "PENDING"), "netPay"),
    },
    maintenance: {
      total: maintenance.length,
      open: maintenance.filter((m) => m.status === "OPEN" || m.status === "IN_PROGRESS").length,
      byStatus: tally(maintenance, "status"),
    },
    communications: {
      total: comms.length,
      byChannel: tally(comms, "channel"),
    },
  };
}
