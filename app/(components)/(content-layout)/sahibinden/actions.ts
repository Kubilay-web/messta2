"use server";

import prisma from "@/app/lib/prisma";
import { validateRequest, lucia } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { slugify, genListingNo } from "./lib/format";
import { sendMail, mailNewMessage, mailNewReview, mailListingModeration } from "./lib/mail";
import { resolveLocationId, getCategoryWithDescendants } from "./data";
import type { ListingFormInput, ActionResult } from "./lib/types";

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) return null;
  return user;
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
  let listingNo = genListingNo();
  for (let i = 0; i < 5; i++) {
    const exists = await prisma.shListing.findUnique({ where: { listingNo } });
    if (!exists) break;
    listingNo = genListingNo();
  }

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
      contactName: input.contactName || user.displayName || null,
      contactPhone: input.contactPhone || null,
      showPhone: input.showPhone ?? true,
      isUrgent: input.isUrgent ?? false,
      isNegotiable: input.isNegotiable ?? false,
      acceptsSwap: input.acceptsSwap ?? false,
      securePayment: input.securePayment ?? false,
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
      contactName: input.contactName || null,
      contactPhone: input.contactPhone || null,
      showPhone: input.showPhone ?? true,
      isUrgent: input.isUrgent ?? false,
      isNegotiable: input.isNegotiable ?? false,
      acceptsSwap: input.acceptsSwap ?? false,
      securePayment: input.securePayment ?? false,
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

export async function incrementView(id: string) {
  try {
    await prisma.shListing.update({ where: { id }, data: { viewCount: { increment: 1 } } });
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
}) {
  const conv = await ensureConversation(opts.listingId, opts.senderId, opts.receiverId, opts.sellerId);
  const senderIsBuyer = conv.buyerId === opts.senderId;

  await prisma.shMessage.create({
    data: {
      listingId: opts.listingId,
      conversationId: conv.id,
      senderId: opts.senderId,
      receiverId: opts.receiverId,
      content: opts.content.trim(),
    },
  });

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

  await prisma.shNotification
    .create({
      data: {
        userId: opts.receiverId,
        type: "NEW_MESSAGE",
        title: "Yeni mesajınız var",
        body: opts.content.trim().slice(0, 120),
        link: "/sahibinden/hesabim/mesajlarim",
        listingId: opts.listingId,
      },
    })
    .catch(() => {});

  // E-posta bildirimi (Resend)
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
        preview: opts.content.trim(),
      });
      await sendMail({ to: receiver.email, ...tpl });
    }
  } catch {
    /* mail hatası akışı bozmasın */
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
): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  if (!content?.trim()) return { ok: false, error: "Mesaj boş olamaz." };

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };

  await deliverMessage({
    listingId,
    senderId: user.id,
    receiverId,
    sellerId: listing.userId,
    content,
    listingTitle: listing.title,
  });

  revalidatePath("/sahibinden/hesabim/mesajlarim");
  return { ok: true };
}

export async function markConversationRead(listingId: string, otherUserId: string) {
  const user = await requireUser();
  if (!user) return;
  await prisma.shMessage.updateMany({
    where: { listingId, senderId: otherUserId, receiverId: user.id, isRead: false },
    data: { isRead: true },
  });
  revalidatePath("/sahibinden/hesabim/mesajlarim");
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

export async function buyDoping(listingId: string, packageId: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };

  const [listing, pkg] = await Promise.all([
    prisma.shListing.findUnique({ where: { id: listingId } }),
    prisma.shDopingPackage.findUnique({ where: { id: packageId } }),
  ]);
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (listing.userId !== user.id) return { ok: false, error: "Yetkiniz yok." };
  if (!pkg || !pkg.active) return { ok: false, error: "Paket bulunamadı." };

  const expiresAt = new Date(Date.now() + pkg.durationDays * 86400000);

  // Ödeme kaydı (demo: doğrudan PAID — gerçekte iyzico/stripe entegre edilir)
  const payment = await prisma.shPayment.create({
    data: {
      userId: user.id,
      amount: pkg.price,
      currency: pkg.currency,
      type: "DOPING",
      status: "PAID",
      provider: "demo",
      meta: { packageId: pkg.id, listingId },
    },
  });

  await prisma.shListingDoping.create({
    data: {
      listingId,
      packageId,
      userId: user.id,
      paymentId: payment.id,
      status: "ACTIVE",
      expiresAt,
    },
  });

  const flagData: Record<string, unknown> = {};
  switch (pkg.type) {
    case "SHOWCASE":
      flagData.isShowcase = true;
      flagData.showcaseUntil = expiresAt;
      break;
    case "FEATURED":
      flagData.isFeatured = true;
      flagData.featuredUntil = expiresAt;
      break;
    case "URGENT":
      flagData.isUrgent = true;
      flagData.urgentUntil = expiresAt;
      break;
    case "BUMP":
      flagData.bumpedAt = new Date();
      break;
    default:
      break;
  }
  await prisma.shListing.update({ where: { id: listingId }, data: flagData });

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
}): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Randevu için giriş yapın." };
  if (!params.scheduledAt) return { ok: false, error: "Tarih/saat seçiniz." };

  const listing = await prisma.shListing.findUnique({
    where: { id: params.listingId },
    select: { userId: true, title: true },
  });
  if (!listing) return { ok: false, error: "İlan bulunamadı." };
  if (listing.userId === user.id) return { ok: false, error: "Kendi ilanınıza randevu alamazsınız." };

  await prisma.shViewingAppointment.create({
    data: {
      listingId: params.listingId,
      requesterId: user.id,
      ownerId: listing.userId,
      scheduledAt: new Date(params.scheduledAt),
      note: params.note || null,
      phone: params.phone || null,
    },
  });

  await prisma.shNotification
    .create({
      data: {
        userId: listing.userId,
        type: "NEW_MESSAGE",
        title: "Yeni gezme randevusu talebi",
        body: `${listing.title} için randevu talebi`,
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

export async function setAppointmentStatus(id: string, status: string): Promise<ActionResult> {
  const user = await requireUser();
  if (!user) return { ok: false, error: "Giriş yapın." };
  const appt = await prisma.shViewingAppointment.findUnique({ where: { id } });
  if (!appt) return { ok: false, error: "Randevu bulunamadı." };
  // owner onaylar/reddeder; requester iptal eder
  const isOwner = appt.ownerId === user.id;
  const isRequester = appt.requesterId === user.id;
  if (!isOwner && !isRequester) return { ok: false, error: "Yetkiniz yok." };

  await prisma.shViewingAppointment.update({ where: { id }, data: { status: status as any } });

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
