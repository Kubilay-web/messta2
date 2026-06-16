"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/portal/client/saved-searches";

export type SavedSearchInput = {
  name:          string;
  listingType?:  string;
  propertyType?: string;
  city?:         string;
  minPrice?:     number;
  maxPrice?:     number;
  q?:            string;
};

type Filterish = {
  listingType?:  string | null;
  propertyType?: string | null;
  city?:         string | null;
  minPrice?:     number | null;
  maxPrice?:     number | null;
  q?:            string | null;
};

function buildWhere(agencyId: string, f: Filterish) {
  const where: any = { agencyId, status: "ACTIVE", isPublic: true };
  if (f.listingType) where.listingType = f.listingType;
  if (f.q) where.title = { contains: f.q, mode: "insensitive" };
  if (f.minPrice != null || f.maxPrice != null) {
    where.askingPrice = {};
    if (f.minPrice != null) where.askingPrice.gte = f.minPrice;
    if (f.maxPrice != null) where.askingPrice.lte = f.maxPrice;
  }
  const pw: any = {};
  if (f.propertyType) pw.propertyType = f.propertyType;
  if (f.city) pw.city = { contains: f.city, mode: "insensitive" };
  if (Object.keys(pw).length) where.property = pw;
  return where;
}

export async function createSavedSearch(clientId: string, data: SavedSearchInput) {
  if (!data.name?.trim()) throw new Error("Arama için bir isim girin.");
  await db.clientSavedSearch.create({
    data: {
      clientId,
      name:         data.name.trim(),
      listingType:  data.listingType  || null,
      propertyType: data.propertyType || null,
      city:         data.city         || null,
      minPrice:     data.minPrice ?? null,
      maxPrice:     data.maxPrice ?? null,
      q:            data.q            || null,
    },
  });
  revalidatePath(PATH);
  return { ok: true };
}

export async function deleteSavedSearch(id: string) {
  await db.clientSavedSearch.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function markSavedSearchSeen(id: string) {
  await db.clientSavedSearch.update({ where: { id }, data: { lastSeenAt: new Date() } });
  revalidatePath(PATH);
  return { ok: true };
}

// Kayıtlı aramaları toplam + "yeni" eşleşme sayısıyla döndürür
export async function getClientSavedSearches(clientId: string, agencyId: string) {
  const searches = await db.clientSavedSearch.findMany({
    where:   { clientId },
    orderBy: { createdAt: "desc" },
  });
  if (!agencyId) return searches.map((s) => ({ ...s, total: 0, fresh: 0 }));

  return Promise.all(
    searches.map(async (s) => {
      const where = buildWhere(agencyId, s);
      const [total, fresh] = await Promise.all([
        db.listing.count({ where }),
        db.listing.count({ where: { ...where, createdAt: { gt: s.lastSeenAt } } }),
      ]);
      return { ...s, total, fresh };
    }),
  );
}
