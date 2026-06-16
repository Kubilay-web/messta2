"use client";
import OrderStatusTag from "@/app/projects/components/shared/order-status";
import { OrderGroupWithItemsType, OrderStatus } from "@/app/lib/types";
import Image from "next/image";
import React from "react";
import ProductRow from "./product-row";
import { useMediaQuery } from "react-responsive";
import ProductRowGrid from "./product-row-grid";
import { cn } from "@/app/lib/utils";

export default function OrderGroupTable({
  group,
  deliveryInfo,
  check,
}: {
  group: OrderGroupWithItemsType;
  deliveryInfo: {
    shippingService: string;
    deliveryMinDate: string;
    deliveryMaxDate: string;
  };
  check: boolean;
}) {
  const { shippingService, deliveryMaxDate, deliveryMinDate } = deliveryInfo;
  const { coupon, couponId, subTotal, total, shippingFees } = group;
  let discountedAmount = 0;
  if (couponId && coupon) {
    discountedAmount = ((subTotal + shippingFees) * coupon.discount) / 100;
  }
  const isBigScreen = useMediaQuery({ query: "(min-width: 1400px)" });

  return (
    <div className="rounded-xl border border-gray-200 pt-6 max-lg:mx-auto lg:max-w-full">
      <div className="flex flex-col justify-between border-b border-gray-200 px-6 pb-6 xl:flex-row xl:items-center">
        <div>
          <p className="text-base font-semibold leading-7 text-black">
            Order Id:
            <span className="ms-2 font-medium text-blue-primary">
              #{group.id}
            </span>
          </p>
          <div className="mt-4 flex items-center gap-x-2">
            <Image
              src={group.store.logo}
              alt={group.store.name}
              width={100}
              height={100}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-medium text-main-secondary">
              {group.store.name}
            </span>
            <div className="mx-2 h-5 w-[1px] bg-border" />
            <p>{shippingService}</p>
            <div className="mx-2 h-5 w-[1px] bg-border" />
          </div>
        </div>
        <div className="mt-4 xl:mt-10">
          <OrderStatusTag status={group.status as OrderStatus} />
        </div>
      </div>
      <div className="w-full px-3 min-[400px]:px-6">
        <div>
          {group.items.map((product, index) => (
            <>
              {isBigScreen ? (
                <ProductRowGrid key={index} product={product} />
              ) : (
                <ProductRow key={index} product={product} />
              )}
            </>
          ))}
        </div>
        <div className="flex items-center text-center max-lg:mt-3">
          <div className="flex flex-col p-2 pb-4">
            <p className="whitespace-nowrap text-sm font-medium leading-6 text-black">
              Expected Delivery Time
            </p>
            <p className="whitespace-nowrap text-base font-medium leading-7 text-emerald-500 lg:mt-3">
              {deliveryMinDate} - {deliveryMaxDate}
            </p>
          </div>
        </div>
      </div>
      {/* Group info */}
      <div
        className={cn(
          "flex w-full flex-col items-center justify-between border-t border-gray-200 px-6 2xl:flex-row",
          {
            "xl:flex-row": check,
          },
        )}
      >
        <div
          className={cn(
            "flex flex-col items-center border-gray-200 max-lg:border-b 2xl:flex-row",
            {
              "lg:flex-row": check,
            },
          )}
        >
          <button className="sm:borde-r group flex items-center justify-center gap-2 whitespace-nowrap border-gray-200 bg-white py-6 text-lg font-semibold text-black outline-0 transition-all duration-500 hover:text-blue-primary sm:pr-6">
            <svg
              className="stroke-black transition-all duration-500 group-hover:stroke-blue-primary"
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Cancel Order
          </button>
          <p className="px-6 py-3 text-lg font-medium text-gray-900 max-lg:text-center">
            Subtotal:
            <span className="ms-1 text-gray-500">
              ${group.subTotal.toFixed(2)}
            </span>
          </p>
          <p className="px-6 py-3 text-lg font-medium text-gray-900 max-lg:text-center">
            Shipping Fees:
            <span className="ms-1 text-gray-500">
              ${group.shippingFees.toFixed(2)}
            </span>
          </p>
          {group.couponId && (
            <p className="py-3 pl-6 text-lg font-medium text-gray-900 max-lg:text-center">
              Coupon ({coupon?.code})
              <span className="ms-1 text-gray-500">(-{coupon?.discount}%)</span>
              <span className="ms-1 text-gray-500">
                (-${discountedAmount.toFixed(2)})
              </span>
            </p>
          )}
        </div>
        <div>
          <p className="py-4 text-xl font-semibold text-black">
            Total price:
            <span className="ms-1 text-blue-primary">${total.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
