"use server";

import { validateRequest } from "@/app/auth";
import { PrismaClient } from "@prisma/client";

// Prisma client
const prisma = new PrismaClient();

// Kategori interface'i
interface ICategory {
  id: string; // Kategori ID'si
  name: string; // Kategori adı
  url: string; // Kategori URL'si
  image: string; // Kategori görseli
  featured: boolean; // Featured durumu
  createdAt?: Date; // Oluşturulma tarihi
  updatedAt?: Date; // Güncellenme tarihi
}

// Kategoriyi güncelleme veya ekleme fonksiyonu
export async function upsertCategory(
  category: ICategory,
): Promise<ICategory | null> {
  try {
    // Kullanıcıyı al
    const { user } = await validateRequest();

    // Kullanıcının doğrulanıp doğrulanmadığını kontrol et
    if (!user) throw new Error("Unauthenticated.");

    // Admin yetkisi kontrolü
    if (user?.role !== "ADMIN")
      throw new Error(
        "Unauthorized Access: Admin Privileges Required for Entry.",
      );

    // Kategori verisinin sağlanıp sağlanmadığını kontrol et
    if (!category) throw new Error("Please provide category data.");

    // Kategori veritabanında var mı diye kontrol et
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: category.name }, { url: category.url }],
        NOT: [{ id: category.id }],
      },
    });

    if (existingCategory) {
      let errorMessage = "";
      if (existingCategory.name === category.name) {
        errorMessage = "A category with the same name already exists.";
      } else if (existingCategory.url === category.url) {
        errorMessage = "A category with the same URL already exists.";
      }
      throw new Error(errorMessage);
    }

    // Kategoriyi güncelle veya ekle
    const result = await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        url: category.url,
        image: category.image,
        featured: category.featured,
        updatedAt: new Date(),
      },
      create: {
        id: category.id,
        name: category.name,
        url: category.url,
        image: category.image,
        featured: category.featured,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return result;
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
}

// Tüm alt kategorileri alma fonksiyonu
export const getAllCategories = async (storeUrl: string) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        updatedAt: "desc", // Güncellenme tarihine göre sıralama
      },
    });

    return categories; // Kategorileri döndür
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Hata durumunda, hatayı fırlat
  }
};

// Tüm alt kategorileri alma fonksiyonu
export const getCategory = async (categoryId: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category; // Kategorileri döndür
  } catch (error) {
    console.error("Error fetching get category:", error);
    throw error; // Hata durumunda, hatayı fırlat
  }
};

// Tüm alt kategorileri alma fonksiyonu
export const deleteCategory = async (categoryId: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthenticated.");

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized access.");
  }

  if (!categoryId) throw new Error("Please provide category ID.");

  const response = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
  return response;
};

export const getAllSubCategoriesForCategory = async (categoryId: string) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      where: {
        categoryId,
      },
      orderBy: {
        updatedAt: "desc", // Güncellenme tarihine göre sıralama
      },
    });

    return subCategories; // Kategorileri döndür
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Hata durumunda, hatayı fırlat
  }
};

export const getAllCategoriesForCategory = async (categoryId: string) => {
  // Retrieve all subcategories of category from the database
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return subCategories;
};
