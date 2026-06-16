"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/properties";

// ==================== ADD IMAGE ====================
export async function addPropertyImage(data: {
  propertyId: string;
  url:        string;
  title?:     string;
  isCover?:   boolean;
}) {
  const count = await db.propertyImage.count({ where: { propertyId: data.propertyId } });

  const image = await db.propertyImage.create({
    data: {
      propertyId: data.propertyId,
      url:        data.url,
      title:      data.title ?? null,
      isCover:    data.isCover ?? count === 0, // ilk fotoğraf otomatik kapak
      order:      count,
    },
  });

  revalidatePath(`${PATH}/view/${data.propertyId}`);
  revalidatePath(`${PATH}/edit/${data.propertyId}`);
  return image;
}

// ==================== DELETE IMAGE ====================
export async function deletePropertyImage(imageId: string, propertyId: string) {
  await db.propertyImage.delete({ where: { id: imageId } });
  revalidatePath(`${PATH}/view/${propertyId}`);
  revalidatePath(`${PATH}/edit/${propertyId}`);
  return { ok: true };
}

// ==================== SET COVER ====================
export async function setPropertyImageCover(imageId: string, propertyId: string) {
  await db.$transaction([
    db.propertyImage.updateMany({ where: { propertyId }, data: { isCover: false } }),
    db.propertyImage.update({ where: { id: imageId }, data: { isCover: true } }),
  ]);
  revalidatePath(`${PATH}/view/${propertyId}`);
  revalidatePath(`${PATH}/edit/${propertyId}`);
  return { ok: true };
}

// ==================== GET IMAGES ====================
export async function getPropertyImages(propertyId: string) {
  return db.propertyImage.findMany({
    where: { propertyId },
    orderBy: [{ isCover: "desc" }, { order: "asc" }],
  });
}
