"use client";
import {
  ProductVariantDataType,
  RatingStatisticsType,
  ReviewsFiltersType,
  ReviewsOrderType,
  ReviewWithImageType,
  VariantInfoType,
} from "@/app/lib/types";
import { FC, useEffect, useState } from "react";
import RatingCard from "../../cards/product-rating";
import RatingStatisticsCard from "../../cards/rating-statistics";
import ReviewCard from "../../cards/review";
import ReviewsFilters from "./filters";
import ReviewsSort from "./sort";
import Pagination from "../../shared/pagination";
import ReviewDetails from "../../forms/review-details";
import ProductPageReviewsSkeletonLoader from "../../skeletons/product-page/reviews";
import { DotLoader } from "react-spinners";
import { getProductFilteredReviews } from "@/app/queries/product";
import { Review } from "@prisma/client";
import { randomBytes } from "crypto";

interface Props {
  productId: string;
  rating: number;
  statistics: RatingStatisticsType;
  reviews: ReviewWithImageType[];
  variantsInfo: VariantInfoType[];
  numReviews: number;
  reviewsProduct: Review[];
}
const defaultData = {
  ratingStatistics: [
    { rating: 1, numReviews: 0, percentage: 0 },
    { rating: 2, numReviews: 0, percentage: 0 },
    { rating: 3, numReviews: 0, percentage: 0 },
    { rating: 4, numReviews: 0, percentage: 0 },
    { rating: 5, numReviews: 0, percentage: 0 },
  ],
  reviewsWithImagesCount: 0,
  totalReviews: 0,
};

const ProductReviews: FC<Props> = ({
  productId,
  rating,
  statistics,
  reviews,
  variantsInfo,
  numReviews,
  reviewsProduct,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filterLoading, setFilterLoading] = useState<boolean>(true);

  const [data, setData] = useState<ReviewWithImageType[]>(reviews);

  console.log("data-->", data);

  // const [statistics, setStatistics] =
  //   useState<RatingStatisticsType>(defaultData);
  const [averageRating, setAverageRating] = useState<number>(rating);

  const { totalReviews, ratingStatistics } = statistics;

  const half = Math.ceil(data?.length / 2);

  // Filtering
  const filtered_data = {
    rating: undefined,
    hasImages: undefined,
  };
  const [filters, setFilters] = useState<ReviewsFiltersType>(filtered_data);

  // Sorting
  const [sort, setSort] = useState<ReviewsOrderType>();

  // Pagination
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  useEffect(() => {
    if (filters.rating || filters.hasImages || sort) {
      setPage(1);
      handleGetReviews();
    }
    if (page) {
      handleGetReviews();
    }
  }, [filters, sort, page]);

  const handleGetReviews = async () => {
    try {
      setFilterLoading(true);
      const res = await getProductFilteredReviews(
        productId,
        filters,
        sort,
        page,
        pageSize,
      );
      setData(res.reviews);
      setStatistics(res.statistics);
      setLoading(false);
      setFilterLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (reviews) {
  //     setData(reviews);
  //     setLoading(false);
  //   }
  // }, [reviews]);

  return (
    <div className="pt-6" id="reviews">
      {loading ? (
        <ProductPageReviewsSkeletonLoader numReviews={numReviews} />
      ) : (
        <div>
          {/* Title */}
          <div className="h-12">
            <h2 className="text-2xl font-bold text-main-primary">
              Custom Reviews ({totalReviews})
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            {reviewsProduct.length > 0 ? (
              reviewsProduct.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p>No reviews yet. Be the first to review this product!</p>
            )}
          </div>

          {/* <div>
            <h2 className="mb-4 text-xl font-bold">Customer Reviews</h2>
            <div className="space-y-4">
              {reviewsProduct.length > 0 ? (
                reviewsProduct.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-md border border-gray-200 p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.user.avatarUrl || "/default-avatar.png"}
                        alt={review.user.displayName}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">
                          {review.user.displayName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {review.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-700">{review.review}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-700">{review.variant}</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-yellow-500">{`Rating: ${review.rating}`}</p>
                    </div>
                    {review.images.length > 0 && (
                      <div className="mt-2 flex space-x-2">
                        {review.images.map((image) => (
                          <img
                            key={image.id}
                            src={image.url}
                            alt={image.alt}
                            className="h-24 w-24 rounded-md object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div> */}

          {/* Statistics */}
          <div className="w-full">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <RatingCard rating={rating} />
              <RatingStatisticsCard statistics={ratingStatistics} />
            </div>
          </div>

          <>
            {/* <div className="space-y-6">
              <ReviewsFilters
                filters={filters}
                setFilters={setFilters}
                setSort={setSort}
                stats={statistics}
              />
              <ReviewsSort sort={sort} setSort={setSort} />
            </div> */}

            {/* <div className="mt-6 grid gap-4 md:grid-cols-2">
              {data?.length > 0 ? (
                <>
                  <div className="flex flex-col gap-3">
                    {data
                      ?.slice(0, half)
                      .map((review) => (
                        <ReviewCard key={review.id} review={reviews} />
                      ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    {data
                      ?.slice(half)
                      .map((review) => (
                        <ReviewCard key={review.id} review={reviews} />
                      ))}
                  </div>
                </>
              ) : (
                <>No Reviews yet.</>
              )}
            </div>  */}

            {!filterLoading ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {reviewsProduct?.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-3">
                      {reviewsProduct
                        ?.slice(0, half)
                        .map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      {reviewsProduct
                        ?.slice(half)
                        .map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                  </>
                ) : (
                  <>No Reviews yet.</>
                )}
              </div>
            ) : (
              <div className="h-13 flex w-full items-center justify-center">
                <DotLoader color="#f5f5f5" />
              </div>
            )}
            {reviewsProduct?.length >= pageSize && (
              <Pagination
                page={page}
                totalPages={
                  filters.rating || filters.hasImages
                    ? reviewsProduct?.length / pageSize
                    : 1 / pageSize
                }
                setPage={setPage}
              />
            )}
          </>
        </div>
      )}
      <div className="mt-4">
        <ReviewDetails
          productId={productId}
          setReviews={setData}
          reviews={data}
          variantsInfo={variantsInfo}
          // setStatistics={setStatistics}
          setAverageRating={setAverageRating}
        />
      </div>
    </div>
  );
};

export default ProductReviews;
