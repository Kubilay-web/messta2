"use server";

// ============================================================
// Sahibinden Pazar Yeri — vitrin & arama (doğrudan DB / Prisma).
// Kaynak: estate `Listing` + `PropertyRealEstate`. İkinci bir model YOK.
// Tüm ofislerin + bireysel ilanların yayınlanmış kayıtlarını tek vitrinde toplar.
// ============================================================

import db from "@/app/lib/db";

const AMENITY_KEYS = ["hasElevator", "hasParking", "isFurnished", "hasGarden", "hasPool", "hasBalcony"];

export type MarketFilters = {
  listingType?: string; // SALE | RENT | SHORT_RENT
  propertyType?: string; // APARTMENT | HOUSE | ...
  subType?: string; // RESIDENCE | YAZLIK | ...
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: string; // "3+1"
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
  features?: string[]; // gruplu özellik anahtarları (hepsini içermeli)
  facing?: string[]; // cephe/yön (en az biri)
  buildStatus?: string;
  deedStatus?: string;
  usageStatus?: string;
  creditEligible?: boolean;
  furnished?: boolean;
  inSite?: boolean;
  channel?: string; // AGENCY | INDIVIDUAL
  verified?: boolean;
  q?: string;
  sort?: string; // newest | price_asc | price_desc | area_desc | popular
  // Harita "bu alanda ara" sınırları
  minLat?: number;
  maxLat?: number;
  minLng?: number;
  maxLng?: number;
};

const coverImage = {
  select: { url: true },
  orderBy: [{ isCover: "desc" as const }, { order: "asc" as const }],
  take: 1,
};

const cardSelect = {
  id: true,
  title: true,
  listingType: true,
  askingPrice: true,
  previousPrice: true,
  currency: true,
  monthlyRent: true,
  views: true,
  createdAt: true,
  featuredUntil: true,
  urgentUntil: true,
  highlightUntil: true,
  channel: true,
  agencyId: true,
  property: {
    select: {
      city: true,
      district: true,
      neighborhood: true,
      propertyType: true,
      roomCount: true,
      grossArea: true,
      bathroomCount: true,
      latitude: true,
      longitude: true,
      isFeatured: true,
      images: coverImage,
    },
  },
} as const;

function buildWhere(filters: MarketFilters) {
  const where: any = {
    status: "ACTIVE",
    isPublic: true,
    moderationStatus: { notIn: ["PENDING", "REJECTED"] },
    // Süresi dolmuş ilanları gizle (expiresAt null olanlar görünür kalır)
    NOT: { expiresAt: { lt: new Date() } },
  };

  if (filters.listingType) where.listingType = filters.listingType;
  if (filters.channel) where.channel = filters.channel;
  if (filters.verified) where.verified = true;
  if (filters.q) {
    const q = filters.q.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { listingNo: { contains: q, mode: "insensitive" } },
      { property: { is: { neighborhood: { contains: q, mode: "insensitive" } } } },
      { property: { is: { district: { contains: q, mode: "insensitive" } } } },
    ];
  }

  if (filters.minPrice != null || filters.maxPrice != null) {
    where.askingPrice = {};
    if (filters.minPrice != null) where.askingPrice.gte = filters.minPrice;
    if (filters.maxPrice != null) where.askingPrice.lte = filters.maxPrice;
  }

  const propWhere: any = {};
  if (filters.propertyType) propWhere.propertyType = filters.propertyType;
  if (filters.subType) propWhere.subType = filters.subType;
  if (filters.city) propWhere.city = { contains: filters.city, mode: "insensitive" };
  if (filters.district) propWhere.district = { contains: filters.district, mode: "insensitive" };
  if (filters.rooms) propWhere.roomCount = filters.rooms;
  if (filters.minArea != null || filters.maxArea != null) {
    propWhere.grossArea = {};
    if (filters.minArea != null) propWhere.grossArea.gte = filters.minArea;
    if (filters.maxArea != null) propWhere.grossArea.lte = filters.maxArea;
  }
  for (const a of filters.amenities ?? []) {
    if (AMENITY_KEYS.includes(a)) propWhere[a] = true;
  }
  if (filters.features?.length) propWhere.features = { hasEvery: filters.features };
  if (filters.facing?.length) propWhere.facing = { hasSome: filters.facing };
  if (filters.buildStatus) propWhere.buildStatus = filters.buildStatus;
  if (filters.deedStatus) propWhere.deedStatus = filters.deedStatus;
  if (filters.usageStatus) propWhere.usageStatus = filters.usageStatus;
  if (filters.creditEligible) propWhere.creditEligible = true;
  if (filters.furnished) propWhere.isFurnished = true;
  if (filters.inSite) propWhere.inSite = true;
  // Harita sınır kutusu (bbox) — "bu alanda ara"
  if (filters.minLat != null && filters.maxLat != null) {
    propWhere.latitude = { gte: filters.minLat, lte: filters.maxLat };
  }
  if (filters.minLng != null && filters.maxLng != null) {
    propWhere.longitude = { gte: filters.minLng, lte: filters.maxLng };
  }
  if (Object.keys(propWhere).length) where.property = propWhere;

  return where;
}

function orderByArray(sort?: string): any[] {
  const featured = { featuredUntil: "desc" as const };
  switch (sort) {
    case "price_asc":
      return [featured, { askingPrice: "asc" as const }];
    case "price_desc":
      return [featured, { askingPrice: "desc" as const }];
    case "popular":
      return [featured, { views: "desc" as const }];
    default:
      // "yenile/öne al" (bumpedAt) → en yeni
      return [featured, { bumpedAt: "desc" as const }, { createdAt: "desc" as const }];
  }
}

/** Ofis adı/logosunu eksik kayıtlara dayanıklı şekilde çözer. */
async function loadAgencies(ids: string[]) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return new Map<string, { name: string; logo: string | null }>();
  const rows = await db.agency.findMany({
    where: { id: { in: unique } },
    select: { id: true, name: true, logo: true },
  });
  return new Map(rows.map((a) => [a.id, { name: a.name, logo: a.logo }]));
}

/** Sayfalı arama sonucu (toplam sayı + ofis adı eşlenmiş). */
export async function getMarketplacePage(filters: MarketFilters = {}, page = 1, pageSize = 12) {
  const where = buildWhere(filters);

  const [rows, total] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy: orderByArray(filters.sort),
      skip: (Math.max(1, page) - 1) * pageSize,
      take: pageSize,
      select: cardSelect,
    }),
    db.listing.count({ where }),
  ]);

  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  const items = rows.map((r) => ({ ...r, agency: agencyMap.get(r.agencyId) ?? null }));
  return { items, total, page: Math.max(1, page), pageSize, pages: Math.max(1, Math.ceil(total / pageSize)) };
}

/** Basit liste (limitli) — anasayfa şeritleri vb. */
export async function getMarketplaceListings(filters: MarketFilters = {}, limit = 12) {
  const where = buildWhere(filters);
  const rows = await db.listing.findMany({
    where,
    orderBy: orderByArray(filters.sort),
    take: limit,
    select: cardSelect,
  });
  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  return rows.map((r) => ({ ...r, agency: agencyMap.get(r.agencyId) ?? null }));
}

/** Anasayfa için öne çıkan ilanlar (öne çıkarılmış / featured olanlar önce). */
export async function getFeaturedListings(limit = 8) {
  const rows = await getMarketplaceListings({}, 48);
  const featured = rows.filter((r) => r.featuredUntil || r.property?.isFeatured);
  return (featured.length >= limit ? featured : [...featured, ...rows.filter((r) => !featured.includes(r))]).slice(0, limit);
}

/** Anasayfa istatistikleri. */
export async function getMarketStats() {
  const base = { status: "ACTIVE" as const, isPublic: true, moderationStatus: { notIn: ["PENDING", "REJECTED"] } };
  const [total, sale, rent, agencies] = await Promise.all([
    db.listing.count({ where: base }),
    db.listing.count({ where: { ...base, listingType: "SALE" } }),
    db.listing.count({ where: { ...base, listingType: { in: ["RENT", "SHORT_RENT"] } } }),
    db.agency.count(),
  ]);
  return { total, sale, rent, agencies };
}

/** Filtre için mevcut şehirler (ilanı olanlar). */
export async function getMarketplaceCities(): Promise<string[]> {
  const rows = await db.propertyRealEstate.findMany({
    where: { listings: { some: { status: "ACTIVE", isPublic: true } } },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
    take: 300,
  });
  return rows.map((r) => r.city).filter(Boolean);
}

/** İlan tipine göre adet (anasayfa rozetleri için). */
export async function getCityCounts(limit = 8): Promise<{ city: string; count: number }[]> {
  const rows = await getMarketplaceListings({}, 400);
  const map = new Map<string, number>();
  for (const r of rows) {
    const c = r.property?.city;
    if (c) map.set(c, (map.get(c) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** İlan detayı (tek ilan + mülk + danışman + ofis). Görüntülenmeyi artırır. */
export async function getMarketplaceListingDetail(listingId: string) {
  const base = await db.listing.findFirst({
    where: { id: listingId, status: "ACTIVE", isPublic: true, moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    select: {
      id: true, title: true, listingNo: true, listingType: true,
      askingPrice: true, previousPrice: true, currency: true, monthlyRent: true, deposit: true,
      isNegotiable: true, description: true, highlights: true, views: true,
      videoUrl: true, virtualTourUrl: true, createdAt: true, publishedAt: true,
      urgentUntil: true, verified: true,
      channel: true, agentId: true, agentName: true, agencyId: true, propertyId: true, ownerUserId: true,
    },
  });
  if (!base) return null;

  const agencyRow = await db.agency.findUnique({
    where: { id: base.agencyId },
    select: { id: true, name: true, logo: true, phone: true, city: true, slug: true },
  });
  const listing = { ...base, agency: agencyRow };

  const [property, agent] = await Promise.all([
    db.propertyRealEstate.findUnique({
      where: { id: listing.propertyId },
      select: {
        id: true, title: true, address: true, city: true, district: true, neighborhood: true,
        latitude: true, longitude: true, propertyType: true, status: true,
        grossArea: true, netArea: true, roomCount: true, bathroomCount: true,
        floorNo: true, totalFloors: true, buildingAge: true, heatingType: true,
        hasElevator: true, hasParking: true, isFurnished: true, hasGarden: true,
        hasPool: true, hasBalcony: true, description: true, ownerName: true, ownerPhone: true,
        subType: true, dues: true, facing: true, deedStatus: true, buildStatus: true,
        structureType: true, usageStatus: true, furnishStatus: true, inSite: true,
        siteName: true, creditEligible: true, swappable: true, accessible: true, features: true,
        zoningStatus: true, blockNo: true, parcelNo: true, kaks: true, gabari: true, facadeCount: true,
        images: { select: { url: true, isCover: true, order: true }, orderBy: { order: "asc" } },
      },
    }),
    listing.agentId
      ? db.agent.findUnique({
          where: { id: listing.agentId },
          select: { id: true, firstName: true, lastName: true, phone: true, email: true, imageUrl: true },
        })
      : Promise.resolve(null),
  ]);

  // Görüntülenme sayacı (best-effort)
  db.listing.update({ where: { id: listing.id }, data: { views: { increment: 1 } } }).catch(() => {});

  return { listing, property, agent };
}

/** SEO metadata için hafif sorgu (görüntülenmeyi ARTIRMAZ). */
export async function getListingMeta(listingId: string) {
  return db.listing.findFirst({
    where: { id: listingId, status: "ACTIVE", isPublic: true, moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    select: {
      title: true, description: true, listingType: true, askingPrice: true, currency: true, monthlyRent: true,
      property: { select: { city: true, district: true, propertyType: true, roomCount: true, grossArea: true, images: coverImage } },
    },
  });
}

/** Benzer ilanlar (aynı şehir / tip). */
export async function getSimilarListings(listingId: string, city?: string | null, listingType?: string | null) {
  const rows = await db.listing.findMany({
    where: {
      id: { not: listingId },
      status: "ACTIVE",
      isPublic: true,
      moderationStatus: { notIn: ["PENDING", "REJECTED"] },
      ...(listingType ? { listingType: listingType as any } : {}),
      ...(city ? { property: { city: { contains: city, mode: "insensitive" } } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: cardSelect,
  });
  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  return rows.map((r) => ({ ...r, agency: agencyMap.get(r.agencyId) ?? null }));
}

/** Verilen id listesine göre kartlar (karşılaştırma / son görüntülenenler için). */
export async function getListingsByIds(ids: string[]) {
  if (!ids.length) return [];
  const rows = await db.listing.findMany({
    where: {
      id: { in: ids.slice(0, 12) },
      status: "ACTIVE",
      isPublic: true,
      moderationStatus: { notIn: ["PENDING", "REJECTED"] },
    },
    select: cardSelect,
  });
  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  const map = new Map(rows.map((r) => [r.id, { ...r, agency: agencyMap.get(r.agencyId) ?? null }]));
  // İstenen sırayı koru
  return ids.map((id) => map.get(id)).filter(Boolean) as any[];
}

/**
 * Kategori ağacı için sayımlar: her property type ve her listing type için adet.
 * Mevcut şehir/listingType filtreleri korunur (property type sayımı listingType'a göre,
 * listing type sayımı seçili property type'a göre daralır).
 */
export async function getFacetCounts(filters: MarketFilters = {}) {
  const PROPERTY_TYPES = ["APARTMENT", "HOUSE", "VILLA", "OFFICE", "SHOP", "WAREHOUSE", "LAND", "BUILDING"];
  const LISTING_TYPES = ["SALE", "RENT", "SHORT_RENT"];

  // property type sayımları: propertyType hariç filtreleri uygula
  const baseForPType = buildWhere({ ...filters, propertyType: undefined });
  // listing type sayımları: listingType hariç filtreleri uygula
  const baseForLType = buildWhere({ ...filters, listingType: undefined });

  const withProp = (w: any, ptype: string) => ({
    ...w,
    property: { ...(w.property ?? {}), propertyType: ptype },
  });

  const [ptypeCounts, ltypeCounts, total] = await Promise.all([
    Promise.all(PROPERTY_TYPES.map((pt) => db.listing.count({ where: withProp(baseForPType, pt) }))),
    Promise.all(LISTING_TYPES.map((lt) => db.listing.count({ where: { ...baseForLType, listingType: lt as any } }))),
    db.listing.count({ where: buildWhere(filters) }),
  ]);

  const byProperty: Record<string, number> = {};
  PROPERTY_TYPES.forEach((pt, i) => (byProperty[pt] = ptypeCounts[i]));
  const byListing: Record<string, number> = {};
  LISTING_TYPES.forEach((lt, i) => (byListing[lt] = ltypeCounts[i]));

  return { byProperty, byListing, total };
}

/** İlanın fiyat geçmişi (eskiden yeniye). */
export async function getPriceHistory(listingId: string) {
  return db.listingPriceHistory.findMany({
    where: { listingId },
    orderBy: { createdAt: "asc" },
    select: { price: true, currency: true, createdAt: true },
  });
}

/** Karşılaştırma sayfası için detaylı kayıt. */
export async function getCompareData(ids: string[]) {
  if (!ids.length) return [];
  const rows = await db.listing.findMany({
    where: {
      id: { in: ids.slice(0, 4) },
      status: "ACTIVE",
      isPublic: true,
      moderationStatus: { notIn: ["PENDING", "REJECTED"] },
    },
    select: {
      id: true, title: true, listingType: true, askingPrice: true, monthlyRent: true, currency: true, deposit: true,
      property: {
        select: {
          city: true, district: true, neighborhood: true, propertyType: true, roomCount: true,
          grossArea: true, netArea: true, bathroomCount: true, floorNo: true, totalFloors: true,
          buildingAge: true, heatingType: true, hasElevator: true, hasParking: true, isFurnished: true,
          hasGarden: true, hasPool: true, hasBalcony: true, images: coverImage,
        },
      },
    },
  });
  const map = new Map(rows.map((r) => [r.id, r]));
  return ids.map((id) => map.get(id)).filter(Boolean) as any[];
}
