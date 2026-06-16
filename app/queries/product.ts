"use server";

import { validateRequest } from "@/app/auth";
import {
  FreeShippingWithCountriesType,
  ProductPageType,
  ProductShippingDetailsType,
  ProductWithVariantType,
  RatingStatisticsType,
  SortOrder,
} from "@/app/lib/types";

import slugify from "slugify";
import db from "@/app/lib/db";

import {
  Country,
  FreeShipping,
  PrismaClient,
  ProductVariant,
  ShippingFeeMethod,
  Size,
  Store,
} from "@prisma/client";
import { generateUniqueSlug } from "@/app/lib/utils";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

// Prisma client
const prisma = new PrismaClient();

const handleCreateVariant = async (product: ProductWithVariantType) => {
  const variantSlug = await generateUniqueSlug(
    slugify(product.variantName, {
      replacement: "-",
      lower: true,
      trim: true,
    }),
    "productVariant",
  );

  const variantData = {
    id: product.variantId,
    productId: product.productId,
    variantName: product.variantName,
    variantDescription: product.variantDescription,
    slug: variantSlug,
    isSale: product.isSale,
    saleEndDate: product.isSale ? product.saleEndDate : "",
    sku: product.sku,
    keywords: product.keywords.join(","),
    weight: product.weight,
    variantImage: product.variantImage,
    images: {
      create: product.images.map((img) => ({
        url: img.url,
      })),
    },
    colors: {
      create: product.colors.map((color) => ({
        name: color.color,
      })),
    },
    sizes: {
      create: product.sizes.map((size) => ({
        size: size.size,
        price: size.price,
        quantity: size.quantity,
        discount: size.discount,
      })),
    },
    specs: {
      create: product.variant_specs.map((spec) => ({
        name: spec.name,
        value: spec.value,
      })),
    },
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  const new_variant = await db.productVariant.create({ data: variantData });
  return new_variant;
};

const handleProductCreate = async (
  product: ProductWithVariantType,
  storeId: string,
) => {
  // Generate unique slugs for product and variant
  const productSlug = await generateUniqueSlug(
    slugify(product.name, {
      replacement: "-",
      lower: true,
      trim: true,
    }),
    "product",
  );

  const variantSlug = await generateUniqueSlug(
    slugify(product.variantName, {
      replacement: "-",
      lower: true,
      trim: true,
    }),
    "productVariant",
  );

  const productData = {
    id: product.productId,
    name: product.name,
    description: product.description,
    slug: productSlug,
    store: { connect: { id: storeId } },
    category: { connect: { id: product.categoryId } },
    subCategory: { connect: { id: product.subCategoryId } },
    offerTag: { connect: { id: product.offerTagId } },
    brand: product.brand,
    specs: {
      create: product.product_specs.map((spec) => ({
        name: spec.name,
        value: spec.value,
      })),
    },
    questions: {
      create: product.questions.map((q) => ({
        question: q.question,
        answer: q.answer,
      })),
    },
    variants: {
      create: [
        {
          id: product.variantId,
          variantName: product.variantName,
          variantDescription: product.variantDescription,
          slug: variantSlug,
          variantImage: product.variantImage,
          sku: product.sku,
          weight: product.weight,
          keywords: product.keywords.join(","),
          isSale: product.isSale,
          saleEndDate: product.saleEndDate,
          images: {
            create: product.images.map((img) => ({
              url: img.url,
            })),
          },
          colors: {
            create: product.colors.map((color) => ({
              name: color.color,
            })),
          },
          sizes: {
            create: product.sizes.map((size) => ({
              size: size.size,
              price: size.price,
              quantity: size.quantity,
              discount: size.discount,
            })),
          },
          specs: {
            create: product.variant_specs.map((spec) => ({
              name: spec.name,
              value: spec.value,
            })),
          },
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      ],
    },
    shippingFeeMethod: product.shippingFeeMethod,
    freeShippingForAllCountries: product.freeShippingForAllCountries,
    freeShipping: product.freeShippingForAllCountries
      ? undefined
      : product.freeShippingCountriesId &&
          product.freeShippingCountriesId.length > 0
        ? {
            create: {
              eligibaleCountries: {
                create: product.freeShippingCountriesId.map((country) => ({
                  country: { connect: { id: country.value } },
                })),
              },
            },
          }
        : undefined,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };

  const new_product = await db.product.create({ data: productData });
  return new_product;
};

export const upsertProduct = async (
  product: ProductWithVariantType,
  storeUrl: string,
) => {
  try {
    // Retrieve current user
    const { user } = await validateRequest();

    // Check if user is authenticated
    if (!user) throw new Error("Unauthenticated.");

    // Ensure user has seller privileges
    if (user.role !== "SELLER")
      throw new Error(
        "Unauthorized Access: Seller Privileges Required for Entry.",
      );

    // Ensure product data is provided
    if (!product) throw new Error("Please provide product data.");

    // Find the store by URL
    const store = await db.store.findUnique({
      where: { url: storeUrl, userId: user.id },
    });
    if (!store) throw new Error("Store not found.");

    // Check if the product already exists
    const existingProduct = await db.product.findUnique({
      where: { id: product.productId },
    });

    // Check if the variant already exists
    const existingVariant = await db.productVariant.findUnique({
      where: { id: product.variantId },
    });

    if (existingProduct) {
      if (existingVariant) {
        // Update existing variant and product
      } else {
        // Create new variant
        await handleCreateVariant(product);
      }
    } else {
      // Create new product and variant
      await handleProductCreate(product, store.id);
    }
  } catch (error) {
    throw error;
  }
};

export const getProductMainInfo = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      questions: true,
      specs: true,
    },
  });
  if (!product) return null;

  return {
    productId: product.id,
    name: product.name,
    description: product.description,
    brand: product.brand,
    categoryId: product.categoryId,
    subCategoryId: product.subCategoryId,
    offerTagId: product.offerTagId || undefined,
    storeId: product.storeId,
    ShippingFeeMethod: product.shippingFeeMethod,

    questions: product.questions.map((q) => ({
      question: q.question,
      answer: q.answer,
    })),

    product_specs: product.specs.map((spec) => ({
      name: spec.name,
      value: spec.value,
    })),
  };
};

export const getAllStoreProducts = async (storeUrl: string) => {
  const store = await prisma.store.findUnique({
    where: { url: storeUrl },
  });
  if (!store) throw new Error("Please provide a valid store URL.");

  const products = await prisma.product.findMany({
    where: {
      storeId: store.id,
    },
    include: {
      category: true,
      subCategory: true,
      offerTag: true,
      variants: {
        include: {
          images: true,
          colors: true,
          sizes: true,
        },
      },
      store: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });

  return products;
};

export const deleteProduct = async (productId: string) => {
  // Retrieve current user
  const { user } = await validateRequest();

  // Check if user is authenticated
  if (!user) throw new Error("Unauthenticated.");

  // Ensure user has seller privileges
  if (user.role !== "SELLER")
    throw new Error(
      "Unauthorized Access: Seller Privileges Required for Entry.",
    );

  // Ensure product data is provided
  if (!productId) throw new Error("Please provide product id.");

  const response = await prisma.product.delete({
    where: { id: productId },
  });
  return response;
};

export const getProducts = async (
  filters: any = {},
  sortBy = "",
  page: number = 1,
  pageSize: number = 10,
) => {
  const currentPage = page;
  const limit = pageSize;
  const skip = (currentPage - 1) * limit;

  const whereClause: any = {
    AND: [],
  };

  // Apply store filter (using store URL)

  if (filters.store) {
    const store = await prisma.store.findUnique({
      where: {
        url: filters.store,
      },
      select: { id: true },
    });
    if (store) {
      whereClause.AND.push({ storeId: store.id });
    }
  }

  if (filters.category) {
    const category = await prisma.category.findUnique({
      where: {
        url: filters.category,
      },
      select: { id: true },
    });
    if (category) {
      whereClause.AND.push({ categoryId: category.id });
    }
  }

  // Apply subCategory filter (using subCategory URL)
  if (filters.subCategory) {
    const subCategory = await prisma.subCategory.findUnique({
      where: {
        url: filters.subCategory,
      },
      select: { id: true },
    });
    if (subCategory) {
      whereClause.AND.push({ subCategoryId: subCategory.id });
    }
  }

  // Store filter
  if (filters.store) {
    const store = await prisma.store.findUnique({
      where: { url: filters.store },
      select: { id: true },
    });
    if (store) whereClause.AND.push({ storeId: store.id });
  }

  // Exclude product
  if (filters.productId) {
    whereClause.AND.push({ id: { not: filters.productId } });
  }

  // Category filter
  if (filters.category) {
    const category = await prisma.category.findUnique({
      where: { url: filters.category },
      select: { id: true },
    });
    if (category) whereClause.AND.push({ categoryId: category.id });
  }

  // Subcategory filter
  if (filters.subCategory) {
    const subCategory = await prisma.subCategory.findUnique({
      where: { url: filters.subCategory },
      select: { id: true },
    });
    if (subCategory) whereClause.AND.push({ subCategoryId: subCategory.id });
  }

  // Size filter
  if (filters.size && Array.isArray(filters.size)) {
    whereClause.AND.push({
      variants: {
        some: {
          sizes: {
            some: {
              size: { in: filters.size },
            },
          },
        },
      },
    });
  }

  // Offer filter
  if (filters.offer) {
    const offer = await prisma.offerTag.findUnique({
      where: { url: filters.offer },
      select: { id: true },
    });
    if (offer) whereClause.AND.push({ offerTagId: offer.id });
  }

  // Search filter
  if (filters.search) {
    whereClause.AND.push({
      OR: [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        {
          variants: {
            some: {
              OR: [
                {
                  variantName: {
                    contains: filters.search,
                    mode: "insensitive",
                  },
                },
                {
                  variantDescription: {
                    contains: filters.search,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        },
      ],
    });
  }

  // Price filter
  if (filters.minPrice || filters.maxPrice) {
    whereClause.AND.push({
      variants: {
        some: {
          sizes: {
            some: {
              price: {
                gte: filters.minPrice ?? 0,
                lte: filters.maxPrice ?? Number.MAX_SAFE_INTEGER,
              },
            },
          },
        },
      },
    });
  }

  // Color filter
  if (filters.color && Array.isArray(filters.color)) {
    whereClause.AND.push({
      variants: {
        some: {
          colors: {
            some: {
              name: { in: filters.color },
            },
          },
        },
      },
    });
  }

  // Sort options
  let orderBy: any = {};
  switch (sortBy) {
    case "most-popular":
      orderBy = { views: "desc" };
      break;
    case "new-arrivals":
      orderBy = { createdAt: "desc" };
      break;
    case "top-rated":
      orderBy = { rating: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  // Fetch filtered products
  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy,
    take: limit,
    skip,
    include: {
      variants: {
        include: {
          sizes: true,
          colors: true,
          images: true,
        },
      },
    },
  });

  // Sorting by price if needed
  const getMinPrice = (product: any) =>
    Math.min(
      ...product.variants.flatMap(
        (variant: ProductVariant & { sizes: Size[] }) =>
          variant.sizes.map(
            (size) => size.price * (1 - (size.discount ?? 0) / 100),
          ),
      ),
      Infinity,
    );

  products.sort((a, b) => {
    const priceA = getMinPrice(a);
    const priceB = getMinPrice(b);
    if (sortBy === "price-low-to-high") return priceA - priceB;
    if (sortBy === "price-high-to-low") return priceB - priceA;
    return 0;
  });

  // Transform for UI
  const productsWithFilteredVariants = products.map((product) => {
    const variants = product.variants.map((variant) => ({
      variantId: variant.id,
      variantSlug: variant.slug,
      variantName: variant.variantName,
      images: variant.images,
      sizes: variant.sizes,
    }));

    const variantImages = product.variants.map((variant) => ({
      url: `/shop/productdetails/${product.slug}/${variant.slug}`,
      image: variant.variantImage || variant.images[0]?.url,
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
    };
  });

  // Optional: total count with same filters
  const totalCount = await prisma.product.count({ where: whereClause });
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    products: productsWithFilteredVariants,
    totalPages,
    currentPage,
    pageSize,
    totalCount,
  };
};

export const getProductPageData = async (
  productSlug: string,
  variantSlug: string,
) => {
  const product = await retrieveProductDetails(productSlug, variantSlug);

  const { user } = await validateRequest();

  if (!product) return;

  const userCountry = await getUserCountry();
  console.log("userCountry", userCountry);

  const productShippingDetails = await getShippingDetails(
    product.shippingFeeMethod,
    userCountry,
    product.store,
    product.freeShipping,
  );

  console.log("productShippingDetails", productShippingDetails);

  const storeFollowersCount = await getStoreFollowersCount(product.storeId);

  const isUserFollowingStore = await checkIfUserFollowingStore(
    product.storeId,
    user?.id,
  );

  const ratingStatistics = await getRatingStatistics(product.id);

  await incrementProductViews(product.id);

  return formatProductResponse(
    product,
    productShippingDetails,
    storeFollowersCount,
    isUserFollowingStore,
    ratingStatistics,
  );
};

export const retrieveProductDetails = async (
  productSlug: string,
  variantSlug: string,
) => {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
    include: {
      category: true,
      subCategory: true,
      offerTag: true,
      store: true,
      specs: true,
      questions: true,
      reviews: {
        include: {
          images: true,
          user: true,
        },
        take: 8,
      },
      freeShipping: {
        include: {
          eligableCountries: true,
        },
      },
      variants: {
        where: {
          slug: variantSlug,
        },
        include: {
          images: true,
          colors: true,
          sizes: true,
          specs: true,
        },
      },
    },
  });

  if (!product) return null;

  const variantsInfo = await prisma.productVariant.findMany({
    where: {
      productId: product.id,
    },
    include: {
      images: true,
      sizes: true,
      colors: true,
      product: {
        select: {
          slug: true,
        },
      },
    },
  });

  return {
    ...product,
    variantsInfo: variantsInfo.map((variant) => ({
      variantName: variant.variantName,
      variantSlug: variant.slug,
      variantImage: variant.variantImage,
      variantUrl: `/shop/productdetails/${productSlug}/${variant.slug}`,
      images: variant.images,
      sizes: variant.sizes,
      colors: variant.colors.map((color) => color.name).join(","),
    })),
  };
};

const getUserCountry = async (): Promise<{ name: string; code: string }> => {
  const defaultCountry = { name: "United States", code: "US" };

  try {
    const userCountryCookie = await getCookie("userCountry", { cookies });

    if (!userCountryCookie || typeof userCountryCookie !== "string") {
      return defaultCountry;
    }

    const parsedCountry = JSON.parse(userCountryCookie);

    if (
      parsedCountry &&
      typeof parsedCountry === "object" &&
      "name" in parsedCountry &&
      "code" in parsedCountry
    ) {
      return parsedCountry;
    }

    return defaultCountry;
  } catch (error) {
    console.error("Failed to parse userCountryCookie", error);
    return defaultCountry;
  }
};

const formatProductResponse = (
  product: ProductPageType,
  shippingDetails: ProductShippingDetailsType,
  storeFollowersCount: number,
  isUserFollowingStore: boolean,
  ratingStatistics: RatingStatisticsType,
) => {
  if (!product) return;
  const variant = product.variants[0];
  const { store, category, subCategory, offerTag, questions, reviews } =
    product;
  const { images, colors, sizes } = variant;

  return {
    productId: product.id,
    variantId: variant.id,
    productSlug: product.slug,
    variantSlug: variant.slug,
    name: product.name,
    description: product.description,
    variantName: variant.variantName,
    variantDescription: variant.variantDescription,
    images,
    category,
    subCategory,
    offerTag,
    isSale: variant.isSale,
    saleEndDate: variant.saleEndDate,
    brand: product.brand,
    sku: variant.sku,
    weight: variant.weight,
    variantImage: variant.variantImage,
    store: {
      id: store.id,
      url: store.url,
      name: store.name,
      logo: store.logo,
      followersCount: storeFollowersCount,
      isUserFollowingStore,
    },
    colors,
    sizes,
    specs: {
      product: product.specs,
      variant: variant.specs,
    },
    questions,
    rating: product.rating,
    reviews,
    numReviews: product.numReviews,
    reviewsStatistics: ratingStatistics,
    shippingDetails,
    relatedProducts: [],
    variantInfo: product.variantsInfo,
  };
};

const getStoreFollowersCount = async (storeId: string) => {
  const storeFollowersCount = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
    select: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
  return storeFollowersCount?._count.followers || 0;
};

const checkIfUserFollowingStore = async (
  storeId: string,
  userId: string | undefined,
) => {
  let isUserFollowingStore = false;
  if (userId) {
    const storeFollowersInfo = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      select: {
        followers: {
          where: {
            id: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });
    if (storeFollowersInfo && storeFollowersInfo.followers.length > 0) {
      isUserFollowingStore = true;
    }
  }
  return isUserFollowingStore;
};

export const getShippingDetails = async (
  shippingFeeMethod: string,
  userCountry: { name: string; code: string; city: string },
  store: Store,
  freeShipping: FreeShippingWithCountriesType | null,
) => {
  let shippingDetails = {
    shippingFeeMethod,
    shippingService: "",
    shippingFee: 0,
    extraShippingFee: 0,
    deliveryTimeMin: 0,
    deliveryTimeMax: 0,
    returnPolicy: "",
    countryCode: userCountry.code,
    countryName: userCountry.name,
    city: userCountry.city,
    isFreeShipping: false,
  };

  const country = await prisma.country.findUnique({
    where: {
      name: userCountry.name,
      code: userCountry.code,
    },
  });

  if (country) {
    const shippingRate = await prisma.shippingRate.findFirst({
      where: {
        countryId: country.id,
        storeId: store.id,
      },
    });

    const returnPolicy = shippingRate?.returnPolicy || store.returnPolicy;
    const shippingService =
      shippingRate?.shippingService || store.defaultShippingService;

    const shippingFeePerItem =
      shippingRate?.shippingFeePerItem || store.defaultShippingFeePerItem;

    const shippingFeeForAdditionalItem =
      shippingRate?.shippingFeeForAdditionalItem ||
      store.defaultShippingFeeForAdditionalItem;

    const shippingFeePerKg =
      shippingRate?.shippingFeePerKg || store.defaultShippingFeePerKg;

    const shippingFeeFixed =
      shippingRate?.shippingFeeFixed || store.defaultShippingFeeFixed;

    const deliveryTimeMin =
      shippingRate?.deliveryTimeMin || store.defaultDeliveryTimeMin;

    const deliveryTimeMax =
      shippingRate?.deliveryTimeMax || store.defaultDeliveryTimeMax;

    if (freeShipping) {
      const free_shipping_countries = freeShipping.eligibaleCountries;
      const check_free_shipping = free_shipping_countries.find(
        (c) => c.countryId === country.id,
      );
      if (check_free_shipping) {
        shippingDetails.isFreeShipping = true;
      }
    }

    shippingDetails = {
      shippingFeeMethod,
      shippingService: shippingService,
      shippingFee: 0,
      extraShippingFee: 0,
      deliveryTimeMin,
      deliveryTimeMax,
      returnPolicy,
      countryCode: userCountry.code,
      countryName: userCountry.name,
      city: userCountry.city,
      isFreeShipping: shippingDetails.isFreeShipping,
    };

    const { isFreeShipping } = shippingDetails;

    switch (shippingFeeMethod) {
      case "ITEM":
        shippingDetails.shippingFee = isFreeShipping ? 0 : shippingFeePerItem;
        shippingDetails.extraShippingFee = isFreeShipping
          ? 0
          : shippingFeeForAdditionalItem;
        break;
      case "WEIGHT":
        shippingDetails.shippingFee = isFreeShipping ? 0 : shippingFeePerKg;
        break;
      case "FIXED":
        shippingDetails.shippingFee = isFreeShipping ? 0 : shippingFeeFixed;
        break;

      default:
        break;
    }

    return shippingDetails;
  }

  return false;
};

export const getRatingStatistics = async (productId: string) => {
  const ratingStats = await prisma.review.groupBy({
    by: ["rating"],
    where: { productId },
    _count: {
      rating: true,
    },
  });
  console.log("ratingStats---->", ratingStats);
  const totalReviews = ratingStats.reduce(
    (sum, stat) => sum + stat._count.rating,
    0,
  );

  const ratingCounts = Array(5).fill(0);

  console.log("ratingCounts---->", ratingCounts);

  ratingStats.forEach((stat) => {
    let rating = Math.floor(stat.rating);
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating - 1] = stat._count.rating;
    }
  });

  return {
    ratingStatistics: ratingCounts.map((count, index) => ({
      rating: index + 1,
      numReviews: count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    })),
    reviewsWithImagesCount: await prisma.review.count({
      where: {
        productId,
        images: { some: {} },
      },
    }),
    totalReviews,
  };
};

export const getProductFilteredReviews = async (
  productId: string,
  filters: { rating?: number; hasImages?: boolean },
  sort: { orderBy: "latest" | "oldest" | "highest" } | undefined,
  page: number = 1,
  pageSize: number = 4,
) => {
  const reviewFilter: any = {
    productId,
  };

  // Apply rating filter if provided
  if (filters.rating) {
    const rating = filters.rating;
    reviewFilter.rating = {
      in: [rating, rating + 0.5],
    };
  }

  // Apply image filter if provided
  if (filters.hasImages) {
    reviewFilter.images = {
      some: {},
    };
  }

  // Set sorting order using local SortOrder type
  const sortOption: { createdAt?: SortOrder; rating?: SortOrder } =
    sort && sort.orderBy === "latest"
      ? { createdAt: "desc" }
      : sort && sort.orderBy === "oldest"
        ? { createdAt: "asc" }
        : { rating: "desc" };

  // Calculate pagination parameters
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // Fetch reviews from the database
  const reviews = await prisma.review.findMany({
    where: reviewFilter,
    include: {
      images: true,
      user: true,
    },
    orderBy: sortOption,
    skip, // Skip records for pagination
    take, // Take records for pagination
  });

  return reviews;
};

export const getDeliveryDetailsForStoreByCountry = async (
  storeId: string,
  countryId: string,
) => {
  // Get shipping rate
  const shippingRate = await db.shippingRate.findFirst({
    where: {
      countryId,
      storeId,
    },
  });

  let storeDetails;
  if (!shippingRate) {
    storeDetails = await db.store.findUnique({
      where: {
        id: storeId,
      },
      select: {
        defaultShippingService: true,
        defaultDeliveryTimeMin: true,
        defaultDeliveryTimeMax: true,
      },
    });
  }

  const shippingService = shippingRate
    ? shippingRate.shippingService
    : storeDetails?.defaultShippingService;

  const deliveryTimeMin = shippingRate
    ? shippingRate.deliveryTimeMin
    : storeDetails?.defaultDeliveryTimeMin;

  const deliveryTimeMax = shippingRate
    ? shippingRate.deliveryTimeMax
    : storeDetails?.defaultDeliveryTimeMax;

  return {
    shippingService,
    deliveryTimeMin,
    deliveryTimeMax,
  };
};

export const getProductShippingFee = async (
  shippingFeeMethod: string,
  userCountry: Country,
  store: Store,
  freeShipping: FreeShippingWithCountriesType | null,
  weight: number,
  quantity: number,
) => {
  // Fetch country information based on userCountry.name and userCountry.code
  const country = await db.country.findUnique({
    where: {
      name: userCountry.name,
      code: userCountry.code,
    },
  });

  if (country) {
    // Check if the user qualifies for free shipping
    if (freeShipping) {
      const free_shipping_countries = freeShipping.eligibaleCountries;
      const isEligableForFreeShipping = free_shipping_countries.some(
        (c) => c.countryId === country.name,
      );
      if (isEligableForFreeShipping) {
        return 0; // Free shipping
      }
    }

    // Fetch shipping rate from the database for the given store and country
    const shippingRate = await db.shippingRate.findFirst({
      where: {
        countryId: country.id,
        storeId: store.id,
      },
    });

    // Destructure the shippingRate with defaults
    const {
      shippingFeePerItem = store.defaultShippingFeePerItem,
      shippingFeeForAdditionalItem = store.defaultShippingFeeForAdditionalItem,
      shippingFeePerKg = store.defaultShippingFeePerKg,
      shippingFeeFixed = store.defaultShippingFeeFixed,
    } = shippingRate || {};

    // Calculate the additional quantity (excluding the first item)
    const additionalItemsQty = quantity - 1;

    // Define fee calculation methods in a map (using functions)
    const feeCalculators: Record<string, () => number> = {
      ITEM: () =>
        shippingFeePerItem + shippingFeeForAdditionalItem * additionalItemsQty,
      WEIGHT: () => shippingFeePerKg * weight * quantity,
      FIXED: () => shippingFeeFixed,
    };

    // Check if the fee calculation method exists and calculate the fee
    const calculateFee = feeCalculators[shippingFeeMethod];
    if (calculateFee) {
      return calculateFee(); // Execute the corresponding calculation
    }

    // If no valid shipping method is found, return 0
    return 0;
  }

  // Return 0 if the country is not found
  return 0;
};

export const getProductsByIds = async (
  ids: string[],
  page: number = 1,
  pageSize: number = 10,
): Promise<{ products: any; totalPages: number }> => {
  // Check if ids array is empty
  if (!ids || ids.length === 0) {
    throw new Error("Ids are undefined");
  }

  // Default values for page and pageSize
  const currentPage = page;
  const limit = pageSize;
  const skip = (currentPage - 1) * limit;

  try {
    // Query the database for products with the specified ids
    const variants = await db.productVariant.findMany({
      where: {
        id: {
          in: ids, // Filter products whose idds are in the provided array
        },
      },
      select: {
        id: true,
        variantName: true,
        slug: true,
        images: {
          select: {
            url: true,
          },
        },
        sizes: true,
        product: {
          select: {
            id: true,
            name: true,
            slug: true,
            rating: true,
            sales: true,
          },
        },
      },
      take: limit,
      skip: skip,
    });

    const new_products = variants.map((variant) => ({
      id: variant.product.id,
      slug: variant.product.slug,
      name: variant.product.name,
      rating: variant.product.rating,
      sales: variant.product.sales,
      variants: [
        {
          variantId: variant.id,
          variantName: variant.variantName,
          variantSlug: variant.slug,
          images: variant.images,
          sizes: variant.sizes,
        },
      ],
      variantImages: [],
    }));

    // Return products sorted in the order of ids provided
    const ordered_products = ids
      .map((id) =>
        new_products.find((product) => product.variants[0].variantId === id),
      )
      .filter(Boolean); // Filter out undefined values

    const allProducts = await db.productVariant.count({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const totalPages = Math.ceil(allProducts / pageSize);

    return {
      products: ordered_products,
      totalPages,
    };
  } catch (error) {
    throw new Error("Failed to fetch products. Please try again.");
  }
};

const incrementProductViews = async (productId: string) => {
  const isProductAlreadyViewed = getCookie(`viewedProduct_${productId}`, {
    cookies,
  });

  if (!isProductAlreadyViewed) {
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  }
};

// ---------------------------

// lib/queries/getFeaturedProducts.ts

import { SimpleProduct } from "@/app/lib/types";

export const getFeaturedProducts = async (): Promise<SimpleProduct[]> => {
  const products = await db.product.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      variants: {
        include: {
          sizes: true, // MongoDB ile uyumlu: direkt `orderBy` kullanamıyoruz
        },
      },
    },
  });

  const simplified: SimpleProduct[] = [];

  for (const product of products) {
    for (const variant of product.variants) {
      // En ucuz size'ı manuel olarak bul (MongoDB ile uyumlu)
      const cheapestSize = variant.sizes.reduce(
        (min, curr) => (curr.price < min.price ? curr : min),
        variant.sizes[0],
      );

      simplified.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        rating: product.rating,
        price: cheapestSize?.price ?? 0,
        image: variant.variantImage ?? "/placeholder.webp",
        variantSlug: variant.slug,
      });
    }
  }

  return simplified;
};
