"use server";

import { validateRequest } from "@/app/auth";
import { PrismaClient, SubCategory } from "@prisma/client";

// Prisma client
const prisma = new PrismaClient();

// SubCategory interface
interface ISubCategory {
  id: string; // SubCategory ID
  name: string; // SubCategory name
  url: string; // SubCategory URL
  image: string; // SubCategory image
  featured: boolean; // Featured status
  categoryId: string; // The ID of the related category
  createdAt?: Date; // Created timestamp
  updatedAt?: Date; // Updated timestamp
}

// Function to upsert (create or update) a SubCategory
export async function upsertSubCategory(
  subCategory: ISubCategory,
): Promise<ISubCategory | null> {
  try {
    // Validate the request and extract user
    const { user } = await validateRequest();

    // Check if user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Check if user is an Admin
    if (user?.role !== "ADMIN")
      throw new Error(
        "Unauthorized Access: Admin Privileges Required for Entry.",
      );

    // Ensure subCategory data is provided
    if (!subCategory) throw new Error("Please provide subcategory data.");

    // Check if a subcategory with the same name or URL already exists
    const existingSubCategory = await prisma.subCategory.findFirst({
      where: {
        OR: [{ name: subCategory.name }, { url: subCategory.url }],
        NOT: [{ id: subCategory.id }], // Exclude the current subcategory being updated
      },
    });

    if (existingSubCategory) {
      let errorMessage = "";
      if (existingSubCategory.name === subCategory.name) {
        errorMessage = "A subcategory with the same name already exists.";
      } else if (existingSubCategory.url === subCategory.url) {
        errorMessage = "A subcategory with the same URL already exists.";
      }
      throw new Error(errorMessage);
    }

    // Upsert the SubCategory (update or create)
    const result = await prisma.subCategory.upsert({
      where: { id: subCategory.id },
      update: {
        name: subCategory.name,
        url: subCategory.url,
        image: subCategory.image,
        featured: subCategory.featured,
        categoryId: subCategory.categoryId,
        updatedAt: new Date(),
      },
      create: {
        id: subCategory.id,
        name: subCategory.name,
        url: subCategory.url,
        image: subCategory.image,
        featured: subCategory.featured,
        categoryId: subCategory.categoryId,
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
export const getAllSubCategories = async () => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: {
        category: true,
      },
      orderBy: {
        updatedAt: "desc", // Güncellenme tarihine göre sıralama
      },
    });

    return subCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getSubCategory = async (subCategoryId: string) => {
  if (!subCategoryId) throw new Error("Please provide subCategory ID.");
  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        id: subCategoryId,
      },
    });

    return subCategory; // Kategorileri döndür
  } catch (error) {
    console.error("Error fetching get category:", error);
    throw error; // Hata durumunda, hatayı fırlat
  }
};

// Tüm alt kategorileri alma fonksiyonu
export const deleteSubCategory = async (subCategoryId: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthenticated.");

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized access.");
  }

  if (!subCategoryId) throw new Error("Please provide category ID.");

  const response = await prisma.subCategory.delete({
    where: {
      id: subCategoryId,
    },
  });
  return response;
};

export const getSubcategories = async (
  limit: number | null,
  random: boolean = false,
): Promise<SubCategory[]> => {
  try {
    if (random) {
      const rawResult = await prisma.subCategory.aggregateRaw({
        pipeline: [{ $sample: { size: limit || 10 } }],
      });

      // TypeScript cast hatasını çözmek için önce `unknown` yap, sonra `SubCategory[]`
      const subcategories = rawResult as unknown as SubCategory[];

      return subcategories;
    } else {
      const subcategories = await prisma.subCategory.findMany({
        take: limit || undefined,
        orderBy: {
          createdAt: "desc",
        },
      });

      return subcategories;
    }
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
