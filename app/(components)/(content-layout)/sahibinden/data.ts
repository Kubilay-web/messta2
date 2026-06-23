import "server-only";
import prisma from "@/app/lib/prisma";
import type { Prisma } from "@prisma/client";
import { CATEGORY_TREE } from "./lib/categories";
import { TR_PROVINCES, DISTRICTS_BY_PROVINCE } from "./lib/tr-locations";
import { slugify } from "./lib/format";
import type { ListingFilters } from "./lib/types";

// ---------------------------------------------------------------------------
//  Kategoriler
// ---------------------------------------------------------------------------

export type CategoryNode = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  featured: boolean;
  parentId: string | null;
  children: CategoryNode[];
  listingCount?: number;
};

/** Kategori ağacını DB'den okur; boşsa seed tohumunu eker. */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  let cats = await prisma.shCategory.findMany({ orderBy: { order: "asc" } });
  if (cats.length === 0) {
    await ensureCategories();
    cats = await prisma.shCategory.findMany({ orderBy: { order: "asc" } });
  }

  const byId = new Map<string, CategoryNode>();
  cats.forEach((c) =>
    byId.set(c.id, {
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      featured: c.featured,
      parentId: c.parentId,
      children: [],
    }),
  );
  const roots: CategoryNode[] = [];
  byId.forEach((node) => {
    if (node.parentId && byId.has(node.parentId)) {
      byId.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
}

export async function getCategoryBySlug(slug: string) {
  return prisma.shCategory.findUnique({ where: { slug } });
}

/** Bir kategorinin en üst (kök) ata slug'ını döndürür. */
export async function getTopCategorySlug(categoryId: string): Promise<string | null> {
  const all = await prisma.shCategory.findMany({ select: { id: true, slug: true, parentId: true } });
  const byId = new Map(all.map((c) => [c.id, c]));
  let cur = byId.get(categoryId);
  while (cur && cur.parentId && byId.has(cur.parentId)) {
    cur = byId.get(cur.parentId);
  }
  return cur?.slug ?? null;
}

/** Bir kategorinin kendisi + tüm alt kategori id'leri. */
export async function getCategoryWithDescendants(slug: string) {
  const all = await prisma.shCategory.findMany();
  const root = all.find((c) => c.slug === slug);
  if (!root) return null;
  const ids = new Set<string>([root.id]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const c of all) {
      if (c.parentId && ids.has(c.parentId) && !ids.has(c.id)) {
        ids.add(c.id);
        changed = true;
      }
    }
  }
  return { root, ids: Array.from(ids), all };
}

/** Seed kategori ağacını DB'ye yazar (idempotent). */
export async function ensureCategories() {
  const existing = await prisma.shCategory.count();
  if (existing > 0) return;

  let order = 0;
  async function insert(node: (typeof CATEGORY_TREE)[number], parentId: string | null) {
    let created = await prisma.shCategory.findUnique({ where: { slug: node.slug } });
    if (!created) {
      try {
        created = await prisma.shCategory.create({
          data: {
            name: node.name,
            slug: node.slug,
            icon: node.icon ?? null,
            featured: node.featured ?? false,
            order: order++,
            parentId,
          },
        });
      } catch (e: any) {
        // eşzamanlı seed yarışında benzersizlik çakışmasını yok say
        if (e?.code === "P2002") {
          created = await prisma.shCategory.findUnique({ where: { slug: node.slug } });
        } else {
          throw e;
        }
      }
    }
    if (!created) return;
    for (const child of node.children ?? []) {
      await insert(child as (typeof CATEGORY_TREE)[number], created.id);
    }
  }
  for (const top of CATEGORY_TREE) await insert(top, null);
}

// ---------------------------------------------------------------------------
//  İlanlar
// ---------------------------------------------------------------------------

export type ListingListItem = Prisma.ShListingGetPayload<{
  include: { category: { select: { name: true; slug: true } } };
}>;

function buildWhere(
  filters: ListingFilters,
  categoryIds?: string[],
): Prisma.ShListingWhereInput {
  const where: Prisma.ShListingWhereInput = {};
  if (filters.onlyActive !== false) where.status = "ACTIVE";
  if (filters.userId) where.userId = filters.userId;
  if (categoryIds && categoryIds.length) where.categoryId = { in: categoryIds };
  if (filters.type) where.type = filters.type as Prisma.ShListingWhereInput["type"];
  if (filters.city) where.city = filters.city;
  if (filters.district) where.district = filters.district;
  if (filters.neighborhood) where.neighborhood = filters.neighborhood;
  if (filters.currency) where.currency = filters.currency as Prisma.ShListingWhereInput["currency"];
  if (filters.minPrice != null || filters.maxPrice != null) {
    where.price = {};
    if (filters.minPrice != null) (where.price as Prisma.FloatFilter).gte = filters.minPrice;
    if (filters.maxPrice != null) (where.price as Prisma.FloatFilter).lte = filters.maxPrice;
  }

  // Native (indeksli) aralık kolonları: m² ve bina yaşı
  for (const [key, r] of Object.entries(filters.attrRanges ?? {})) {
    const col = NATIVE_RANGE_COLUMNS[key];
    if (!col) continue;
    const cond: { gte?: number; lte?: number } = {};
    if (r.min != null && !Number.isNaN(r.min)) cond.gte = r.min;
    if (r.max != null && !Number.isNaN(r.max)) cond.lte = r.max;
    if (Object.keys(cond).length) where[col] = cond;
  }

  // Harita alanı (bounding box)
  if (filters.bbox) {
    const b = filters.bbox;
    where.latitude = { gte: b.south, lte: b.north };
    where.longitude = { gte: b.west, lte: b.east };
  }

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q, mode: "insensitive" } },
      { description: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  return where;
}

// Denormalize edilmiş indeksli kolona sahip attribute anahtarları.
// Bu alanların aralık filtresi/sıralaması native Prisma kolonuyla yapılır (hızlı).
const NATIVE_RANGE_COLUMNS: Record<string, "areaGross" | "buildingAge"> = {
  grossArea: "areaGross",
  buildingAge: "buildingAge",
};

/** Yalnızca JSON içinde tutulan (native kolonu olmayan) bir attribute filtresi var mı? */
function hasJsonAttrFilters(filters: ListingFilters): boolean {
  if (Object.keys(filters.attrs ?? {}).length > 0) return true;
  if (Object.keys(filters.attrIn ?? {}).length > 0) return true;
  for (const key of Object.keys(filters.attrRanges ?? {})) {
    if (!NATIVE_RANGE_COLUMNS[key]) return true; // km, year gibi JSON aralıkları
  }
  return false;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Tüm filtreleri native MongoDB sorgusuna çevirir (findRaw ile kullanılır).
 * Prisma MongoDB konnektörü `attributes` JSON alanında `path` filtresini
 * desteklemediği için, JSON attribute (ısıtma/oda/km vb.) filtreleri ancak
 * `attributes.<key>` dot-notation native sorgu ile yapılabilir.
 */
function buildMongoFilter(
  filters: ListingFilters,
  categoryIds?: string[],
): Record<string, unknown> {
  const f: Record<string, unknown> = {};
  if (filters.onlyActive !== false) f.status = "ACTIVE";
  if (filters.userId) f.userId = filters.userId;
  if (categoryIds && categoryIds.length) f.categoryId = { $in: categoryIds };
  if (filters.type) f.type = filters.type;
  if (filters.city) f.city = filters.city;
  if (filters.district) f.district = filters.district;
  if (filters.neighborhood) f.neighborhood = filters.neighborhood;
  if (filters.currency) f.currency = filters.currency;
  if (filters.minPrice != null || filters.maxPrice != null) {
    const p: Record<string, number> = {};
    if (filters.minPrice != null) p.$gte = filters.minPrice;
    if (filters.maxPrice != null) p.$lte = filters.maxPrice;
    f.price = p;
  }
  if (filters.bbox) {
    const b = filters.bbox;
    f.latitude = { $gte: b.south, $lte: b.north };
    f.longitude = { $gte: b.west, $lte: b.east };
  }
  if (filters.q) {
    const rx = { $regex: escapeRegex(filters.q), $options: "i" };
    f.$or = [{ title: rx }, { description: rx }];
  }

  // Tam eşleşme (select / boolean / text)
  for (const [key, value] of Object.entries(filters.attrs ?? {})) {
    if (value === "" || value == null) continue;
    let parsed: unknown = value;
    if (value === "true") parsed = true;
    else if (value === "false") parsed = false;
    f[`attributes.${key}`] = parsed;
  }

  // Çoklu-seçim (örn. rooms: ["2+1","3+1"]) → $in
  for (const [key, vals] of Object.entries(filters.attrIn ?? {})) {
    if (vals.length) f[`attributes.${key}`] = { $in: vals };
  }

  // Sayısal aralık — native kolon varsa o kolona, yoksa JSON alanına
  for (const [key, r] of Object.entries(filters.attrRanges ?? {})) {
    const cond: Record<string, number> = {};
    if (r.min != null && !Number.isNaN(r.min)) cond.$gte = r.min;
    if (r.max != null && !Number.isNaN(r.max)) cond.$lte = r.max;
    if (!Object.keys(cond).length) continue;
    const col = NATIVE_RANGE_COLUMNS[key];
    if (col) f[col] = cond;
    else f[`attributes.${key}`] = cond;
  }

  return f;
}

/** Attribute filtreleri için eşleşen ilan id'lerini native sorgu ile getirir. */
async function matchingAttrListingIds(
  filters: ListingFilters,
  categoryIds?: string[],
): Promise<string[]> {
  const mongoFilter = buildMongoFilter(filters, categoryIds);
  const docs = (await prisma.shListing.findRaw({
    filter: mongoFilter as Prisma.InputJsonObject,
    options: { projection: { _id: 1 } } as Prisma.InputJsonObject,
  })) as unknown as Array<{ _id: string }>;
  return Array.isArray(docs) ? docs.map((d) => d._id) : [];
}

function buildOrderBy(
  sort?: string,
): Prisma.ShListingOrderByWithRelationInput[] {
  switch (sort) {
    case "price_asc":
      return [{ price: "asc" }];
    case "price_desc":
      return [{ price: "desc" }];
    case "area_asc":
      return [{ areaGross: "asc" }];
    case "area_desc":
      return [{ areaGross: "desc" }];
    case "oldest":
      return [{ createdAt: "asc" }];
    default:
      return [{ isShowcase: "desc" }, { isFeatured: "desc" }, { createdAt: "desc" }];
  }
}

export async function getListings(filters: ListingFilters) {
  const perPage = filters.perPage ?? 20;
  const page = Math.max(1, filters.page ?? 1);

  let categoryIds: string[] | undefined;
  if (filters.categorySlug) {
    const desc = await getCategoryWithDescendants(filters.categorySlug);
    categoryIds = desc?.ids ?? ["__none__"];
  }

  const where = buildWhere(filters, categoryIds);

  // JSON içinde tutulan attribute filtreleri (ısıtma, oda, km vb.) MongoDB'de
  // path desteklenmediğinden native sorgu ile eşleşen id'ler bulunur.
  // m²/bina yaşı/bbox gibi native kolon filtreleri buildWhere içinde halledilir.
  if (hasJsonAttrFilters(filters)) {
    const ids = await matchingAttrListingIds(filters, categoryIds);
    where.id = { in: ids };
  }

  const [items, total] = await Promise.all([
    prisma.shListing.findMany({
      where,
      orderBy: buildOrderBy(filters.sort),
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: { select: { name: true, slug: true } } },
    }),
    prisma.shListing.count({ where }),
  ]);

  return { items, total, page, perPage, pages: Math.ceil(total / perPage) };
}

export async function getListingById(id: string) {
  return prisma.shListing.findUnique({
    where: { id },
    include: {
      category: true,
      store: { select: { id: true, name: true, slug: true, logo: true, type: true, isVerified: true } },
      agent: { select: { id: true, name: true, title: true, phone: true, photo: true } },
      user: {
        select: {
          id: true,
          displayName: true,
          username: true,
          name: true,
          avatarUrl: true,
          userLogo: true,
          createdAt: true,
          phone: true,
        },
      },
    },
  });
}

export async function getSimilarListings(categoryId: string, excludeId: string, take = 6) {
  return prisma.shListing.findMany({
    where: { categoryId, status: "ACTIVE", id: { not: excludeId } },
    orderBy: { createdAt: "desc" },
    take,
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function getFeaturedListings(take = 12) {
  return prisma.shListing.findMany({
    where: { status: "ACTIVE" },
    orderBy: [{ isShowcase: "desc" }, { isFeatured: "desc" }, { createdAt: "desc" }],
    take,
    include: { category: { select: { name: true, slug: true } } },
  });
}

export async function getUserFavoriteIds(userId: string): Promise<Set<string>> {
  const favs = await prisma.shFavorite.findMany({
    where: { userId },
    select: { listingId: true },
  });
  return new Set(favs.map((f) => f.listingId));
}

export async function getUserFavorites(userId: string) {
  const favs = await prisma.shFavorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      listing: { include: { category: { select: { name: true, slug: true } } } },
    },
  });
  return favs.map((f) => f.listing).filter(Boolean);
}

export async function getUserListings(userId: string) {
  return prisma.shListing.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true, slug: true } } },
  });
}

// ---------------------------------------------------------------------------
//  Mesajlar
// ---------------------------------------------------------------------------

export async function getUserConversations(userId: string) {
  const messages = await prisma.shMessage.findMany({
    where: { OR: [{ senderId: userId }, { receiverId: userId }] },
    orderBy: { createdAt: "desc" },
    include: {
      listing: { select: { id: true, title: true, images: true, price: true, currency: true } },
      sender: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
      receiver: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
    },
  });

  // Konuşma kimliğine göre grupla. Her mesaj `deliverMessage` içinde
  // `ensureConversation` (upsert + @@unique([listingId,buyerId,sellerId])) ile
  // TEK kanonik conversation'a bağlandığından, `conversationId` üzerinden gruplamak
  // aynı ilan+kişi için iki ayrı sohbet oluşmasını garantili biçimde engeller.
  // (Eski/null conversationId kayıtları için `listingId:otherId` fallback'i kullanılır.)
  const map = new Map<string, { key: string; listing: any; other: any; last: any; unread: number; messages: any[] }>();
  for (const m of messages) {
    const otherUser = m.senderId === userId ? m.receiver : m.sender;
    if (!otherUser) continue; // karşı taraf silinmişse atla
    const key = m.conversationId ?? `${m.listingId}:${otherUser.id}`;
    if (!map.has(key)) {
      map.set(key, { key, listing: m.listing, other: otherUser, last: m, unread: 0, messages: [] });
    }
    const conv = map.get(key)!;
    conv.messages.push(m);
    if (m.receiverId === userId && !m.isRead) conv.unread++;
  }
  return Array.from(map.values());
}

export async function getUnreadMessageCount(userId: string) {
  return prisma.shMessage.count({ where: { receiverId: userId, isRead: false } });
}

// ---------------------------------------------------------------------------
//  Doping paketleri
// ---------------------------------------------------------------------------

const DOPING_SEED = [
  { name: "Vitrin (7 Gün)", type: "SHOWCASE" as const, durationDays: 7, price: 149, order: 1 },
  { name: "Öne Çıkan (7 Gün)", type: "FEATURED" as const, durationDays: 7, price: 99, order: 2 },
  { name: "Acil (7 Gün)", type: "URGENT" as const, durationDays: 7, price: 59, order: 3 },
  { name: "Üste Taşı", type: "BUMP" as const, durationDays: 1, price: 29, order: 4 },
];

export async function ensureDopingPackages() {
  const count = await prisma.shDopingPackage.count();
  if (count > 0) return;
  for (const d of DOPING_SEED) {
    await prisma.shDopingPackage.create({ data: d }).catch(() => {});
  }
}

export async function getDopingPackages() {
  let pkgs = await prisma.shDopingPackage.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  if (pkgs.length === 0) {
    await ensureDopingPackages();
    pkgs = await prisma.shDopingPackage.findMany({ where: { active: true }, orderBy: { order: "asc" } });
  }
  return pkgs;
}

/** Bir ilana uygulanabilen tekrarlayan planlar (otomatik doping + yayın ücreti). */
export async function getListingSubscriptionPlans() {
  return prisma.shPlan.findMany({
    where: { active: true, kind: { in: ["DOPING_AUTO", "LISTING_HOSTING"] } },
    orderBy: [{ kind: "asc" }, { order: "asc" }],
  });
}

// ---------------------------------------------------------------------------
//  Fiyat geçmişi & son baktıkların & bildirimler
// ---------------------------------------------------------------------------

export async function getPriceHistory(listingId: string) {
  return prisma.shPriceHistory.findMany({
    where: { listingId },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export async function getRecentViews(userId: string, take = 10) {
  const views = await prisma.shRecentView.findMany({
    where: { userId },
    orderBy: { viewedAt: "desc" },
    take,
    include: {
      listing: { include: { category: { select: { name: true, slug: true } } } },
    },
  });
  return views.map((v) => v.listing).filter((l) => l && l.status === "ACTIVE");
}

export async function getSavedSearches(userId: string) {
  return prisma.shSavedSearch.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}

export async function getNotifications(userId: string, take = 20) {
  return prisma.shNotification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export async function getUnreadNotificationCount(userId: string) {
  return prisma.shNotification.count({ where: { userId, isRead: false } });
}

// ---------------------------------------------------------------------------
//  Mağaza (Store)
// ---------------------------------------------------------------------------

export async function getUserStore(userId: string) {
  return prisma.shStore.findFirst({ where: { ownerId: userId } });
}

export async function getStoreBySlug(slug: string) {
  return prisma.shStore.findUnique({
    where: { slug },
    include: {
      owner: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
      _count: { select: { listings: true, reviews: true } },
    },
  });
}

export async function getStoreListings(storeId: string, page = 1, perPage = 24) {
  const [items, total] = await Promise.all([
    prisma.shListing.findMany({
      where: { storeId, status: "ACTIVE" },
      orderBy: [{ isShowcase: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * perPage,
      take: perPage,
      include: { category: { select: { name: true, slug: true } } },
    }),
    prisma.shListing.count({ where: { storeId, status: "ACTIVE" } }),
  ]);
  return { items, total, page, pages: Math.ceil(total / perPage) };
}

// ---------------------------------------------------------------------------
//  Değerlendirme (Review)
// ---------------------------------------------------------------------------

export async function getUserReviews(targetUserId: string) {
  return prisma.shReview.findMany({
    where: { targetUserId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { author: { select: { displayName: true, username: true, avatarUrl: true } } },
  });
}

export async function getUserRating(targetUserId: string) {
  const agg = await prisma.shReview.aggregate({
    where: { targetUserId },
    _avg: { rating: true },
    _count: true,
  });
  return { avg: agg._avg.rating ?? 0, count: agg._count };
}

export async function hasUserReviewed(authorId: string, targetUserId: string) {
  const r = await prisma.shReview.findFirst({ where: { authorId, targetUserId } });
  return !!r;
}

// ---------------------------------------------------------------------------
//  Lokasyon (İl / İlçe / Mahalle)
// ---------------------------------------------------------------------------

export async function ensureLocations() {
  const count = await prisma.shLocation.count();
  if (count > 0) return;
  for (const prov of TR_PROVINCES) {
    const city = await prisma.shLocation.create({
      data: { name: prov.name, slug: slugify(prov.name), type: "CITY", plateCode: prov.plate },
    });
    const districts = DISTRICTS_BY_PROVINCE[prov.name] ?? [];
    for (const d of districts) {
      await prisma.shLocation.create({
        data: { name: d, slug: slugify(`${prov.name}-${d}`), type: "DISTRICT", parentId: city.id },
      });
    }
  }
}

export async function getCities() {
  let cities = await prisma.shLocation.findMany({ where: { type: "CITY" }, orderBy: { name: "asc" } });
  if (cities.length === 0) {
    await ensureLocations();
    cities = await prisma.shLocation.findMany({ where: { type: "CITY" }, orderBy: { name: "asc" } });
  }
  return cities;
}

export async function getDistricts(cityId: string) {
  return prisma.shLocation.findMany({ where: { parentId: cityId, type: "DISTRICT" }, orderBy: { name: "asc" } });
}

/**
 * Aktif ilanlarda geçen benzersiz mahalle adlarını döndürür (data-driven).
 * Mahalleler serbest metin olduğundan statik liste yerine gerçek veriden beslenir.
 */
export async function getNeighborhoods(city?: string | null, district?: string | null): Promise<string[]> {
  if (!city) return [];
  const rows = await prisma.shListing.findMany({
    where: {
      status: "ACTIVE",
      city,
      ...(district ? { district } : {}),
      neighborhood: { not: null },
    },
    select: { neighborhood: true },
    distinct: ["neighborhood"],
    take: 300,
  });
  return rows
    .map((r) => r.neighborhood)
    .filter((n): n is string => !!n && n.trim() !== "")
    .sort((a, b) => a.localeCompare(b, "tr"));
}

// ---------------------------------------------------------------------------
//  Emlak: randevu / fiyat analizi / karşılaştırma / kapora
// ---------------------------------------------------------------------------

export async function getOwnerAppointments(userId: string) {
  return prisma.shViewingAppointment.findMany({
    where: { ownerId: userId },
    orderBy: { scheduledAt: "asc" },
    include: {
      listing: { select: { id: true, title: true, images: true } },
      requester: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
    },
  });
}

export async function getRequesterAppointments(userId: string) {
  return prisma.shViewingAppointment.findMany({
    where: { requesterId: userId },
    orderBy: { scheduledAt: "asc" },
    include: {
      listing: { select: { id: true, title: true, images: true } },
      owner: { select: { id: true, displayName: true, username: true, avatarUrl: true } },
    },
  });
}

/** Aynı kategori + şehirdeki aktif ilanlardan bölge fiyat istatistiği. */
export async function getRegionPriceStats(categoryId: string, city: string | null) {
  if (!city) return null;
  const listings = await prisma.shListing.findMany({
    where: { categoryId, city, status: "ACTIVE" },
    select: { price: true, attributes: true },
    take: 500,
  });
  if (listings.length < 2) return null;

  const prices = listings.map((l) => l.price).filter((p) => p > 0);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  const perM2: number[] = [];
  for (const l of listings) {
    const area = Number((l.attributes as any)?.grossArea);
    if (area > 0 && l.price > 0) perM2.push(l.price / area);
  }
  const avgPerM2 = perM2.length ? perM2.reduce((a, b) => a + b, 0) / perM2.length : null;

  return { count: prices.length, avgPrice, avgPerM2 };
}

// İlan istatistikleri (son N gün)
export async function getListingStats(listingId: string, days = 14) {
  const rows = await prisma.shListingStat.findMany({
    where: { listingId },
    orderBy: { date: "asc" },
  });
  const map = new Map(rows.map((r) => [r.date, r]));
  const out: { date: string; views: number; favorites: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
    const r = map.get(d);
    out.push({ date: d, views: r?.views ?? 0, favorites: r?.favorites ?? 0 });
  }
  return out;
}

// Zaman serili bölge raporu (son 6 ay ortalama fiyat + adet)
export async function getRegionReport(categoryId: string, city: string | null) {
  if (!city) return null;
  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 180);
  const listings = await prisma.shListing.findMany({
    where: { categoryId, city, createdAt: { gte: since } },
    select: { price: true, createdAt: true },
    take: 1000,
  });
  if (listings.length < 3) return null;

  const buckets = new Map<string, { sum: number; count: number }>();
  for (const l of listings) {
    const key = l.createdAt.toISOString().slice(0, 7); // yyyy-mm
    const b = buckets.get(key) ?? { sum: 0, count: 0 };
    b.sum += l.price;
    b.count++;
    buckets.set(key, b);
  }
  const months: { month: string; avg: number; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = d.toISOString().slice(0, 7);
    const b = buckets.get(key);
    months.push({ month: key, avg: b ? b.sum / b.count : 0, count: b?.count ?? 0 });
  }
  return months;
}

export async function isUserBlocked(blockerId: string, blockedId: string) {
  const b = await prisma.shUserBlock.findUnique({
    where: { blockerId_blockedId: { blockerId, blockedId } },
  });
  return !!b;
}

// Engellenen kullanıcılar
export async function getBlockedUsers(userId: string) {
  const blocks = await prisma.shUserBlock.findMany({
    where: { blockerId: userId },
    orderBy: { createdAt: "desc" },
    include: { blocked: { select: { id: true, displayName: true, username: true, avatarUrl: true } } },
  });
  return blocks.map((b) => ({ blockId: b.id, ...b.blocked }));
}

// Danışmanlar
export async function getStoreAgents(storeId: string) {
  return prisma.shAgent.findMany({ where: { storeId }, orderBy: { createdAt: "asc" } });
}

export async function getUserStoreAgents(userId: string) {
  const store = await prisma.shStore.findFirst({ where: { ownerId: userId } });
  if (!store) return { store: null, agents: [] };
  const agents = await prisma.shAgent.findMany({ where: { storeId: store.id }, orderBy: { createdAt: "asc" } });
  return { store, agents };
}

export async function getCompareListings(ids: string[]) {
  if (!ids.length) return [];
  const items = await prisma.shListing.findMany({
    where: { id: { in: ids.slice(0, 4) } },
    include: { category: { select: { name: true, slug: true } } },
  });
  // gelen sıraya göre diz
  return ids.map((id) => items.find((i) => i.id === id)).filter(Boolean) as typeof items;
}

// ---------------------------------------------------------------------------
//  Admin moderasyon
// ---------------------------------------------------------------------------

export async function getAdminStats() {
  const [total, active, pending, openReports, stores, users] = await Promise.all([
    prisma.shListing.count(),
    prisma.shListing.count({ where: { status: "ACTIVE" } }),
    prisma.shListing.count({ where: { status: "PENDING" } }),
    prisma.shReport.count({ where: { status: "OPEN" } }),
    prisma.shStore.count(),
    prisma.shListing.groupBy({ by: ["userId"], _count: true }),
  ]);
  return { total, active, pending, openReports, stores, sellers: users.length };
}

export async function getModerationListings(status?: string, take = 50) {
  return prisma.shListing.findMany({
    where: status ? { status: status as any } : {},
    orderBy: { createdAt: "desc" },
    take,
    include: {
      category: { select: { name: true, slug: true } },
      user: { select: { displayName: true, username: true, email: true } },
    },
  });
}

export async function getReports(status?: string) {
  return prisma.shReport.findMany({
    where: status ? { status: status as any } : {},
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      listing: { select: { id: true, title: true, images: true, status: true } },
      user: { select: { displayName: true, username: true } },
    },
  });
}

/** city/district string'lerinden ShLocation id çözümler (varsa ilçe, yoksa il). */
export async function resolveLocationId(city?: string | null, district?: string | null) {
  if (!city) return null;
  const cityNode = await prisma.shLocation.findFirst({ where: { type: "CITY", name: city } });
  if (!cityNode) return null;
  if (district) {
    const districtNode = await prisma.shLocation.findFirst({
      where: { type: "DISTRICT", parentId: cityNode.id, name: district },
    });
    if (districtNode) return districtNode.id;
  }
  return cityNode.id;
}
