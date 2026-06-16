"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export type VisitProps = {
  scheduledAt: string;
  completedAt?: string;
  status:      "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  notes?:      string;
  feedback?:   string;
  rating?:     number;
  propertyId:  string;
  listingId?:  string;
  agentId:     string;
  clientId:    string;
};

const PATH = "/estate/dashboard/visits";

function d(s?: string) { return s ? new Date(s) : null; }
function r(v: any) { return v ? parseInt(String(v), 10) : null; }

// ==================== CREATE ====================
export async function createVisit(data: VisitProps) {
  const visit = await db.propertyVisit.create({
    data: {
      scheduledAt: new Date(data.scheduledAt),
      completedAt: d(data.completedAt),
      status:      data.status,
      notes:       data.notes  ?? null,
      feedback:    data.feedback ?? null,
      rating:      r(data.rating),
      propertyId:  data.propertyId,
      listingId:   data.listingId || null,
      agentId:     data.agentId,
      clientId:    data.clientId,
    },
  });
  revalidatePath(PATH);
  return visit;
}

// ==================== UPDATE ====================
export async function updateVisit(id: string, data: Partial<VisitProps>) {
  const visit = await db.propertyVisit.update({
    where: { id },
    data: {
      ...(data.scheduledAt && { scheduledAt: new Date(data.scheduledAt) }),
      ...(data.completedAt !== undefined && { completedAt: d(data.completedAt) }),
      ...(data.status      && { status: data.status }),
      ...(data.notes    !== undefined && { notes:    data.notes    ?? null }),
      ...(data.feedback !== undefined && { feedback: data.feedback ?? null }),
      ...(data.rating   !== undefined && { rating:   r(data.rating) }),
      ...(data.propertyId  && { propertyId:  data.propertyId }),
      ...(data.listingId !== undefined && { listingId: data.listingId || null }),
      ...(data.agentId     && { agentId:  data.agentId }),
      ...(data.clientId    && { clientId: data.clientId }),
    },
  });
  revalidatePath(PATH);
  return visit;
}

// ==================== DELETE ====================
export async function deleteVisit(id: string) {
  await db.propertyVisit.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllVisits(agencyId: string) {
  const visits = await db.propertyVisit.findMany({
    where: { property: { agencyId } },
    orderBy: { scheduledAt: "desc" },
    select: {
      id: true, scheduledAt: true, completedAt: true,
      status: true, notes: true, feedback: true, rating: true,
      agentId: true, clientId: true, propertyId: true, listingId: true,
      createdAt: true, updatedAt: true,
    },
  });

  const propIds   = [...new Set(visits.map((v) => v.propertyId).filter(Boolean))];
  const agentIds  = [...new Set(visits.map((v) => v.agentId).filter(Boolean))];
  const clientIds = [...new Set(visits.map((v) => v.clientId).filter(Boolean))];

  const [props, agts, clts] = await Promise.all([
    propIds.length   ? db.propertyRealEstate.findMany({ where: { id: { in: propIds   } }, select: { id: true, title: true, city: true } }) : [],
    agentIds.length  ? db.agent.findMany(             { where: { id: { in: agentIds  } }, select: { id: true, firstName: true, lastName: true } }) : [],
    clientIds.length ? db.propertyClient.findMany(    { where: { id: { in: clientIds } }, select: { id: true, firstName: true, lastName: true } }) : [],
  ]);

  const pm = Object.fromEntries(props.map((p) => [p.id, p]));
  const am = Object.fromEntries(agts.map((a)  => [a.id, a]));
  const cm = Object.fromEntries(clts.map((c)  => [c.id, c]));

  return visits.map((v) => ({
    ...v,
    property: pm[v.propertyId] ?? null,
    agent:    am[v.agentId]    ?? null,
    client:   cm[v.clientId]   ?? null,
  }));
}

// ==================== GET BY ID ====================
export async function getVisitById(id: string) {
  const visit = await db.propertyVisit.findUnique({ where: { id } });
  if (!visit) return null;

  const [property, listing, agent, client] = await Promise.all([
    db.propertyRealEstate.findUnique({ where: { id: visit.propertyId }, select: { id: true, title: true, city: true, district: true } }).catch(() => null),
    visit.listingId ? db.listing.findUnique({ where: { id: visit.listingId }, select: { id: true, title: true, listingNo: true } }).catch(() => null) : null,
    db.agent.findUnique(          { where: { id: visit.agentId  }, select: { id: true, firstName: true, lastName: true, phone: true, email: true } }).catch(() => null),
    db.propertyClient.findUnique( { where: { id: visit.clientId }, select: { id: true, firstName: true, lastName: true, phone: true, email: true } }).catch(() => null),
  ]);

  return { ...visit, property, listing, agent, client };
}
