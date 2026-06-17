"use server";

// Sahibinden — üye ↔ ilan sahibi çift yönlü mesajlaşma (MarketThread + MarketMessage).

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "./notifications";

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Mesaj göndermek için giriş yapın.");
  return user;
}

/** İlana mesaj başlatır (varsa mevcut konuşmaya ekler). buyer = geçerli kullanıcı. */
export async function startThread(listingId: string, body: string) {
  try {
    const user = await requireUser();
    if (!body?.trim()) return { error: "Mesaj boş olamaz." };

    const listing = await db.listing.findFirst({
      where: { id: listingId, status: "ACTIVE", isPublic: true },
      select: { id: true, title: true, ownerUserId: true, agencyId: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yayında değil." };

    // Alıcı tarafı (ilan sahibi user): bireysel ilanda doğrudan, ofis ilanında ofis sahibi.
    let ownerUserId = listing.ownerUserId;
    if (!ownerUserId) {
      const ag = await db.agency.findUnique({ where: { id: listing.agencyId }, select: { ownerUserId: true } });
      ownerUserId = ag?.ownerUserId ?? null;
    }
    if (ownerUserId === user.id) return { error: "Kendi ilanınıza mesaj gönderemezsiniz." };

    // Mevcut konuşma var mı?
    let thread = await db.marketThread.findFirst({
      where: { listingId, buyerUserId: user.id },
      select: { id: true },
    });

    if (!thread) {
      thread = await db.marketThread.create({
        data: {
          listingId,
          listingTitle: listing.title,
          buyerUserId: user.id,
          buyerName: user.username ?? "Üye",
          ownerUserId,
          agencyId: listing.agencyId,
          lastMessageAt: new Date(),
          ownerUnread: 1,
        },
        select: { id: true },
      });
    } else {
      await db.marketThread.update({
        where: { id: thread.id },
        data: { lastMessageAt: new Date(), ownerUnread: { increment: 1 } },
      });
    }

    await db.marketMessage.create({
      data: { threadId: thread.id, senderUserId: user.id, senderRole: "BUYER", body: body.trim() },
    });

    if (ownerUserId) {
      await pushNotification({
        userId: ownerUserId,
        type: "MESSAGE",
        title: "Yeni mesaj",
        body: `${user.username ?? "Bir üye"}: ${body.trim().slice(0, 80)}`,
        link: `/sahibinden/mesajlar/${thread.id}`,
      });
    }

    revalidatePath("/sahibinden/mesajlar");
    return { ok: true, threadId: thread.id };
  } catch (e: any) {
    return { error: e?.message ?? "Mesaj gönderilemedi." };
  }
}

/** Konuşmaya mesaj ekler (alıcı veya satıcı). */
export async function sendMessage(threadId: string, body: string) {
  try {
    const user = await requireUser();
    if (!body?.trim()) return { error: "Mesaj boş olamaz." };

    const thread = await db.marketThread.findUnique({
      where: { id: threadId },
      select: { id: true, buyerUserId: true, ownerUserId: true, listingTitle: true },
    });
    if (!thread) return { error: "Konuşma bulunamadı." };

    const isBuyer = thread.buyerUserId === user.id;
    const isOwner = thread.ownerUserId === user.id;
    if (!isBuyer && !isOwner) return { error: "Bu konuşmaya erişiminiz yok." };

    await db.marketMessage.create({
      data: { threadId, senderUserId: user.id, senderRole: isBuyer ? "BUYER" : "OWNER", body: body.trim() },
    });
    await db.marketThread.update({
      where: { id: threadId },
      data: {
        lastMessageAt: new Date(),
        // karşı tarafın okunmamışını artır
        ...(isBuyer ? { ownerUnread: { increment: 1 } } : { buyerUnread: { increment: 1 } }),
      },
    });

    const recipient = isBuyer ? thread.ownerUserId : thread.buyerUserId;
    if (recipient) {
      await pushNotification({
        userId: recipient,
        type: "MESSAGE",
        title: "Yeni mesaj",
        body: `${user.username ?? "Yanıt"}: ${body.trim().slice(0, 80)}`,
        link: `/sahibinden/mesajlar/${threadId}`,
      });
    }

    revalidatePath(`/sahibinden/mesajlar/${threadId}`);
    revalidatePath("/sahibinden/mesajlar");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Mesaj gönderilemedi." };
  }
}

/** Gelen kutusu — kullanıcının dahil olduğu tüm konuşmalar. */
export async function getMyThreads() {
  const { user } = await validateRequest();
  if (!user) return [];
  const threads = await db.marketThread.findMany({
    where: { OR: [{ buyerUserId: user.id }, { ownerUserId: user.id }] },
    orderBy: { lastMessageAt: "desc" },
    take: 100,
    select: {
      id: true, listingId: true, listingTitle: true, buyerUserId: true, buyerName: true,
      ownerUserId: true, lastMessageAt: true, buyerUnread: true, ownerUnread: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1, select: { body: true, senderRole: true, createdAt: true } },
    },
  });

  // İlan kapak görselleri
  const ids = [...new Set(threads.map((t) => t.listingId))];
  const listings = ids.length
    ? await db.listing.findMany({
        where: { id: { in: ids } },
        select: { id: true, property: { select: { images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 } } } },
      })
    : [];
  const coverMap = new Map(listings.map((l) => [l.id, l.property?.images?.[0]?.url ?? null]));

  return threads.map((t) => {
    const isBuyer = t.buyerUserId === user.id;
    return {
      id: t.id,
      listingId: t.listingId,
      listingTitle: t.listingTitle,
      cover: coverMap.get(t.listingId) ?? null,
      role: isBuyer ? "BUYER" : "OWNER",
      counterpart: isBuyer ? "İlan sahibi" : t.buyerName,
      unread: isBuyer ? t.buyerUnread : t.ownerUnread,
      lastMessageAt: t.lastMessageAt,
      lastMessage: t.messages[0]?.body ?? "",
    };
  });
}

/** Tek konuşma + mesajlar. Açan kullanıcının okunmamışını sıfırlar. */
export async function getThread(threadId: string) {
  const { user } = await validateRequest();
  if (!user) return null;

  const thread = await db.marketThread.findUnique({
    where: { id: threadId },
    select: {
      id: true, listingId: true, listingTitle: true, buyerUserId: true, buyerName: true, ownerUserId: true,
      messages: { orderBy: { createdAt: "asc" }, select: { id: true, body: true, senderRole: true, senderUserId: true, createdAt: true } },
    },
  });
  if (!thread) return null;

  const isBuyer = thread.buyerUserId === user.id;
  const isOwner = thread.ownerUserId === user.id;
  if (!isBuyer && !isOwner) return null;

  // Okunmamışı sıfırla
  await db.marketThread.update({
    where: { id: threadId },
    data: isBuyer ? { buyerUnread: 0 } : { ownerUnread: 0 },
  }).catch(() => {});

  return {
    id: thread.id,
    listingId: thread.listingId,
    listingTitle: thread.listingTitle,
    myRole: isBuyer ? "BUYER" : "OWNER",
    counterpart: isBuyer ? "İlan sahibi" : thread.buyerName,
    messages: thread.messages.map((m) => ({ ...m, mine: m.senderUserId === user.id })),
  };
}

/** Nav rozetleri için toplam okunmamış. */
export async function getUnreadTotal(): Promise<number> {
  const { user } = await validateRequest();
  if (!user) return 0;
  const rows = await db.marketThread.findMany({
    where: { OR: [{ buyerUserId: user.id }, { ownerUserId: user.id }] },
    select: { buyerUserId: true, buyerUnread: true, ownerUnread: true },
  });
  return rows.reduce((s, t) => s + (t.buyerUserId === user.id ? t.buyerUnread : t.ownerUnread), 0);
}
