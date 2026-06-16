"use server";

import db from "@/app/lib/db";
import { hash } from "@node-rs/argon2";
import { revalidatePath } from "next/cache";

export type ClientProps = {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNo?: string;
  gender: string;
  dob: string;
  nationality: string;
  imageUrl: string;
  NIN: string;
  contactMethod: string;
  occupation?: string;
  address: string;
  password: string;
  isBuyer: boolean;
  isSeller: boolean;
  isTenant: boolean;
  isLandlord: boolean;
  minBudget?: number;
  maxBudget?: number;
  currency: string;
  preferredPropertyTypes: string[];
  preferredCities: string[];
  notes?: string;
  agencyId: string;
  agencyName: string;
};

function toIso(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error('Geçersiz tarih formatı. YYYY-MM-DD bekleniyor.');
  }
  return `${dateStr}T00:00:00.000Z`;
}

const REVALIDATE_PATH = "/estate/dashboard/users/clients";

// ==================== CREATE ====================
export async function createPropertyClient(data: ClientProps) {
  const [byNIN, byEmail, byPhone, byUser] = await Promise.all([
    db.propertyClient.findUnique({ where: { NIN: data.NIN } }),
    db.propertyClient.findUnique({ where: { email: data.email } }),
    db.propertyClient.findUnique({ where: { phone: data.phone } }),
    db.user.findUnique({ where: { email: data.email } }),
  ]);

  if (byNIN)   throw new Error("Bu TC Kimlik No zaten kayıtlı.");
  if (byEmail) throw new Error("Bu e-posta adresi zaten kullanılıyor.");
  if (byPhone) throw new Error("Bu telefon numarası zaten kayıtlı.");
  if (byUser)  throw new Error("Bu e-posta adresiyle kayıtlı kullanıcı mevcut.");

  const hashedPassword = await hash(data.password);

  const user = await db.user.create({
    data: {
      name: `${data.firstName} ${data.lastName}`,
      username: data.email,
      email: data.email,
      phone: data.phone,
      passwordHash: hashedPassword,
      image: data.imageUrl,
      agencyId: data.agencyId,
      agencyName: data.agencyName,
      roleGayrimenkul: "CLIENT",
    },
  });

  const client = await db.propertyClient.create({
    data: {
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      whatsappNo: data.whatsappNo ?? null,
      gender: data.gender,
      dob: toIso(data.dob) as any,
      nationality: data.nationality,
      imageUrl: data.imageUrl || null,
      NIN: data.NIN,
      contactMethod: data.contactMethod,
      occupation: data.occupation ?? null,
      address: data.address,
      password: data.password,
      isBuyer: data.isBuyer,
      isSeller: data.isSeller,
      isTenant: data.isTenant,
      isLandlord: data.isLandlord,
      minBudget: data.minBudget ?? null,
      maxBudget: data.maxBudget ?? null,
      currency: data.currency,
      preferredPropertyTypes: data.preferredPropertyTypes as any,
      preferredCities: data.preferredCities,
      notes: data.notes ?? null,
      agencyId: data.agencyId,
      agencyName: data.agencyName,
      userId: user.id,
    },
  });

  revalidatePath(REVALIDATE_PATH);
  return client;
}

// ==================== UPDATE ====================
export async function updatePropertyClient(
  id: string,
  data: Partial<ClientProps>
) {
  const dob = data.dob ? toIso(data.dob) : undefined;

  const minBudget = data.minBudget != null ? parseFloat(String(data.minBudget)) : undefined;
  const maxBudget = data.maxBudget != null ? parseFloat(String(data.maxBudget)) : undefined;

  const preferredCities = data.preferredCities
    ? Array.isArray(data.preferredCities)
      ? data.preferredCities
      : String(data.preferredCities).split(",").map((c) => c.trim()).filter(Boolean)
    : undefined;

  const client = await db.propertyClient.update({
    where: { id },
    data: {
      ...(data.title         && { title: data.title }),
      ...(data.firstName     && { firstName: data.firstName }),
      ...(data.lastName      && { lastName: data.lastName }),
      ...(data.phone         && { phone: data.phone }),
      ...(data.whatsappNo !== undefined && { whatsappNo: data.whatsappNo }),
      ...(data.gender        && { gender: data.gender }),
      ...(dob                && { dob: dob as any }),
      ...(data.nationality   && { nationality: data.nationality }),
      ...(data.imageUrl      && { imageUrl: data.imageUrl }),
      ...(data.contactMethod && { contactMethod: data.contactMethod }),
      ...(data.occupation !== undefined && { occupation: data.occupation }),
      ...(data.address       && { address: data.address }),
      ...(data.isBuyer    !== undefined && { isBuyer: data.isBuyer }),
      ...(data.isSeller   !== undefined && { isSeller: data.isSeller }),
      ...(data.isTenant   !== undefined && { isTenant: data.isTenant }),
      ...(data.isLandlord !== undefined && { isLandlord: data.isLandlord }),
      ...(minBudget !== undefined && !isNaN(minBudget) && { minBudget }),
      ...(maxBudget !== undefined && !isNaN(maxBudget) && { maxBudget }),
      ...(data.currency      && { currency: data.currency }),
      ...(data.preferredPropertyTypes?.length && {
        preferredPropertyTypes: data.preferredPropertyTypes as any,
      }),
      ...(preferredCities && { preferredCities }),
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });

  if (data.firstName || data.lastName || data.phone || data.imageUrl) {
    await db.user.update({
      where: { id: client.userId },
      data: {
        ...(data.firstName && data.lastName && {
          name: `${data.firstName} ${data.lastName}`,
        }),
        ...(data.phone    && { phone: data.phone }),
        ...(data.imageUrl && { image: data.imageUrl }),
      },
    });
  }

  revalidatePath(REVALIDATE_PATH);
  return client;
}

// ==================== DELETE ====================
export async function deletePropertyClient(id: string) {
  const client = await db.propertyClient.findUnique({
    where: { id },
    select: { userId: true },
  });

  if (!client) throw new Error("Müşteri bulunamadı.");

  await db.$transaction([
    db.clientInterest.deleteMany({ where: { clientId: id } }),
    db.propertyVisit.deleteMany({ where: { clientId: id } }),
    db.propertyClient.delete({ where: { id } }),
    db.user.delete({ where: { id: client.userId } }),
  ]);

  revalidatePath(REVALIDATE_PATH);
  return { ok: true };
}

// ==================== GET ALL ====================
export async function getAllPropertyClients(agencyId: string) {
  return db.propertyClient.findMany({
    where: { agencyId },
    include: {
      _count: {
        select: { contracts: true, visits: true, interests: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// ==================== GET BY ID ====================
export async function getPropertyClientById(id: string) {
  return db.propertyClient.findUnique({
    where: { id },
    include: {
      contracts: {
        select: {
          id: true, contractNo: true, contractType: true, status: true,
          salePrice: true, rentalPrice: true, commission: true, currency: true,
          startDate: true, endDate: true, agentName: true,
          property: { select: { title: true, city: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      visits: {
        select: {
          id: true, scheduledAt: true, status: true, rating: true, feedback: true,
          agent: { select: { firstName: true, lastName: true } },
          property: { select: { title: true, city: true } },
        },
        orderBy: { scheduledAt: "desc" },
      },
      interests: {
        select: {
          id: true, priority: true, notes: true,
          listing: { select: { id: true, title: true, listingNo: true, askingPrice: true, currency: true, listingType: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { contracts: true, visits: true, interests: true } },
    },
  });
}

// ==================== GET AVAILABLE USERS (no PropertyClient yet) ====================
export async function getAvailableUsersForClient() {
  const clientUserIds = await db.propertyClient.findMany({
    select: { userId: true },
  });
  const excludedIds = clientUserIds.map((c) => c.userId);

  return db.user.findMany({
    where: {
      id:       { notIn: excludedIds },
      isActive: true,
    },
    select: {
      id:          true,
      name:        true,
      email:       true,
      phone:       true,
      image:       true,
      firstName:   true,
      lastName:    true,
      agencyId:    true,
      agencyName:  true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export type AssignClientProps = {
  userId:                 string;
  agencyId:               string;
  agencyName:             string;
  title:                  string;
  NIN:                    string;
  gender:                 string;
  dob:                    string;
  nationality:            string;
  contactMethod:          string;
  occupation?:            string;
  address:                string;
  whatsappNo?:            string;
  imageUrl?:              string;
  isBuyer:                boolean;
  isSeller:               boolean;
  isTenant:               boolean;
  isLandlord:             boolean;
  minBudget?:             number;
  maxBudget?:             number;
  currency:               string;
  preferredPropertyTypes: string[];
  preferredCities:        string[];
  notes?:                 string;
};

// ==================== ASSIGN EXISTING USER AS CLIENT ====================
export async function assignUserAsClient(data: AssignClientProps) {
  const user = await db.user.findUnique({
    where: { id: data.userId },
    select: {
      id: true, name: true, email: true, phone: true,
      image: true, firstName: true, lastName: true, passwordHash: true,
    },
  });
  if (!user) throw new Error("Kullanıcı bulunamadı.");

  const existing = await db.propertyClient.findUnique({
    where: { userId: data.userId },
  });
  if (existing) throw new Error("Bu kullanıcı zaten müşteri olarak kayıtlı.");

  const byNIN = await db.propertyClient.findUnique({ where: { NIN: data.NIN } });
  if (byNIN) throw new Error("Bu TC Kimlik No zaten kayıtlı.");

  const firstName = user.firstName ?? user.name?.split(" ")[0] ?? "";
  const lastName  = user.lastName  ?? user.name?.split(" ").slice(1).join(" ") ?? "";

  const [client] = await db.$transaction([
    db.propertyClient.create({
      data: {
        userId:                 data.userId,
        title:                  data.title,
        firstName,
        lastName,
        email:                  user.email!,
        phone:                  user.phone ?? "",
        whatsappNo:             data.whatsappNo ?? null,
        gender:                 data.gender,
        dob:                    toIso(data.dob) as any,
        nationality:            data.nationality,
        imageUrl:               data.imageUrl || user.image || null,
        NIN:                    data.NIN,
        contactMethod:          data.contactMethod,
        occupation:             data.occupation ?? null,
        address:                data.address,
        password:               user.passwordHash ?? "",
        isBuyer:                data.isBuyer,
        isSeller:               data.isSeller,
        isTenant:               data.isTenant,
        isLandlord:             data.isLandlord,
        minBudget:              data.minBudget != null ? parseFloat(String(data.minBudget)) : null,
        maxBudget:              data.maxBudget != null ? parseFloat(String(data.maxBudget)) : null,
        currency:               data.currency,
        preferredPropertyTypes: data.preferredPropertyTypes as any,
        preferredCities: Array.isArray(data.preferredCities)
          ? data.preferredCities
          : String(data.preferredCities).split(",").map((c) => c.trim()).filter(Boolean),
        notes:                  data.notes ?? null,
        agencyId:               data.agencyId,
        agencyName:             data.agencyName,
      },
    }),
    db.user.update({
      where: { id: data.userId },
      data: {
        roleGayrimenkul: "CLIENT",
        agencyId:        data.agencyId,
        agencyName:      data.agencyName,
        ...(data.imageUrl && { image: data.imageUrl }),
      },
    }),
  ]);

  revalidatePath(REVALIDATE_PATH);
  return client;
}
