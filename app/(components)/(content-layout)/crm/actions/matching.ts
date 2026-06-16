"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { assertAgencyAccess } from "../lib/auth";

/** Bir fırsatın kriterlerine uyan aktif ilanları getir + uyum skoru */
export async function getMatchingListings(leadId: string) {
  const lead = await db.lead.findUnique({
    where: { id: leadId },
    select: {
      agencyId: true,
      listingType: true,
      propertyType: true,
      city: true,
      district: true,
      roomCount: true,
      budgetMax: true,
      budgetMin: true,
      value: true,
    },
  });
  if (!lead) return [];

  const budgetCeiling = lead.budgetMax ?? lead.value ?? null;

  const listings = await db.listing.findMany({
    where: {
      agencyId: lead.agencyId,
      status: "ACTIVE",
      ...(lead.listingType ? { listingType: lead.listingType } : {}),
      ...(lead.propertyType || lead.city
        ? {
            property: {
              ...(lead.propertyType ? { propertyType: lead.propertyType } : {}),
              ...(lead.city ? { city: { contains: lead.city, mode: "insensitive" } } : {}),
            },
          }
        : {}),
      ...(budgetCeiling ? { askingPrice: { lte: budgetCeiling * 1.15 } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      property: {
        select: {
          city: true,
          district: true,
          propertyType: true,
          roomCount: true,
          grossArea: true,
        },
      },
    },
  });

  // Basit uyum skoru
  const scored = listings.map((l) => {
    let score = 0;
    let max = 0;
    const reasons: string[] = [];

    max += 30;
    if (lead.listingType && l.listingType === lead.listingType) {
      score += 30;
      reasons.push("İlan türü");
    }
    max += 25;
    if (lead.propertyType && l.property?.propertyType === lead.propertyType) {
      score += 25;
      reasons.push("Mülk türü");
    }
    max += 20;
    if (lead.city && l.property?.city?.toLowerCase() === lead.city.toLowerCase()) {
      score += 20;
      reasons.push("Şehir");
    }
    max += 10;
    if (lead.district && l.property?.district?.toLowerCase() === lead.district.toLowerCase()) {
      score += 10;
      reasons.push("İlçe");
    }
    max += 10;
    if (lead.roomCount && l.property?.roomCount === lead.roomCount) {
      score += 10;
      reasons.push("Oda sayısı");
    }
    max += 15;
    if (budgetCeiling && l.askingPrice <= budgetCeiling) {
      score += 15;
      reasons.push("Bütçe");
    }

    const pct = max ? Math.round((score / max) * 100) : 0;
    return {
      id: l.id,
      title: l.title,
      listingNo: l.listingNo,
      askingPrice: l.askingPrice,
      currency: l.currency,
      listingType: l.listingType,
      city: l.property?.city ?? null,
      district: l.property?.district ?? null,
      propertyType: l.property?.propertyType ?? null,
      roomCount: l.property?.roomCount ?? null,
      grossArea: l.property?.grossArea ?? null,
      matchScore: pct,
      reasons,
    };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored;
}

/** Eşleşen ilanı, fırsata bağlı müşterinin "ilgilendikleri" listesine ekle */
export async function addListingInterestFromLead(leadId: string, listingId: string) {
  const lead = await db.lead.findUnique({
    where: { id: leadId },
    select: { clientId: true, agencyId: true, agentId: true, agentName: true },
  });
  if (!lead) throw new Error("Fırsat bulunamadı.");
  await assertAgencyAccess(lead.agencyId);
  if (!lead.clientId)
    throw new Error("Önce fırsatı bir müşteriye bağlayın (Düzenle → Mevcut Müşteri).");

  const existing = await db.clientInterest.findUnique({
    where: { clientId_listingId: { clientId: lead.clientId, listingId } },
  });
  if (existing) throw new Error("Bu ilan zaten müşterinin ilgi listesinde.");

  await db.clientInterest.create({
    data: { clientId: lead.clientId, listingId, priority: "MEDIUM" },
  });

  await db.crmActivity.create({
    data: {
      type: "NOTE",
      title: "Eşleşen ilan müşteriye önerildi",
      leadId,
      agencyId: lead.agencyId,
      agentId: lead.agentId,
      agentName: lead.agentName,
    },
  });

  revalidatePath(`/crm/agency/${lead.agencyId}/leads/${leadId}`);
  return { ok: true };
}
