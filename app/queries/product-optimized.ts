"use server";

import db from "@/app/lib/db";
import { getRatingStatistics } from "./product";
import { SortOrder } from "@/app/lib/types";

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

  const statistics = await getRatingStatistics(productId);
  // Fetch reviews from the database
  const reviews = await db.review.findMany({
    where: reviewFilter,
    include: {
      images: true,
      user: true,
    },
    orderBy: sortOption,
    skip, // Skip records for pagination
    take, // Take records for pagination
  });

  return { reviews, statistics };
};
