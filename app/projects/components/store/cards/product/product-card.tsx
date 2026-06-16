"use client";
import { ProductType, VariantSimplified } from "@/app/lib/types";
import Link from "next/link";
import { useState } from "react";
import StarRatings from "react-star-ratings";

import ProductCardImageSwiper from "./swiper";
import VariantSwitcher from "./variant-switcher";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/projects/components/store/ui/button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import ProductPrice from "../../product-page/product-info/product-price";
import { addToWishlist } from "@/app/queries/user";

export default function ProductCard({ product }: { product: ProductType }) {
  const { name, slug, rating, sales, variantImages, variants, id } = product;
  const [variant, setVariant] = useState<VariantSimplified>(variants[0]);
  const { variantSlug, variantName, images, sizes } = variant;

  const handleaddToWishlist = async () => {
    try {
      const res = await addToWishlist(id, variant.variantId);
      if (res) toast.success("Product successfully added to wishlist.");
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <div>
      <div
        className={cn(
          "group relative ml-5 w-[190px] rounded-t-3xl border border-transparent bg-white p-4 transition-all duration-75 ease-in-out hover:border-gray-300 hover:shadow-xl min-[480px]:w-[225px] gap-3",
          {
            "": true,
          },
        )}
      >
        <div className="relative h-full w-full">
          <Link
            href={`/home/shop/product/${slug}?variant=${variantSlug}`}
            className="relative inline-block w-full overflow-hidden"
          >
            {/* Images Swiper */}
            <ProductCardImageSwiper images={images} />
            {/* Title */}
            <div className="line-clamp-1 h-[18px] overflow-hidden overflow-ellipsis text-sm text-gray-900">
              {name} · {variantName}
            </div>
            {/* Rating - Sales */}
            {product.rating > 0 && product.sales > 0 && (
              <div className="flex h-5 items-center gap-x-1">
                <StarRatings
                  rating={Math.round(product.rating * 2) / 2}
                  starRatedColor="#FFD804"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="2px"
                />
                <div className="text-xs text-gray-500">{sales} sold</div>
              </div>
            )}
            {/* Price */}
            <ProductPrice sizes={sizes} isCard handleChange={() => {}} />
          </Link>
        </div>
        <div className="absolute -left-[1px] z-30 hidden w-[calc(100%+2px)] space-y-2 rounded-b-3xl border border-t-0 bg-white px-4 pb-4 shadow-xl group-hover:block">
          {/* Variant switcher */}
          <VariantSwitcher
            images={variantImages}
            variants={variants}
            setVariant={setVariant}
            selectedVariant={variant}
          />
          <div className="flex-items flex gap-x-1">
            <Button>
              <Link className="text-black" href={`/home/shop/product/${slug}/${variantSlug}`}>Add to cart</Link>
            </Button>
            <Button
              size="icon"
              onClick={() => handleaddToWishlist()}
            >
              <Heart className="w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
