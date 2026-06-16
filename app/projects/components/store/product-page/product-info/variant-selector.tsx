"use client";
import {
  CartProductType,
  ProductVariantDataType,
  VariantInfoType,
} from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { ProductVariantImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  variants: VariantInfoType[];
  slug: string;
  setVariantImages: Dispatch<SetStateAction<ProductVariantImage[]>>;
  setActiveImage: Dispatch<SetStateAction<ProductVariantImage | null>>;
}

const ProductVariantSelector: FC<Props> = ({
  variants,
  slug,
  setVariantImages,
  setActiveImage,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant, i) => (
        <Link href={variant.variantUrl} key={i}>
          <div
            key={i}
            // onMouseEnter={() => {
            //   setVariantImages(variant.images);
            //   setActiveImage(variant.images[0]);
            // }}
            // onMouseLeave={() => {
            //   setVariantImages([]);
            //   setActiveImage(null);
            // }}
          >
            <div
              className={cn(
                "grid h-12 max-h-12 w-12 cursor-pointer place-items-center overflow-hidden rounded-full outline-dashed outline-[1px] outline-offset-2 outline-transparent transition-all duration-75 ease-in hover:outline-main-primary",
                {
                  "outline-main-primary": slug
                    ? slug === variant.variantSlug
                    : i == 0,
                },
              )}
            >
              <Image
                src={variant.variantImage}
                alt={`product variant `}
                width={60}
                height={60}
                className="h-12 w-12 rounded-full object-cover object-center"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductVariantSelector;
