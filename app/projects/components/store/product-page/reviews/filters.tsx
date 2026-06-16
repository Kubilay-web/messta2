import {
  RatingStatisticsType,
  ReviewsFiltersType,
  ReviewsOrderType,
} from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  filters: ReviewsFiltersType;
  setFilters: Dispatch<SetStateAction<ReviewsFiltersType>>;
  stats: RatingStatisticsType;
  setSort: Dispatch<SetStateAction<ReviewsOrderType | undefined>>;
}

const ReviewsFilters: FC<Props> = ({ filters, setFilters, setSort, stats }) => {
  const { rating, hasImages } = filters;
  const { ratingStatistics, reviewsWithImagesCount, totalReviews } = stats;
  return (
    <div className="relative mt-8 overflow-hidden">
      <div className="flex flex-wrap gap-4">
        {/* All */}
        <div
          className={cn(
            "xxx cursor-pointer rounded-full border border-transparent bg-[#f5f5f5] px-4 py-1.5 text-main-primary",
            {
              "border-[#fd384f] bg-[#ffebed] text-[#fd384f]":
                !rating && !hasImages,
            },
          )}
          onClick={() => {
            setFilters({ rating: undefined, hasImages: undefined });
            setSort(undefined);
          }}
        >
          All ({totalReviews})
        </div>
        {/* Includes Pic */}
        <div
          className={cn(
            "cursor-pointer rounded-full border border-transparent bg-[#f5f5f5] px-4 py-1.5 text-main-primary",
            {
              "border-[#fd384f] bg-[#ffebed] text-[#fd384f]": hasImages,
            },
          )}
          onClick={() => setFilters({ ...filters, hasImages: true })}
        >
          Include Pictures ({reviewsWithImagesCount})
        </div>
        {ratingStatistics?.map((r) => (
          <div
            key={r.rating}
            className={cn(
              "cursor-pointer rounded-full border border-transparent bg-[#f5f5f5] px-4 py-1.5 text-main-primary",
              {
                "border-[#fd384f] bg-[#ffebed] text-[#fd384f]":
                  r.rating === rating,
              },
            )}
            onClick={() => setFilters({ ...filters, rating: r.rating })}
          >
            {r.rating} stars ({r.numReviews})
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsFilters;
