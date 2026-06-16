"use server";

import { revalidatePath } from "next/cache";
import { validateRequest } from "@/app/auth";
import { generateSlug } from "./generateSlug";
import { Agency } from "../types/types";
import prisma from "../../../../lib/db";

export type AgencyProps = {
  name: string;
  logo: string;
  primaryEmail: string;
  phone: string;
  address: string;
  city: string;
  taxNumber: string;
  licenseNo: string;
};

// ==================== CREATE AGENCY ====================
export async function createAgency(data: AgencyProps) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Yetkisiz erişim.");

    const slug = generateSlug(data.name);

    const agency = await prisma.agency.create({
      data: {
        name: data.name,
        logo: data.logo || null,
        primaryEmail: data.primaryEmail || null,
        phone: data.phone || null,
        address: data.address || null,
        city: data.city || null,
        taxNumber: data.taxNumber || null,
        licenseNo: data.licenseNo || null,
        slug,
        ownerUserId: user.id, // ofis sahibini hatırla (çoklu ofis + geçiş)
      },
    });

    // Kullanıcıyı bu ofise bağla (aktif ofis)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        agencyId: agency.id,
        agencyName: agency.name,
        roleGayrimenkul:"SUPER_ADMIN"
      },
    });

    revalidatePath("/estate/dashboard/admin");
    return agency;
  } catch (error: any) {
    console.error("createAgency error:", error);
    if (error?.code === "P2002") {
      throw new Error(
        "Bu ofis adı veya slug zaten kullanımda. Farklı bir isim deneyin."
      );
    }
    throw new Error(error?.message || "Ofis oluşturulamadı.");
  }
}

// ==================== MY AGENCIES (çoklu ofis + geçiş) ====================
/** Giriş yapan kullanıcının SAHİBİ olduğu ofisler + aktif ofis. */
export async function getMyAgencies() {
  const { user } = await validateRequest();
  if (!user) return { agencies: [], activeId: null };

  // Aktif ofis sahipsizse (eski kayıt) otomatik bu kullanıcıya bağla
  if (user.agencyId) {
    await prisma.agency.updateMany({
      where: { id: user.agencyId, ownerUserId: null },
      data: { ownerUserId: user.id },
    });
  }

  const agencies = await prisma.agency.findMany({
    where: {
      OR: [{ ownerUserId: user.id }, { id: user.agencyId ?? "__none__" }],
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, logo: true, city: true, slug: true,
      siteEnabled: true, siteCompletion: true, createdAt: true,
      primaryEmail: true, phone: true, address: true,
      taxNumber: true, licenseNo: true,
    },
  });

  return { agencies, activeId: user.agencyId ?? null };
}

// ==================== MY AGENCY: SAHİPLİK YARDIMCISI ====================
/** Verilen ofis giriş yapan kullanıcıya mı ait? (sahibi ya da -eski kayıt- aktif ofisi) */
async function assertOwnAgency(id: string, userId: string, activeAgencyId: string | null) {
  const owned = await prisma.agency.findFirst({
    where: { id, OR: [{ ownerUserId: userId }, { id: activeAgencyId ?? "__none__" }] },
    select: { id: true },
  });
  if (!owned) throw new Error("Bu ofis üzerinde yetkiniz yok.");
}

// ==================== UPDATE MY AGENCY (sahiplik korumalı) ====================
/** Kullanıcının KENDİ ofisinin bilgilerini düzenler. */
export async function updateMyAgency(id: string, data: Partial<AgencyProps>) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Yetkisiz erişim.");
  await assertOwnAgency(id, user.id, user.agencyId ?? null);

  try {
    const agency = await prisma.agency.update({
      where: { id },
      data: {
        ...(data.name         !== undefined && { name:         data.name }),
        ...(data.logo         !== undefined && { logo:         data.logo || null }),
        ...(data.primaryEmail !== undefined && { primaryEmail: data.primaryEmail || null }),
        ...(data.phone        !== undefined && { phone:        data.phone || null }),
        ...(data.address      !== undefined && { address:      data.address || null }),
        ...(data.city         !== undefined && { city:         data.city || null }),
        ...(data.taxNumber    !== undefined && { taxNumber:    data.taxNumber || null }),
        ...(data.licenseNo    !== undefined && { licenseNo:    data.licenseNo || null }),
      },
    });

    // Düzenlenen ofis aktif ofisse, kullanıcıdaki denormalize adı da güncelle
    if (data.name !== undefined && user.agencyId === id) {
      await prisma.user.update({ where: { id: user.id }, data: { agencyName: agency.name } });
    }

    revalidatePath("/estate/dashboard/my-agencies");
    revalidatePath("/estate/dashboard");
    return agency;
  } catch (error: any) {
    console.error("updateMyAgency error:", error);
    if (error?.code === "P2002") throw new Error("Bu ofis adı zaten kullanımda.");
    throw new Error(error?.message || "Ofis güncellenemedi.");
  }
}

// ==================== DELETE MY AGENCY (sahiplik korumalı) ====================
/** Kullanıcının KENDİ ofisini siler. Aktif ofisse başka bir ofise geçirir. */
export async function deleteMyAgency(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Yetkisiz erişim.");
  await assertOwnAgency(id, user.id, user.agencyId ?? null);

  try {
    await prisma.agency.delete({ where: { id } });
  } catch (error: any) {
    console.error("deleteMyAgency error:", error);
    throw new Error(
      "Ofis silinemedi. Bu ofise bağlı kayıtlar (ilan, danışman vb.) olabilir."
    );
  }

  // Silinen ofis aktifse kullanıcıyı sahip olduğu başka bir ofise geçir (yoksa boşalt)
  let newActiveId: string | null = user.agencyId ?? null;
  if (user.agencyId === id) {
    const fallback = await prisma.agency.findFirst({
      where: { ownerUserId: user.id, id: { not: id } },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    });
    await prisma.user.update({
      where: { id: user.id },
      data: { agencyId: fallback?.id ?? null, agencyName: fallback?.name ?? null },
    });
    newActiveId = fallback?.id ?? null;
  }

  revalidatePath("/estate/dashboard/my-agencies");
  revalidatePath("/estate/dashboard");
  return { ok: true, newActiveId };
}

/** Aktif ofisi değiştir — yalnızca kullanıcının kendi ofislerine. */
export async function switchAgency(agencyId: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Yetkisiz erişim.");

  const agency = await prisma.agency.findFirst({
    where: {
      id: agencyId,
      OR: [{ ownerUserId: user.id }, { id: user.agencyId ?? "__none__" }],
    },
    select: { id: true, name: true },
  });
  if (!agency) throw new Error("Bu ofise erişiminiz yok.");

  await prisma.user.update({
    where: { id: user.id },
    data: { agencyId: agency.id, agencyName: agency.name },
  });

  revalidatePath("/estate/dashboard");
  return { ok: true };
}

// ==================== GET AGENCY BY SLUG ====================
export async function getAgencyBySlug(slug: string) {
  if (!slug) return null;
  try {
    const agency = await prisma.agency.findUnique({ where: { slug } });
    return agency;
  } catch (error) {
    console.error("getAgencyBySlug error:", error);
    return null;
  }
}

// ==================== GET AGENCY BY ID ====================
export async function getAgencyById(id: string) {
  if (!id) return null;
  try {
    const agency = await prisma.agency.findUnique({ where: { id } });
    return agency;
  } catch (error) {
    console.error("getAgencyById error:", error);
    return null;
  }
}

// ==================== GET AGENCY BY ID VEYA SLUG ====================
export async function getAgencyByIdOrSlug(idOrSlug: string) {
  if (!idOrSlug) return null;
  try {
    return await prisma.agency.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    });
  } catch (error) {
    console.error("getAgencyByIdOrSlug error:", error);
    return null;
  }
}

// ==================== GET ALL AGENCIES ====================
/**
 * Tüm ofisleri döndürür (süper panelde listelenir).
 * Her ofise, giriş yapan kullanıcının o ofisi oluşturup oluşturmadığını
 * (sahibi mi) belirten `isOwn` bayrağı eklenir. Sadece kendi oluşturduğumuz
 * ofislerde sil/düzenle işlemleri açılır.
 */
export async function getAllAgencies() {
  try {
    const { user } = await validateRequest();

    const agencies = await prisma.agency.findMany({
      orderBy: { createdAt: "desc" },
    });

    return agencies.map((a) => ({
      ...a,
      isOwn: !!user && a.ownerUserId === user.id,
    }));
  } catch (error) {
    console.error("getAllAgencies error:", error);
    return [];
  }
}

// ==================== UPDATE AGENCY ====================
export async function updateAgency(
  id: string,
  data: Partial<AgencyProps> & { siteEnabled?: boolean }
) {
  try {
    const { user } = await validateRequest();
    if (!user) throw new Error("Yetkisiz erişim.");

    const agency = await prisma.agency.update({
      where: { id },
      data: {
        ...(data.name          !== undefined && { name:         data.name          }),
        ...(data.logo          !== undefined && { logo:         data.logo          }),
        ...(data.primaryEmail  !== undefined && { primaryEmail: data.primaryEmail  }),
        ...(data.phone         !== undefined && { phone:        data.phone         }),
        ...(data.address       !== undefined && { address:      data.address       }),
        ...(data.city          !== undefined && { city:         data.city          }),
        ...(data.taxNumber     !== undefined && { taxNumber:    data.taxNumber     }),
        ...(data.licenseNo     !== undefined && { licenseNo:    data.licenseNo     }),
        ...(data.siteEnabled   !== undefined && { siteEnabled:  data.siteEnabled   }),
      },
    });

    revalidatePath(`/estate/agency/${id}/customize`);
    revalidatePath(`/estate/agency/${id}/customize/settings`);
    return agency;
  } catch (error: any) {
    console.error("updateAgency error:", error);
    throw new Error(error?.message || "Ofis güncellenemedi.");
  }
}

// ==================== DELETE AGENCY (sahiplik korumalı) ====================
/** Süper panelden ofis siler — yalnızca giriş yapan kullanıcının oluşturduğu ofisler silinebilir. */
export async function deleteAgencyById(id: string) {
  if (!id) throw new Error("Geçersiz ofis.");

  const { user } = await validateRequest();
  if (!user) throw new Error("Yetkisiz erişim.");

  // Yalnızca kendi oluşturduğumuz (sahibi olduğumuz) ofisi silebiliriz
  const owned = await prisma.agency.findFirst({
    where: { id, ownerUserId: user.id },
    select: { id: true },
  });
  if (!owned) throw new Error("Yalnızca kendi oluşturduğunuz ofisleri silebilirsiniz.");

  try {
    const agency = await prisma.agency.delete({ where: { id } });
    revalidatePath("/estate/dashboard/admin");
    revalidatePath("/estate/super-dashboard/agencies-page");
    return agency;
  } catch (error) {
    console.error("deleteAgencyById error:", error);
    throw new Error("Ofis silinemedi. Bu ofise bağlı kayıtlar olabilir.");
  }
}
