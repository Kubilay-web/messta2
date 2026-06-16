"use client";

import ColorWheel from "@/app/projects/components/shared/color-wheel";
import { ReviewWithImageType } from "@/app/lib/types";
import { censorName } from "@/app/lib/utils";
import Image from "next/image";
import StarRatings from "react-star-ratings";

export default function ReviewCard({
  review,
}: {
  review: ReviewWithImageType;
}) {
  const { images, user } = review;

  const { username, avatarUrl } = user;
  const variantImage = review.variantImage;

  return (
    <div className="relative flex h-fit rounded-xl border border-[#d8d8d8] px-2.5 py-4">
      <div className="w-16 space-y-1">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile image"
            width={100}
            height={100}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="h-11 w-11 rounded-full bg-gray-200" />
        )}
        <span className="text-xs text-main-secondary">
          {review.user.displayName || "Anonim"}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden px-1.5 leading-5">
        <div className="space-y-2">
          <StarRatings
            rating={review.rating}
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

          <div className="flex items-center gap-x-2">
            {/* <ColorWheel colors={colors} size={24} /> */}
          </div>

          <div className="flex items-center gap-x-2">
            {variantImage && (
              <Image
                src={variantImage}
                alt="Ürün Görseli"
                width={40}
                height={40}
                className="h-9 w-9 rounded-full object-cover"
              />
            )}
            <div className="text-sm text-main-secondary">{review.variant}</div>
            <span>.</span>
            <div className="text-sm text-main-secondary">{review.size}</div>
            <span>.</span>
            <div className="text-sm text-main-secondary">
              {review.quantity} PC
            </div>
          </div>

          <p className="text-sm">{review.review}</p>

          {images?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {images.map((img) =>
                img.url ? (
                  <div
                    key={img.id}
                    className="h-20 w-20 cursor-pointer overflow-hidden rounded-xl"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || "Image"}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
