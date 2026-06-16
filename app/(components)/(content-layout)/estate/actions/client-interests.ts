"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

// ==================== TOGGLE (favoriye ekle / çıkar) ====================
export async function toggleClientInterest(clientId: string, listingId: string) {
  const existing = await db.clientInterest.findFirst({
    where:  { clientId, listingId },
    select: { id: true },
  });

  let interested: boolean;
  if (existing) {
    await db.clientInterest.delete({ where: { id: existing.id } });
    interested = false;
  } else {
    await db.clientInterest.create({ data: { clientId, listingId } });
    interested = true;
  }

  revalidatePath(`/estate/portal/client/listing/${listingId}`);
  revalidatePath("/estate/portal/client/favorites");
  return { interested };
}

// ==================== ÖNCELİK GÜNCELLE ====================
export async function updateInterestPriority(
  interestId: string,
  listingId: string,
  priority: string,
) {
  await db.clientInterest.update({
    where: { id: interestId },
    data:  { priority },
  });

  revalidatePath(`/estate/portal/client/listing/${listingId}`);
  revalidatePath("/estate/portal/client/favorites");
  return { ok: true };
}

// ==================== MÜŞTERİ FAVORİLERİ ====================
export async function getClientInterests(clientId: string) {
  const interests = await db.clientInterest.findMany({
    where:   { clientId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, priority: true, notes: true, createdAt: true,
      listing: {
        select: {
          id: true, title: true, listingNo: true, listingType: true,
          status: true, askingPrice: true, currency: true, monthlyRent: true,
          property: {
            select: {
              id: true, city: true, district: true, neighborhood: true,
              propertyType: true, roomCount: true, grossArea: true,
              images: {
                where:   { isCover: true },
                select:  { url: true },
                take:    1,
              },
            },
          },
        },
      },
    },
  });

  return interests;
}

// Yalnızca favori (ilgilenilen) ilan ID'leri — listede kalp durumu için
export async function getClientInterestListingIds(clientId: string) {
  const rows = await db.clientInterest.findMany({
    where:  { clientId },
    select: { listingId: true },
  });
  return rows.map((r) => r.listingId);
}
