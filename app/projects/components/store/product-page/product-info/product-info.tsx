"use client";

import { CartProductType, ProductPageDataType } from "@/app/lib/types";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";
import { CopyIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import StarRatings from "react-star-ratings";
import ProductPrice from "./product-price";
import Countdown from "../../shared/countdown";
import { Separator } from "@/app/projects/components/ui/separator";
import ColorWheel from "@/app/projects/components/shared/color-wheel";
import ProductVariantSelector from "./variant-selector";
import SizeSelector from "./size-selector";
import ProductAssurancePolicy from "./assurance-policy";
import { ProductVariantImage } from "@prisma/client";
import ProductWatch from "./product-watch";

interface Props {
  productData: ProductPageDataType;
  quantity?: number;
  sizeId: string | undefined;
  handleChange: (property: keyof CartProductType, value: any) => void;
  setVariantImages: Dispatch<SetStateAction<ProductVariantImage[]>>;
  setActiveImage: Dispatch<SetStateAction<ProductVariantImage | null>>;
}

const ProductInfo: FC<Props> = ({
  productData,
  quantity,
  sizeId,
  handleChange,
  setVariantImages,
  setActiveImage,
}) => {
  const [currentRating, setCurrentRating] = useState(productData?.rating ?? 0);

  if (!productData) return null;

  const {
    productId,
    name,
    sku,
    colors,
    variantInfo,
    sizes,
    isSale,
    saleEndDate,
    variantName,
    variantId,
    store,
    rating,
    reviewsStatistics,
  } = productData;

  const { totalReviews } = reviewsStatistics;

  const copySkuToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sku);
      toast.success("Copy!");
    } catch (error) {
      toast.error("Not copied!");
    }
  };

  // Kullanıcı yıldızlara tıklayınca çalışır
  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
    toast.success(`Rating: ${newRating}`);
    // TODO: İsteğe bağlı olarak backend'e gönderilebilir
  };

  return (
    <div className="relative w-full xl:w-[540px]">
      <div>
        <h1 className="inline font-bold leading-5 text-main-primary">
          {name} {variantName}
        </h1>
      </div>

      <div className="mt-2 flex items-center text-xs">
        <Link
          href={`/store/${store.url}`}
          className="mr-2 hidden hover:underline sm:inline-block md:hidden lg:inline-block"
        >
          <div className="flex w-full items-center gap-x-1">
            <Image
              src={store.logo}
              alt={store.name}
              width={100}
              height={100}
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        </Link>

        <div className="whitespace-nowrap">
          <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-500">
            SKU: {sku}
          </span>
          <span
            onClick={copySkuToClipboard}
            className="mx-1 inline-block cursor-pointer align-middle text-[#2F68A8]"
          >
            <CopyIcon />
          </span>
        </div>

        <div className="ml-4 flex flex-1 items-center gap-x-2 whitespace-nowrap">
          <StarRatings
            rating={currentRating}
            starRatedColor="#FFD804"
            starEmptyColor="#F5F5F5"
            numberOfStars={5}
            name="rating"
            starDimension="16px"
            starSpacing="2px"
            isAggregateRating={false} // Kullanıcı puanı
          />
          <Link href="#reviews" className="text-[#ffd804] hover:underline">
            (
            {totalReviews === 0
              ? "No reviews"
              : totalReviews === 1
                ? "1 review"
                : `${totalReviews} reviews`}
            )
          </Link>
        </div>
      </div>
      <div className="relative my-2 flex flex-col justify-between sm:flex-row">
        <ProductPrice
          sizeId={sizeId}
          sizes={sizes}
          handleChange={handleChange}
        />
        {isSale && saleEndDate && (
          <div className="mt-4 pb-2">
            <Countdown targetDate={saleEndDate} />
          </div>
        )}
      </div>

      {<ProductWatch productId={variantId} />}

      <Separator className="mt-2" />

      <div className="mt-4 space-y-2">
        <div className="relative flex items-center justify-between font-bold text-main-primary">
          <span className="flex items-center gap-x-2">
            {colors.length > 1 ? "Colors" : "Color"}
            <ColorWheel colors={colors} size={25} />
          </span>
        </div>
        <div className="mt-4">
          {variantInfo.length > 0 && (
            <ProductVariantSelector
              variants={variantInfo}
              slug={productData.variantSlug}
              setVariantImages={setVariantImages}
              setActiveImage={setActiveImage}
            />
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 pb-2">
        <div>
          <h1 className="font-bold text-main-primary">Size</h1>
        </div>
        <SizeSelector
          sizes={sizes}
          sizeId={sizeId}
          handleChange={handleChange}
        />
      </div>

      <Separator className="mt-3" />
      <ProductAssurancePolicy />
    </div>
  );
};

export default ProductInfo;
