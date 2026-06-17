"use server";

// Sahibinden — bireysel ilan moderasyonu (yalnızca admin). Onayda kayıtlı arama bildirimi tetiklenir.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { isMarketAdmin } from "../lib/auth";
import { notifyMatchingSavedSearches } from "./notify";
import { pushNotification } from "./notifications";

async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapın.");
  if (!isMarketAdmin(user as any)) throw new Error("Yetkiniz yok.");
  return user;
}

export async function getPendingListings() {
  await requireAdmin();
  return db.listing.findMany({
    where: { moderationStatus: "PENDING", channel: "INDIVIDUAL" },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true, title: true, listingType: true, askingPrice: true, currency: true, monthlyRent: true,
      ownerUserId: true, createdAt: true,
      property: {
        select: {
          city: true, district: true, propertyType: true, roomCount: true, grossArea: true,
          ownerName: true, ownerPhone: true,
          images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
        },
      },
    },
  });
}

export async function moderateListing(listingId: string, decision: "APPROVED" | "REJECTED") {
  try {
    await requireAdmin();
    const updated = await db.listing.update({
      where: { id: listingId },
      data: { moderationStatus: decision, ...(decision === "APPROVED" ? { publishedAt: new Date() } : {}) },
      select: { id: true, title: true, ownerUserId: true },
    });

    revalidatePath("/sahibinden/admin/moderasyon");
    revalidatePath("/sahibinden/ilanlar");
    revalidatePath("/sahibinden");

    // İlan sahibine durum bildirimi
    if (updated.ownerUserId) {
      await pushNotification({
        userId: updated.ownerUserId,
        type: decision === "APPROVED" ? "LISTING_APPROVED" : "LISTING_REJECTED",
        title: decision === "APPROVED" ? "İlanınız onaylandı 🎉" : "İlanınız reddedildi",
        body: updated.title,
        link: decision === "APPROVED" ? `/sahibinden/ilan/${updated.id}` : "/sahibinden/hesabim",
      });
    }

    // Onaylanan ilan için eşleşen kayıtlı aramalara bildirim (best-effort)
    let notified: any = null;
    if (decision === "APPROVED") {
      notified = await notifyMatchingSavedSearches(listingId).catch(() => null);
    }
    return { ok: true, notified };
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
