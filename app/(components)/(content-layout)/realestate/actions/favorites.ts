"use server";

// Pazar yeri favorileri + kayıtlı aramalar (kullanıcı = lucia User).

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";

/* ----------------------------- FAVORİLER ----------------------------- */

export async function toggleFavorite(listingId: string) {
  const { user } = await validateRequest();
  if (!user) return { error: "Favorilere eklemek için giriş yapın.", needAuth: true };

  const existing = await db.marketFavorite.findUnique({
    where: { userId_listingId: { userId: user.id, listingId } },
  });

  if (existing) {
    await db.marketFavorite.delete({ where: { id: existing.id } });
    revalidatePath("/realestate/favorites");
    return { favorited: false };
  }

  await db.marketFavorite.create({ data: { userId: user.id, listingId } });
  revalidatePath("/realestate/favorites");
  return { favorited: true };
}

/** Geçerli kullanıcının favori ilan id'leri (kart işaretlemek için). Girişsizse []. */
export async function getMyFavoriteIds(): Promise<string[]> {
  const { user } = await validateRequest();
  if (!user) return [];
  const rows = await db.marketFavorite.findMany({
    where: { userId: user.id },
    select: { listingId: true },
  });
  return rows.map((r) => r.listingId);
}

/** /favorites sayfası — favori ilanlar (ilan + mülk verisiyle). */
export async function getMyFavorites() {
  const { user } = await validateRequest();
  if (!user) return [];
  const rows = await db.marketFavorite.findMany({
    // Filtreyi WHERE'e koyduk: hem PENDING/REJECTED gizlenir hem de eksik-alanlı
    // eski kayıtlar görünür kalır; moderationStatus'u SELECT etmediğimiz için
    // alanı olmayan eski kayıtlarda hata oluşmaz.
    where: {
      userId: user.id,
      listing: { status: "ACTIVE", moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    },
    orderBy: { createdAt: "desc" },
    select: {
      listing: {
        select: {
          id: true, title: true, listingType: true, askingPrice: true, currency: true,
          monthlyRent: true,
          property: {
            select: {
              city: true, district: true, propertyType: true, roomCount: true,
              grossArea: true, bathroomCount: true,
              images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
            },
          },
        },
      },
    },
  });
  return rows.map((r) => r.listing).filter(Boolean);
}

/* -------------------------- KAYITLI ARAMALAR -------------------------- */

export type SavedSearchInput = {
  name: string;
  listingType?: string;
  propertyType?: string;
  city?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  rooms?: string;
  q?: string;
};

export async function saveSearch(input: SavedSearchInput) {
  const { user } = await validateRequest();
  if (!user) return { error: "Arama kaydetmek için giriş yapın.", needAuth: true };
  if (!input.name?.trim()) return { error: "Arama adı giriniz." };

  await db.marketSavedSearch.create({
    data: {
      userId: user.id,
      name: input.name.trim(),
      listingType: input.listingType || null,
      propertyType: input.propertyType || null,
      city: input.city || null,
      minPrice: input.minPrice ?? null,
      maxPrice: input.maxPrice ?? null,
      rooms: input.rooms || null,
      q: input.q || null,
    },
  });
  revalidatePath("/realestate/saved-searches");
  return { ok: true };
}

export async function getMySavedSearches() {
  const { user } = await validateRequest();
  if (!user) return [];
  return db.marketSavedSearch.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteSavedSearch(id: string) {
  const { user } = await validateRequest();
  if (!user) return { error: "Giriş yapın." };
  await db.marketSavedSearch.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/realestate/saved-searches");
  return { ok: true };
}
