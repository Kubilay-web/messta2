"use client";
import { ShippingDetailsType } from "@/app/lib/types";
import { ChevronDown, ChevronRight, ChevronUp, Truck } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ProductShippingFee from "./shipping-fee";
import { getShippingDatesRange } from "@/app/lib/utils";
import { BarLoader, BounceLoader, MoonLoader } from "react-spinners";

interface Props {
  shippingDetails: ShippingDetailsType | null;
  quantity: number;
  weight: number;
  loading: boolean;
  countryName: string;
}

const ShippingDetails: FC<Props> = ({
  shippingDetails,
  quantity,
  weight,
  loading,
  countryName,
}) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const [shippingTotal, setShippingTotal] = useState<number>(0);

  useEffect(() => {
    if (!shippingDetails) return; // Skip calculation if shippingDetails is null

    const { shippingFee, extraShippingFee, shippingFeeMethod } =
      shippingDetails;

    switch (shippingFeeMethod) {
      case "ITEM":
        let qty = quantity - 1; // Adjust quantity as needed
        setShippingTotal(shippingFee + qty * extraShippingFee);
        break;
      case "WEIGHT":
        setShippingTotal(shippingFee * quantity);
        break;
      case "FIXED":
        setShippingTotal(shippingFee);
        break;
      default:
        setShippingTotal(0); // Fallback for unexpected method
        break;
    }
  }, [quantity, shippingDetails]);
  console.log("qty", quantity);

  const {
    deliveryTimeMax = 0,
    deliveryTimeMin = 0,
    shippingFee = 0,
    extraShippingFee = 0,
    shippingFeeMethod = "Loading...",
    shippingService = "Loading...",
    isFreeShipping = false,
  } = shippingDetails || {}; // Default to placeholders if shippingDetails is null

  // Calculate delivery dates only if shippingDetails is available
  const { minDate, maxDate } = shippingDetails
    ? getShippingDatesRange(deliveryTimeMin, deliveryTimeMax)
    : { minDate: "Loading...", maxDate: "Loading..." };

  return (
    <div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1">
            <Truck className="w-4" />
            {shippingDetails.isFreeShipping ? (
              <span className="flex items-center text-sm font-bold">
                <span>
                  Free Shipping to&nbsp;
                  <span>
                    {loading ? <BarLoader width={100} /> : countryName}
                  </span>
                </span>
              </span>
            ) : (
              <span className="flex items-center text-sm font-bold">
                <span>Shipping to {countryName}</span>
                <span className="flex items-center">
                  &nbsp;for $&nbsp;
                  {loading ? (
                    <MoonLoader size={12} color="#e5e5e5" />
                  ) : (
                    shippingTotal
                  )}
                </span>
              </span>
            )}
          </div>
          <ChevronRight className="w-3" />
        </div>
        <span className="ml-5 flex items-center text-sm">
          Service:&nbsp;
          <strong className="text-sm">
            {loading ? (
              <BarLoader width={100} color="#e5e5e5" className="rounded-full" />
            ) : (
              shippingService
            )}
          </strong>
        </span>
        <span className="ml-5 flex items-center text-sm">
          Delivery:&nbsp;
          <strong className="text-sm">
            {loading ? (
              <BarLoader width={180} color="#e5e5e5" className="rounded-full" />
            ) : (
              `${minDate.slice(4)} - ${maxDate.slice(4)}`
            )}
          </strong>
        </span>
        {!isFreeShipping && toggle && shippingDetails && (
          <ProductShippingFee
            fee={shippingFee}
            extraFee={extraShippingFee}
            method={shippingFeeMethod}
            quantity={quantity}
            weight={weight}
          />
        )}
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="ml-4 flex h-5 max-w-[calc(100%-2rem)] cursor-pointer items-center bg-gray-100 hover:bg-gray-200"
        >
          <div className="flex w-full items-center justify-between gap-x-1 px-2">
            <span className="text-xs">
              {toggle ? "Hide" : "Shipping Fee Breakdown"}
            </span>
            {toggle ? (
              <ChevronUp className="w-4" />
            ) : (
              <ChevronDown className="w-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
