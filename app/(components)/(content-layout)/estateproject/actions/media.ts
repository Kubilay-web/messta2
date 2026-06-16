"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import type { DocumentTypeGayrimenkul } from "@prisma/client";
import { assertProjectAdmin, assertAgencyAccess } from "../lib/auth";

const revalidate = (agencyId: string, projectId: string) =>
  revalidatePath(`/estateproject/agency/${agencyId}/projects/${projectId}`);

async function projectAgency(projectId: string) {
  const p = await db.estateProject.findUnique({ where: { id: projectId }, select: { agencyId: true } });
  if (!p) throw new Error("Proje bulunamadı.");
  return p.agencyId;
}

/* ============================ DÖKÜMANLAR ============================ */

export async function addDocument(data: {
  projectId: string;
  type: DocumentTypeGayrimenkul;
  title: string;
  url: string;
  size?: number | null;
}) {
  const agencyId = await projectAgency(data.projectId);
  await assertProjectAdmin(agencyId);
  const doc = await db.projectDocument.create({
    data: {
      projectId: data.projectId,
      type: data.type,
      title: data.title,
      url: data.url,
      size: data.size ?? null,
    },
  });
  revalidate(agencyId, data.projectId);
  return doc;
}

export async function updateDocument(
  id: string,
  data: { title?: string; type?: DocumentTypeGayrimenkul; url?: string }
) {
  const doc = await db.projectDocument.findUnique({ where: { id } });
  if (!doc) throw new Error("Döküman bulunamadı.");
  const agencyId = await projectAgency(doc.projectId);
  await assertProjectAdmin(agencyId);
  const updated = await db.projectDocument.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.url !== undefined && { url: data.url }),
    },
  });
  revalidate(agencyId, doc.projectId);
  return updated;
}

export async function deleteDocument(id: string) {
  const doc = await db.projectDocument.findUnique({ where: { id } });
  if (!doc) return;
  const agencyId = await projectAgency(doc.projectId);
  await assertProjectAdmin(agencyId);
  await db.projectDocument.delete({ where: { id } });
  revalidate(agencyId, doc.projectId);
}

export async function getDocuments(projectId: string) {
  return db.projectDocument.findMany({ where: { projectId }, orderBy: { uploadedAt: "desc" } });
}

/* ============================ GÖRSELLER ============================ */

export async function addImage(data: { projectId: string; url: string; title?: string; isCover?: boolean }) {
  const agencyId = await projectAgency(data.projectId);
  await assertProjectAdmin(agencyId);
  const count = await db.projectImage.count({ where: { projectId: data.projectId } });
  const image = await db.projectImage.create({
    data: {
      projectId: data.projectId,
      url: data.url,
      title: data.title || null,
      order: count,
      isCover: data.isCover ?? count === 0,
    },
  });
  if (image.isCover) {
    await db.estateProject.update({ where: { id: data.projectId }, data: { coverImage: data.url } });
  }
  revalidate(agencyId, data.projectId);
  return image;
}

export async function setCoverImage(id: string) {
  const image = await db.projectImage.findUnique({ where: { id } });
  if (!image) throw new Error("Görsel bulunamadı.");
  const agencyId = await projectAgency(image.projectId);
  await assertProjectAdmin(agencyId);
  await db.projectImage.updateMany({ where: { projectId: image.projectId }, data: { isCover: false } });
  await db.projectImage.update({ where: { id }, data: { isCover: true } });
  await db.estateProject.update({ where: { id: image.projectId }, data: { coverImage: image.url } });
  revalidate(agencyId, image.projectId);
}

export async function deleteImage(id: string) {
  const image = await db.projectImage.findUnique({ where: { id } });
  if (!image) return;
  const agencyId = await projectAgency(image.projectId);
  await assertProjectAdmin(agencyId);
  await db.projectImage.delete({ where: { id } });
  revalidate(agencyId, image.projectId);
}

export async function getImages(projectId: string) {
  return db.projectImage.findMany({ where: { projectId }, orderBy: { order: "asc" } });
}

/* ======================= SAHA GÜNCELLEMELERİ ======================= */

export async function addUpdate(data: {
  projectId: string;
  title: string;
  content?: string;
  progress?: number | null;
  imageUrl?: string;
  createdByName?: string;
}) {
  const agencyId = await projectAgency(data.projectId);
  await assertAgencyAccess(agencyId);
  const update = await db.projectUpdate.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      content: data.content || null,
      progress: data.progress ?? null,
      imageUrl: data.imageUrl || null,
      createdByName: data.createdByName || null,
    },
  });
  // Saha güncellemesi proje ilerlemesini günceller
  if (data.progress != null) {
    await db.estateProject.update({ where: { id: data.projectId }, data: { progress: data.progress } });
  }
  revalidate(agencyId, data.projectId);
  return update;
}

export async function updateUpdate(
  id: string,
  data: { title?: string; content?: string; progress?: number | null }
) {
  const u = await db.projectUpdate.findUnique({ where: { id } });
  if (!u) throw new Error("Güncelleme bulunamadı.");
  const agencyId = await projectAgency(u.projectId);
  await assertAgencyAccess(agencyId);
  const updated = await db.projectUpdate.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.content !== undefined && { content: data.content || null }),
      ...(data.progress !== undefined && { progress: data.progress }),
    },
  });
  revalidate(agencyId, u.projectId);
  return updated;
}

export async function deleteUpdate(id: string) {
  const u = await db.projectUpdate.findUnique({ where: { id } });
  if (!u) return;
  const agencyId = await projectAgency(u.projectId);
  await assertProjectAdmin(agencyId);
  await db.projectUpdate.delete({ where: { id } });
  revalidate(agencyId, u.projectId);
}

export async function getUpdates(projectId: string) {
  return db.projectUpdate.findMany({ where: { projectId }, orderBy: { createdAt: "desc" } });
}
