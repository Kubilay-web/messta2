"use server";

import { PrismaClient } from "@prisma/client";
import { ReviewDetailsType } from "@/app/lib/types";
import { validateRequest } from "@/app/auth";
import { getRatingStatistics } from "./product";

const prisma = new PrismaClient();

export const upsertReview = async (
  productId: string,
  review: Omit<ReviewDetailsType, "id">, // ID alanını çıkardık
) => {
  try {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthenticated.");
    if (!productId) throw new Error("Product ID is required.");
    if (!review) throw new Error("Please provide review data.");

    const existingReview = await prisma.review.findFirst({
      where: {
        productId,
        userId: user.id,
        variant: review.variant,
      },
    });

    // Upsert işlemi
    const reviewDetails = await prisma.review.upsert({
      where: existingReview
        ? { id: existingReview.id }
        : {
            productId_userId_variant: {
              productId,
              userId: user.id,
              variant: review.variant,
            },
          },
      update: {
        variant: review.variant,
        variantImage: review.variantImage,
        images: {
          deleteMany: {},
          create: review.images.map((img) => ({
            url: img.url,
          })),
        },
        quantity: review.quantity,
        rating: review.rating,
        review: review.review,
        size: review.size,
        color: review.color,
        userId: user.id,
      },
      create: {
        variant: review.variant,
        variantImage: review.variantImage,
        images: {
          create: review.images.map((img) => ({
            url: img.url,
          })),
        },
        quantity: review.quantity,
        rating: review.rating,
        review: review.review,
        size: review.size,
        color: review.color,
        productId,
        userId: user.id,
      },
      include: {
        images: true,
        user: true,
      },
    });

    const productReviews = await prisma.review.findMany({
      where: {
        productId,
      },
      select: {
        rating: true,
      },
    });

    const totalRating = productReviews.reduce(
      (acc, rev) => acc + rev.rating,
      0,
    );

    const averageRating = totalRating / productReviews.length;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        rating: averageRating,
        numReviews: productReviews.length,
      },
    });

    const statistics = await getRatingStatistics(productId);

    const message = existingReview
      ? "Your review has been updated successfully!"
      : "Thank you for submitting your review!";

    return {
      review: reviewDetails,
      rating: averageRating,
      statistics,
      message,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getProductReviews = async (productId: string) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        images: true,
      },
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Unable to fetch reviews");
  }
};

export default getProductReviews;
