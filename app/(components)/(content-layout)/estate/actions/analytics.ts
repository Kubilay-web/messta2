"use server";

import db from "@/app/lib/db";

export interface AgencyAnalytics {
  counts: {
    properties:       number;
    totalListings:    number;
    activeListings:   number;
    totalContracts:   number;
    activeContracts:  number;
    agents:           number;
    clients:          number;
    departments:      number;
    totalVisits:      number;
    scheduledVisits:  number;
  };
  revenue: {
    totalSaleValue:   number;
    totalRentalValue: number;
    totalCommission:  number;
    pendingPayments:  number;
    paidPayments:     number;
  };
  listingsByStatus:    { status: string; count: number }[];
  listingsByType:      { type:   string; count: number }[];
  contractsByType:     { type:   string; count: number }[];
  contractsByStatus:   { status: string; count: number }[];
  propertiesByType:    { type:   string; count: number }[];
  visitsByStatus:      { status: string; count: number }[];
  recentContracts: {
    id:           string;
    contractNo:   string;
    clientName:   string;
    contractType: string;
    status:       string;
    createdAt:    Date;
  }[];
  recentListings: {
    id:          string;
    title:       string;
    listingNo:   string;
    listingType: string;
    status:      string;
    askingPrice: number;
    currency:    string;
    createdAt:   Date;
  }[];
  recentVisits: {
    id:          string;
    scheduledAt: Date;
    status:      string;
    agentName:   string;
    clientName:  string;
  }[];
}

export async function getAgencyAnalytics(agencyId: string): Promise<AgencyAnalytics> {
  const [
    propCount,
    listingCount,
    activeListingCount,
    contractCount,
    activeContractCount,
    agentCount,
    clientCount,
    departmentCount,
    visitCount,
    scheduledVisitCount,
    saleAgg,
    rentalAgg,
    commissionAgg,
    pendingPayAgg,
    paidPayAgg,
    listingRows,
    contractRows,
    propertyTypes,
    visitStatuses,
    recentContracts,
    recentListings,
    recentVisits,
  ] = await Promise.all([
    db.propertyRealEstate.count({ where: { agencyId } }),
    db.listing.count({ where: { agencyId } }),
    db.listing.count({ where: { agencyId, status: "ACTIVE" } }),
    db.propertyContract.count({ where: { agencyId } }),
    db.propertyContract.count({ where: { agencyId, status: "ACTIVE" } }),
    db.agent.count({ where: { agencyId } }),
    db.propertyClient.count({ where: { agencyId } }),
    db.agencyDepartment.count({ where: { agencyId } }),
    db.propertyVisit.count({ where: { property: { agencyId } } }),
    db.propertyVisit.count({ where: { property: { agencyId }, status: "SCHEDULED" } }),

    db.propertyContract.aggregate({
      where: { agencyId, status: "COMPLETED", contractType: "SALE" },
      _sum: { salePrice: true },
    }),
    db.propertyContract.aggregate({
      where: { agencyId, status: "COMPLETED", contractType: "RENTAL" },
      _sum: { rentalPrice: true },
    }),
    db.propertyContract.aggregate({
      where: { agencyId, status: "COMPLETED" },
      _sum: { commission: true },
    }),
    db.contractPayment.aggregate({
      where: { contract: { agencyId }, status: "PENDING" },
      _sum: { amount: true },
    }),
    db.contractPayment.aggregate({
      where: { contract: { agencyId }, status: "PAID" },
      _sum: { amount: true },
    }),

    // Dağılımlar — groupBy yerine findMany + map (MongoDB uyumluluğu)
    db.listing.findMany({
      where: { agencyId },
      select: { status: true, listingType: true },
    }),
    db.propertyContract.findMany({
      where: { agencyId },
      select: { contractType: true, status: true },
    }),
    db.propertyRealEstate.findMany({
      where: { agencyId },
      select: { propertyType: true },
    }),
    db.propertyVisit.findMany({
      where: { property: { agencyId } },
      select: { status: true },
    }),

    db.propertyContract.findMany({
      where: { agencyId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, contractNo: true, clientName: true, contractType: true, status: true, createdAt: true },
    }),
    db.listing.findMany({
      where: { agencyId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, listingNo: true, listingType: true, status: true, askingPrice: true, currency: true, createdAt: true },
    }),
    db.propertyVisit.findMany({
      where: { property: { agencyId } },
      orderBy: { scheduledAt: "desc" },
      take: 5,
      select: { id: true, scheduledAt: true, status: true, agentId: true, clientId: true },
    }),
  ]);

  function toCounts<T extends string>(arr: T[]): { key: string; count: number }[] {
    const map: Record<string, number> = {};
    arr.forEach((v) => { map[v] = (map[v] ?? 0) + 1; });
    return Object.entries(map).map(([key, count]) => ({ key, count }));
  }

  const listingsByStatus  = toCounts(listingRows.map((l) => l.status));
  const listingsByType    = toCounts(listingRows.map((l) => l.listingType));
  const contractsByType   = toCounts(contractRows.map((c) => c.contractType));
  const contractsByStatus = toCounts(contractRows.map((c) => c.status));
  const propertiesByType  = toCounts(propertyTypes.map((p) => p.propertyType));
  const visitsByStatus    = toCounts(visitStatuses.map((v) => v.status));

  const agentIds  = [...new Set(recentVisits.map((v) => v.agentId).filter(Boolean))];
  const clientIds = [...new Set(recentVisits.map((v) => v.clientId).filter(Boolean))];

  const [visitAgents, visitClients] = await Promise.all([
    agentIds.length  ? db.agent.findMany({ where: { id: { in: agentIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
    clientIds.length ? db.propertyClient.findMany({ where: { id: { in: clientIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);

  const agentMap  = Object.fromEntries(visitAgents.map((a) => [a.id, `${a.firstName} ${a.lastName}`]));
  const clientMap = Object.fromEntries(visitClients.map((c) => [c.id, `${c.firstName} ${c.lastName}`]));

  return {
    counts: {
      properties:      propCount,
      totalListings:   listingCount,
      activeListings:  activeListingCount,
      totalContracts:  contractCount,
      activeContracts: activeContractCount,
      agents:          agentCount,
      clients:         clientCount,
      departments:     departmentCount,
      totalVisits:     visitCount,
      scheduledVisits: scheduledVisitCount,
    },
    revenue: {
      totalSaleValue:   saleAgg._sum.salePrice       ?? 0,
      totalRentalValue: rentalAgg._sum.rentalPrice    ?? 0,
      totalCommission:  commissionAgg._sum.commission ?? 0,
      pendingPayments:  pendingPayAgg._sum.amount     ?? 0,
      paidPayments:     paidPayAgg._sum.amount        ?? 0,
    },
    listingsByStatus:  listingsByStatus.map((s)  => ({ status: s.key, count: s.count })),
    listingsByType:    listingsByType.map((t)    => ({ type:   t.key, count: t.count })),
    contractsByType:   contractsByType.map((t)   => ({ type:   t.key, count: t.count })),
    contractsByStatus: contractsByStatus.map((s) => ({ status: s.key, count: s.count })),
    propertiesByType:  propertiesByType.map((t)  => ({ type:   t.key, count: t.count })),
    visitsByStatus:    visitsByStatus.map((s)    => ({ status: s.key, count: s.count })),
    recentContracts,
    recentListings,
    recentVisits: recentVisits.map((v) => ({
      id:          v.id,
      scheduledAt: v.scheduledAt,
      status:      v.status,
      agentName:   agentMap[v.agentId]   ?? "—",
      clientName:  clientMap[v.clientId] ?? "—",
    })),
  };
}
