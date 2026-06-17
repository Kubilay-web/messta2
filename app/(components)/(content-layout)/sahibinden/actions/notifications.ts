"use server";

// Sahibinden — uygulama içi bildirim merkezi (MarketNotification).

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export type NotifType = "MESSAGE" | "LISTING_APPROVED" | "LISTING_REJECTED" | "SAVED_SEARCH" | "INQUIRY" | "PRICE_DROP" | "SYSTEM";

/** Bildirim oluşturur (diğer action'lardan tetiklenir; best-effort). */
export async function pushNotification(input: {
  userId: string;
  type: NotifType;
  title: string;
  body?: string;
  link?: string;
}) {
  try {
    if (!input.userId) return;
    await db.marketNotification.create({
      data: {
        userId: input.userId,
        type: input.type,
        title: input.title,
        body: input.body ?? null,
        link: input.link ?? null,
      },
    });
  } catch {
    /* bildirim hatası akışı engellemesin */
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  const { user } = await validateRequest();
  if (!user) return 0;
  return db.marketNotification.count({ where: { userId: user.id, readAt: null } });
}

export async function getMyNotifications(limit = 30) {
  const { user } = await validateRequest();
  if (!user) return [];
  return db.marketNotification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: { id: true, type: true, title: true, body: true, link: true, readAt: true, createdAt: true },
  });
}

export async function markNotificationRead(id: string) {
  const { user } = await validateRequest();
  if (!user) return { error: "Giriş yapın." };
  await db.marketNotification.updateMany({ where: { id, userId: user.id }, data: { readAt: new Date() } });
  return { ok: true };
}

export async function markAllNotificationsRead() {
  const { user } = await validateRequest();
  if (!user) return { error: "Giriş yapın." };
  await db.marketNotification.updateMany({ where: { userId: user.id, readAt: null }, data: { readAt: new Date() } });
  return { ok: true };
}
