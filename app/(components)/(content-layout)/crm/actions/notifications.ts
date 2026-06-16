"use server";

import db from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { assertAgencyAccess } from "../lib/auth";

/**
 * Kayıtlı aramalara uyan, lastSeenAt'ten sonra eklenmiş yeni aktif ilanlar.
 * Müşteriye "yeni uygun ilan var" bildirimi için kullanılır.
 */
export async function getSavedSearchMatches(agencyId: string) {
  const searches = await db.clientSavedSearch.findMany({
    where: { client: { agencyId } },
    orderBy: { createdAt: "desc" },
    include: {
      client: {
        select: { id: true, firstName: true, lastName: true, phone: true, imageUrl: true },
      },
    },
  });

  const results = await Promise.all(
    searches.map(async (s) => {
      const where: any = {
        agencyId,
        status: "ACTIVE",
        createdAt: { gt: s.lastSeenAt },
        ...(s.listingType ? { listingType: s.listingType as any } : {}),
        ...(s.propertyType || s.city
          ? {
              property: {
                ...(s.propertyType ? { propertyType: s.propertyType as any } : {}),
                ...(s.city ? { city: { contains: s.city, mode: "insensitive" } } : {}),
              },
            }
          : {}),
        ...(s.minPrice != null || s.maxPrice != null
          ? {
              askingPrice: {
                ...(s.minPrice != null ? { gte: s.minPrice } : {}),
                ...(s.maxPrice != null ? { lte: s.maxPrice } : {}),
              },
            }
          : {}),
        ...(s.q ? { title: { contains: s.q, mode: "insensitive" } } : {}),
      };

      const [newListings, count] = await Promise.all([
        db.listing.findMany({
          where,
          orderBy: { createdAt: "desc" },
          take: 6,
          include: {
            property: {
              select: { city: true, district: true, propertyType: true, roomCount: true },
            },
          },
        }),
        db.listing.count({ where }),
      ]);

      return {
        searchId: s.id,
        name: s.name,
        criteria: {
          listingType: s.listingType,
          propertyType: s.propertyType,
          city: s.city,
          minPrice: s.minPrice,
          maxPrice: s.maxPrice,
          q: s.q,
        },
        lastSeenAt: s.lastSeenAt.toISOString(),
        client: s.client,
        count,
        newListings: newListings.map((l) => ({
          id: l.id,
          title: l.title,
          listingNo: l.listingNo,
          askingPrice: l.askingPrice,
          currency: l.currency,
          listingType: l.listingType,
          city: l.property?.city ?? null,
          district: l.property?.district ?? null,
          propertyType: l.property?.propertyType ?? null,
          roomCount: l.property?.roomCount ?? null,
          createdAt: l.createdAt.toISOString(),
        })),
      };
    })
  );

  return results.filter((r) => r.count > 0);
}

/** Kayıtlı aramadaki yeni eşleşmeleri "görüldü" işaretle (lastSeenAt = şimdi). */
export async function markSavedSearchSeen(searchId: string) {
  const search = await db.clientSavedSearch.findUnique({
    where: { id: searchId },
    select: { client: { select: { agencyId: true } } },
  });
  if (!search) throw new Error("Kayıtlı arama bulunamadı.");
  await assertAgencyAccess(search.client.agencyId);

  await db.clientSavedSearch.update({
    where: { id: searchId },
    data: { lastSeenAt: new Date() },
  });

  revalidatePath(`/crm/agency/${search.client.agencyId}/notifications`);
  return { ok: true };
}
