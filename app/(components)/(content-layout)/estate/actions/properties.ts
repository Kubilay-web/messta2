"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./generateSlug";

export type PropertyProps = {
  title:        string;
  address:      string;
  city:         string;
  district:     string;
  neighborhood?: string;
  zipCode?:     string;
  latitude?:    number;
  longitude?:   number;
  propertyType: "APARTMENT" | "HOUSE" | "VILLA" | "OFFICE" | "SHOP" | "LAND" | "WAREHOUSE" | "BUILDING";
  status:       "AVAILABLE" | "SOLD" | "RENTED" | "UNDER_CONTRACT" | "UNDER_MAINTENANCE";
  grossArea?:   number;
  netArea?:     number;
  roomCount?:   string;
  bathroomCount?: number;
  floorNo?:     number;
  totalFloors?: number;
  buildingAge?: number;
  heatingType?: string;
  hasElevator:  boolean;
  hasParking:   boolean;
  isFurnished:  boolean;
  hasGarden:    boolean;
  hasPool:      boolean;
  hasBalcony:   boolean;
  isFeatured:   boolean;
  description?: string;
  notes?:       string;
  ownerName?:   string;
  ownerPhone?:  string;
  ownerNIN?:    string;
  price?:       number;
  currency:     string;
  agencyId:     string;
  agencyName:   string;
};

const PATH = "/estate/dashboard/properties";

function n(v: any) { return v != null && v !== "" ? parseFloat(String(v)) : null; }
function i(v: any) { return v != null && v !== "" ? parseInt(String(v), 10)  : null; }

// ==================== CREATE ====================
export async function createProperty(data: PropertyProps) {
  let slug = generateSlug(data.title);
  const exists = await db.propertyRealEstate.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now()}`;

  const property = await db.propertyRealEstate.create({
    data: {
      title:        data.title,
      slug,
      address:      data.address,
      city:         data.city,
      district:     data.district,
      neighborhood: data.neighborhood ?? null,
      zipCode:      data.zipCode      ?? null,
      latitude:     n(data.latitude),
      longitude:    n(data.longitude),
      propertyType: data.propertyType,
      status:       data.status,
      grossArea:    n(data.grossArea),
      netArea:      n(data.netArea),
      roomCount:    data.roomCount    ?? null,
      bathroomCount: i(data.bathroomCount),
      floorNo:      i(data.floorNo),
      totalFloors:  i(data.totalFloors),
      buildingAge:  i(data.buildingAge),
      heatingType:  data.heatingType  ?? null,
      hasElevator:  data.hasElevator,
      hasParking:   data.hasParking,
      isFurnished:  data.isFurnished,
      hasGarden:    data.hasGarden,
      hasPool:      data.hasPool,
      hasBalcony:   data.hasBalcony,
      isFeatured:   data.isFeatured,
      description:  data.description  ?? null,
      notes:        data.notes        ?? null,
      ownerName:    data.ownerName    ?? null,
      ownerPhone:   data.ownerPhone   ?? null,
      ownerNIN:     data.ownerNIN     ?? null,
      price:        n(data.price),
      currency:     data.currency,
      agencyId:     data.agencyId,
      agencyName:   data.agencyName,
    },
  });

  revalidatePath(PATH);
  return property;
}

// ==================== UPDATE ====================
export async function updateProperty(id: string, data: Partial<PropertyProps>) {
  const property = await db.propertyRealEstate.update({
    where: { id },
    data: {
      ...(data.title        && { title: data.title }),
      ...(data.address      && { address: data.address }),
      ...(data.city         && { city: data.city }),
      ...(data.district     && { district: data.district }),
      ...(data.neighborhood !== undefined && { neighborhood: data.neighborhood ?? null }),
      ...(data.zipCode      !== undefined && { zipCode: data.zipCode ?? null }),
      ...(data.latitude     !== undefined && { latitude:  n(data.latitude) }),
      ...(data.longitude    !== undefined && { longitude: n(data.longitude) }),
      ...(data.propertyType && { propertyType: data.propertyType }),
      ...(data.status       && { status: data.status }),
      ...(data.grossArea    !== undefined && { grossArea:    n(data.grossArea) }),
      ...(data.netArea      !== undefined && { netArea:      n(data.netArea) }),
      ...(data.roomCount    !== undefined && { roomCount:    data.roomCount ?? null }),
      ...(data.bathroomCount !== undefined && { bathroomCount: i(data.bathroomCount) }),
      ...(data.floorNo      !== undefined && { floorNo:      i(data.floorNo) }),
      ...(data.totalFloors  !== undefined && { totalFloors:  i(data.totalFloors) }),
      ...(data.buildingAge  !== undefined && { buildingAge:  i(data.buildingAge) }),
      ...(data.heatingType  !== undefined && { heatingType:  data.heatingType ?? null }),
      ...(data.hasElevator  !== undefined && { hasElevator:  data.hasElevator }),
      ...(data.hasParking   !== undefined && { hasParking:   data.hasParking }),
      ...(data.isFurnished  !== undefined && { isFurnished:  data.isFurnished }),
      ...(data.hasGarden    !== undefined && { hasGarden:    data.hasGarden }),
      ...(data.hasPool      !== undefined && { hasPool:      data.hasPool }),
      ...(data.hasBalcony   !== undefined && { hasBalcony:   data.hasBalcony }),
      ...(data.isFeatured   !== undefined && { isFeatured:   data.isFeatured }),
      ...(data.description  !== undefined && { description:  data.description ?? null }),
      ...(data.notes        !== undefined && { notes:        data.notes ?? null }),
      ...(data.ownerName    !== undefined && { ownerName:    data.ownerName ?? null }),
      ...(data.ownerPhone   !== undefined && { ownerPhone:   data.ownerPhone ?? null }),
      ...(data.ownerNIN     !== undefined && { ownerNIN:     data.ownerNIN ?? null }),
      ...(data.price        !== undefined && { price:        n(data.price) }),
      ...(data.currency     && { currency: data.currency }),
    },
  });

  revalidatePath(PATH);
  return property;
}

// ==================== DELETE ====================
export async function deleteProperty(id: string) {
  // 1. Bağlı sözleşme ve ilan ID'lerini topla
  const [contractRows, listingRows] = await Promise.all([
    db.propertyContract.findMany({ where: { propertyId: id }, select: { id: true } }),
    db.listing.findMany({ where: { propertyId: id }, select: { id: true } }),
  ]);

  const contractIds = contractRows.map((c) => c.id);
  const listingIds  = listingRows.map((l) => l.id);

  // 2. Sözleşme bağımlılarını sil
  if (contractIds.length) {
    await db.contractPayment.deleteMany({ where: { contractId: { in: contractIds } } });
    await db.contractDocument.deleteMany({ where: { contractId: { in: contractIds } } });
    await db.propertyContract.deleteMany({ where: { id: { in: contractIds } } });
  }

  // 3. İlan bağımlılarını sil
  if (listingIds.length) {
    await db.clientInterest.deleteMany({ where: { listingId: { in: listingIds } } });
  }

  // 4. Property'ye direkt bağlı kayıtları + property'yi sil
  await db.$transaction([
    db.propertyDocument.deleteMany({ where: { propertyId: id } }),
    db.propertyImage.deleteMany({ where: { propertyId: id } }),
    db.propertyVisit.deleteMany({ where: { propertyId: id } }),
    db.listing.deleteMany({ where: { propertyId: id } }),
    db.propertyRealEstate.delete({ where: { id } }),
  ]);

  revalidatePath(PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllProperties(agencyId: string) {
  return db.propertyRealEstate.findMany({
    where: { agencyId },
    include: {
      _count: { select: { listings: true, visits: true, contracts: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== GET BY ID ====================
export async function getPropertyById(id: string) {
  return db.propertyRealEstate.findUnique({
    where: { id },
    include: {
      listings:  { select: { id: true, title: true, listingNo: true, status: true, listingType: true, askingPrice: true } },
      contracts: { select: { id: true, contractNo: true, status: true, contractType: true, agentName: true, clientName: true } },
      visits:    { select: { id: true, scheduledAt: true, status: true, agentId: true, clientId: true } },
      images:    { select: { id: true, url: true, title: true, isCover: true, order: true } },
      documents: { select: { id: true, title: true, type: true, url: true, size: true, uploadedAt: true } },
      _count:    { select: { listings: true, visits: true, contracts: true } },
    },
  });
}
