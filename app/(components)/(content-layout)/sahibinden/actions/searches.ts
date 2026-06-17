"use server";

// Sahibinden Pazar Yeri — kayıtlı aramalar.

import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { revalidatePath } from "next/cache";

export type SavedSearchInput = {
  name: string;
  listingType?: string;
  propertyType?: string;
  city?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
  rooms?: string;
  q?: string;
};

export async function saveSearch(input: SavedSearchInput) {
  const { user } = await validateRequest();
  if (!user) return { error: "Arama kaydetmek için giriş yapın.", needAuth: true };
  if (!input.name?.trim()) return { error: "Arama adı giriniz." };

  await db.marketSavedSearch.create({
    data: {
      userId: user.id,
      name: input.name.trim(),
      listingType: input.listingType || null,
      propertyType: input.propertyType || null,
      city: input.city || null,
      minPrice: input.minPrice ?? null,
      maxPrice: input.maxPrice ?? null,
      rooms: input.rooms || null,
      q: input.q || null,
    },
  });
  revalidatePath("/sahibinden/aramalarim");
  return { ok: true };
}

export async function getMySavedSearches() {
  const { user } = await validateRequest();
  if (!user) return [];
  return db.marketSavedSearch.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function setSearchNotify(id: string, notify: boolean) {
  const { user } = await validateRequest();
  if (!user) return { error: "Giriş yapın." };
  await db.marketSavedSearch.updateMany({ where: { id, userId: user.id }, data: { notify } });
  revalidatePath("/sahibinden/aramalarim");
  return { ok: true };
}

export async function deleteSavedSearch(id: string) {
  const { user } = await validateRequest();
  if (!user) return { error: "Giriş yapın." };
  await db.marketSavedSearch.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/sahibinden/aramalarim");
  return { ok: true };
}
