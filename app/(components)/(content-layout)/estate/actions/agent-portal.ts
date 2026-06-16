"use server";

import db from "@/app/lib/db";

// ==================== DANIŞMAN PROFİL (özet) ====================
export async function getAgentFromUserId(userId: string) {
  return db.agent.findUnique({
    where:  { userId },
    select: {
      id: true, firstName: true, lastName: true,
      email: true, phone: true, employeeId: true,
      designation: true, departmentName: true,
      commissionRate: true, isActive: true,
      agencyId: true, agencyName: true,
    },
  });
}

// ==================== DANIŞMAN TAM PROFİL ====================
export async function getAgentFullProfile(userId: string) {
  return db.agent.findUnique({
    where: { userId },
    include: {
      _count: { select: { listings: true, contracts: true, visits: true } },
    },
  });
}

// ==================== DANIŞMAN ZİYARETLERİ ====================
export async function getAgentVisits(agentId: string) {
  const visits = await db.propertyVisit.findMany({
    where:   { agentId },
    orderBy: { scheduledAt: "desc" },
    take:    30,
    select: {
      id: true, scheduledAt: true, completedAt: true,
      status: true, notes: true, feedback: true, rating: true,
      propertyId: true, clientId: true,
    },
  });

  if (!visits.length) return [];

  const propIds   = [...new Set(visits.map((v) => v.propertyId))];
  const clientIds = [...new Set(visits.map((v) => v.clientId))];

  const [props, clients] = await Promise.all([
    db.propertyRealEstate.findMany({
      where:  { id: { in: propIds } },
      select: { id: true, title: true, city: true, district: true, propertyType: true },
    }),
    db.propertyClient.findMany({
      where:  { id: { in: clientIds } },
      select: { id: true, firstName: true, lastName: true, phone: true },
    }),
  ]);

  const pm = Object.fromEntries(props.map((p)   => [p.id, p]));
  const cm = Object.fromEntries(clients.map((c) => [c.id, c]));

  return visits.map((v) => ({
    ...v,
    property: pm[v.propertyId] ?? null,
    client:   cm[v.clientId]   ?? null,
  }));
}

// ==================== DANIŞMAN İLANLARI ====================
export async function getAgentListings(agentId: string) {
  const listings = await db.listing.findMany({
    where:   { agentId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, listingNo: true, listingType: true,
      status: true, askingPrice: true, currency: true,
      monthlyRent: true, views: true, publishedAt: true,
      propertyId: true,
    },
  });

  if (!listings.length) return [];

  const propIds = [...new Set(listings.map((l) => l.propertyId))];
  const props   = await db.propertyRealEstate.findMany({
    where:  { id: { in: propIds } },
    select: { id: true, title: true, city: true, district: true, propertyType: true },
  });
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));

  return listings.map((l) => ({ ...l, property: pm[l.propertyId] ?? null }));
}

// ==================== DANIŞMAN SÖZLEŞMELERİ ====================
export async function getAgentContracts(agentId: string) {
  const contracts = await db.propertyContract.findMany({
    where:   { agentId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, contractNo: true, contractType: true, status: true,
      startDate: true, endDate: true, salePrice: true,
      rentalPrice: true, commission: true, currency: true,
      clientName: true, propertyId: true,
    },
  });

  if (!contracts.length) return [];

  const propIds = [...new Set(contracts.map((c) => c.propertyId))];
  const props   = await db.propertyRealEstate.findMany({
    where:  { id: { in: propIds } },
    select: { id: true, title: true, city: true },
  });
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));

  return contracts.map((c) => ({ ...c, property: pm[c.propertyId] ?? null }));
}

// ==================== DANIŞMAN DEVAM DURUMU (son 30 gün) ====================
export async function getAgentAttendanceSelf(agentId: string) {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  return db.agentAttendance.findMany({
    where:   { agentId, date: { gte: since } },
    orderBy: { date: "desc" },
    select:  { id: true, date: true, status: true, checkIn: true, checkOut: true, note: true },
  });
}

// ==================== DANIŞMAN MÜŞTERİLERİ ====================
// Danışmanın müşterileri: ziyaret + sözleşme kayıtlarından türetilir
export async function getAgentClients(agentId: string) {
  const [visits, contracts] = await Promise.all([
    db.propertyVisit.findMany({
      where:  { agentId },
      select: { clientId: true, scheduledAt: true },
    }),
    db.propertyContract.findMany({
      where:  { agentId },
      select: { clientId: true, createdAt: true },
    }),
  ]);

  const stats = new Map<string, { visits: number; contracts: number; last: Date | null }>();
  const bump = (id: string | null | undefined, kind: "visits" | "contracts", date: Date | null) => {
    if (!id) return;
    const s = stats.get(id) ?? { visits: 0, contracts: 0, last: null };
    s[kind] += 1;
    if (date && (!s.last || date > s.last)) s.last = date;
    stats.set(id, s);
  };
  visits.forEach((v) => bump(v.clientId, "visits", v.scheduledAt));
  contracts.forEach((c) => bump(c.clientId, "contracts", c.createdAt));

  const ids = [...stats.keys()];
  if (!ids.length) return [];

  const clients = await db.propertyClient.findMany({
    where:  { id: { in: ids } },
    select: {
      id: true, firstName: true, lastName: true, email: true, phone: true,
      isBuyer: true, isSeller: true, isTenant: true, isLandlord: true,
      preferredCities: true, minBudget: true, maxBudget: true, currency: true,
      _count: { select: { interests: true } },
    },
  });

  return clients
    .map((c) => ({ ...c, ...(stats.get(c.id) ?? { visits: 0, contracts: 0, last: null }) }))
    .sort((a, b) => (b.last?.getTime() ?? 0) - (a.last?.getTime() ?? 0));
}

// ==================== AJANS MESAJLARI (danışmana) ====================
export async function getAgentMessages(agencyId: string) {
  return db.agencyReminder.findMany({
    where:   { agencyId, recipient: { in: ["Agents", "All"] as any[] } },
    orderBy: { createdAt: "desc" },
    take:    50,
    select: {
      id: true, subject: true, message: true,
      from: true, recipient: true, createdAt: true,
    },
  });
}

// ==================== DANIŞMAN TEKLİFLERİ ====================
export async function getAgentOffers(agentId: string) {
  const offers = await db.propertyOffer.findMany({
    where:   { agentId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, offerNo: true, offerType: true, status: true,
      amount: true, counterAmount: true, currency: true,
      clientName: true, createdAt: true, listingId: true, propertyId: true,
    },
  });
  if (!offers.length) return [];

  const listingIds = [...new Set(offers.map((o) => o.listingId).filter(Boolean))];
  const propIds    = [...new Set(offers.map((o) => o.propertyId).filter(Boolean))];
  const [listings, props] = await Promise.all([
    listingIds.length ? db.listing.findMany({ where: { id: { in: listingIds } }, select: { id: true, title: true, listingNo: true } }) : [],
    propIds.length    ? db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [],
  ]);
  const lm = Object.fromEntries(listings.map((l) => [l.id, l]));
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  return offers.map((o) => ({ ...o, listing: lm[o.listingId] ?? null, property: pm[o.propertyId] ?? null }));
}

// ==================== DANIŞMAN REZERVASYONLARI ====================
export async function getAgentReservations(agentId: string) {
  const reservations = await db.propertyReservation.findMany({
    where:   { agentId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, reservationNo: true, status: true, depositAmount: true,
      currency: true, reservedUntil: true, clientName: true, propertyId: true,
    },
  });
  if (!reservations.length) return [];

  const propIds = [...new Set(reservations.map((r) => r.propertyId).filter(Boolean))];
  const props = propIds.length ? await db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [];
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  return reservations.map((r) => ({ ...r, property: pm[r.propertyId] ?? null }));
}

// ==================== DANIŞMAN BAKIM TALEPLERİ ====================
export async function getAgentMaintenance(agentId: string) {
  const reqs = await db.maintenanceRequest.findMany({
    where:   { agentId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, requestNo: true, title: true, priority: true, status: true,
      cost: true, currency: true, vendor: true, createdAt: true, propertyId: true,
    },
  });
  if (!reqs.length) return [];

  const propIds = [...new Set(reqs.map((r) => r.propertyId).filter(Boolean))];
  const props = propIds.length ? await db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [];
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  return reqs.map((r) => ({ ...r, property: pm[r.propertyId] ?? null }));
}
