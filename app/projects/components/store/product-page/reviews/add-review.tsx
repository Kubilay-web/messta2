"use client";
import { ReviewWithImageType, VariantInfoType } from "@/app/lib/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReviewDetails from "../../forms/review-details";

export default function AddReview({
  productId,
  reviews,
  setReviews,
  variantsInfo,
}: {
  productId: string;
  reviews: ReviewWithImageType[];
  //   setReviews: Dispatch<SetStateAction<ReviewWithImageType[]>>;
  variantsInfo: VariantInfoType[];
}) {
  const [reviews_data, setReviewsData] =
    useState<ReviewWithImageType[]>(reviews);

  return (
    <div>
      <ReviewDetails productId={productId} variantsInfo={variantsInfo} />
    </div>
  );
}
