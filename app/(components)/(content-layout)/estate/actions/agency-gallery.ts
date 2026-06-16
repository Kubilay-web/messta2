"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/agency";

// ==================== KATEGORİ ====================
export async function createGalleryCategory(agencyId: string, name: string) {
  const maxOrder = await db.agencyGalleryCategory.findFirst({
    where:   { agencyId },
    orderBy: { order: "desc" },
    select:  { order: true },
  });
  const order = (maxOrder?.order ?? 0) + 1;

  const cat = await db.agencyGalleryCategory.create({
    data: { agencyId, name, order, active: true },
  });
  revalidatePath(PATH);
  return cat;
}

export async function deleteGalleryCategory(id: string) {
  await db.agencyGalleryCategory.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function getAllGalleryCategories(agencyId: string) {
  return db.agencyGalleryCategory.findMany({
    where:   { agencyId },
    orderBy: { order: "asc" },
    include: { _count: { select: { images: true } } },
  });
}

// ==================== GÖRSEL ====================
export type GalleryImageProps = {
  agencyId:    string;
  title:       string;
  description?: string;
  image:       string;
  date?:       string;
  categoryId?: string;
};

export async function createGalleryImage(data: GalleryImageProps) {
  const img = await db.agencyGalleryImage.create({
    data: {
      agencyId:    data.agencyId,
      title:       data.title,
      description: data.description ?? null,
      image:       data.image,
      date:        data.date ?? null,
      categoryId:  data.categoryId ?? null,
      active:      true,
    },
  });
  revalidatePath(PATH);
  return img;
}

export async function updateGalleryImage(id: string, data: Partial<GalleryImageProps & { active: boolean }>) {
  const img = await db.agencyGalleryImage.update({
    where: { id },
    data: {
      ...(data.title       !== undefined && { title:       data.title       }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.image       !== undefined && { image:       data.image       }),
      ...(data.date        !== undefined && { date:        data.date        }),
      ...(data.categoryId  !== undefined && { categoryId:  data.categoryId  }),
      ...(data.active      !== undefined && { active:      data.active      }),
    },
  });
  revalidatePath(PATH);
  return img;
}

export async function deleteGalleryImage(id: string) {
  await db.agencyGalleryImage.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function getAllGalleryImages(agencyId: string) {
  return db.agencyGalleryImage.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
    include: { category: { select: { id: true, name: true } } },
  });
}

// Halka açık site için — yalnızca aktif görseller
export async function getPublicGalleryImages(agencyId: string, take = 12) {
  return db.agencyGalleryImage.findMany({
    where:   { agencyId, active: true },
    orderBy: { createdAt: "desc" },
    take,
    include: { category: { select: { id: true, name: true } } },
  });
}
