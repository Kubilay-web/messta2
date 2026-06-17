"use server";

// Sahibinden Pazar Yeri — ofis / mağaza vitrini (Agency profili + ilanları).

import db from "@/app/lib/db";

const coverImage = {
  select: { url: true },
  orderBy: [{ isCover: "desc" as const }, { order: "asc" as const }],
  take: 1,
};

const cardSelect = {
  id: true, title: true, listingType: true, askingPrice: true, currency: true,
  monthlyRent: true, views: true, createdAt: true, featuredUntil: true, channel: true, agencyId: true,
  property: {
    select: {
      city: true, district: true, neighborhood: true, propertyType: true, roomCount: true,
      grossArea: true, bathroomCount: true, isFeatured: true, images: coverImage,
    },
  },
} as const;

const PUBLISHED = {
  status: "ACTIVE" as const,
  isPublic: true,
  moderationStatus: { notIn: ["PENDING", "REJECTED"] },
};

/** Ofis profili + yayınlanmış ilanları (sayfalı) + istatistik. */
export async function getAgencyBySlug(slug: string, listingType?: string, page = 1, pageSize = 12) {
  const agency = await db.agency.findUnique({
    where: { slug },
    select: {
      id: true, name: true, logo: true, slug: true, primaryEmail: true,
      phone: true, address: true, city: true, licenseNo: true, createdAt: true,
    },
  });
  if (!agency) return null;

  const where: any = { ...PUBLISHED, agencyId: agency.id };
  if (listingType) where.listingType = listingType;

  const [items, total, saleCount, rentCount, agentCount] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy: [{ featuredUntil: "desc" }, { createdAt: "desc" }],
      skip: (Math.max(1, page) - 1) * pageSize,
      take: pageSize,
      select: cardSelect,
    }),
    db.listing.count({ where }),
    db.listing.count({ where: { ...PUBLISHED, agencyId: agency.id, listingType: "SALE" } }),
    db.listing.count({ where: { ...PUBLISHED, agencyId: agency.id, listingType: { in: ["RENT", "SHORT_RENT"] } } }),
    db.agent.count({ where: { agencyId: agency.id } }),
  ]);

  return {
    agency,
    items: items.map((r) => ({ ...r, agency: { name: agency.name, logo: agency.logo } })),
    total,
    page: Math.max(1, page),
    pages: Math.max(1, Math.ceil(total / pageSize)),
    stats: { sale: saleCount, rent: rentCount, agents: agentCount, total: saleCount + rentCount },
  };
}

/** İlan id'sinden bağlı ofisin slug'ını çözer (detay sayfasından link için). */
export async function getAgencySlugByListing(listingId: string): Promise<string | null> {
  const l = await db.listing.findUnique({ where: { id: listingId }, select: { agencyId: true } });
  if (!l) return null;
  const a = await db.agency.findUnique({ where: { id: l.agencyId }, select: { slug: true } });
  return a?.slug ?? null;
}
