"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { recordAudit } from "./audit";
import { requirePermission } from "./rbac";

export type ReservationProps = {
  status:        "ACTIVE" | "CONVERTED" | "CANCELLED" | "EXPIRED" | "REFUNDED";
  depositAmount: number;
  currency?:     string;
  reservedUntil: string;
  notes?:        string;
  cancelReason?: string;
  listingId:     string;
  clientId:      string;
  agentId?:      string;
  offerId?:      string;
  agencyId:      string;
};

const PATH = "/estate/dashboard/reservations";

async function generateReservationNo(agencyId: string): Promise<string> {
  const count = await db.propertyReservation.count({ where: { agencyId } });
  const year  = new Date().getFullYear();
  return `RSV-${year}-${String(count + 1).padStart(4, "0")}`;
}

async function resolveRefs(data: { listingId: string; clientId: string; agentId?: string }) {
  const [listing, client] = await Promise.all([
    db.listing.findUnique({ where: { id: data.listingId }, select: { propertyId: true } }),
    db.propertyClient.findUnique({ where: { id: data.clientId }, select: { firstName: true, lastName: true } }),
  ]);
  return {
    propertyId: listing?.propertyId ?? null,
    clientName: client ? `${client.firstName} ${client.lastName}` : "—",
  };
}

// ==================== CREATE ====================
export async function createReservation(data: ReservationProps) {
  await requirePermission("reservations.manage");
  const refs = await resolveRefs(data);
  if (!refs.propertyId) throw new Error("Seçilen ilana ait mülk bulunamadı.");

  const reservation = await db.propertyReservation.create({
    data: {
      reservationNo: await generateReservationNo(data.agencyId),
      status:        data.status,
      depositAmount: Number(data.depositAmount),
      currency:      data.currency || "TRY",
      reservedUntil: new Date(data.reservedUntil),
      notes:         data.notes ?? null,
      cancelReason:  data.cancelReason ?? null,
      listingId:     data.listingId,
      propertyId:    refs.propertyId,
      clientId:      data.clientId,
      clientName:    refs.clientName,
      agentId:       data.agentId || null,
      offerId:       data.offerId || null,
      agencyId:      data.agencyId,
      refundedAt:    data.status === "REFUNDED" ? new Date() : null,
    },
  });
  await recordAudit({ agencyId: data.agencyId, action: "CREATE", entity: "PropertyReservation", entityId: reservation.id, summary: `Yeni rezervasyon oluşturuldu (${reservation.reservationNo})` });
  revalidatePath(PATH);
  return reservation;
}

// ==================== UPDATE ====================
export async function updateReservation(id: string, data: Partial<ReservationProps>) {
  await requirePermission("reservations.manage");
  let extra: any = {};
  if (data.listingId || data.clientId) {
    const current = await db.propertyReservation.findUnique({ where: { id }, select: { listingId: true, clientId: true } });
    const refs = await resolveRefs({ listingId: data.listingId ?? current!.listingId, clientId: data.clientId ?? current!.clientId });
    extra = { propertyId: refs.propertyId, clientName: refs.clientName };
  }

  const reservation = await db.propertyReservation.update({
    where: { id },
    data: {
      ...(data.status && { status: data.status, refundedAt: data.status === "REFUNDED" ? new Date() : undefined }),
      ...(data.depositAmount !== undefined && { depositAmount: Number(data.depositAmount) }),
      ...(data.currency && { currency: data.currency }),
      ...(data.reservedUntil && { reservedUntil: new Date(data.reservedUntil) }),
      ...(data.notes        !== undefined && { notes: data.notes ?? null }),
      ...(data.cancelReason !== undefined && { cancelReason: data.cancelReason ?? null }),
      ...(data.listingId && { listingId: data.listingId }),
      ...(data.clientId  && { clientId: data.clientId }),
      ...(data.agentId !== undefined && { agentId: data.agentId || null }),
      ...extra,
    },
  });
  await recordAudit({ agencyId: reservation.agencyId, action: data.status ? "STATUS_CHANGE" : "UPDATE", entity: "PropertyReservation", entityId: reservation.id, summary: `Rezervasyon güncellendi (${reservation.reservationNo})` });
  revalidatePath(PATH);
  return reservation;
}

// ==================== DELETE ====================
export async function deleteReservation(id: string) {
  await requirePermission("reservations.manage");
  const existing = await db.propertyReservation.findUnique({ where: { id }, select: { agencyId: true, reservationNo: true } });
  await db.propertyReservation.delete({ where: { id } });
  if (existing) await recordAudit({ agencyId: existing.agencyId, action: "DELETE", entity: "PropertyReservation", entityId: id, summary: `Rezervasyon silindi (${existing.reservationNo})` });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== DÖNÜŞÜM: Rezervasyon → Sözleşme ====================
export async function convertReservationToContract(reservationId: string) {
  await requirePermission("reservations.manage");
  const r = await db.propertyReservation.findUnique({ where: { id: reservationId } });
  if (!r) throw new Error("Rezervasyon bulunamadı.");
  if (r.status === "CONVERTED") throw new Error("Bu rezervasyon zaten sözleşmeye dönüştürülmüş.");
  if (!r.agentId) throw new Error("Sözleşme oluşturmak için rezervasyona bir danışman atanmış olmalı.");

  const [listing, agent] = await Promise.all([
    db.listing.findUnique({ where: { id: r.listingId }, select: { listingType: true, askingPrice: true, monthlyRent: true } }),
    db.agent.findUnique({ where: { id: r.agentId }, select: { firstName: true, lastName: true } }),
  ]);

  const isRent = listing?.listingType === "RENT" || listing?.listingType === "SHORT_RENT";
  const count  = await db.propertyContract.count({ where: { agencyId: r.agencyId } });
  const contractNo = `CNT-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const contract = await db.propertyContract.create({
    data: {
      contractNo,
      contractType: isRent ? "RENTAL" : "SALE",
      status:       "DRAFT",
      startDate:    new Date(),
      salePrice:    isRent ? null : (listing?.askingPrice ?? null),
      rentalPrice:  isRent ? (listing?.monthlyRent ?? null) : null,
      deposit:      r.depositAmount,
      currency:     r.currency,
      notes:        `${r.reservationNo} rezervasyonundan otomatik oluşturuldu.`,
      propertyId:   r.propertyId,
      listingId:    r.listingId,
      agentId:      r.agentId,
      agentName:    agent ? `${agent.firstName} ${agent.lastName}` : "—",
      clientId:     r.clientId,
      clientName:   r.clientName,
      agencyId:     r.agencyId,
    },
  });

  await db.propertyReservation.update({ where: { id: reservationId }, data: { status: "CONVERTED" } });
  await recordAudit({ agencyId: r.agencyId, action: "STATUS_CHANGE", entity: "PropertyReservation", entityId: r.id, summary: `Rezervasyon (${r.reservationNo}) sözleşmeye dönüştürüldü (${contractNo})` });

  revalidatePath(PATH);
  revalidatePath("/estate/dashboard/contracts");
  return contract;
}

// ==================== GET ALL ====================
export async function getAllReservations(agencyId: string) {
  const reservations = await db.propertyReservation.findMany({
    where: { agencyId },
    orderBy: { createdAt: "desc" },
  });

  const listingIds = [...new Set(reservations.map((r) => r.listingId).filter(Boolean))];
  const propIds    = [...new Set(reservations.map((r) => r.propertyId).filter(Boolean))];

  const [listings, props] = await Promise.all([
    listingIds.length ? db.listing.findMany({ where: { id: { in: listingIds } }, select: { id: true, title: true, listingNo: true } }) : [],
    propIds.length    ? db.propertyRealEstate.findMany({ where: { id: { in: propIds } }, select: { id: true, title: true, city: true } }) : [],
  ]);

  const lm = Object.fromEntries(listings.map((l) => [l.id, l]));
  const pm = Object.fromEntries(props.map((p) => [p.id, p]));

  return reservations.map((r) => ({ ...r, listing: lm[r.listingId] ?? null, property: pm[r.propertyId] ?? null }));
}

// ==================== GET BY ID ====================
export async function getReservationById(id: string) {
  return db.propertyReservation.findUnique({ where: { id } });
}
