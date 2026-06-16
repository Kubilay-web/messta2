"use server";

import db from "@/app/lib/db";

// ==================== MÜŞTERİ PROFİLİ (özet) ====================
export async function getClientFromUserId(userId: string) {
  return db.propertyClient.findUnique({
    where:  { userId },
    select: {
      id: true, firstName: true, lastName: true,
      email: true, phone: true, agencyId: true, agencyName: true,
    },
  });
}

// ==================== MÜŞTERİ TAM PROFİL ====================
export async function getClientFullProfile(userId: string) {
  return db.propertyClient.findUnique({
    where: { userId },
    include: {
      _count: { select: { contracts: true, visits: true, interests: true } },
    },
  });
}

// ==================== MÜŞTERİ SÖZLEŞMELERİ ====================
export async function getClientContracts(clientId: string) {
  const contracts = await db.propertyContract.findMany({
    where:   { clientId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, contractNo: true, contractType: true, status: true,
      startDate: true, endDate: true, salePrice: true, rentalPrice: true,
      currency: true, agentName: true, propertyId: true,
    },
  });

  const propIds = [...new Set(contracts.map((c) => c.propertyId))];
  const props   = propIds.length
    ? await db.propertyRealEstate.findMany({
        where:  { id: { in: propIds } },
        select: { id: true, title: true, city: true, district: true },
      })
    : [];
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));

  return contracts.map((c) => ({ ...c, property: pm[c.propertyId] ?? null }));
}

// ==================== MÜŞTERİ ZİYARETLERİ ====================
export async function getClientVisits(clientId: string) {
  const visits = await db.propertyVisit.findMany({
    where:   { clientId },
    orderBy: { scheduledAt: "desc" },
    take:    20,
    select: {
      id: true, scheduledAt: true, completedAt: true,
      status: true, feedback: true, rating: true,
      agentId: true, propertyId: true,
    },
  });

  const propIds  = [...new Set(visits.map((v) => v.propertyId))];
  const agentIds = [...new Set(visits.map((v) => v.agentId))];

  const [props, agents] = await Promise.all([
    propIds.length  ? db.propertyRealEstate.findMany({ where: { id: { in: propIds  } }, select: { id: true, title: true, city: true } }) : [],
    agentIds.length ? db.agent.findMany(             { where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true, phone: true } }) : [],
  ]);

  const pm = Object.fromEntries(props.map((p)  => [p.id, p]));
  const am = Object.fromEntries(agents.map((a) => [a.id, a]));

  return visits.map((v) => ({
    ...v,
    property: pm[v.propertyId] ?? null,
    agent:    am[v.agentId]    ?? null,
  }));
}

// ==================== İLAN DETAYI (müşteri görünümü) ====================
export async function getListingDetailForClient(listingId: string, clientId: string) {
  const listing = await db.listing.findUnique({
    where: { id: listingId },
    select: {
      id: true, title: true, listingNo: true, listingType: true,
      status: true, askingPrice: true, currency: true, monthlyRent: true,
      deposit: true, isNegotiable: true, description: true, highlights: true,
      publishedAt: true, expiresAt: true, agentId: true, agentName: true,
      propertyId: true,
    },
  });
  if (!listing) return null;

  const [property, agent, myVisits, myContracts, myInterest] = await Promise.all([
    db.propertyRealEstate.findUnique({
      where:  { id: listing.propertyId },
      select: {
        id: true, title: true, city: true, district: true, neighborhood: true,
        address: true, propertyType: true, grossArea: true, netArea: true,
        roomCount: true, bathroomCount: true, floorNo: true, totalFloors: true,
        buildingAge: true, heatingType: true, hasElevator: true, hasParking: true,
        isFurnished: true, hasGarden: true, hasPool: true, hasBalcony: true,
        description: true,
        images: { select: { url: true, isCover: true, order: true }, orderBy: { order: "asc" } },
      },
    }),
    listing.agentId
      ? db.agent.findUnique({
          where:  { id: listing.agentId },
          select: { id: true, firstName: true, lastName: true, phone: true, email: true, imageUrl: true },
        }).catch(() => null)
      : null,
    db.propertyVisit.findMany({
      where:   { listingId, clientId },
      orderBy: { scheduledAt: "desc" },
      select:  { id: true, scheduledAt: true, status: true, rating: true, feedback: true },
    }),
    db.propertyContract.findMany({
      where:   { listingId, clientId },
      orderBy: { createdAt: "desc" },
      select:  { id: true, contractNo: true, status: true, contractType: true, startDate: true },
    }),
    db.clientInterest.findFirst({
      where:  { listingId, clientId },
      select: { id: true, priority: true, notes: true },
    }),
  ]);

  return { listing, property, agent, myVisits, myContracts, myInterest };
}

// ==================== MÜŞTERİ SÖZLEŞME ÖDEMELERİ ====================
export async function getClientPayments(clientId: string) {
  const contracts = await db.propertyContract.findMany({
    where:  { clientId },
    select: { id: true, contractNo: true, currency: true, contractType: true },
  });

  if (!contracts.length) return [];

  const contractIds = contracts.map((c) => c.id);
  const cMap = Object.fromEntries(contracts.map((c) => [c.id, c]));

  const payments = await db.contractPayment.findMany({
    where:   { contractId: { in: contractIds } },
    orderBy: { dueDate: "asc" },
    select: {
      id: true, contractId: true, title: true, amount: true,
      dueDate: true, paidDate: true, status: true,
      paymentMethod: true, receiptNo: true, notes: true,
    },
  });

  return payments.map((p) => ({ ...p, contract: cMap[p.contractId] ?? null }));
}

// ==================== AJANS HATIRLATICI / MESAJLARI ====================
export async function getClientMessages(agencyId: string) {
  return db.agencyReminder.findMany({
    where:   { agencyId, recipient: { in: ["Clients", "All"] as any[] } },
    orderBy: { createdAt: "desc" },
    take:    50,
    select: {
      id: true, subject: true, message: true,
      from: true, recipient: true, createdAt: true,
    },
  });
}

// ==================== MÜŞTERİ TEKLİFLERİ ====================
export async function getClientOffers(clientId: string) {
  const offers = await db.propertyOffer.findMany({
    where:   { clientId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, offerNo: true, offerType: true, status: true,
      amount: true, counterAmount: true, currency: true,
      validUntil: true, createdAt: true, listingId: true, propertyId: true,
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

// ==================== MÜŞTERİ REZERVASYONLARI ====================
export async function getClientReservations(clientId: string) {
  const reservations = await db.propertyReservation.findMany({
    where:   { clientId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, reservationNo: true, status: true, depositAmount: true,
      currency: true, reservedUntil: true, propertyId: true,
    },
  });
  if (!reservations.length) return [];

  const propIds = [...new Set(reservations.map((r) => r.propertyId).filter(Boolean))];
  const props = propIds.length ? await db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [];
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  return reservations.map((r) => ({ ...r, property: pm[r.propertyId] ?? null }));
}
