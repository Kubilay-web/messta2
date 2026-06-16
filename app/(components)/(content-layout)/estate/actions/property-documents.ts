"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const PATH = "/estate/dashboard/properties";

export type PropertyDocumentProps = {
  propertyId: string;
  type:       string;
  title:      string;
  url:        string;
  size?:      number;
};

// ==================== ADD ====================
export async function addPropertyDocument(data: PropertyDocumentProps) {
  const doc = await db.propertyDocument.create({
    data: {
      propertyId: data.propertyId,
      type:       data.type as any,
      title:      data.title,
      url:        data.url,
      size:       data.size ?? null,
    },
  });

  revalidatePath(`${PATH}/view/${data.propertyId}`);
  revalidatePath(`${PATH}/edit/${data.propertyId}`);
  return doc;
}

// ==================== DELETE ====================
export async function deletePropertyDocument(docId: string, propertyId: string) {
  await db.propertyDocument.delete({ where: { id: docId } });
  revalidatePath(`${PATH}/view/${propertyId}`);
  revalidatePath(`${PATH}/edit/${propertyId}`);
  return { ok: true };
}

// ==================== GET ====================
export async function getPropertyDocuments(propertyId: string) {
  return db.propertyDocument.findMany({
    where: { propertyId },
    orderBy: { uploadedAt: "desc" },
  });
}
