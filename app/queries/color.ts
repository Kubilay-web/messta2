"use server";

import db from "@/app/lib/db";

export const getFilteredColors = async (
  filters: {
    category?: string;
    subCategory?: string;
    offer?: string;
    storeUrl?: string;
  },
  take = 10,
) => {
  const { category, subCategory, offer, storeUrl } = filters;

  let storeId: string | undefined;

  if (storeUrl) {
    // Retrieve the storeId based on the storeUrl
    const store = await db.store.findUnique({
      where: { url: storeUrl },
    });

    // If no store is found, return an empty array or handle as needed
    if (!store) {
      return { colors: [], count: 0 };
    }

    storeId = store.id;
  }

  // Construct the query dynamically based on the available filters
  const colors = await db.color.findMany({
    where: {
      productVariant: {
        product: {
          AND: [
            category ? { category: { url: category } } : {},
            subCategory ? { subCategory: { url: subCategory } } : {},
            offer ? { category: { url: offer } } : {},
            storeId ? { store: { id: storeId } } : {},
          ],
        },
      },
    },
    select: {
      name: true, // Assuming the color name is stored in the `name` field
    },
    take,
  });

  // Get Colors count
  const count = await db.color.count({
    where: {
      productVariant: {
        product: {
          AND: [
            category ? { category: { url: category } } : {},
            subCategory ? { subCategory: { url: subCategory } } : {},
            offer ? { category: { url: offer } } : {},
            storeId ? { store: { id: storeId } } : {},
          ],
        },
      },
    },
  });

  // Remove duplicate colors
  const uniqueColorsArray = Array.from(
    new Set(colors.map((color) => color.name)),
  );

  // Return the unique colors in the desired format
  return {
    colors: uniqueColorsArray.map((color) => ({ name: color })),
    count,
  };
};
