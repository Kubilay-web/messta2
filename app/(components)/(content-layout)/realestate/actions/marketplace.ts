"use server";

// ============================================================
// Pazar Yeri (Marketplace) — estate ERP verisini okur/yazar.
// Tüm ofislerin (Agency) yayınlanmış ilanlarını tek vitrinde toplar,
// ziyaretçi talebini estate CRM'ine Lead olarak yazar.
// İkinci bir mülk modeli YOK: kaynak estate `Listing` + `PropertyRealEstate`.
// ============================================================

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { computeLeadScore } from "@/app/(components)/(content-layout)/crm/lib/score";
import { validateRequest } from "@/app/auth";

const resend = new Resend(process.env.RESEND_API_KEY);
const MAIL_FROM = process.env.RESEND_FROM_EMAIL ?? "Emlak Pazarı <onboarding@resend.dev>";

function inquiryEmailHtml(opts: {
  listingTitle: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  offer?: number | null;
  currency: string;
}) {
  const sym = opts.currency === "USD" ? "$" : opts.currency === "EUR" ? "€" : "₺";
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#0F2F56;color:#fff;padding:16px 20px"><h2 style="margin:0;font-size:18px">Yeni İlan Talebi</h2></div>
    <div style="padding:20px;color:#111">
      <p style="margin:0 0 12px">"<b>${opts.listingTitle}</b>" ilanınıza yeni bir talep geldi:</p>
      <table style="width:100%;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 0;color:#6b7280">Ad Soyad</td><td style="padding:6px 0;font-weight:600">${opts.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280">Telefon</td><td style="padding:6px 0;font-weight:600">${opts.phone}</td></tr>
        ${opts.email ? `<tr><td style="padding:6px 0;color:#6b7280">E-posta</td><td style="padding:6px 0">${opts.email}</td></tr>` : ""}
        ${opts.offer != null ? `<tr><td style="padding:6px 0;color:#6b7280">Teklif</td><td style="padding:6px 0;font-weight:600;color:#059669">${sym}${Number(opts.offer).toLocaleString("tr-TR")}</td></tr>` : ""}
      </table>
      ${opts.message ? `<div style="margin-top:12px;background:#f9fafb;border-radius:8px;padding:12px;font-size:14px;color:#374151">${opts.message}</div>` : ""}
      <p style="margin-top:16px;font-size:12px;color:#9ca3af">Bu talep CRM panelinize de kaydedildi.</p>
    </div>
  </div>`;
}

export type MarketFilters = {
  listingType?: string; // SALE | RENT | SHORT_RENT
  propertyType?: string; // APARTMENT | HOUSE | ...
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: string; // "3+1"
  minArea?: number;
  maxArea?: number;
  amenities?: string[]; // hasElevator | hasParking | isFurnished | hasGarden | hasPool | hasBalcony
  q?: string;
  sort?: string; // newest | price_asc | price_desc
};

const AMENITY_KEYS = ["hasElevator", "hasParking", "isFurnished", "hasGarden", "hasPool", "hasBalcony"];

const coverImage = {
  select: { url: true },
  orderBy: [{ isCover: "desc" as const }, { order: "asc" as const }],
  take: 1,
};

function buildWhere(filters: MarketFilters) {
  // Yalnızca açıkça PENDING/REJECTED olanlar gizlenir; ofis (ERP) ilanları ve
  // alanı henüz set edilmemiş eski kayıtlar görünür kalır (MongoDB $nin eksik alanı da eşler).
  const where: any = {
    status: "ACTIVE",
    isPublic: true,
    moderationStatus: { notIn: ["PENDING", "REJECTED"] },
  };

  if (filters.listingType) where.listingType = filters.listingType;
  if (filters.q) where.title = { contains: filters.q, mode: "insensitive" };

  if (filters.minPrice != null || filters.maxPrice != null) {
    where.askingPrice = {};
    if (filters.minPrice != null) where.askingPrice.gte = filters.minPrice;
    if (filters.maxPrice != null) where.askingPrice.lte = filters.maxPrice;
  }

  const propWhere: any = {};
  if (filters.propertyType) propWhere.propertyType = filters.propertyType;
  if (filters.city) propWhere.city = { contains: filters.city, mode: "insensitive" };
  if (filters.rooms) propWhere.roomCount = filters.rooms;
  if (filters.minArea != null || filters.maxArea != null) {
    propWhere.grossArea = {};
    if (filters.minArea != null) propWhere.grossArea.gte = filters.minArea;
    if (filters.maxArea != null) propWhere.grossArea.lte = filters.maxArea;
  }
  for (const a of filters.amenities ?? []) {
    if (AMENITY_KEYS.includes(a)) propWhere[a] = true;
  }
  if (Object.keys(propWhere).length) where.property = propWhere;

  return where;
}

/** Vitrin / arama sonuç listesi (tüm ofisler genelinde). */
export async function getMarketplaceListings(filters: MarketFilters = {}, limit = 60) {
  const where = buildWhere(filters);

  const orderBy =
    filters.sort === "price_asc"
      ? { askingPrice: "asc" as const }
      : filters.sort === "price_desc"
        ? { askingPrice: "desc" as const }
        : { createdAt: "desc" as const };

  const rows = await db.listing.findMany({
    where,
    orderBy,
    take: limit,
    select: {
      id: true,
      title: true,
      listingType: true,
      askingPrice: true,
      currency: true,
      monthlyRent: true,
      createdAt: true,
      agencyId: true,
      property: {
        select: {
          city: true,
          district: true,
          propertyType: true,
          roomCount: true,
          grossArea: true,
          bathroomCount: true,
          isFeatured: true,
          images: coverImage,
        },
      },
    },
  });

  // Ofisi ayrı çek (zorunlu ilişki çözülemezse hata vermemesi için)
  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  return rows.map((r) => ({ ...r, agency: agencyMap.get(r.agencyId) ?? null }));
}

/** Verilen agencyId'ler için {id → {name, logo}} haritası (eksik kayıtlara dayanıklı). */
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
export async function getMarketplacePage(
  filters: MarketFilters = {},
  page = 1,
  pageSize = 12,
) {
  const where = buildWhere(filters);
  const orderBy =
    filters.sort === "price_asc"
      ? { askingPrice: "asc" as const }
      : filters.sort === "price_desc"
        ? { askingPrice: "desc" as const }
        : { createdAt: "desc" as const };

  const [rows, total] = await Promise.all([
    db.listing.findMany({
      where,
      orderBy,
      skip: (Math.max(1, page) - 1) * pageSize,
      take: pageSize,
      select: {
        id: true, title: true, listingType: true, askingPrice: true, currency: true,
        monthlyRent: true, createdAt: true, agencyId: true,
        property: {
          select: {
            city: true, district: true, propertyType: true, roomCount: true,
            grossArea: true, bathroomCount: true, latitude: true, longitude: true,
            isFeatured: true, images: coverImage,
          },
        },
      },
    }),
    db.listing.count({ where }),
  ]);

  const agencyMap = await loadAgencies(rows.map((r) => r.agencyId));
  const items = rows.map((r) => ({ ...r, agency: agencyMap.get(r.agencyId) ?? null }));
  return { items, total, page: Math.max(1, page), pageSize, pages: Math.ceil(total / pageSize) };
}

/** Anasayfa için öne çıkan ilanlar (isFeatured mülkler önce). */
export async function getFeaturedListings(limit = 6) {
  const rows = await getMarketplaceListings({}, 40);
  const featured = rows.filter((r) => r.property?.isFeatured);
  return (featured.length ? featured : rows).slice(0, limit);
}

/** Filtre için mevcut şehirler. */
export async function getMarketplaceCities(): Promise<string[]> {
  const rows = await db.propertyRealEstate.findMany({
    where: { listings: { some: { status: "ACTIVE", isPublic: true } } },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
    take: 200,
  });
  return rows.map((r) => r.city).filter(Boolean);
}

/** İlan detay (tek ilan + mülk + danışman + ofis). */
export async function getMarketplaceListingDetail(listingId: string) {
  const base = await db.listing.findFirst({
    where: { id: listingId, status: "ACTIVE", isPublic: true },
    select: {
      id: true, title: true, listingNo: true, listingType: true,
      askingPrice: true, currency: true, monthlyRent: true, deposit: true,
      isNegotiable: true, description: true, highlights: true, views: true,
      videoUrl: true, virtualTourUrl: true,
      agentId: true, agentName: true, agencyId: true, propertyId: true,
    },
  });
  if (!base) return null;

  const agencyRow = await db.agency.findUnique({
    where: { id: base.agencyId },
    select: { id: true, name: true, logo: true, phone: true, city: true },
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
        hasPool: true, hasBalcony: true, description: true,
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

/** SEO metadata için hafif sorgu (görüntülenme sayacını ARTIRMAZ). */
export async function getListingMeta(listingId: string) {
  const l = await db.listing.findFirst({
    where: { id: listingId, status: "ACTIVE", isPublic: true, moderationStatus: { notIn: ["PENDING", "REJECTED"] } },
    select: {
      title: true, description: true, listingType: true, askingPrice: true, currency: true, monthlyRent: true,
      property: {
        select: {
          city: true, district: true, propertyType: true, roomCount: true, grossArea: true,
          images: coverImage,
        },
      },
    },
  });
  return l;
}

/** Benzer ilanlar (aynı şehir / tip). */
export async function getSimilarListings(listingId: string, city?: string, listingType?: string) {
  return db.listing.findMany({
    where: {
      id: { not: listingId },
      status: "ACTIVE",
      isPublic: true,
      moderationStatus: { notIn: ["PENDING", "REJECTED"] },
      ...(listingType ? { listingType: listingType as any } : {}),
      ...(city ? { property: { city: { contains: city, mode: "insensitive" } } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 4,
    select: {
      id: true, title: true, listingType: true, askingPrice: true, currency: true, monthlyRent: true,
      property: {
        select: { city: true, district: true, propertyType: true, roomCount: true, grossArea: true, images: coverImage },
      },
    },
  });
}

/* ------------------------------------------------------------------ */
/*  TALEP GÖNDER  →  estate CRM Lead                                   */
/* ------------------------------------------------------------------ */

export type InquiryInput = {
  listingId: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  offerAmount?: number | null;
};

export async function submitInquiry(input: InquiryInput) {
  try {
    if (!input.name?.trim() || !input.phone?.trim()) {
      return { error: "Ad ve telefon zorunludur." };
    }

    // Talep gönderen ziyaretçi giriş yapmışsa hesabını fırsata bağla.
    const { user } = await validateRequest();

    const listing = await db.listing.findFirst({
      where: { id: input.listingId, status: "ACTIVE", isPublic: true },
      select: {
        id: true, title: true, agencyId: true, agentId: true, agentName: true,
        ownerUserId: true, listingType: true, askingPrice: true, currency: true,
        property: { select: { city: true, district: true, propertyType: true, roomCount: true } },
      },
    });
    if (!listing) return { error: "İlan bulunamadı veya yayından kaldırılmış." };

    // İlgili ofisin varsayılan satış hattı + ilk aşaması
    const pipeline = await db.crmPipeline.findFirst({
      where: { agencyId: listing.agencyId },
      orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
      select: { id: true },
    });
    if (!pipeline) return { error: "Bu ofis henüz talep almaya hazır değil." };

    const stage = await db.crmStage.findFirst({
      where: { pipelineId: pipeline.id, isWon: false, isLost: false },
      orderBy: { order: "asc" },
      select: { id: true },
    });
    if (!stage) return { error: "Bu ofis henüz talep almaya hazır değil." };

    const score = computeLeadScore({
      temperature: "WARM",
      value: input.offerAmount ?? null,
      lastActivityAt: new Date(),
      source: "WEBSITE",
      contactPhone: input.phone,
      contactEmail: input.email,
      listingId: listing.id,
    });

    await db.lead.create({
      data: {
        agencyId: listing.agencyId,
        pipelineId: pipeline.id,
        stageId: stage.id,
        score,
        title: `Pazar yeri talebi: ${listing.title}`,
        contactName: input.name.trim(),
        contactPhone: input.phone.trim(),
        contactEmail: input.email?.trim() || null,
        source: "WEBSITE",
        temperature: "WARM",
        value: input.offerAmount ?? null,
        currency: listing.currency ?? "TRY",
        listingType: listing.listingType,
        propertyType: listing.property?.propertyType ?? null,
        city: listing.property?.city ?? null,
        district: listing.property?.district ?? null,
        roomCount: listing.property?.roomCount ?? null,
        requirements: input.message?.trim() || null,
        agentId: listing.agentId || null,
        agentName: listing.agentName || null,
        listingId: listing.id,
        userId: user?.id ?? null,
        tags: ["pazar-yeri"],
        lastActivityAt: new Date(),
      },
    });

    // İlgili ofisin CRM panelini tazele
    revalidatePath(`/crm/agency/${listing.agencyId}`);
    revalidatePath(`/crm/agency/${listing.agencyId}/leads`);
    revalidatePath(`/crm/agency/${listing.agencyId}/pipeline`);

    // E-posta bildirimi: ofis danışmanı → bireysel ilan sahibi → ofis e-postası
    try {
      let to: string | null = null;
      if (listing.agentId) {
        const a = await db.agent.findUnique({ where: { id: listing.agentId }, select: { email: true } });
        to = a?.email ?? null;
      }
      if (!to && listing.ownerUserId) {
        const u = await db.user.findUnique({ where: { id: listing.ownerUserId }, select: { email: true } });
        to = u?.email ?? null;
      }
      if (!to) {
        const ag = await db.agency.findUnique({ where: { id: listing.agencyId }, select: { primaryEmail: true } });
        to = ag?.primaryEmail ?? null;
      }
      if (to) {
        await resend.emails.send({
          from: MAIL_FROM,
          to,
          subject: `Yeni talep: ${listing.title}`,
          html: inquiryEmailHtml({
            listingTitle: listing.title,
            name: input.name,
            phone: input.phone,
            email: input.email,
            message: input.message,
            offer: input.offerAmount ?? null,
            currency: listing.currency ?? "TRY",
          }),
        });
      }
    } catch {
      /* e-posta hatası talebi engellemesin */
    }

    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Talep gönderilemedi." };
  }
}
