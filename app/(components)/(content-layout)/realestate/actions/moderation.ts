"use server";

// İlan moderasyonu — yalnızca pazar yeri admini
// (roleGayrimenkul ∈ {SUPER_ADMIN, ADMIN} VEYA roleestate=ADMIN).

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { isRealestateAdmin } from "../lib/auth";

async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapın.");
  if (!isRealestateAdmin(user as any)) throw new Error("Yetkiniz yok.");
  return user;
}

export async function getPendingListings() {
  await requireAdmin();
  return db.listing.findMany({
    where: { moderationStatus: "PENDING", channel: "INDIVIDUAL" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, listingType: true, askingPrice: true, currency: true,
      ownerUserId: true, createdAt: true,
      property: {
        select: {
          city: true, district: true, propertyType: true, roomCount: true, ownerName: true, ownerPhone: true,
          images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
        },
      },
    },
  });
}

export async function moderateListing(listingId: string, decision: "APPROVED" | "REJECTED") {
  try {
    await requireAdmin();
    await db.listing.update({
      where: { id: listingId },
      data: { moderationStatus: decision },
    });
    revalidatePath("/realestate/admin/moderation");
    revalidatePath("/realestate/ilanlar");
    revalidatePath("/realestate");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "İşlem başarısız." };
  }
}

export async function getModerationCount() {
  try {
    await requireAdmin();
    return db.listing.count({ where: { moderationStatus: "PENDING", channel: "INDIVIDUAL" } });
  } catch {
    return 0;
  }
}
