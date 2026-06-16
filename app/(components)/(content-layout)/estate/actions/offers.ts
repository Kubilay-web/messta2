"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type OfferProps = {
  offerType:    "SALE" | "RENT" | "SHORT_RENT";
  status:       "PENDING" | "COUNTERED" | "ACCEPTED" | "REJECTED" | "WITHDRAWN" | "EXPIRED";
  amount:       number;
  currency?:    string;
  counterAmount?: number;
  depositOffer?:  number;
  message?:     string;
  validUntil?:  string;
  rejectReason?: string;
  listingId:    string;
  clientId:     string;
  agentId?:     string;
  agencyId:     string;
};

const PATH = "/estate/dashboard/offers";

function n(v: any) { return v === undefined || v === null || v === "" ? null : Number(v); }
function d(s?: string) { return s ? new Date(s) : null; }

async function generateOfferNo(agencyId: string): Promise<string> {
  const count = await db.propertyOffer.count({ where: { agencyId } });
  const year  = new Date().getFullYear();
  return `OFR-${year}-${String(count + 1).padStart(4, "0")}`;
}

// Seçilen ilan / müşteri / danışmandan snapshot alanlarını çözer
async function resolveRefs(data: { listingId: string; clientId: string; agentId?: string }) {
  const [listing, client, agent] = await Promise.all([
    db.listing.findUnique({ where: { id: data.listingId }, select: { propertyId: true } }),
    db.propertyClient.findUnique({ where: { id: data.clientId }, select: { firstName: true, lastName: true } }),
    data.agentId ? db.agent.findUnique({ where: { id: data.agentId }, select: { firstName: true, lastName: true } }) : null,
  ]);
  return {
    propertyId: listing?.propertyId ?? null,
    clientName: client ? `${client.firstName} ${client.lastName}` : "—",
    agentName:  agent  ? `${agent.firstName} ${agent.lastName}` : null,
  };
}

// ==================== CREATE ====================
export async function createOffer(data: OfferProps) {
  await requirePermission("offers.manage");
  const refs = await resolveRefs(data);
  if (!refs.propertyId) throw new Error("Seçilen ilana ait mülk bulunamadı.");

  const offer = await db.propertyOffer.create({
    data: {
      offerNo:       await generateOfferNo(data.agencyId),
      offerType:     data.offerType,
      status:        data.status,
      amount:        Number(data.amount),
      currency:      data.currency || "TRY",
      counterAmount: n(data.counterAmount),
      depositOffer:  n(data.depositOffer),
      message:       data.message ?? null,
      validUntil:    d(data.validUntil),
      rejectReason:  data.rejectReason ?? null,
      listingId:     data.listingId,
      propertyId:    refs.propertyId,
      clientId:      data.clientId,
      clientName:    refs.clientName,
      agentId:       data.agentId || null,
      agentName:     refs.agentName,
      agencyId:      data.agencyId,
      acceptedAt:    data.status === "ACCEPTED" ? new Date() : null,
      rejectedAt:    data.status === "REJECTED" ? new Date() : null,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "PropertyOffer", entityId: offer.id, summary: `Yeni teklif oluşturuldu (${offer.offerNo})` });
  revalidatePath(PATH);
  return offer;
}

// ==================== UPDATE ====================
export async function updateOffer(id: string, data: Partial<OfferProps>) {
  await requirePermission("offers.manage");
  let extra: any = {};
  if (data.listingId || data.clientId || data.agentId !== undefined) {
    const current = await db.propertyOffer.findUnique({ where: { id }, select: { listingId: true, clientId: true, agentId: true } });
    const refs = await resolveRefs({
      listingId: data.listingId ?? current!.listingId,
      clientId:  data.clientId  ?? current!.clientId,
      agentId:   data.agentId !== undefined ? (data.agentId || undefined) : (current!.agentId || undefined),
    });
    extra = { propertyId: refs.propertyId, clientName: refs.clientName, agentName: refs.agentName };
  }

  const offer = await db.propertyOffer.update({
    where: { id },
    data: {
      ...(data.offerType && { offerType: data.offerType }),
      ...(data.status    && { status: data.status, acceptedAt: data.status === "ACCEPTED" ? new Date() : undefined, rejectedAt: data.status === "REJECTED" ? new Date() : undefined }),
      ...(data.amount !== undefined && { amount: Number(data.amount) }),
      ...(data.currency && { currency: data.currency }),
      ...(data.counterAmount !== undefined && { counterAmount: n(data.counterAmount) }),
      ...(data.depositOffer  !== undefined && { depositOffer:  n(data.depositOffer) }),
      ...(data.message      !== undefined && { message: data.message ?? null }),
      ...(data.validUntil   !== undefined && { validUntil: d(data.validUntil) }),
      ...(data.rejectReason !== undefined && { rejectReason: data.rejectReason ?? null }),
      ...(data.listingId && { listingId: data.listingId }),
      ...(data.clientId  && { clientId: data.clientId }),
      ...(data.agentId !== undefined && { agentId: data.agentId || null }),
      ...extra,
    },
  });
  await recordAudit({ agencyId: offer.agencyId, action: data.status ? "STATUS_CHANGE" : "UPDATE", entity: "PropertyOffer", entityId: offer.id, summary: `Teklif güncellendi (${offer.offerNo})` });
  revalidatePath(PATH);
  return offer;
}

// ==================== DELETE ====================
export async function deleteOffer(id: string) {
  await requirePermission("offers.manage");
  const existing = await db.propertyOffer.findUnique({ where: { id }, select: { agencyId: true, offerNo: true } });
  await db.propertyOffer.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "PropertyOffer", entityId: id, summary: `Teklif silindi (${existing.offerNo})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== DÖNÜŞÜM: Teklif → Rezervasyon ====================
export async function convertOfferToReservation(offerId: string) {
  await requirePermission("reservations.manage");
  const offer = await db.propertyOffer.findUnique({ where: { id: offerId } });
  if (!offer) throw new Error("Teklif bulunamadı.");

  const already = await db.propertyReservation.findFirst({ where: { offerId } });
  if (already) throw new Error("Bu teklif zaten bir rezervasyona dönüştürülmüş.");

  const count = await db.propertyReservation.count({ where: { agencyId: offer.agencyId } });
  const reservationNo = `RSV-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  const until = new Date();
  until.setDate(until.getDate() + 7);

  const reservation = await db.propertyReservation.create({
    data: {
      reservationNo,
      status:        "ACTIVE",
      depositAmount: offer.depositOffer ?? 0,
      currency:      offer.currency,
      reservedUntil: until,
      notes:         `OFR ${offer.offerNo} teklifinden otomatik oluşturuldu.`,
      offerId:       offer.id,
      listingId:     offer.listingId,
      propertyId:    offer.propertyId,
      clientId:      offer.clientId,
      clientName:    offer.clientName,
      agentId:       offer.agentId,
      agencyId:      offer.agencyId,
    },
  });

  await db.propertyOffer.update({ where: { id: offerId }, data: { status: "ACCEPTED", acceptedAt: new Date() } });
  await recordAudit({ agencyId: offer.agencyId, action: "STATUS_CHANGE", entity: "PropertyOffer", entityId: offer.id, summary: `Teklif (${offer.offerNo}) rezervasyona dönüştürüldü (${reservationNo})` });

  revalidatePath(PATH);
  revalidatePath("/estate/dashboard/reservations");
  return reservation;
}

// ==================== GET ALL ====================
export async function getAllOffers(agencyId: string) {
  const offers = await db.propertyOffer.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
  });

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

// ==================== GET BY ID ====================
export async function getOfferById(id: string) {
  return db.propertyOffer.findUnique({ where: { id } });
}
