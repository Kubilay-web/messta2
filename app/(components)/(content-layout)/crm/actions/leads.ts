"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { LeadSource, LeadTemperature, ListingType, PropertyType } from "@prisma/client";
import { assertAgencyAccess, getLeadScopeWhere, getScopedAgentId } from "../lib/auth";
import { computeLeadScore } from "../lib/score";

const revalidate = (agencyId: string) => {
  revalidatePath(`/crm/agency/${agencyId}/pipeline`);
  revalidatePath(`/crm/agency/${agencyId}`);
  revalidatePath(`/crm/agency/${agencyId}/leads`);
};

export type LeadInput = {
  agencyId: string;
  pipelineId: string;
  stageId?: string;
  title: string;
  contactName: string;
  contactEmail?: string;
  contactPhone?: string;
  company?: string;
  source?: LeadSource;
  temperature?: LeadTemperature;
  value?: number | null;
  currency?: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  listingType?: ListingType | null;
  propertyType?: PropertyType | null;
  city?: string;
  district?: string;
  roomCount?: string;
  requirements?: string;
  expectedCloseDate?: string | null;
  tags?: string[];
  agentId?: string | null;
  clientId?: string | null;
  listingId?: string | null;
};

async function resolveAgentName(agentId?: string | null) {
  if (!agentId) return null;
  const a = await db.agent.findUnique({
    where: { id: agentId },
    select: { firstName: true, lastName: true },
  });
  return a ? `${a.firstName} ${a.lastName}` : null;
}

/* ------------------------------------------------------------------ */
/*  CREATE                                                             */
/* ------------------------------------------------------------------ */

export async function createLead(data: LeadInput) {
  await assertAgencyAccess(data.agencyId);

  // AGENT ise fırsat kendisine atanır (aksi halde göremez)
  const scopedAgentId = await getScopedAgentId();
  if (scopedAgentId) data.agentId = scopedAgentId;

  // Aşama belirtilmemişse hattın ilk (kazanılmamış/kaybedilmemiş) aşaması
  let stageId = data.stageId;
  if (!stageId) {
    const firstStage = await db.crmStage.findFirst({
      where: { pipelineId: data.pipelineId, isWon: false, isLost: false },
      orderBy: { order: "asc" },
    });
    if (!firstStage) throw new Error("Hat için aşama bulunamadı.");
    stageId = firstStage.id;
  }

  const last = await db.lead.findFirst({
    where: { stageId },
    orderBy: { position: "desc" },
    select: { position: true },
  });

  const agentName = await resolveAgentName(data.agentId);

  const score = computeLeadScore({
    temperature: data.temperature ?? "WARM",
    value: data.value ?? null,
    budgetMax: data.budgetMax ?? null,
    lastActivityAt: new Date(),
    source: data.source ?? "OTHER",
    contactPhone: data.contactPhone,
    contactEmail: data.contactEmail,
    listingId: data.listingId,
    clientId: data.clientId,
  });

  const lead = await db.lead.create({
    data: {
      agencyId: data.agencyId,
      pipelineId: data.pipelineId,
      stageId,
      score,
      title: data.title,
      contactName: data.contactName,
      contactEmail: data.contactEmail || null,
      contactPhone: data.contactPhone || null,
      company: data.company || null,
      source: data.source ?? "OTHER",
      temperature: data.temperature ?? "WARM",
      value: data.value ?? null,
      currency: data.currency ?? "TRY",
      budgetMin: data.budgetMin ?? null,
      budgetMax: data.budgetMax ?? null,
      listingType: data.listingType ?? null,
      propertyType: data.propertyType ?? null,
      city: data.city || null,
      district: data.district || null,
      roomCount: data.roomCount || null,
      requirements: data.requirements || null,
      expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate) : null,
      tags: data.tags ?? [],
      agentId: data.agentId || null,
      agentName,
      clientId: data.clientId || null,
      listingId: data.listingId || null,
      position: (last?.position ?? -1) + 1,
      lastActivityAt: new Date(),
    },
  });

  await db.crmActivity.create({
    data: {
      type: "CREATED",
      title: "Fırsat oluşturuldu",
      leadId: lead.id,
      agencyId: data.agencyId,
      agentId: data.agentId || null,
      agentName,
    },
  });

  revalidate(data.agencyId);
  return lead;
}

/* ------------------------------------------------------------------ */
/*  UPDATE                                                             */
/* ------------------------------------------------------------------ */

export async function updateLead(id: string, data: Partial<LeadInput>) {
  const existing = await db.lead.findUnique({ where: { id } });
  if (!existing) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(existing.agencyId);

  // AGENT kendi fırsatını başka danışmana devredemez
  const scopedAgentId = await getScopedAgentId();
  if (scopedAgentId) {
    if (existing.agentId !== scopedAgentId) throw new Error("Bu fırsata erişiminiz yok.");
    data.agentId = scopedAgentId;
  }

  const agentName =
    data.agentId !== undefined ? await resolveAgentName(data.agentId) : undefined;

  // Skoru güncel değerlerle yeniden hesapla
  const score = computeLeadScore({
    temperature: data.temperature ?? existing.temperature,
    value: data.value !== undefined ? data.value : existing.value,
    budgetMax: data.budgetMax !== undefined ? data.budgetMax : existing.budgetMax,
    lastActivityAt: existing.lastActivityAt,
    source: data.source ?? existing.source,
    contactPhone: data.contactPhone !== undefined ? data.contactPhone : existing.contactPhone,
    contactEmail: data.contactEmail !== undefined ? data.contactEmail : existing.contactEmail,
    listingId: data.listingId !== undefined ? data.listingId : existing.listingId,
    clientId: data.clientId !== undefined ? data.clientId : existing.clientId,
  });

  const lead = await db.lead.update({
    where: { id },
    data: {
      score,
      ...(data.title !== undefined && { title: data.title }),
      ...(data.contactName !== undefined && { contactName: data.contactName }),
      ...(data.contactEmail !== undefined && { contactEmail: data.contactEmail || null }),
      ...(data.contactPhone !== undefined && { contactPhone: data.contactPhone || null }),
      ...(data.company !== undefined && { company: data.company || null }),
      ...(data.source !== undefined && { source: data.source }),
      ...(data.temperature !== undefined && { temperature: data.temperature }),
      ...(data.value !== undefined && { value: data.value }),
      ...(data.currency !== undefined && { currency: data.currency }),
      ...(data.budgetMin !== undefined && { budgetMin: data.budgetMin }),
      ...(data.budgetMax !== undefined && { budgetMax: data.budgetMax }),
      ...(data.listingType !== undefined && { listingType: data.listingType }),
      ...(data.propertyType !== undefined && { propertyType: data.propertyType }),
      ...(data.city !== undefined && { city: data.city || null }),
      ...(data.district !== undefined && { district: data.district || null }),
      ...(data.roomCount !== undefined && { roomCount: data.roomCount || null }),
      ...(data.requirements !== undefined && { requirements: data.requirements || null }),
      ...(data.expectedCloseDate !== undefined && {
        expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate) : null,
      }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.agentId !== undefined && { agentId: data.agentId || null, agentName }),
      ...(data.clientId !== undefined && { clientId: data.clientId || null }),
      ...(data.listingId !== undefined && { listingId: data.listingId || null }),
    },
  });

  revalidate(existing.agencyId);
  return lead;
}

/* ------------------------------------------------------------------ */
/*  MOVE (kanban sürükle-bırak)                                        */
/* ------------------------------------------------------------------ */

export async function moveLead(params: {
  leadId: string;
  toStageId: string;
  orderedLeadIds: string[]; // hedef aşamadaki yeni sıralama
}) {
  const lead = await db.lead.findUnique({ where: { id: params.leadId } });
  if (!lead) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(lead.agencyId);
  const moveScope = await getScopedAgentId();
  if (moveScope && lead.agentId !== moveScope) throw new Error("Bu fırsata erişiminiz yok.");

  const toStage = await db.crmStage.findUnique({ where: { id: params.toStageId } });
  if (!toStage) throw new Error("Aşama bulunamadı.");

  const stageChanged = lead.stageId !== params.toStageId;

  // Hedef aşamadaki sıralamayı uygula
  await Promise.all(
    params.orderedLeadIds.map((id, i) =>
      db.lead.update({
        where: { id },
        data: {
          position: i,
          ...(id === params.leadId
            ? {
                stageId: params.toStageId,
                lastActivityAt: new Date(),
                ...(toStage.isWon ? { status: "WON", wonAt: new Date() } : {}),
                ...(toStage.isLost ? { status: "LOST", lostAt: new Date() } : {}),
                ...(!toStage.isWon && !toStage.isLost ? { status: "OPEN", wonAt: null, lostAt: null } : {}),
              }
            : {}),
        },
      })
    )
  );

  if (stageChanged) {
    const fromStage = await db.crmStage.findUnique({ where: { id: lead.stageId } });
    await db.crmActivity.create({
      data: {
        type: toStage.isWon ? "WON" : toStage.isLost ? "LOST" : "STAGE_CHANGE",
        title: toStage.isWon
          ? "Fırsat kazanıldı 🎉"
          : toStage.isLost
          ? "Fırsat kaybedildi"
          : `Aşama değişti: ${fromStage?.name ?? "?"} → ${toStage.name}`,
        meta: { fromStage: fromStage?.name ?? null, toStage: toStage.name },
        leadId: lead.id,
        agencyId: lead.agencyId,
        agentId: lead.agentId,
        agentName: lead.agentName,
      },
    });
  }

  revalidate(lead.agencyId);
  return { ok: true };
}

export async function markLeadLost(id: string, reason: string) {
  const lead = await db.lead.findUnique({
    where: { id },
    include: { pipeline: { include: { stages: true } } },
  });
  if (!lead) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(lead.agencyId);
  const lostScope = await getScopedAgentId();
  if (lostScope && lead.agentId !== lostScope) throw new Error("Bu fırsata erişiminiz yok.");
  const lostStage = lead.pipeline.stages.find((s) => s.isLost);

  await db.lead.update({
    where: { id },
    data: {
      status: "LOST",
      lostReason: reason,
      lostAt: new Date(),
      lastActivityAt: new Date(),
      ...(lostStage ? { stageId: lostStage.id } : {}),
    },
  });

  await db.crmActivity.create({
    data: {
      type: "LOST",
      title: "Fırsat kaybedildi",
      content: reason,
      leadId: id,
      agencyId: lead.agencyId,
      agentId: lead.agentId,
      agentName: lead.agentName,
    },
  });

  revalidate(lead.agencyId);
}

export async function deleteLead(id: string) {
  const lead = await db.lead.findUnique({ where: { id }, select: { agencyId: true, agentId: true } });
  if (!lead) return;
  await assertAgencyAccess(lead.agencyId);
  const delScope = await getScopedAgentId();
  if (delScope && lead.agentId !== delScope) throw new Error("Bu fırsata erişiminiz yok.");
  await db.lead.delete({ where: { id } });
  revalidate(lead.agencyId);
}

/* ------------------------------------------------------------------ */
/*  QUERIES                                                            */
/* ------------------------------------------------------------------ */

export async function getLeadsByPipeline(pipelineId: string) {
  const scope = await getLeadScopeWhere();
  return db.lead.findMany({
    where: { pipelineId, ...scope },
    orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    include: {
      _count: { select: { tasks: true, activities: true } },
    },
  });
}

export async function getLead(id: string) {
  return db.lead.findUnique({
    where: { id },
    include: {
      pipeline: { include: { stages: { orderBy: { order: "asc" } } } },
      stage: true,
      agent: { select: { id: true, firstName: true, lastName: true, imageUrl: true } },
      client: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
      listing: { select: { id: true, title: true, listingNo: true, askingPrice: true, currency: true } },
      activities: { orderBy: { createdAt: "desc" } },
      tasks: { orderBy: [{ status: "asc" }, { dueDate: "asc" }] },
    },
  });
}

/** Tüm fırsatları (filtreli) listele */
export async function getAllLeads(
  agencyId: string,
  filter?: { status?: "OPEN" | "WON" | "LOST"; agentId?: string; q?: string }
) {
  const scope = await getLeadScopeWhere();
  return db.lead.findMany({
    where: {
      agencyId,
      ...scope,
      ...(filter?.status ? { status: filter.status } : {}),
      ...(filter?.agentId ? { agentId: filter.agentId } : {}),
      ...(filter?.q
        ? {
            OR: [
              { title: { contains: filter.q, mode: "insensitive" } },
              { contactName: { contains: filter.q, mode: "insensitive" } },
              { contactPhone: { contains: filter.q } },
              { city: { contains: filter.q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { lastActivityAt: "desc" },
    take: 500,
    include: {
      stage: { select: { name: true, color: true } },
      pipeline: { select: { name: true } },
    },
  });
}

/* ------------------------------------------------------------------ */
/*  KAZANMA + ERP DÖNÜŞÜMÜ                                             */
/* ------------------------------------------------------------------ */

/** Fırsatı kazanıldı olarak işaretle (kazanma aşamasına taşır). */
export async function markLeadWon(id: string) {
  const lead = await db.lead.findUnique({
    where: { id },
    include: { pipeline: { include: { stages: true } } },
  });
  if (!lead) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(lead.agencyId);
  const scope = await getScopedAgentId();
  if (scope && lead.agentId !== scope) throw new Error("Bu fırsata erişiminiz yok.");

  const wonStage = lead.pipeline.stages.find((s) => s.isWon);

  await db.lead.update({
    where: { id },
    data: {
      status: "WON",
      wonAt: new Date(),
      lastActivityAt: new Date(),
      ...(wonStage ? { stageId: wonStage.id } : {}),
    },
  });

  await db.crmActivity.create({
    data: {
      type: "WON",
      title: "Fırsat kazanıldı 🎉",
      leadId: id,
      agencyId: lead.agencyId,
      agentId: lead.agentId,
      agentName: lead.agentName,
    },
  });

  revalidate(lead.agencyId);
  return { ok: true };
}

export type ConvertOfferInput = {
  amount: number;
  currency?: string;
  offerType?: "SALE" | "RENT" | "SHORT_RENT";
  depositOffer?: number | null;
  message?: string | null;
  validUntil?: string | null;
};

/**
 * Kazanılan fırsatı ERP'de bir Teklif'e (PropertyOffer) dönüştürür.
 * Fırsatın bir müşteriye (clientId) ve bir ilana (listingId) bağlı olması gerekir.
 * Tutar / para birimi / tür danışman tarafından girilir; verilmezse fırsat
 * ve ilan bilgilerinden makul varsayılanlar türetilir.
 */
export async function convertLeadToOffer(id: string, input?: ConvertOfferInput) {
  const lead = await db.lead.findUnique({ where: { id } });
  if (!lead) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(lead.agencyId);
  const scope = await getScopedAgentId();
  if (scope && lead.agentId !== scope) throw new Error("Bu fırsata erişiminiz yok.");

  if (!lead.clientId) throw new Error("Önce fırsatı kayıtlı bir müşteriye bağlayın.");
  if (!lead.listingId) throw new Error("Önce fırsatı bir ilana bağlayın.");

  const [listing, client] = await Promise.all([
    db.listing.findUnique({ where: { id: lead.listingId }, select: { propertyId: true, listingType: true, askingPrice: true } }),
    db.propertyClient.findUnique({ where: { id: lead.clientId }, select: { firstName: true, lastName: true } }),
  ]);
  if (!listing) throw new Error("İlan bulunamadı.");

  // Danışmanın girdiği tutar önceliklidir; yoksa fırsat/ilan değerinden türetilir.
  const amount = input?.amount ?? lead.value ?? lead.budgetMax ?? listing.askingPrice ?? 0;
  if (!amount || amount <= 0) throw new Error("Geçerli bir teklif tutarı giriniz.");

  const currency = input?.currency || lead.currency || "TRY";
  const offerType = input?.offerType ?? listing.listingType;
  const count = await db.propertyOffer.count({ where: { agencyId: lead.agencyId } });
  const offerNo = `OFR-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;

  const offer = await db.propertyOffer.create({
    data: {
      offerNo,
      offerType,
      status: "PENDING",
      amount,
      currency,
      depositOffer: input?.depositOffer ?? null,
      message: input?.message?.trim() || `CRM fırsatından oluşturuldu: ${lead.title}`,
      validUntil: input?.validUntil ? new Date(input.validUntil) : null,
      listingId: lead.listingId,
      propertyId: listing.propertyId,
      clientId: lead.clientId,
      clientName: client ? `${client.firstName} ${client.lastName}` : lead.contactName,
      agentId: lead.agentId,
      agentName: lead.agentName,
      agencyId: lead.agencyId,
    },
  });

  await db.crmActivity.create({
    data: {
      type: "NOTE",
      title: `ERP'de teklif oluşturuldu (${offerNo})`,
      content: `Tutar: ${amount} ${currency}`,
      leadId: id,
      agencyId: lead.agencyId,
      agentId: lead.agentId,
      agentName: lead.agentName,
    },
  });

  revalidate(lead.agencyId);
  revalidatePath(`/estate/dashboard/offers`);
  return offer;
}

/* ------------------------------------------------------------------ */
/*  TOPLU İŞLEMLER                                                     */
/* ------------------------------------------------------------------ */

// Kapsama göre erişilebilir lead id'lerini süzer (AGENT sadece kendi fırsatları)
async function scopeLeadIds(agencyId: string, leadIds: string[]): Promise<string[]> {
  const scope = await getScopedAgentId();
  const leads = await db.lead.findMany({
    where: { id: { in: leadIds }, agencyId, ...(scope ? { agentId: scope } : {}) },
    select: { id: true },
  });
  return leads.map((l) => l.id);
}

export async function bulkAssignLeads(agencyId: string, leadIds: string[], agentId: string | null) {
  await assertAgencyAccess(agencyId);
  const ids = await scopeLeadIds(agencyId, leadIds);
  const agentName = await resolveAgentName(agentId);
  await db.lead.updateMany({ where: { id: { in: ids } }, data: { agentId: agentId || null, agentName } });
  revalidate(agencyId);
  return { count: ids.length };
}

export async function bulkMoveLeadsToStage(agencyId: string, leadIds: string[], stageId: string) {
  await assertAgencyAccess(agencyId);
  const stage = await db.crmStage.findUnique({ where: { id: stageId } });
  if (!stage) throw new Error("Aşama bulunamadı.");
  const ids = await scopeLeadIds(agencyId, leadIds);
  await db.lead.updateMany({
    where: { id: { in: ids } },
    data: {
      stageId,
      lastActivityAt: new Date(),
      ...(stage.isWon ? { status: "WON", wonAt: new Date() } : {}),
      ...(stage.isLost ? { status: "LOST", lostAt: new Date() } : {}),
      ...(!stage.isWon && !stage.isLost ? { status: "OPEN" } : {}),
    },
  });
  revalidate(agencyId);
  return { count: ids.length };
}

export async function bulkAddTag(agencyId: string, leadIds: string[], tag: string) {
  await assertAgencyAccess(agencyId);
  const t = tag.trim();
  if (!t) return { count: 0 };
  const ids = await scopeLeadIds(agencyId, leadIds);
  const leads = await db.lead.findMany({ where: { id: { in: ids } }, select: { id: true, tags: true } });
  await Promise.all(
    leads.map((l) =>
      l.tags.includes(t) ? null : db.lead.update({ where: { id: l.id }, data: { tags: { set: [...l.tags, t] } } })
    )
  );
  revalidate(agencyId);
  return { count: ids.length };
}

export async function bulkDeleteLeads(agencyId: string, leadIds: string[]) {
  await assertAgencyAccess(agencyId);
  const ids = await scopeLeadIds(agencyId, leadIds);
  await db.lead.deleteMany({ where: { id: { in: ids } } });
  revalidate(agencyId);
  return { count: ids.length };
}

/** Kanban / form için hafif danışman + ilan + müşteri listeleri */
export async function getLeadFormOptions(agencyId: string) {
  const [agents, listings, clients] = await Promise.all([
    db.agent.findMany({
      where: { agencyId, isActive: true },
      select: { id: true, firstName: true, lastName: true },
      orderBy: { firstName: "asc" },
    }),
    db.listing.findMany({
      where: { agencyId, status: "ACTIVE" },
      select: { id: true, title: true, listingNo: true, askingPrice: true, currency: true },
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    db.propertyClient.findMany({
      where: { agencyId },
      select: { id: true, firstName: true, lastName: true, phone: true },
      orderBy: { firstName: "asc" },
      take: 500,
    }),
  ]);
  return { agents, listings, clients };
}
