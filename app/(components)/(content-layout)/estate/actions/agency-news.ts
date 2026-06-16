"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { generateSlug } from "./generateSlug";

const PATH = "/estate/agency";

export type AgencyNewsProps = {
  agencyId: string;
  title:    string;
  content:  string;
  image:    string;
};

export async function createAgencyNews(data: AgencyNewsProps) {
  const slug = generateSlug(data.title);
  const existing = await db.agencyNewsItem.findFirst({ where: { agencyId: data.agencyId, slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  const item = await db.agencyNewsItem.create({
    data: { agencyId: data.agencyId, title: data.title, slug: finalSlug, content: data.content, image: data.image },
  });
  revalidatePath(PATH);
  return item;
}

export async function updateAgencyNews(id: string, data: Partial<AgencyNewsProps>) {
  const item = await db.agencyNewsItem.update({
    where: { id },
    data: {
      ...(data.title   && { title: data.title }),
      ...(data.content && { content: data.content }),
      ...(data.image   && { image: data.image }),
    },
  });
  revalidatePath(PATH);
  return item;
}

export async function deleteAgencyNews(id: string) {
  await db.agencyNewsItem.delete({ where: { id } });
  revalidatePath(PATH);
  return { ok: true };
}

export async function getAllAgencyNews(agencyId: string) {
  return db.agencyNewsItem.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAgencyNewsById(id: string) {
  return db.agencyNewsItem.findUnique({ where: { id } });
}

// Halka açık site için — son haberler
export async function getPublicAgencyNews(agencyId: string, take = 6) {
  return db.agencyNewsItem.findMany({
    where:   { agencyId },
    orderBy: { createdAt: "desc" },
    take,
  });
}
