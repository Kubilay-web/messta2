"use client";

import React from "react";
import StarRatings from "react-star-ratings";

interface RatingCardProps {
  rating: number;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating }) => {
  const fixedRating = Number(rating.toFixed(2)); // Dereceyi 2 ondalıklı sayıya yuvarlama

  return (
    <div className="h-44 w-full flex-1">
      <div className="flex h-full flex-col justify-center overflow-hidden rounded-lg bg-[#f5f5f5] p-6">
        {/* Dereceyi büyük bir font ile gösterme */}
        <div className="text-6xl font-bold">{fixedRating}</div>

        <div className="py-1.5">
          {/* Yıldız derecelendirme bileşeni */}
          <StarRatings
            rating={fixedRating}
            starRatedColor="#FFD804"
            starEmptyColor="#e2dfdf"
            starHoverColor="#FFD804"
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="2px"
            isHalf={true} // Yarım yıldızlar
            edit={false} // Düzenleme kapalı
          />
        </div>

        <div className="mt-2 leading-5 text-[#03c97a]">
          All from verified purchases
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
