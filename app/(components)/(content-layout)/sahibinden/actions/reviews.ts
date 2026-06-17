"use server";

// Sahibinden — satıcı (üye) değerlendirme/puan + herkese açık satıcı profili.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "./notifications";

const coverImage = {
  select: { url: true },
  orderBy: [{ isCover: "desc" as const }, { order: "asc" as const }],
  take: 1,
};

const cardSelect = {
  id: true, title: true, listingType: true, askingPrice: true, previousPrice: true, currency: true,
  monthlyRent: true, views: true, createdAt: true, featuredUntil: true, urgentUntil: true,
  highlightUntil: true, channel: true, agencyId: true,
  property: {
    select: {
      city: true, district: true, neighborhood: true, propertyType: true, roomCount: true,
      grossArea: true, bathroomCount: true, isFeatured: true, images: coverImage,
    },
  },
} as const;

/** Satıcı puanı (ortalama + adet). */
export async function getSellerRating(targetUserId: string): Promise<{ avg: number; count: number }> {
  const rows = await db.sellerReview.findMany({ where: { targetUserId }, select: { rating: true } });
  if (!rows.length) return { avg: 0, count: 0 };
  const avg = rows.reduce((s, r) => s + r.rating, 0) / rows.length;
  return { avg: Math.round(avg * 10) / 10, count: rows.length };
}

export async function getSellerReviews(targetUserId: string, limit = 50) {
  return db.sellerReview.findMany({
    where: { targetUserId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, authorUserId: true, authorName: true, rating: true, comment: true, createdAt: true },
  });
}

/** Herkese açık satıcı profili: kullanıcı bilgisi + aktif ilanları + puan. */
export async function getSellerProfile(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true, displayName: true, avatarUrl: true, createdAt: true },
  });
  if (!user) return null;

  const [listings, rating, listingCount] = await Promise.all([
    db.listing.findMany({
      where: {
        ownerUserId: userId,
        status: "ACTIVE",
        isPublic: true,
        moderationStatus: { notIn: ["PENDING", "REJECTED"] },
        NOT: { expiresAt: { lt: new Date() } },
      },
      orderBy: [{ featuredUntil: "desc" }, { bumpedAt: "desc" }, { createdAt: "desc" }],
      take: 48,
      select: cardSelect,
    }),
    getSellerRating(userId),
    db.listing.count({
      where: { ownerUserId: userId, status: "ACTIVE", moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    }),
  ]);

  return {
    user: {
      id: user.id,
      name: user.displayName ?? user.username ?? "Üye",
      avatarUrl: user.avatarUrl,
      memberSince: user.createdAt ? user.createdAt.toISOString() : null,
    },
    listings: listings.map((l) => ({ ...l, agency: null })),
    rating,
    listingCount,
  };
}

/** Değerlendirme ekle/güncelle. */
export async function addReview(targetUserId: string, rating: number, comment?: string) {
  try {
    const { user } = await validateRequest();
    if (!user) return { error: "Değerlendirme için giriş yapın.", needAuth: true };
    if (user.id === targetUserId) return { error: "Kendinizi değerlendiremezsiniz." };
    if (!(rating >= 1 && rating <= 5)) return { error: "Puan 1-5 arası olmalı." };

    await db.sellerReview.upsert({
      where: { targetUserId_authorUserId: { targetUserId, authorUserId: user.id } },
      create: {
        targetUserId,
        authorUserId: user.id,
        authorName: user.username ?? "Üye",
        rating,
        comment: comment?.trim() || null,
      },
      update: { rating, comment: comment?.trim() || null },
    });

    await pushNotification({
      userId: targetUserId,
      type: "SYSTEM",
      title: "Yeni değerlendirme aldınız",
      body: `${user.username ?? "Bir üye"} size ${rating} yıldız verdi.`,
      link: `/sahibinden/uye/${targetUserId}`,
    });

    revalidatePath(`/sahibinden/uye/${targetUserId}`);
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Değerlendirme kaydedilemedi." };
  }
}
