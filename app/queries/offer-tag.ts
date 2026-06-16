"use server";

import { validateRequest } from "@/app/auth";
import { PrismaClient } from "@prisma/client";

// Prisma client
const prisma = new PrismaClient();

// OfferTag arayüzü
export interface IOfferTag {
  id: string;
  name: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
  products?: { id: string }[];
}

// OfferTag ekle veya güncelle
export const upsertOfferTag = async (
  offerTag: IOfferTag,
): Promise<IOfferTag | null> => {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthenticated.");
    if (user.role !== "ADMIN") {
      throw new Error("Unauthorized Access: Admin Privileges Required.");
    }

    if (!offerTag) throw new Error("Please provide offer tag data.");

    const existingOfferTag = await prisma.offerTag.findFirst({
      where: {
        OR: [{ name: offerTag.name }, { url: offerTag.url }],
        NOT: [{ id: offerTag.id }],
      },
    });

    if (existingOfferTag) {
      let errorMessage = "";
      if (existingOfferTag.name === offerTag.name) {
        errorMessage = "An offer tag with the same name already exists.";
      } else if (existingOfferTag.url === offerTag.url) {
        errorMessage = "An offer tag with the same URL already exists.";
      }
      throw new Error(errorMessage);
    }

    const result = await prisma.offerTag.upsert({
      where: { id: offerTag.id },
      update: {
        name: offerTag.name,
        url: offerTag.url,
        updatedAt: new Date(),
      },
      create: {
        id: offerTag.id,
        name: offerTag.name,
        url: offerTag.url,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return result;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
};

// Tüm offerTag'leri getir
export const getAllOfferTags = async (
  storeUrl?: string,
): Promise<IOfferTag[]> => {
  let storeId: string | undefined;

  if (storeUrl) {
    const store = await prisma.store.findUnique({
      where: { url: storeUrl },
    });

    if (!store) return [];

    storeId = store.id;
  }

  const offerTags = await prisma.offerTag.findMany({
    where: storeId
      ? {
          products: {
            some: {
              storeId: storeId,
            },
          },
        }
      : {},
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      products: {
        _count: "desc",
      },
    },
  });

  return offerTags;
};

// Belirli bir offerTag getir
export const getOfferTag = async (
  offerTagId: string,
): Promise<IOfferTag | null> => {
  if (!offerTagId) throw new Error("Please provide offer tag ID.");

  const offerTag = await prisma.offerTag.findUnique({
    where: {
      id: offerTagId,
    },
  });

  return offerTag;
};

// OfferTag sil
export const deleteOfferTag = async (
  offerTagId: string,
): Promise<IOfferTag> => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthenticated.");
  if (user.role !== "ADMIN") throw new Error("Unauthorized access.");
  if (!offerTagId) throw new Error("Please provide the offer tag ID.");

  const response = await prisma.offerTag.delete({
    where: {
      id: offerTagId,
    },
  });

  return response;
};
