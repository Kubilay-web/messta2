"use server";

// ============================================================
// Bireysel (sahibinden) ilanlar — estate `Listing` üstünde.
// Eski `Property`/`Query` modeli yerine tek sistem: tüm ilanlar
// estate Listing'de, talepler estate CRM Lead'inde.
// Bireysel ilanlar, sistem "Bireysel İlanlar" ofisi (Agency) altında
// channel=INDIVIDUAL + ownerUserId ile tutulur.
// ============================================================

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";

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

/** Bireysel ilanların tutulduğu sistem ofisini (pipeline'ıyla) getirir/oluşturur. */
async function getIndividualAgency() {
  let agency = await db.agency.findUnique({ where: { slug: INDIVIDUAL_SLUG } });
  if (!agency) {
    agency = await db.agency.create({
      data: { name: "Bireysel İlanlar", slug: INDIVIDUAL_SLUG, siteEnabled: false },
    });
  }

  // CRM hattı yoksa varsayılan hattı + aşamaları oluştur (talep→Lead için gerekli)
  const pipeline = await db.crmPipeline.findFirst({ where: { agencyId: agency.id } });
  if (!pipeline) {
    const created = await db.crmPipeline.create({
      data: { agencyId: agency.id, name: "Bireysel Talepler", isDefault: true },
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

  return agency;
}

/** Bir ofiste CRM hattı yoksa basit varsayılan hattı + aşamaları oluşturur (talep→Lead için). */
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

/**
 * Giriş yapan kullanıcının ilan yayınlayabileceği KENDİ ofisini döndürür
 * (aktif ofisi öncelikli; "Bireysel İlanlar" sistem ofisi hariç). Yoksa null.
 */
export async function getMyPublisherAgency() {
  const { user } = await validateRequest();
  if (!user) return null;
  if (user.agencyId) {
    const active = await db.agency.findFirst({
      where: { id: user.agencyId, slug: { not: INDIVIDUAL_SLUG } },
      select: { id: true, name: true },
    });
    if (active) return active;
  }
  return db.agency.findFirst({
    where: { ownerUserId: user.id, slug: { not: INDIVIDUAL_SLUG } },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
}

async function requireUser() {
  const { user } = await validateRequest();
  if (!user) throw new Error("Giriş yapmalısınız.");
  return user;
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
  // "agency" = kullanıcının kendi ofisi adına (ofis adı görünür, talepler ofis CRM'ine);
  // "individual" (varsayılan) = sistem "Bireysel İlanlar" ofisi altında sahibinden.
  publishAs?: "individual" | "agency";
};

/* ----------------------------- CREATE ----------------------------- */
export async function createMyListing(input: MyListingInput) {
  try {
    const user = await requireUser();
    if (!input.title?.trim() || !input.city?.trim() || !input.address?.trim()) {
      return { error: "Başlık, şehir ve adres zorunludur." };
    }
    if (!(input.askingPrice > 0)) return { error: "Geçerli bir fiyat giriniz." };

    // Yayın sahibi: kendi ofisi adına mı, bireysel mi?
    let agency: { id: string; name: string };
    let channel: "INDIVIDUAL" | "AGENCY" = "INDIVIDUAL";
    let moderationStatus: "PENDING" | "APPROVED" = "PENDING";
    if (input.publishAs === "agency") {
      const own = await getMyPublisherAgency();
      if (!own) {
        return { error: "Yayınlanacak ofis bulunamadı. Lütfen önce bir ofis oluşturun." };
      }
      await ensureAgencyPipeline(own.id);
      agency = own;
      channel = "AGENCY";
      moderationStatus = "APPROVED"; // kendi ofisinin ilanı: onay beklemeden yayında
    } else {
      agency = await getIndividualAgency();
    }
    const ownerName = input.ownerName?.trim() || (user.username ?? "İlan Sahibi");

    const property = await db.propertyRealEstate.create({
      data: {
        title: input.title.trim(),
        slug: `${slugify(input.title)}-${rnd()}`,
        address: input.address.trim(),
        city: input.city.trim(),
        district: input.district?.trim() || "—",
        neighborhood: input.neighborhood?.trim() || null,
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
        isFurnished: !!input.isFurnished,
        hasGarden: !!input.hasGarden,
        hasPool: !!input.hasPool,
        hasBalcony: !!input.hasBalcony,
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

    await db.listing.create({
      data: {
        title: input.title.trim(),
        listingNo: `${channel === "AGENCY" ? "OFS" : "BIR"}-${new Date().getFullYear()}-${rnd().toUpperCase()}`,
        listingType: input.listingType as any,
        status: "ACTIVE",
        channel,
        moderationStatus, // ofis adına = APPROVED, bireysel = PENDING (admin onayı bekler)
        ownerUserId: user.id,
        askingPrice: input.askingPrice,
        currency: input.currency || "TRY",
        monthlyRent: input.monthlyRent ?? null,
        deposit: input.deposit ?? null,
        isNegotiable: input.isNegotiable ?? true,
        isPublic: true,
        publishedAt: new Date(),
        videoUrl: input.videoUrl?.trim() || null,
        virtualTourUrl: input.virtualTourUrl?.trim() || null,
        description: input.description || null,
        propertyId: property.id,
        agentName: ownerName,
        agencyId: agency.id,
      },
    });

    revalidatePath("/realestate/user/properties");
    revalidatePath("/realestate/ilanlar");
    revalidatePath("/realestate");
    return { ok: true };
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
      select: { id: true, propertyId: true },
    });
    if (!listing) return { error: "İlan bulunamadı veya yetkiniz yok." };

    await db.listing.update({
      where: { id: listing.id },
      data: {
        title: input.title.trim(),
        listingType: input.listingType as any,
        askingPrice: input.askingPrice,
        currency: input.currency || "TRY",
        monthlyRent: input.monthlyRent ?? null,
        deposit: input.deposit ?? null,
        isNegotiable: input.isNegotiable ?? true,
        videoUrl: input.videoUrl?.trim() || null,
        virtualTourUrl: input.virtualTourUrl?.trim() || null,
        description: input.description || null,
      },
    });

    // Görselleri yeniden yaz (varsa)
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
        isFurnished: !!input.isFurnished,
        hasGarden: !!input.hasGarden,
        hasPool: !!input.hasPool,
        hasBalcony: !!input.hasBalcony,
        description: input.description || null,
        ownerName: input.ownerName?.trim() || undefined,
        ownerPhone: input.ownerPhone?.trim() || null,
        images: input.images?.length
          ? { create: input.images.map((url, i) => ({ url, isCover: i === 0, order: i })) }
          : undefined,
      },
    });

    revalidatePath("/realestate/user/properties");
    revalidatePath(`/realestate/property/${listing.id}`);
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

    revalidatePath("/realestate/user/properties");
    revalidatePath("/realestate");
    return { ok: true, until };
  } catch (e: any) {
    return { error: e?.message ?? "Öne çıkarılamadı." };
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

    revalidatePath("/realestate/user/properties");
    revalidatePath("/realestate/ilanlar");
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
      moderationStatus: true, featuredUntil: true,
      property: {
        select: {
          city: true, district: true, propertyType: true, roomCount: true,
          images: { select: { url: true }, orderBy: [{ isCover: "desc" }, { order: "asc" }], take: 1 },
        },
      },
      _count: { select: { crmLeads: true } },
    },
  });
}

export async function getMyListing(listingId: string) {
  const user = await requireUser();
  const listing = await db.listing.findFirst({
    where: { id: listingId, ownerUserId: user.id },
    select: {
      id: true, title: true, listingType: true, askingPrice: true, currency: true,
      monthlyRent: true, deposit: true, isNegotiable: true, description: true,
      videoUrl: true, virtualTourUrl: true,
      property: {
        select: {
          city: true, district: true, neighborhood: true, address: true, propertyType: true,
          grossArea: true, netArea: true, roomCount: true, bathroomCount: true,
          floorNo: true, totalFloors: true, buildingAge: true, heatingType: true,
          hasElevator: true, hasParking: true, isFurnished: true, hasGarden: true,
          hasPool: true, hasBalcony: true, ownerName: true, ownerPhone: true,
          images: { select: { url: true }, orderBy: { order: "asc" } },
        },
      },
    },
  });
  return listing;
}

/** İlanlarıma gelen talepler (estate CRM Lead'leri). */
export async function getMyInquiries() {
  const user = await requireUser();
  return db.lead.findMany({
    where: { listing: { ownerUserId: user.id } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, contactName: true, contactPhone: true, contactEmail: true,
      value: true, currency: true, requirements: true, createdAt: true,
      listing: { select: { id: true, title: true } },
    },
  });
}
