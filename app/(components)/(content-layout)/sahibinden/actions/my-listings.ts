"use server";

// ============================================================
// Sahibinden — bireysel ilanlar (estate `Listing` üzerinde).
// Bireysel ilanlar "Bireysel İlanlar" sistem ofisi (Agency) altında
// channel=INDIVIDUAL + ownerUserId ile tutulur; talepler CRM Lead'ine düşer.
// ============================================================

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { pushNotification } from "./notifications";
import { formatPrice } from "../lib/format";

const INDIVIDUAL_SLUG = "bireysel-ilanlar";

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i")
      .replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || "ilan"
  );
}

const rnd = () => Math.random().toString(36).slice(2, 8);

async function ensureAgencyPipeline(agencyId: string) {
  const pipeline = await db.crmPipeline.findFirst({ where: { agencyId } });
  if (pipeline) return;
  const created = await db.crmPipeline.create({
    data: { agencyId, name: "Talepler", isDefault: true },
  });
  await db.crmStage.createMany({
    data: [
      { pipelineId: created.id, name: "Yeni Talep", order: 0, color: "#3b82f6" },
      { pipelineId: created.id, name: "İletişimde", order: 1, color: "#f59e0b", probability: 40 },
      { pipelineId: created.id, name: "Anlaşıldı", order: 2, color: "#10b981", probability: 100, isWon: true },
      { pipelineId: created.id, name: "Vazgeçti", order: 3, color: "#ef4444", isLost: true },
    ],
  });
}

/** Bireysel ilanların tutulduğu sistem ofisini (pipeline'ıyla) getirir/oluşturur. */
async function getIndividualAgency() {
  let agency = await db.agency.findUnique({ where: { slug: INDIVIDUAL_SLUG } });
  if (!agency) {
    agency = await db.agency.create({
      data: { name: "Bireysel İlanlar", slug: INDIVIDUAL_SLUG, siteEnabled: false },
    });
  }
  await ensureAgencyPipeline(agency.id);
  return agency;
}

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapmalısınız.");
  return user;
}

const FREE_LISTING_QUOTA = 5; // üyeliksiz kullanıcı aktif ilan limiti
const LISTING_LIFETIME_DAYS = 60; // ilan yayın süresi

/** Kullanıcının aktif ilan kotası (0 = sınırsız). */
async function getEffectiveQuota(userId: string): Promise<number> {
  const m = await db.marketMembership.findUnique({ where: { userId } });
  const active = !!m && m.status === "ACTIVE" && (!m.expiresAt || m.expiresAt > new Date());
  if (!active) return FREE_LISTING_QUOTA;
  return m!.listingQuota; // 0 = sınırsız
}

export type MyListingInput = {
  title: string;
  description?: string;
  listingType: string; // SALE | RENT | SHORT_RENT
  propertyType: string; // APARTMENT | ...
  askingPrice: number;
  monthlyRent?: number | null;
  deposit?: number | null;
  currency?: string;
  isNegotiable?: boolean;
  city: string;
  district: string;
  neighborhood?: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  roomCount?: string;
  bathroomCount?: number | null;
  grossArea?: number | null;
  netArea?: number | null;
  floorNo?: number | null;
  totalFloors?: number | null;
  buildingAge?: number | null;
  heatingType?: string;
  hasElevator?: boolean;
  hasParking?: boolean;
  isFurnished?: boolean;
  hasGarden?: boolean;
  hasPool?: boolean;
  hasBalcony?: boolean;
  images?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  ownerName?: string;
  ownerPhone?: string;
  // --- Gelişmiş emlak alanları ---
  subType?: string;
  dues?: number | null;
  facing?: string[];
  deedStatus?: string;
  buildStatus?: string;
  structureType?: string;
  usageStatus?: string;
  furnishStatus?: string;
  inSite?: boolean;
  siteName?: string;
  creditEligible?: boolean;
  swappable?: boolean;
  accessible?: boolean;
  features?: string[];
  // Arsa
  zoningStatus?: string;
  blockNo?: string;
  parcelNo?: string;
  kaks?: string;
  gabari?: string;
  facadeCount?: number | null;
};

// create/update için ortak PropertyRealEstate alanları (DRY).
function propertyFields(input: MyListingInput) {
  return {
    propertyType: input.propertyType as any,
    grossArea: input.grossArea ?? null,
    netArea: input.netArea ?? null,
    roomCount: input.roomCount || null,
    bathroomCount: input.bathroomCount ?? null,
    floorNo: input.floorNo ?? null,
    totalFloors: input.totalFloors ?? null,
    buildingAge: input.buildingAge ?? null,
    heatingType: input.heatingType || null,
    hasElevator: !!input.hasElevator,
    hasParking: !!input.hasParking,
    isFurnished: !!input.isFurnished || input.furnishStatus === "FURNISHED",
    hasGarden: !!input.hasGarden,
    hasPool: !!input.hasPool,
    hasBalcony: !!input.hasBalcony,
    // gelişmiş
    subType: input.subType || null,
    dues: input.dues ?? null,
    facing: input.facing ?? [],
    deedStatus: input.deedStatus || null,
    buildStatus: input.buildStatus || null,
    structureType: input.structureType || null,
    usageStatus: input.usageStatus || null,
    furnishStatus: input.furnishStatus || null,
    inSite: !!input.inSite,
    siteName: input.siteName?.trim() || null,
    creditEligible: !!input.creditEligible,
    swappable: !!input.swappable,
    accessible: !!input.accessible,
    features: input.features ?? [],
    zoningStatus: input.zoningStatus || null,
    blockNo: input.blockNo?.trim() || null,
    parcelNo: input.parcelNo?.trim() || null,
    kaks: input.kaks?.trim() || null,
    gabari: input.gabari?.trim() || null,
    facadeCount: input.facadeCount ?? null,
  };
}

/* ----------------------------- CREATE ----------------------------- */
export async function createMyListing(input: MyListingInput) {
  try {
    const user = await requireUser();
    if (!input.title?.trim() || !input.city?.trim() || !input.address?.trim()) {
      return { error: "Başlık, şehir ve adres zorunludur." };
    }
    if (!(input.askingPrice > 0)) return { error: "Geçerli bir fiyat giriniz." };

    // Üyelik kotası kontrolü (aktif ilan limiti)
    const quota = await getEffectiveQuota(user.id);
    if (quota > 0) {
      const activeCount = await db.listing.count({
        where: { ownerUserId: user.id, status: "ACTIVE", moderationStatus: { not: "REJECTED" } },
      });
      if (activeCount >= quota) {
        return {
          error: `Aktif ilan limitinize ulaştınız (${quota}). Daha fazla ilan için üyeliğinizi yükseltin.`,
          needUpgrade: true,
        };
      }
    }

    const agency = await getIndividualAgency();
    const ownerName = input.ownerName?.trim() || (user.username ?? "İlan Sahibi");

    const property = await db.propertyRealEstate.create({
      data: {
        title: input.title.trim(),
        slug: `${slugify(input.title)}-${rnd()}`,
        address: input.address.trim(),
        city: input.city.trim(),
        district: input.district?.trim() || "—",
        neighborhood: input.neighborhood?.trim() || null,
        latitude: input.latitude ?? null,
        longitude: input.longitude ?? null,
        ...propertyFields(input),
        description: input.description || null,
        ownerName,
        ownerPhone: input.ownerPhone?.trim() || null,
        agencyId: agency.id,
        agencyName: agency.name,
        images: input.images?.length
          ? { create: input.images.map((url, i) => ({ url, isCover: i === 0, order: i })) }
          : undefined,
      },
    });

    const listing = await db.listing.create({
      data: {
        title: input.title.trim(),
        listingNo: `BIR-${new Date().getFullYear()}-${rnd().toUpperCase()}`,
        listingType: input.listingType as any,
        status: "ACTIVE",
        channel: "INDIVIDUAL",
        moderationStatus: "PENDING", // bireysel ilanlar admin onayı bekler
        ownerUserId: user.id,
        askingPrice: input.askingPrice,
        currency: input.currency || "TRY",
        monthlyRent: input.monthlyRent ?? null,
        deposit: input.deposit ?? null,
        isNegotiable: input.isNegotiable ?? true,
        isPublic: true,
        publishedAt: new Date(),
        bumpedAt: new Date(),
        expiresAt: new Date(Date.now() + LISTING_LIFETIME_DAYS * 86400000),
        videoUrl: input.videoUrl?.trim() || null,
        virtualTourUrl: input.virtualTourUrl?.trim() || null,
        description: input.description || null,
        propertyId: property.id,
        agentName: ownerName,
        agencyId: agency.id,
      },
    });

    // Fiyat geçmişi: ilk kayıt
    await db.listingPriceHistory.create({
      data: { listingId: listing.id, price: input.askingPrice, currency: input.currency || "TRY" },
    }).catch(() => {});

    revalidatePath("/sahibinden/hesabim");
    revalidatePath("/sahibinden/ilanlar");
    revalidatePath("/sahibinden");
    return { ok: true, id: listing.id };
  } catch (e: any) {
    return { error: e?.message ?? "İlan oluşturulamadı." };
  }
}

/* ----------------------------- UPDATE ----------------------------- */
export async function updateMyListing(listingId: string, input: MyListingInput) {
  try {
    const user = await requireUser();
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerUserId: user.id },
      select: { id: true, propertyId: true, askingPrice: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };

    const priceChanged = input.askingPrice !== listing.askingPrice;

    await db.listing.update({
      where: { id: listing.id },
      data: {
        title: input.title.trim(),
        listingType: input.listingType as any,
        askingPrice: input.askingPrice,
        previousPrice: priceChanged ? listing.askingPrice : undefined,
        currency: input.currency || "TRY",
        monthlyRent: input.monthlyRent ?? null,
        deposit: input.deposit ?? null,
        isNegotiable: input.isNegotiable ?? true,
        videoUrl: input.videoUrl?.trim() || null,
        virtualTourUrl: input.virtualTourUrl?.trim() || null,
        description: input.description || null,
      },
    });

    // Fiyat değiştiyse geçmişe ekle
    if (priceChanged) {
      await db.listingPriceHistory.create({
        data: { listingId: listing.id, price: input.askingPrice, currency: input.currency || "TRY" },
      }).catch(() => {});
    }

    // Fiyat DÜŞTÜYSE → bu ilanı favorileyen üyelere bildirim
    if (input.askingPrice < listing.askingPrice) {
      try {
        const favs = await db.marketFavorite.findMany({
          where: { listingId: listing.id },
          select: { userId: true, priceAtSave: true },
        });
        const cur = input.currency || "TRY";
        await Promise.all(
          favs
            .filter((f) => f.priceAtSave == null || input.askingPrice < f.priceAtSave)
            .map((f) =>
              pushNotification({
                userId: f.userId,
                type: "PRICE_DROP",
                title: "Favori ilanınızda fiyat düştü",
                body: `${input.title.trim()} → ${formatPrice(input.askingPrice, cur)}`,
                link: `/sahibinden/ilan/${listing.id}`,
              }),
            ),
        );
        // Bildirilen favorilerin referans fiyatını güncelle (tekrarı önle)
        await db.marketFavorite.updateMany({
          where: { listingId: listing.id },
          data: { priceAtSave: input.askingPrice },
        });
      } catch {
        /* bildirim hatası kaydı engellemesin */
      }
    }

    if (input.images) {
      await db.propertyImage.deleteMany({ where: { propertyId: listing.propertyId } });
    }

    await db.propertyRealEstate.update({
      where: { id: listing.propertyId },
      data: {
        title: input.title.trim(),
        address: input.address.trim(),
        city: input.city.trim(),
        district: input.district?.trim() || "—",
        neighborhood: input.neighborhood?.trim() || null,
        latitude: input.latitude ?? undefined,
        longitude: input.longitude ?? undefined,
        ...propertyFields(input),
        description: input.description || null,
        ownerName: input.ownerName?.trim() || undefined,
        ownerPhone: input.ownerPhone?.trim() || null,
        images: input.images?.length
          ? { create: input.images.map((url, i) => ({ url, isCover: i === 0, order: i })) }
          : undefined,
      },
    });

    revalidatePath("/sahibinden/hesabim");
    revalidatePath(`/sahibinden/ilan/${listing.id}`);
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "İlan güncellenemedi." };
  }
}

/* --------------------------- PROMOTE (öne çıkar) --------------------------- */
export async function promoteMyListing(listingId: string, days = 7) {
  try {
    const user = await requireUser();
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerUserId: user.id },
      select: { id: true, propertyId: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };

    const until = new Date(Date.now() + days * 86400000);
    await db.listing.update({ where: { id: listing.id }, data: { featuredUntil: until } });
    await db.propertyRealEstate.update({ where: { id: listing.propertyId }, data: { isFeatured: true } });

    revalidatePath("/sahibinden/hesabim");
    revalidatePath("/sahibinden");
    return { ok: true, until };
  } catch (e: any) {
    return { error: e?.message ?? "Öne çıkarılamadı." };
  }
}

/* --------------------------- STATUS (yayın aç/kapa) --------------------------- */
export async function setListingStatus(listingId: string, status: "ACTIVE" | "WITHDRAWN") {
  try {
    const user = await requireUser();
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerUserId: user.id },
      select: { id: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };
    await db.listing.update({ where: { id: listing.id }, data: { status: status as any } });
    revalidatePath("/sahibinden/hesabim");
    revalidatePath("/sahibinden/ilanlar");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "Durum değiştirilemedi." };
  }
}

/* --------------------------- BUMP (yenile / öne al) --------------------------- */
const BUMP_COOLDOWN_HOURS = 24;

export async function bumpListing(listingId: string) {
  try {
    const user = await requireUser();
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerUserId: user.id },
      select: { id: true, bumpedAt: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };

    if (listing.bumpedAt) {
      const hrs = (Date.now() - new Date(listing.bumpedAt).getTime()) / 3600000;
      if (hrs < BUMP_COOLDOWN_HOURS) {
        const left = Math.ceil(BUMP_COOLDOWN_HOURS - hrs);
        return { error: `İlanı ${left} saat sonra tekrar öne alabilirsiniz.` };
      }
    }

    await db.listing.update({
      where: { id: listing.id },
      data: {
        bumpedAt: new Date(),
        publishedAt: new Date(),
        expiresAt: new Date(Date.now() + LISTING_LIFETIME_DAYS * 86400000),
      },
    });

    revalidatePath("/sahibinden/hesabim");
    revalidatePath("/sahibinden/ilanlar");
    revalidatePath("/sahibinden");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "İlan öne alınamadı." };
  }
}

/* ----------------------------- DELETE ----------------------------- */
export async function deleteMyListing(listingId: string) {
  try {
    const user = await requireUser();
    const listing = await db.listing.findFirst({
      where: { id: listingId, ownerUserId: user.id },
      select: { id: true, propertyId: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };

    await db.listing.delete({ where: { id: listing.id } });
    await db.propertyRealEstate.delete({ where: { id: listing.propertyId } }).catch(() => {});

    revalidatePath("/sahibinden/hesabim");
    revalidatePath("/sahibinden/ilanlar");
    return { ok: true };
  } catch (e: any) {
    return { error: e?.message ?? "İlan silinemedi." };
  }
}

/* ----------------------------- READ ------------------------------- */
export async function getMyListings() {
  const user = await requireUser();
  return db.listing.findMany({
    where: { ownerUserId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, listingType: true, status: true, askingPrice: true,
      currency: true, monthlyRent: true, views: true, createdAt: true,
      moderationStatus: true, featuredUntil: true, urgentUntil: true, highlightUntil: true,
      bumpedAt: true, expiresAt: true,
      property: {
        select: {
          city: true, district: true, propertyType: true, roomCount: true,
          images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
        },
      },
      _count: { select: { crmLeads: true, favorites: true } },
    },
  });
}

export async function getMyListing(listingId: string) {
  const user = await requireUser();
  return db.listing.findFirst({
    where: { id: listingId, ownerUserId: user.id },
    select: {
      id: true, title: true, listingType: true, askingPrice: true, currency: true,
      monthlyRent: true, deposit: true, isNegotiable: true, description: true,
      videoUrl: true, virtualTourUrl: true, featuredUntil: true,
      property: {
        select: {
          city: true, district: true, neighborhood: true, address: true, propertyType: true,
          latitude: true, longitude: true,
          grossArea: true, netArea: true, roomCount: true, bathroomCount: true,
          floorNo: true, totalFloors: true, buildingAge: true, heatingType: true,
          hasElevator: true, hasParking: true, isFurnished: true, hasGarden: true,
          hasPool: true, hasBalcony: true, ownerName: true, ownerPhone: true,
          subType: true, dues: true, facing: true, deedStatus: true, buildStatus: true,
          structureType: true, usageStatus: true, furnishStatus: true, inSite: true,
          siteName: true, creditEligible: true, swappable: true, accessible: true, features: true,
          zoningStatus: true, blockNo: true, parcelNo: true, kaks: true, gabari: true, facadeCount: true,
          images: { select: { url: true }, orderBy: { order: "asc" } },
        },
      },
    },
  });
}

/** İlanlarıma gelen talepler (estate CRM Lead'leri). */
export async function getMyInquiries() {
  const user = await requireUser();
  return db.lead.findMany({
    where: { listing: { ownerUserId: user.id } },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true, contactName: true, contactPhone: true, contactEmail: true,
      value: true, currency: true, requirements: true, createdAt: true,
      listing: { select: { id: true, title: true } },
    },
  });
}
