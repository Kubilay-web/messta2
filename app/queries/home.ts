"use server";

import db from "@/app/lib/db";
import {
  ProductSimpleVariantType,
  ProductSize,
  ProductType,
  ProductWithVariants,
  SimpleProduct,
  VariantImageType,
} from "@/app/lib/types";

type FormatType = "simple" | "full";

type Param = {
  property: "category" | "subCategory" | "offer";
  value: string;
  type: FormatType;
};

type PropertyMapping = {
  [key: string]: string;
};

export const getHomeDataDynamic = async (
  params: Param[],
): Promise<Record<string, SimpleProduct[] | ProductType[]>> => {
  if (!Array.isArray(params) || params.length === 0) {
    throw new Error("Invalid input: params must be a non-empty array.");
  }

  // Define mappings for property names to database fields
  const propertyMapping: PropertyMapping = {
    category: "category.url",
    subCategory: "subCategory.url",
    offer: "offerTag.url",
  };

  const mapProperty = (property: string): string => {
    if (!propertyMapping[property]) {
      throw new Error(
        `Invalid property: ${property}. Must be one of: category, subCategory, offer.`,
      );
    }
    return propertyMapping[property];
  };

  // GetCheapestSize
  const getCheapestSize = (
    sizes: ProductSize[],
  ): { discountedPrice: number } => {
    const sizesWithDiscount = sizes.map((size) => ({
      ...size,
      discountedPrice: size.price * (1 - size.discount / 100),
    }));

    return sizesWithDiscount.sort(
      (a, b) => a.discountedPrice - b.discountedPrice,
    )[0];
  };

  const formatProductData = (
    products: ProductWithVariants[],
    type: FormatType,
  ): SimpleProduct[] | ProductType[] => {
    if (type === "simple") {
      return products.map((product) => {
        const variant = product.variants[0];
        const cheapestSize = getCheapestSize(variant.sizes);
        const image = variant.images[0];
        return {
          name: product.name,
          slug: product.slug,
          variantName: variant.variantName,
          variantSlug: variant.slug,
          price: cheapestSize.discountedPrice,
          image: image.url,
        } as SimpleProduct;
      });
    } else if (type === "full") {
      return products.map((product) => {
        // Transform the filtered variants into the VariantSimplified structure
        const variants: ProductSimpleVariantType[] = product.variants.map(
          (variant) => ({
            variantId: variant.id,
            variantSlug: variant.slug,
            variantName: variant.variantName,
            variantImage: variant.variantImage,
            images: variant.images,
            sizes: variant.sizes,
          }),
        );

        // Extract variant images for the product
        const variantImages: VariantImageType[] = variants.map((variant) => ({
          url: `/shop/productdetails/${product.slug}/${variant.variantSlug}`,
          image: variant.variantImage
            ? variant.variantImage
            : variant.images[0].url,
        }));

        return {
          id: product.id,
          slug: product.slug,
          name: product.name,
          rating: product.rating,
          sales: product.sales,
          numReviews: product.numReviews,
          variants,
          variantImages,
        } as ProductType;
      });
    } else {
      throw new Error("Invalid type: must be 'simple' or 'full'.");
    }
  };

  const results = await Promise.all(
    params.map(async ({ property, value, type }) => {
      const dbField = mapProperty(property);

      // Construct the 'where' clause based on the dbField
      const whereClause =
        dbField === "offerTag.url"
          ? { offerTag: { url: value } }
          : dbField === "category.url"
            ? { category: { url: value } }
            : dbField === "subCategory.url"
              ? { subCategory: { url: value } }
              : {};

      // Query products based on the constructed where clause
      const products = await db.product.findMany({
        where: whereClause,
        select: {
          id: true,
          slug: true,
          name: true,
          rating: true,
          sales: true,
          numReviews: true,
          variants: {
            select: {
              id: true,
              variantName: true,
              variantImage: true,
              slug: true,
              sizes: true,
              images: {
                orderBy: {
                  createdAt: "asc",
                },
              },
            },
          },
        },
      });

      // Format the data based on the input
      const formattedData = formatProductData(products, type);

      // Determine the output key based on the property and value
      const outputKey = `products_${value.replace(/-/g, "_")}`;

      return { [outputKey]: formattedData };
    }),
  );

  return results.reduce((acc, result) => ({ ...acc, ...result }), {});
};

export const getHomeFeaturedCategories = async () => {
  const featuredCategories = await db.category.findMany({
    where: {
      featured: true,
    },
    select: {
      id: true,
      name: true,
      url: true,
      image: true,
      subCategories: {
        select: {
          id: true,
          name: true,
          url: true,
          image: true,
          _count: {
            select: {
              product: true, // Get the count of products in subcategories
            },
          },
        },
        orderBy: {
          product: {
            _count: "desc", // Order by product count
          },
        },
        take: 3, // Limit subCategories to 3
      },
      _count: {
        select: {
          products: true, // Get the count of products in categories
        },
      },
    },
    orderBy: {
      products: {
        _count: "desc", // Order by product count
      },
    },
    take: 6, // Limit categories to 6
  });

  return featuredCategories.map((category) => ({
    id: category.id,
    name: category.name,
    url: category.url,
    productCount: category._count.products,
    subCategories: category.subCategories.map((subcategory) => ({
      id: subcategory.id,
      name: subcategory.name,
      url: subcategory.url,
      image: subcategory.image,
      productCount: subcategory._count.product,
    })),
  }));
};
