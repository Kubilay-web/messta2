import { CartItem } from "@prisma/client";
import { ChevronRight, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutProductCard({
  product,
  isDiscounted,
}: {
  product: CartItem;
  isDiscounted: boolean;
}) {
  const { productSlug, variantSlug, sizeId, shippingFee } = product;
  console.log("----->", isDiscounted);
  return (
    <div className="bordet-t-[#ebebeb] select-none border-t bg-white px-6">
      <div className="py-4">
        <div className="relative flex self-start">
          {/* Image */}
          <div className="flex items-center">
            <Link
              href={`/home/shop/product/${productSlug}/${variantSlug}?size=${sizeId}`}
            >
              <div className="relative m-0 ml-2 mr-4 h-28 w-28 rounded-lg bg-gray-200">
                <Image
                  src={product.image}
                  width={200}
                  height={200}
                  alt=""
                  className="h-full w-full rounded-md object-cover"
                />
              </div>
            </Link>
          </div>
          {/* Info */}
          <div className="w-0 min-w-0 flex-1">
            {/* Title - Actions */}
            <div className="flex w-[calc(100%-48px)] items-start overflow-hidden whitespace-nowrap">
              <Link
                href={`/home/shop/product/${productSlug}/${variantSlug}?size=${sizeId}`}
                className="inline-block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
              >
                {product.name}
              </Link>
            </div>
            {/* Style - Size */}
            <div className="my-1">
              <button className="relative h-[24px] max-w-full cursor-pointer whitespace-normal rounded-xl bg-gray-100 px-2.5 py-0 text-xs font-bold leading-4 text-main-primary outline-0">
                <span className="flex flex-wrap items-center justify-between">
                  <div className="inline-block max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-left">
                    {product.size}
                  </div>
                  <span className="ml-0.5">
                    <ChevronRight className="w-3" />
                  </span>
                </span>
              </button>
            </div>
            {/* Price - Delievery */}
            <div className="relative mt-2 flex flex-col justify-between">
              {/* Price - Qty */}
              <div className="flex w-full items-start justify-between font-bold">
                <div className="flex items-center gap-x-2">
                  <span className="inline-block break-all">
                    ${product.price.toFixed(2)} x {product.quantity}
                  </span>
                  {isDiscounted && (
                    <span className="text-xs font-normal text-orange-background">
                      (Coupon applied)
                    </span>
                  )}
                </div>
              </div>
              {/* Shipping fee */}

              <div className="mt-1 cursor-pointer text-xs">
                <div className="mb-1 flex items-center">
                  <span>
                    <Truck className="inline-block w-4 text-[#01a971]" />
                    <span className="ml-1 text-[#01a971]">
                      {shippingFee
                        ? `$${shippingFee.toFixed(2)}`
                        : "Free Delivery"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
