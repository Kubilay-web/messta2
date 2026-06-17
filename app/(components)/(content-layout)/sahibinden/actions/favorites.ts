"use server";

// Sahibinden Pazar Yeri — favoriler (kullanıcı = Lucia User).

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(listingId: string) {
  const { user } = await validateRequest();
  if (!user) return { error: "Favorilere eklemek için giriş yapın.", needAuth: true };

  const existing = await db.marketFavorite.findUnique({
    where: { userId_listingId: { userId: user.id, listingId } },
  });

  if (existing) {
    await db.marketFavorite.delete({ where: { id: existing.id } });
    revalidatePath("/sahibinden/favorilerim");
    return { favorited: false };
  }

  // O anki fiyatı sakla → ileride fiyat düşerse "fiyatı düştü" bildirimi
  const snap = await db.listing.findUnique({ where: { id: listingId }, select: { askingPrice: true } });
  await db.marketFavorite.create({
    data: { userId: user.id, listingId, priceAtSave: snap?.askingPrice ?? null },
  });
  revalidatePath("/sahibinden/favorilerim");
  return { favorited: true };
}

/** Geçerli kullanıcının favori ilan id'leri (kart işaretlemek için). */
export async function getMyFavoriteIds(): Promise<string[]> {
  const { user } = await validateRequest();
  if (!user) return [];
  const rows = await db.marketFavorite.findMany({
    where: { userId: user.id },
    select: { listingId: true },
  });
  return rows.map((r) => r.listingId);
}

/** /favorilerim sayfası — favori ilanlar (ilan + mülk verisiyle). */
export async function getMyFavorites() {
  const { user } = await validateRequest();
  if (!user) return [];
  const rows = await db.marketFavorite.findMany({
    where: {
      userId: user.id,
      listing: { status: "ACTIVE", moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    },
    orderBy: { createdAt: "desc" },
    select: {
      listing: {
        select: {
          id: true, title: true, listingType: true, askingPrice: true, currency: true,
          monthlyRent: true, views: true, createdAt: true, featuredUntil: true, channel: true, agencyId: true,
          property: {
            select: {
              city: true, district: true, neighborhood: true, propertyType: true, roomCount: true,
              grossArea: true, bathroomCount: true, isFeatured: true,
              images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
            },
          },
        },
      },
    },
  });
  return rows.map((r) => r.listing).filter(Boolean);
}
