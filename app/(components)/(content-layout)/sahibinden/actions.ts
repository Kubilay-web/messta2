"use server";

import prisma from "@/app/lib/prisma";
import { validateRequest, lucia } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { slugify, genListingNo } from "./lib/format";
import { sendMail, mailNewMessage, mailNewReview, mailListingModeration } from "./lib/mail";
import { resolveLocationId, getCategoryWithDescendants } from "./data";
import { buyDopingWithWallet } from "./payments";
import type { ListingFormInput, ActionResult } from "./lib/types";

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) return null;
  return user;
}

/** Kısa dönem kiralama alanlarını forma göre normalize eder. */
function rentalFields(input: ListingFormInput) {
  const num = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : null;
  };
  const int = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };
  const rentable = !!input.rentable;
  const policy = String(input.cancellationPolicy ?? "MODERATE").toUpperCase();
  const validPolicy = ["FLEXIBLE", "MODERATE", "STRICT"].includes(policy) ? policy : "MODERATE";
  const clean = (v: unknown) => {
    const s = typeof v === "string" ? v.trim() : "";
    return s ? s.slice(0, 2000) : null;
  };
  return {
    rentable,
    dailyPrice: rentable ? num(input.dailyPrice) : null,
    weeklyPrice: rentable ? num(input.weeklyPrice) : null,
    monthlyPrice: rentable ? num(input.monthlyPrice) : null,
    cleaningFee: rentable ? num(input.cleaningFee) : null,
    rentDeposit: rentable ? num(input.rentDeposit) : null,
    minNights: rentable ? int(input.minNights) : null,
    maxNights: rentable ? int(input.maxNights) : null,
    maxGuests: rentable ? int(input.maxGuests) : null,
    instantBook: rentable ? !!input.instantBook : false,
    cancellationPolicy: rentable ? validPolicy : "MODERATE",
    houseRules: rentable ? clean(input.houseRules) : null,
    checkInInstructions: rentable ? clean(input.checkInInstructions) : null,
  };
}

/** attributes JSON'undan indeksli/denormalize alanları türetir (m², bina yaşı). */
function deriveDenormalized(attributes?: Record<string, unknown> | null) {
  const a = (attributes ?? {}) as Record<string, unknown>;
  const grossArea = Number(a.grossArea);
  const buildingAge = Number(a.buildingAge);
  return {
    areaGross: Number.isFinite(grossArea) && grossArea > 0 ? grossArea : null,
    buildingAge: Number.isFinite(buildingAge) && buildingAge >= 0 ? Math.round(buildingAge) : null,
  };
}

/** Çakışmayan (benzersiz) bir ilan numarası üretir. */
async function uniqueListingNo(): Promise<number> {
  let n = genListingNo();
  for (let i = 0; i < 8; i++) {
    const exists = await prisma.shListing.findUnique({ where: { listingNo: n }, select: { id: true } });
    if (!exists) return n;
    n = genListingNo();
  }
  return n;
}

// ---------------------------------------------------------------------------
//  İlan oluştur / güncelle / sil
// ---------------------------------------------------------------------------

export async function createListing(input: ListingFormInput): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapmalısınız." };

  if (!input.title?.trim()) return { ok: false, error: "Başlık zorunludur." };
  if (!input.categoryId) return { ok: false, error: "Kategori seçiniz." };
  if (!(input.price >= 0)) return { ok: false, error: "Geçerli bir fiyat giriniz." };

  // benzersiz ilan no üret (çok düşük ihtimalli çakışmaya karşı birkaç deneme)
  const listingNo = await uniqueListingNo();

  const created = await prisma.shListing.create({
    data: {
      listingNo,
      title: input.title.trim(),
      slug: slugify(input.title),
      description: input.description ?? "",
      price: Number(input.price) || 0,
      currency: (input.currency as any) || "TRY",
      type: (input.type as any) || "SALE",
      categoryId: input.categoryId,
      userId: user.id,
      storeId: input.storeId || null,
      agentId: input.agentId || null,
      locationId: await resolveLocationId(input.city, input.district),
      city: input.city || null,
      district: input.district || null,
      neighborhood: input.neighborhood || null,
      address: input.address || null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
      images: input.images ?? [],
      floorPlans: input.floorPlans ?? [],
      videoUrl: input.videoUrl || null,
      tourImageUrl: input.tourImageUrl || null,
      attributes: (input.attributes ?? {}) as any,
      ...deriveDenormalized(input.attributes),
      contactName: input.contactName || user.displayName || null,
      contactPhone: input.contactPhone || null,
      showPhone: input.showPhone ?? true,
      isUrgent: input.isUrgent ?? false,
      isNegotiable: input.isNegotiable ?? false,
      acceptsSwap: input.acceptsSwap ?? false,
      securePayment: input.securePayment ?? false,
      ...rentalFields(input),
      status: "ACTIVE",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  // Kayıtlı arama eşleşmelerini bildir (event-driven alarm)
  try {
    await matchSavedSearches(created);
  } catch {
    /* alarm hatası ilan akışını bozmasın */
  }

  revalidatePath("/sahibinden");
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  return { ok: true, data: { id: created.id } };
}

/** Yeni ilanı kayıtlı aramalarla eşleştirir; eşleşen kullanıcıya bildirim + mail. */
export async function matchSavedSearches(listing: {
  id: string;
  categoryId: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  city: string | null;
  type: string;
}) {
  const searches = await prisma.shSavedSearch.findMany();
  if (searches.length === 0) return;

  // kategori slug -> id seti önbelleği
  const subtreeCache = new Map<string, Set<string>>();
  async function subtreeIds(slug: string) {
    if (subtreeCache.has(slug)) return subtreeCache.get(slug)!;
    const desc = await getCategoryWithDescendants(slug);
    const set = new Set(desc?.ids ?? []);
    subtreeCache.set(slug, set);
    return set;
  }

  const text = `${listing.title} ${listing.description}`.toLowerCase();

  for (const ss of searches) {
    if (ss.userId === listing.userId) continue;
    const q = (ss.query as any) ?? {};

    if (q.categorySlug) {
      const ids = await subtreeIds(q.categorySlug);
      if (!ids.has(listing.categoryId)) continue;
    }
    if (q.type && q.type !== listing.type) continue;
    if (q.city && q.city !== listing.city) continue;
    if (q.minPrice != null && listing.price < Number(q.minPrice)) continue;
    if (q.maxPrice != null && listing.price > Number(q.maxPrice)) continue;
    if (q.q && !text.includes(String(q.q).toLowerCase())) continue;

    await prisma.shNotification
      .create({
        data: {
          userId: ss.userId,
          type: "SAVED_SEARCH_MATCH",
          title: "Kayıtlı aramanıza uygun yeni ilan",
          body: `${ss.name}: ${listing.title}`,
          link: `/sahibinden/ilan/${listing.id}`,
          listingId: listing.id,
        },
      })
      .catch(() => {});

    try {
      const owner = await prisma.user.findUnique({ where: { id: ss.userId }, select: { email: true } });
      if (owner?.email) {
        await sendMail({
          to: owner.email,
          subject: `"${ss.name}" aramanıza uygun yeni ilan`,
          html: `<div style="font-family:Arial;padding:16px"><p><strong>${listing.title}</strong> ilanı kayıtlı aramanızla eşleşti.</p><p><a href="${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/sahibinden/ilan/${listing.id}">İlanı görüntüle</a></p></div>`,
        });
      }
    } catch {
      /* yok say */
    }
  }
}

export async function saveSearchAndNotify(name: string, query: Record<string, unknown>): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Aramayı kaydetmek için giriş yapın." };
  await prisma.shSavedSearch.create({ data: { userId: user.id, name, query: query as any } });
  revalidatePath("/sahibinden/hesabim/aramalarim");
  return { ok: true };
}

export async function deleteSavedSearch(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const ss = await prisma.shSavedSearch.findUnique({ where: { id } });
  if (!ss || ss.userId !== user.id) return { ok: false, error: "Yetkiniz yok." };
  await prisma.shSavedSearch.delete({ where: { id } });
  revalidatePath("/sahibinden/hesabim/aramalarim");
  return { ok: true };
}

export async function updateListing(input: ListingFormInput): Promise<ActionResult<{ id: string }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapmalısınız." };
  if (!input.id) return { ok: false, error: "İlan bulunamadı." };

  const existing = await prisma.shListing.findUnique({ where: { id: input.id } });
  if (!existing) return { ok: false, error: "İlan bulunamadı." };
  if (existing.userId !== user.id) return { ok: false, error: "Bu ilanı düzenleme yetkiniz yok." };

  // Fiyat değiştiyse fiyat geçmişine kaydet
  const newPrice = Number(input.price) || 0;
  if (newPrice !== existing.price) {
    await prisma.shPriceHistory
      .create({
        data: {
          listingId: existing.id,
          oldPrice: existing.price,
          newPrice,
          currency: (input.currency as any) || existing.currency,
        },
      })
      .catch(() => {});
  }

  await prisma.shListing.update({
    where: { id: input.id },
    data: {
      title: input.title.trim(),
      slug: slugify(input.title),
      description: input.description ?? "",
      price: newPrice,
      currency: (input.currency as any) || "TRY",
      type: (input.type as any) || "SALE",
      categoryId: input.categoryId,
      storeId: input.storeId || null,
      agentId: input.agentId || null,
      locationId: await resolveLocationId(input.city, input.district),
      city: input.city || null,
      district: input.district || null,
      neighborhood: input.neighborhood || null,
      address: input.address || null,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
      images: input.images ?? [],
      floorPlans: input.floorPlans ?? [],
      videoUrl: input.videoUrl || null,
      tourImageUrl: input.tourImageUrl || null,
      attributes: (input.attributes ?? {}) as any,
      ...deriveDenormalized(input.attributes),
      contactName: input.contactName || null,
      contactPhone: input.contactPhone || null,
      showPhone: input.showPhone ?? true,
      isUrgent: input.isUrgent ?? false,
      isNegotiable: input.isNegotiable ?? false,
      acceptsSwap: input.acceptsSwap ?? false,
      securePayment: input.securePayment ?? false,
      ...rentalFields(input),
    },
  });

  revalidatePath(`/sahibinden/ilan/${input.id}`);
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  return { ok: true, data: { id: input.id } };
}

export async function deleteListing(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapmalısınız." };
  const existing = await prisma.shListing.findUnique({ where: { id } });
  if (!existing) return { ok: false, error: "İlan bulunamadı." };
  if (existing.userId !== user.id) return { ok: false, error: "Yetkiniz yok." };

  await prisma.shListing.delete({ where: { id } });
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  return { ok: true };
}

export async function setListingStatus(id: string, status: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapmalısınız." };
  const existing = await prisma.shListing.findUnique({ where: { id } });
  if (!existing || existing.userId !== user.id) return { ok: false, error: "Yetkiniz yok." };

  await prisma.shListing.update({ where: { id }, data: { status: status as any } });
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  revalidatePath(`/sahibinden/ilan/${id}`);
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Görüntülenme
// ---------------------------------------------------------------------------

function today() {
  return new Date().toISOString().slice(0, 10); // yyyy-mm-dd
}

export async function incrementView(id: string) {
  try {
    await prisma.shListing.update({ where: { id }, data: { viewCount: { increment: 1 } } });
    await prisma.shListingStat.upsert({
      where: { listingId_date: { listingId: id, date: today() } },
      update: { views: { increment: 1 } },
      create: { listingId: id, date: today(), views: 1, favorites: 0 },
    });
  } catch {
    /* sessizce geç */
  }
}

// ---------------------------------------------------------------------------
//  Favori
// ---------------------------------------------------------------------------

export async function toggleFavorite(listingId: string): Promise<ActionResult<{ favorited: boolean }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Favorilere eklemek için giriş yapın." };

  const existing = await prisma.shFavorite.findUnique({
    where: { userId_listingId: { userId: user.id, listingId } },
  });

  if (existing) {
    await prisma.shFavorite.delete({ where: { id: existing.id } });
    await prisma.shListing.update({
      where: { id: listingId },
      data: { favoriteCount: { decrement: 1 } },
    }).catch(() => {});
    revalidatePath("/sahibinden/hesabim/favorilerim");
    return { ok: true, data: { favorited: false } };
  }

  await prisma.shFavorite.create({ data: { userId: user.id, listingId } });
  await prisma.shListing.update({
    where: { id: listingId },
    data: { favoriteCount: { increment: 1 } },
  }).catch(() => {});
  await prisma.shListingStat.upsert({
    where: { listingId_date: { listingId, date: today() } },
    update: { favorites: { increment: 1 } },
    create: { listingId, date: today(), views: 0, favorites: 1 },
  }).catch(() => {});
  revalidatePath("/sahibinden/hesabim/favorilerim");
  return { ok: true, data: { favorited: true } };
}

// ---------------------------------------------------------------------------
//  Mesaj
// ---------------------------------------------------------------------------

/** İlan + alıcı + satıcı için konuşmayı bulur/oluşturur (satıcı = ilan sahibi). */
async function ensureConversation(listingId: string, a: string, b: string, sellerId: string) {
  const buyerId = a === sellerId ? b : a;
  const conv = await prisma.shConversation.upsert({
    where: { listingId_buyerId_sellerId: { listingId, buyerId, sellerId } },
    update: {},
    create: { listingId, buyerId, sellerId },
  });
  return conv;
}

async function deliverMessage(opts: {
  listingId: string;
  senderId: string;
  receiverId: string;
  sellerId: string;
  content: string;
  listingTitle?: string;
  kind?: "TEXT" | "IMAGE" | "CALL" | "VOICE" | "FILE";
  imageUrl?: string | null;
  audioUrl?: string | null;
  audioDuration?: number | null;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
  callOutcome?: string | null;
  callDuration?: number | null;
  callVideo?: boolean;
  replyToId?: string | null;
}) {
  const conv = await ensureConversation(opts.listingId, opts.senderId, opts.receiverId, opts.sellerId);
  const senderIsBuyer = conv.buyerId === opts.senderId;
  const kind = opts.kind ?? "TEXT";

  // Yanıtlanan mesaj gerçekten bu konuşmaya mı ait? (güvenlik)
  let replyToId: string | null = null;
  if (opts.replyToId) {
    const parent = await prisma.shMessage.findFirst({
      where: { id: opts.replyToId, conversationId: conv.id },
      select: { id: true },
    });
    replyToId = parent?.id ?? null;
  }

  await prisma.shMessage.create({
    data: {
      listingId: opts.listingId,
      conversationId: conv.id,
      senderId: opts.senderId,
      receiverId: opts.receiverId,
      content: opts.content.trim(),
      kind,
      imageUrl: opts.imageUrl ?? null,
      audioUrl: opts.audioUrl ?? null,
      audioDuration: opts.audioDuration ?? null,
      fileUrl: opts.fileUrl ?? null,
      fileName: opts.fileName ?? null,
      fileSize: opts.fileSize ?? null,
      callOutcome: opts.callOutcome ?? null,
      callDuration: opts.callDuration ?? null,
      callVideo: opts.callVideo ?? true,
      replyToId,
    },
  });

  // Bildirim/önizleme metni türüne göre
  const preview =
    kind === "IMAGE"
      ? "📷 Fotoğraf"
      : kind === "VOICE"
        ? "🎤 Sesli mesaj"
        : kind === "FILE"
          ? `📎 ${opts.fileName ?? "Dosya"}`
          : kind === "CALL"
            ? opts.callVideo === false
              ? "📞 Sesli arama"
              : "📹 Görüntülü arama"
            : opts.content.trim();

  await prisma.shConversation.update({
    where: { id: conv.id },
    data: {
      lastMessageAt: new Date(),
      ...(senderIsBuyer
        ? { sellerUnread: { increment: 1 }, sellerArchived: false }
        : { buyerUnread: { increment: 1 }, buyerArchived: false }),
    },
  });

  await prisma.shListing
    .update({ where: { id: opts.listingId }, data: { messageCount: { increment: 1 } } })
    .catch(() => {});

  // Arama kayıtları için ayrı bildirim üretme (arama akışı kendi bildirimini yönetir).
  if (kind !== "CALL") {
    await prisma.shNotification
      .create({
        data: {
          userId: opts.receiverId,
          type: "NEW_MESSAGE",
          title: "Yeni mesajınız var",
          body: preview.slice(0, 120),
          link: "/sahibinden/hesabim/mesajlarim",
          listingId: opts.listingId,
        },
      })
      .catch(() => {});
  }

  // E-posta bildirimi (Resend) — arama kayıtları hariç
  if (kind !== "CALL") {
    try {
      const [receiver, sender] = await Promise.all([
        prisma.user.findUnique({ where: { id: opts.receiverId }, select: { email: true } }),
        prisma.user.findUnique({ where: { id: opts.senderId }, select: { displayName: true, name: true, username: true } }),
      ]);
      if (receiver?.email) {
        const senderName = sender?.displayName || sender?.name || sender?.username || "Bir kullanıcı";
        const tpl = mailNewMessage({
          senderName,
          listingTitle: opts.listingTitle ?? "İlanınız",
          preview,
        });
        await sendMail({ to: receiver.email, ...tpl });
      }
    } catch {
      /* mail hatası akışı bozmasın */
    }
  }

  return conv;
}

export async function sendMessage(listingId: string, content: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Mesaj göndermek için giriş yapın." };
  if (!content?.trim()) return { ok: false, error: "Mesaj boş olamaz." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (listing.userId === user.id) return { ok: false, error: "Kendi ilanınıza mesaj gönderemezsiniz." };
  if (await isBlockedBetween(user.id, listing.userId))
    return { ok: false, error: "Bu kullanıcıyla mesajlaşamazsınız." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId: listing.userId,
    sellerId: listing.userId,
    content,
    listingTitle: listing.title,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

export async function replyMessage(
  listingId: string,
  receiverId: string,
  content: string,
  replyToId?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!content?.trim()) return { ok: false, error: "Mesaj boş olamaz." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (await isBlockedBetween(user.id, receiverId))
    return { ok: false, error: "Bu kullanıcıyla mesajlaşamazsınız." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId,
    sellerId: listing.userId,
    content,
    listingTitle: listing.title,
    replyToId: replyToId ?? null,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** Bir mesaja emoji reaksiyonu ekler/kaldırır (toggle). */
export async function toggleReaction(messageId: string, emoji: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!emoji?.trim()) return { ok: false, error: "Emoji gerekli." };

  const msg = await prisma.shMessage.findUnique({
    where: { id: messageId },
    select: { senderId: true, receiverId: true, reactions: true },
  });
  if (!msg) return { ok: false, error: "Mesaj bulunamadı." };
  if (msg.senderId !== user.id && msg.receiverId !== user.id)
    return { ok: false, error: "Yetkiniz yok." };

  const list = (Array.isArray(msg.reactions) ? msg.reactions : []) as { userId: string; emoji: string }[];
  const existing = list.find((r) => r.userId === user.id && r.emoji === emoji);
  const next = existing
    ? list.filter((r) => !(r.userId === user.id && r.emoji === emoji)) // aynı emoji → kaldır
    : [...list.filter((r) => r.userId !== user.id), { userId: user.id, emoji }]; // kullanıcı başına tek reaksiyon

  await prisma.shMessage.update({ where: { id: messageId }, data: { reactions: next } });
  return { ok: true };
}

export async function markConversationRead(listingId: string, otherUserId: string) {
  const user = await requireUser();
  if (!user) return;
  await prisma.shMessage.updateMany({
    where: { listingId, senderId: otherUserId, receiverId: user.id, isRead: false },
    data: { isRead: true },
  });
  // konuşma sayaçlarını da sıfırla
  const conv = await prisma.shConversation.findFirst({
    where: {
      listingId,
      OR: [
        { buyerId: user.id, sellerId: otherUserId },
        { buyerId: otherUserId, sellerId: user.id },
      ],
    },
    select: { id: true, buyerId: true },
  });
  if (conv) {
    await prisma.shConversation.update({
      where: { id: conv.id },
      data: conv.buyerId === user.id ? { buyerUnread: 0 } : { sellerUnread: 0 },
    }).catch(() => {});
  }
  revalidatePath("/sahibinden/hesabim/mesajlarim");
}

/** Fotoğraf mesajı gönderir (Cloudinary URL'i client'tan gelir). */
export async function replyImageMessage(
  listingId: string,
  receiverId: string,
  imageUrl: string,
  caption?: string,
  replyToId?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!imageUrl?.trim()) return { ok: false, error: "Görsel bulunamadı." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (await isBlockedBetween(user.id, receiverId))
    return { ok: false, error: "Bu kullanıcıyla mesajlaşamazsınız." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId,
    sellerId: listing.userId,
    content: caption?.trim() || "",
    listingTitle: listing.title,
    kind: "IMAGE",
    imageUrl: imageUrl.trim(),
    replyToId: replyToId ?? null,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** Sesli mesaj gönderir (Cloudinary ses URL'i client'tan gelir). */
export async function sendVoiceMessage(
  listingId: string,
  receiverId: string,
  audioUrl: string,
  audioDuration: number,
  replyToId?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!audioUrl?.trim()) return { ok: false, error: "Ses kaydı bulunamadı." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (await isBlockedBetween(user.id, receiverId))
    return { ok: false, error: "Bu kullanıcıyla mesajlaşamazsınız." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId,
    sellerId: listing.userId,
    content: "",
    listingTitle: listing.title,
    kind: "VOICE",
    audioUrl: audioUrl.trim(),
    audioDuration: Math.max(0, Math.round(audioDuration)),
    replyToId: replyToId ?? null,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** Dosya/belge mesajı gönderir (Cloudinary dosya URL'i client'tan gelir). */
export async function sendFileMessage(
  listingId: string,
  receiverId: string,
  fileUrl: string,
  fileName: string,
  fileSize: number,
  replyToId?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!fileUrl?.trim()) return { ok: false, error: "Dosya bulunamadı." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (await isBlockedBetween(user.id, receiverId))
    return { ok: false, error: "Bu kullanıcıyla mesajlaşamazsınız." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId,
    sellerId: listing.userId,
    content: "",
    listingTitle: listing.title,
    kind: "FILE",
    fileUrl: fileUrl.trim(),
    fileName: (fileName || "Dosya").slice(0, 200),
    fileSize: Math.max(0, Math.round(fileSize)),
    replyToId: replyToId ?? null,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** Bir metin mesajını (yalnızca gönderen) düzenler. */
export async function editMessage(messageId: string, content: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!content?.trim()) return { ok: false, error: "Mesaj boş olamaz." };

  const msg = await prisma.shMessage.findUnique({
    where: { id: messageId },
    select: { senderId: true, kind: true, deletedAt: true },
  });
  if (!msg) return { ok: false, error: "Mesaj bulunamadı." };
  if (msg.senderId !== user.id) return { ok: false, error: "Yalnızca kendi mesajınızı düzenleyebilirsiniz." };
  if (msg.deletedAt) return { ok: false, error: "Silinmiş mesaj düzenlenemez." };
  if (msg.kind !== "TEXT") return { ok: false, error: "Yalnızca metin mesajları düzenlenebilir." };

  await prisma.shMessage.update({
    where: { id: messageId },
    data: { content: content.trim(), editedAt: new Date() },
  });
  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** Bir mesajı (yalnızca gönderen) yumuşak siler. */
export async function deleteMessage(messageId: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const msg = await prisma.shMessage.findUnique({ where: { id: messageId }, select: { senderId: true } });
  if (!msg) return { ok: false, error: "Mesaj bulunamadı." };
  if (msg.senderId !== user.id) return { ok: false, error: "Yalnızca kendi mesajınızı silebilirsiniz." };
  await prisma.shMessage.update({
    where: { id: messageId },
    data: { deletedAt: new Date(), content: "", imageUrl: null },
  });
  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

/** "yazıyor..." göstergesi: konuşmadaki rolüne göre tuş zamanını günceller. */
export async function setTyping(listingId: string, otherId: string): Promise<void> {
  const user = await requireUser();
  if (!user) return;
  const listing = await prisma.shListing.findUnique({ where: { id: listingId }, select: { userId: true } });
  if (!listing) return;
  const sellerId = listing.userId;
  const buyerId = user.id === sellerId ? otherId : user.id;
  const meIsBuyer = user.id === buyerId;
  await prisma.shConversation
    .update({
      where: { listingId_buyerId_sellerId: { listingId, buyerId, sellerId } },
      data: meIsBuyer ? { buyerTypingAt: new Date() } : { sellerTypingAt: new Date() },
    })
    .catch(() => {
      // konuşma yoksa oluştur
      return prisma.shConversation
        .create({
          data: {
            listingId,
            buyerId,
            sellerId,
            ...(meIsBuyer ? { buyerTypingAt: new Date() } : { sellerTypingAt: new Date() }),
          },
        })
        .catch(() => {});
    });
}

/** Çevrimiçi/son görülme: kullanıcının son aktiflik zamanını günceller. */
export async function touchPresence(): Promise<void> {
  const user = await requireUser();
  if (!user) return;
  await prisma.user.update({ where: { id: user.id }, data: { shLastSeenAt: new Date() } }).catch(() => {});
}

/** Görüntülü/sesli arama bittiğinde konuşmaya bir arama kaydı düşer. */
export async function logCallRecord(opts: {
  listingId: string;
  otherId: string;
  outcome: "answered" | "missed" | "rejected" | "cancelled";
  duration?: number;
  video?: boolean;
}): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const listing = await prisma.shListing.findUnique({
    where: { id: opts.listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };

  await deliverMessage({
    listingId: opts.listingId,
    senderId: user.id,
    receiverId: opts.otherId,
    sellerId: listing.userId,
    content: "",
    listingTitle: listing.title,
    kind: "CALL",
    callOutcome: opts.outcome,
    callDuration: opts.duration ?? null,
    callVideo: opts.video ?? true,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Şikayet
// ---------------------------------------------------------------------------

export async function reportListing(
  listingId: string,
  reason: string,
  description?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  await prisma.shReport.create({
    data: { listingId, userId: user.id, reason, description: description || null },
  });
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Kayıtlı arama
// ---------------------------------------------------------------------------

export async function saveSearch(name: string, query: Record<string, unknown>): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  await prisma.shSavedSearch.create({
    data: { userId: user.id, name, query: query as any },
  });
  revalidatePath("/sahibinden/hesabim");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Son baktıkların
// ---------------------------------------------------------------------------

export async function recordRecentView(listingId: string) {
  const { user } = await validateRequest();
  if (!user) return;
  try {
    await prisma.shRecentView.upsert({
      where: { userId_listingId: { userId: user.id, listingId } },
      update: { viewedAt: new Date() },
      create: { userId: user.id, listingId },
    });
  } catch {
    /* yok say */
  }
}

// ---------------------------------------------------------------------------
//  Doping (ücretli öne çıkarma)
// ---------------------------------------------------------------------------

/**
 * Geriye-uyum: doping satın alımı artık ücretsiz (demo) değil — cüzdandan
 * gerçek tahsilat yapar. Kartla ödeme için /api/doping/{stripe|paypal} kullanılır.
 */
export async function buyDoping(listingId: string, packageId: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const res = await buyDopingWithWallet(user.id, listingId, packageId);
  if (!res.ok) return { ok: false, error: res.error };
  revalidatePath(`/sahibinden/ilan/${listingId}`);
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  revalidatePath("/sahibinden");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Bildirimler
// ---------------------------------------------------------------------------

export async function markNotificationsRead(): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  await prisma.shNotification.updateMany({
    where: { userId: user.id, isRead: false },
    data: { isRead: true },
  });
  revalidatePath("/sahibinden/hesabim");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Mağaza (Store)
// ---------------------------------------------------------------------------

export interface StoreInput {
  name: string;
  type: string;
  about?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  city?: string;
  taxOffice?: string;
  taxNumber?: string;
  logo?: string;
  banner?: string;
}

export async function upsertStore(input: StoreInput): Promise<ActionResult<{ slug: string }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!input.name?.trim()) return { ok: false, error: "Mağaza adı zorunludur." };

  const existing = await prisma.shStore.findFirst({ where: { ownerId: user.id } });

  // benzersiz slug
  let slug = slugify(input.name);
  if (!existing || existing.slug !== slug) {
    let candidate = slug;
    for (let i = 0; i < 6; i++) {
      const taken = await prisma.shStore.findUnique({ where: { slug: candidate } });
      if (!taken || taken.id === existing?.id) break;
      candidate = `${slug}-${Math.floor(Math.random() * 9999)}`;
    }
    slug = candidate;
  }

  const data = {
    name: input.name.trim(),
    type: (input.type as any) || "CORPORATE",
    about: input.about || null,
    phone: input.phone || null,
    email: input.email || null,
    website: input.website || null,
    address: input.address || null,
    city: input.city || null,
    taxOffice: input.taxOffice || null,
    taxNumber: input.taxNumber || null,
    logo: input.logo || null,
    banner: input.banner || null,
  };

  if (existing) {
    await prisma.shStore.update({ where: { id: existing.id }, data: { ...data, slug } });
  } else {
    await prisma.shStore.create({ data: { ...data, slug, ownerId: user.id } });
  }

  revalidatePath("/sahibinden/hesabim/magaza");
  revalidatePath(`/sahibinden/magaza/${slug}`);
  return { ok: true, data: { slug } };
}

// ---------------------------------------------------------------------------
//  Değerlendirme (Review)
// ---------------------------------------------------------------------------

export async function submitReview(params: {
  targetUserId: string;
  rating: number;
  comment?: string;
  listingId?: string;
  storeId?: string;
}): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (user.id === params.targetUserId) return { ok: false, error: "Kendinizi değerlendiremezsiniz." };
  const rating = Math.min(5, Math.max(1, Math.round(params.rating)));

  const existing = await prisma.shReview.findFirst({
    where: { authorId: user.id, targetUserId: params.targetUserId },
  });
  if (existing) {
    await prisma.shReview.update({
      where: { id: existing.id },
      data: { rating, comment: params.comment || null, storeId: params.storeId || null, listingId: params.listingId || null },
    });
  } else {
    await prisma.shReview.create({
      data: {
        authorId: user.id,
        targetUserId: params.targetUserId,
        rating,
        comment: params.comment || null,
        storeId: params.storeId || null,
        listingId: params.listingId || null,
      },
    });
  }

  // Mağaza puanını yeniden hesapla
  if (params.storeId) {
    const agg = await prisma.shReview.aggregate({
      where: { storeId: params.storeId },
      _avg: { rating: true },
      _count: true,
    });
    await prisma.shStore
      .update({
        where: { id: params.storeId },
        data: { rating: agg._avg.rating ?? 0, reviewCount: agg._count },
      })
      .catch(() => {});
  }

  // Bildirim + mail
  await prisma.shNotification
    .create({
      data: {
        userId: params.targetUserId,
        type: "FAVORITE_SOLD",
        title: "Yeni değerlendirme aldınız",
        body: `${rating}/5 puan`,
        link: "/sahibinden/hesabim",
      },
    })
    .catch(() => {});

  try {
    const [target, author] = await Promise.all([
      prisma.user.findUnique({ where: { id: params.targetUserId }, select: { email: true } }),
      prisma.user.findUnique({ where: { id: user.id }, select: { displayName: true, name: true, username: true } }),
    ]);
    if (target?.email) {
      const tpl = mailNewReview({
        authorName: author?.displayName || author?.name || author?.username || "Bir kullanıcı",
        rating,
        comment: params.comment,
      });
      await sendMail({ to: target.email, ...tpl });
    }
  } catch {
    /* yok say */
  }

  revalidatePath("/sahibinden/hesabim");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Emlak: gezme randevusu
// ---------------------------------------------------------------------------

export async function requestViewing(params: {
  listingId: string;
  scheduledAt: string;
  note?: string;
  phone?: string;
  mode?: "FACE_TO_FACE" | "VIDEO";
  durationMin?: number;
  alternativeSlots?: string[]; // kiracının önerdiği yedek saatler (ISO)
}): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Randevu için giriş yapın." };
  if (!params.scheduledAt) return { ok: false, error: "Tarih/saat seçiniz." };
  if (new Date(params.scheduledAt).getTime() < Date.now() - 60_000)
    return { ok: false, error: "Geçmiş bir zaman seçilemez." };

  const listing = await prisma.shListing.findUnique({
    where: { id: params.listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (listing.userId === user.id) return { ok: false, error: "Kendi ilanınıza randevu alamazsınız." };

  const mode = params.mode === "VIDEO" ? "VIDEO" : "FACE_TO_FACE";
  const durationMin = params.durationMin && params.durationMin > 0 ? Math.round(params.durationMin) : 30;

  // Yedek/alternatif saatler (en çok 3, gelecekte olanlar)
  const altSlots = (Array.isArray(params.alternativeSlots) ? params.alternativeSlots : [])
    .filter((s) => {
      const t = new Date(s).getTime();
      return Number.isFinite(t) && t > Date.now() && s !== params.scheduledAt;
    })
    .slice(0, 3);

  // Ev sahibinin müsaitlik ayarları → otomatik onay + günlük kota
  const av = await prisma.shAvailability.findUnique({
    where: { userId: listing.userId },
    select: { autoConfirmVideo: true, autoConfirmFaceToFace: true, maxPerDay: true, timezone: true },
  });
  const tz = av?.timezone || "Europe/Istanbul";

  // Günlük kota kontrolü (ev sahibinin yerel gününe göre)
  if (av && av.maxPerDay && av.maxPerDay > 0) {
    const { localDayBoundsUtc } = await import("./appointments");
    const { start, end } = localDayBoundsUtc(tz, new Date(params.scheduledAt));
    const dayCount = await prisma.shViewingAppointment.count({
      where: { ownerId: listing.userId, status: { in: ["PENDING", "CONFIRMED"] }, scheduledAt: { gte: start, lt: end } },
    });
    if (dayCount >= av.maxPerDay) return { ok: false, error: "Bu gün için randevu kotası dolu. Lütfen başka bir gün seçin." };
  }

  const autoConfirm = mode === "VIDEO" ? !!av?.autoConfirmVideo : !!av?.autoConfirmFaceToFace;
  const initialStatus = autoConfirm ? "CONFIRMED" : "PENDING";

  // Çakışma kontrolü: aynı ev sahibi VEYA aynı kiracı için zaman aralığı çakışması
  const newStart = new Date(params.scheduledAt).getTime();
  const newEnd = newStart + durationMin * 60_000;
  const windowFrom = new Date(newStart - 24 * 60 * 60_000); // sorguyu daralt (geniş tampon)
  const windowTo = new Date(newEnd);
  const candidates = await prisma.shViewingAppointment.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED"] },
      scheduledAt: { gte: windowFrom, lte: windowTo },
      OR: [{ ownerId: listing.userId }, { requesterId: user.id }],
    },
    select: { scheduledAt: true, durationMin: true, ownerId: true, requesterId: true },
  });
  const conflict = candidates.find((c) => {
    const cStart = c.scheduledAt.getTime();
    const cEnd = cStart + (c.durationMin ?? 30) * 60_000;
    return newStart < cEnd && cStart < newEnd; // yarı-açık aralık çakışması
  });
  if (conflict) {
    const mine = conflict.requesterId === user.id;
    return {
      ok: false,
      error: mine
        ? "Bu saatte zaten bir randevunuz var. Lütfen farklı bir saat seçin."
        : "İlan sahibinin bu saatte başka bir randevusu var. Lütfen farklı bir saat seçin.",
    };
  }

  await prisma.shViewingAppointment.create({
    data: {
      listingId: params.listingId,
      requesterId: user.id,
      ownerId: listing.userId,
      scheduledAt: new Date(params.scheduledAt),
      durationMin,
      mode,
      note: params.note || null,
      phone: params.phone || null,
      status: initialStatus as any,
      alternativeSlots: altSlots.length > 0 ? altSlots : undefined,
    },
  });

  await prisma.shNotification
    .create({
      data: {
        userId: listing.userId,
        type: "NEW_MESSAGE",
        title:
          initialStatus === "CONFIRMED"
            ? mode === "VIDEO"
              ? "Görüntülü görüşme onaylandı"
              : "Gezme randevusu onaylandı"
            : mode === "VIDEO"
              ? "Yeni görüntülü görüşme talebi"
              : "Yeni gezme randevusu talebi",
        body: `${listing.title} için ${mode === "VIDEO" ? "görüntülü görüşme" : "gezme"} randevu${initialStatus === "CONFIRMED" ? "su (otomatik onaylandı)" : " talebi"}`,
        link: "/sahibinden/hesabim/randevular",
        listingId: params.listingId,
      },
    })
    .catch(() => {});

  try {
    const owner = await prisma.user.findUnique({ where: { id: listing.userId }, select: { email: true } });
    if (owner?.email) {
      await sendMail({
        to: owner.email,
        subject: `Gezme randevusu talebi: ${listing.title}`,
        html: `<div style="font-family:Arial;padding:16px"><p><strong>${listing.title}</strong> ilanınız için gezme randevusu talep edildi.</p><p><b>Tarih:</b> ${new Date(params.scheduledAt).toLocaleString("tr-TR")}</p>${params.note ? `<p><b>Not:</b> ${params.note}</p>` : ""}${params.phone ? `<p><b>Telefon:</b> ${params.phone}</p>` : ""}<p><a href="${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/sahibinden/hesabim/randevular">Randevuları görüntüle</a></p></div>`,
      });
    }
  } catch {
    /* yok say */
  }

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

export async function setAppointmentStatus(
  id: string,
  status: string,
  selectedSlotIso?: string,
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  // owner onaylar/reddeder; requester iptal eder
  const isOwner = appt.ownerId === user.id;
  const isRequester = appt.requesterId === user.id;
  if (!isOwner && !isRequester) return { ok: false, error: "Yetkiniz yok." };

  // Ev sahibi onaylarken kiracının önerdiği alternatif saatlerden birini seçebilir.
  let scheduledAt = appt.scheduledAt;
  if (isOwner && status === "CONFIRMED" && selectedSlotIso) {
    const alts: string[] = Array.isArray(appt.alternativeSlots) ? (appt.alternativeSlots as any) : [];
    const valid = [appt.scheduledAt.toISOString(), ...alts];
    if (valid.includes(selectedSlotIso)) scheduledAt = new Date(selectedSlotIso);
  }

  await prisma.shViewingAppointment.update({
    where: { id },
    data: { status: status as any, scheduledAt, ...(status === "CONFIRMED" ? { reminderSentAt: null } : {}) },
  });

  const notifyUserId = isOwner ? appt.requesterId : appt.ownerId;
  const labels: Record<string, string> = {
    CONFIRMED: "Randevunuz onaylandı",
    REJECTED: "Randevunuz reddedildi",
    CANCELLED: "Randevu iptal edildi",
    COMPLETED: "Randevu tamamlandı",
  };
  await prisma.shNotification
    .create({
      data: {
        userId: notifyUserId,
        type: "NEW_MESSAGE",
        title: labels[status] ?? "Randevu güncellendi",
        body: "",
        link: "/sahibinden/hesabim/randevular",
        listingId: appt.listingId,
      },
    })
    .catch(() => {});

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

/** Görüntülü randevu görüşmesi başladı/bitti zaman damgası (taraflardan biri çağırır). */
export async function markAppointmentCall(id: string, phase: "start" | "end"): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  if (appt.ownerId !== user.id && appt.requesterId !== user.id)
    return { ok: false, error: "Yetkiniz yok." };

  if (phase === "start") {
    await prisma.shViewingAppointment.update({
      where: { id },
      data: { callStartedAt: appt.callStartedAt ?? new Date() },
    });
  } else {
    await prisma.shViewingAppointment.update({
      where: { id },
      data: { callEndedAt: new Date(), status: appt.status === "CONFIRMED" ? "COMPLETED" : appt.status },
    });
  }
  return { ok: true };
}

/** Tamamlanan randevu sonrası karşı tarafı değerlendir (1-5). */
export async function submitAppointmentReview(id: string, rating: number, comment?: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  if (appt.status !== "COMPLETED") return { ok: false, error: "Yalnızca tamamlanan randevu değerlendirilebilir." };
  const isRequester = appt.requesterId === user.id;
  const isOwner = appt.ownerId === user.id;
  if (!isRequester && !isOwner) return { ok: false, error: "Yetkiniz yok." };
  if (isRequester && appt.ratingByRequester != null) return { ok: false, error: "Zaten değerlendirdiniz." };
  if (isOwner && appt.ratingByOwner != null) return { ok: false, error: "Zaten değerlendirdiniz." };

  const r = Math.max(1, Math.min(5, Math.round(rating)));
  const text = comment?.slice(0, 1000) || null;
  const targetUserId = isRequester ? appt.ownerId : appt.requesterId;

  await prisma.shViewingAppointment.update({
    where: { id },
    data: isRequester
      ? { ratingByRequester: r, reviewByRequester: text }
      : { ratingByOwner: r, reviewByOwner: text },
  });
  await prisma.shReview.create({
    data: { authorId: user.id, targetUserId, listingId: appt.listingId, rating: r, comment: text, appointmentId: appt.id },
  });
  await prisma.shNotification
    .create({
      data: {
        userId: targetUserId,
        type: "NEW_MESSAGE",
        title: "Randevu değerlendirmesi",
        body: "Randevunuz için bir değerlendirme bırakıldı.",
        link: "/sahibinden/hesabim/randevular",
        listingId: appt.listingId,
      },
    })
    .catch(() => {});

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

/** İlan sahibi haftalık randevu müsaitliğini kaydeder (Calendly tarzı). */
export async function saveAvailability(input: {
  slotMinutes: number;
  leadHours: number;
  maxDaysAhead: number;
  rules: { day: number; start: string; end: string }[];
  blockedDates: string[];
  timezone?: string;
  autoConfirmVideo?: boolean;
  autoConfirmFaceToFace?: boolean;
  maxPerDay?: number;
}): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };

  const hhmm = /^\d{1,2}:\d{2}$/;
  const rules = (Array.isArray(input.rules) ? input.rules : [])
    .filter(
      (r) =>
        Number.isInteger(r.day) &&
        r.day >= 0 &&
        r.day <= 6 &&
        hhmm.test(r.start) &&
        hhmm.test(r.end) &&
        r.start < r.end,
    )
    .map((r) => ({ day: r.day, start: r.start, end: r.end }));

  const blockedDates = (Array.isArray(input.blockedDates) ? input.blockedDates : [])
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .slice(0, 366);

  const slotMinutes = Math.min(240, Math.max(10, Math.round(input.slotMinutes || 30)));
  const leadHours = Math.min(168, Math.max(0, Math.round(input.leadHours ?? 2)));
  const maxDaysAhead = Math.min(60, Math.max(1, Math.round(input.maxDaysAhead || 30)));
  const maxPerDay = Math.min(50, Math.max(0, Math.round(input.maxPerDay ?? 0)));
  const autoConfirmVideo = !!input.autoConfirmVideo;
  const autoConfirmFaceToFace = !!input.autoConfirmFaceToFace;
  // Geçerli IANA tz mi? değilse Istanbul.
  let timezone = "Europe/Istanbul";
  if (input.timezone) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: input.timezone });
      timezone = input.timezone;
    } catch {
      /* geçersiz → varsayılan */
    }
  }

  const common = { slotMinutes, leadHours, maxDaysAhead, rules, blockedDates, maxPerDay, autoConfirmVideo, autoConfirmFaceToFace, timezone };
  await prisma.shAvailability.upsert({
    where: { userId: user.id },
    create: { userId: user.id, ...common },
    update: common,
  });

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

/** Bir taraf yeni randevu saati önerir (karşı-teklif). */
export async function proposeReschedule(id: string, newISO: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!newISO) return { ok: false, error: "Yeni saat seçiniz." };
  const when = new Date(newISO);
  if (isNaN(when.getTime())) return { ok: false, error: "Geçersiz saat." };
  if (when.getTime() < Date.now() - 60_000) return { ok: false, error: "Geçmiş bir zaman seçilemez." };

  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  if (appt.ownerId !== user.id && appt.requesterId !== user.id)
    return { ok: false, error: "Yetkiniz yok." };
  if (appt.status === "CANCELLED" || appt.status === "REJECTED" || appt.status === "COMPLETED")
    return { ok: false, error: "Bu randevu güncellenemez." };

  await prisma.shViewingAppointment.update({
    where: { id },
    data: { proposedAt: when, proposedById: user.id },
  });

  const notifyUserId = appt.ownerId === user.id ? appt.requesterId : appt.ownerId;
  await prisma.shNotification
    .create({
      data: {
        userId: notifyUserId,
        type: "NEW_MESSAGE",
        title: "Yeni randevu saati önerildi",
        body: when.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" }),
        link: "/sahibinden/hesabim/randevular",
        listingId: appt.listingId,
      },
    })
    .catch(() => {});

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

/** Önerilen yeni saati kabul/ret eder (öneren değil, karşı taraf çağırır). */
export async function respondReschedule(id: string, accept: boolean): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  if (!appt.proposedAt) return { ok: false, error: "Bekleyen bir öneri yok." };
  if (appt.ownerId !== user.id && appt.requesterId !== user.id)
    return { ok: false, error: "Yetkiniz yok." };
  if (appt.proposedById === user.id)
    return { ok: false, error: "Kendi önerinizi yanıtlayamazsınız." };

  if (accept) {
    await prisma.shViewingAppointment.update({
      where: { id },
      data: {
        scheduledAt: appt.proposedAt,
        proposedAt: null,
        proposedById: null,
        reminderSentAt: null,
        status: "CONFIRMED",
      },
    });
  } else {
    await prisma.shViewingAppointment.update({
      where: { id },
      data: { proposedAt: null, proposedById: null },
    });
  }

  await prisma.shNotification
    .create({
      data: {
        userId: appt.proposedById,
        type: "NEW_MESSAGE",
        title: accept ? "Yeni saat kabul edildi" : "Yeni saat reddedildi",
        body: "",
        link: "/sahibinden/hesabim/randevular",
        listingId: appt.listingId,
      },
    })
    .catch(() => {});

  revalidatePath("/sahibinden/hesabim/randevular");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Admin moderasyon
// ---------------------------------------------------------------------------

async function requireAdmin() {
  const { user } = await validateRequest();
  if (!user || (user as any).role !== "ADMIN") return null;
  return user;
}

export async function moderateListing(
  listingId: string,
  action: "approve" | "reject" | "passivate" | "activate",
  note?: string,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin) return { ok: false, error: "Yetkiniz yok." };

  const listing = await prisma.shListing.findUnique({ where: { id: listingId } });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };

  const statusMap = {
    approve: "ACTIVE",
    reject: "REJECTED",
    passivate: "PASSIVE",
    activate: "ACTIVE",
  } as const;

  await prisma.shListing.update({ where: { id: listingId }, data: { status: statusMap[action] } });

  if (action === "approve" || action === "reject") {
    const approved = action === "approve";
    await prisma.shNotification
      .create({
        data: {
          userId: listing.userId,
          type: approved ? "LISTING_APPROVED" : "LISTING_REJECTED",
          title: approved ? "İlanınız onaylandı" : "İlanınız reddedildi",
          body: listing.title,
          link: `/sahibinden/ilan/${listing.id}`,
          listingId: listing.id,
        },
      })
      .catch(() => {});

    try {
      const owner = await prisma.user.findUnique({ where: { id: listing.userId }, select: { email: true } });
      if (owner?.email) {
        const tpl = mailListingModeration({ listingTitle: listing.title, approved, note });
        await sendMail({ to: owner.email, ...tpl });
      }
    } catch {
      /* yok say */
    }
  }

  revalidatePath("/sahibinden/admin");
  revalidatePath(`/sahibinden/ilan/${listingId}`);
  return { ok: true };
}

export async function resolveReport(
  reportId: string,
  status: "REVIEWING" | "RESOLVED" | "DISMISSED",
  adminNote?: string,
): Promise<ActionResult> {
  const admin = await requireAdmin();
  if (!admin) return { ok: false, error: "Yetkiniz yok." };
  await prisma.shReport.update({
    where: { id: reportId },
    data: { status: status as any, adminNote: adminNote || null },
  });
  revalidatePath("/sahibinden/admin");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  İlan yenileme / süre
// ---------------------------------------------------------------------------

export async function renewListing(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const listing = await prisma.shListing.findUnique({ where: { id } });
  if (!listing || listing.userId !== user.id) return { ok: false, error: "Yetkiniz yok." };

  await prisma.shListing.update({
    where: { id },
    data: {
      status: "ACTIVE",
      bumpedAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });
  revalidatePath("/sahibinden/hesabim/ilanlarim");
  revalidatePath(`/sahibinden/ilan/${id}`);
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Kullanıcı engelleme
// ---------------------------------------------------------------------------

export async function isBlockedBetween(a: string, b: string): Promise<boolean> {
  const found = await prisma.shUserBlock.findFirst({
    where: {
      OR: [
        { blockerId: a, blockedId: b },
        { blockerId: b, blockedId: a },
      ],
    },
  });
  return !!found;
}

export async function blockUser(blockedId: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (user.id === blockedId) return { ok: false, error: "Kendinizi engelleyemezsiniz." };
  await prisma.shUserBlock
    .upsert({
      where: { blockerId_blockedId: { blockerId: user.id, blockedId } },
      update: {},
      create: { blockerId: user.id, blockedId },
    })
    .catch(() => {});
  revalidatePath("/sahibinden/hesabim/engellenenler");
  return { ok: true };
}

export async function unblockUser(blockedId: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  await prisma.shUserBlock
    .deleteMany({ where: { blockerId: user.id, blockedId } })
    .catch(() => {});
  revalidatePath("/sahibinden/hesabim/engellenenler");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Danışman (Agent)
// ---------------------------------------------------------------------------

export interface AgentInput {
  id?: string;
  name: string;
  title?: string;
  phone?: string;
  email?: string;
  photo?: string;
  bio?: string;
}

export async function upsertAgent(input: AgentInput): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const store = await prisma.shStore.findFirst({ where: { ownerId: user.id } });
  if (!store) return { ok: false, error: "Önce mağaza/ofis oluşturmalısınız." };
  if (!input.name?.trim()) return { ok: false, error: "Danışman adı zorunludur." };

  const data = {
    name: input.name.trim(),
    title: input.title || null,
    phone: input.phone || null,
    email: input.email || null,
    photo: input.photo || null,
    bio: input.bio || null,
  };

  if (input.id) {
    const existing = await prisma.shAgent.findUnique({ where: { id: input.id } });
    if (!existing || existing.storeId !== store.id) return { ok: false, error: "Yetkiniz yok." };
    await prisma.shAgent.update({ where: { id: input.id }, data });
  } else {
    await prisma.shAgent.create({ data: { ...data, storeId: store.id } });
  }
  revalidatePath("/sahibinden/hesabim/danismanlar");
  revalidatePath(`/sahibinden/magaza/${store.slug}`);
  return { ok: true };
}

export async function deleteAgent(id: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const store = await prisma.shStore.findFirst({ where: { ownerId: user.id } });
  const agent = await prisma.shAgent.findUnique({ where: { id } });
  if (!store || !agent || agent.storeId !== store.id) return { ok: false, error: "Yetkiniz yok." };
  await prisma.shAgent.delete({ where: { id } });
  revalidatePath("/sahibinden/hesabim/danismanlar");
  return { ok: true };
}

// ---------------------------------------------------------------------------
//  Toplu ilan yükleme (CSV)
// ---------------------------------------------------------------------------

export async function bulkCreateListings(csv: string): Promise<ActionResult<{ created: number; errors: string[] }>> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };

  const store = await prisma.shStore.findFirst({ where: { ownerId: user.id } });
  const cats = await prisma.shCategory.findMany({ where: { slug: { in: ["satilik-daire", "kiralik-daire"] } } });
  const saleCat = cats.find((c) => c.slug === "satilik-daire");
  const rentCat = cats.find((c) => c.slug === "kiralik-daire");
  if (!saleCat || !rentCat) return { ok: false, error: "Kategoriler bulunamadı." };

  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return { ok: false, error: "CSV boş veya yalnızca başlık var." };

  // başlık: title,price,type,city,district,rooms,m2,description
  const errors: string[] = [];
  let created = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const [title, priceStr, typeStr, city, district, rooms, m2, description] = cols;
    if (!title || !priceStr) {
      errors.push(`Satır ${i + 1}: başlık/fiyat eksik`);
      continue;
    }
    const type = (typeStr || "SALE").toUpperCase() === "RENT" ? "RENT" : "SALE";
    const cat = type === "RENT" ? rentCat : saleCat;
    const data = {
      title,
      slug: slugify(title),
      description: description || title,
      price: Number(priceStr) || 0,
      currency: "TRY" as const,
      type: type as any,
      status: "ACTIVE" as const,
      categoryId: cat.id,
      userId: user.id,
      storeId: store?.id ?? null,
      city: city || null,
      district: district || null,
      attributes: { rooms: rooms || undefined, grossArea: m2 ? Number(m2) : undefined } as any,
      areaGross: m2 ? Number(m2) || null : null,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    };

    // benzersiz listingNo + çakışmada (P2002) yeniden dene
    let ok = false;
    let failReason = "";
    for (let attempt = 0; attempt < 4 && !ok; attempt++) {
      try {
        await prisma.shListing.create({ data: { ...data, listingNo: await uniqueListingNo() } });
        ok = true;
        created++;
      } catch (e: any) {
        if (e?.code === "P2002") {
          failReason = "ilan no çakışması";
          continue; // yeniden dene
        }
        failReason = "oluşturulamadı";
        break;
      }
    }
    if (!ok) errors.push(`Satır ${i + 1}: ${failReason || "oluşturulamadı"}`);
  }

  revalidatePath("/sahibinden/hesabim/ilanlarim");
  return { ok: true, data: { created, errors } };
}

// ---------------------------------------------------------------------------
//  Oturum
// ---------------------------------------------------------------------------

export async function logout() {
  const { session } = await validateRequest();
  if (session) {
    await lucia.invalidateSession(session.id);
    const blank = lucia.createBlankSessionCookie();
    (await cookies()).set(blank.name, blank.value, blank.attributes);
  }
  redirect("/sahibinden");
}

// Form action wrapper'ları (server action -> redirect)
export async function createListingAndRedirect(input: ListingFormInput) {
  const res = await createListing(input);
  if (res.ok && res.data) redirect(`/sahibinden/ilan/${res.data.id}`);
  return res;
}
