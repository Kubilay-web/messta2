import PaymentStatusTag from "@/app/projects/components/shared/payment-status";
import {
  OrderStatus,
  PaymentStatus,
  ProductStatus,
  StoreOrderType,
  UserShippingAddressType,
} from "@/app/lib/types";
import { getShippingDatesRange } from "@/app/lib/utils";
import { PaymentDetails } from "@prisma/client";
import { FC } from "react";
import OrderStatusSelect from "../forms/order-status-select";
import { Gruppo } from "next/font/google";
import Image from "next/image";
import ProductStatusTag from "@/app/projects/components/shared/product-status";
import ProductStatusSelect from "../forms/product-status-select";

interface Props {
  group: StoreOrderType;
}

const StoreOrderSummary: FC<Props> = ({ group }) => {
  const paymentDetails = group.order.paymentDetails;
  const paymentStatus = group.order.paymentStatus as PaymentStatus;
  const shippingAddress = group.order.shippingAddress;

  const { minDate, maxDate } = getShippingDatesRange(
    group.shippingDeliveryMin,
    group.shippingDeliveryMax,
    group.createdAt,
  );

  const {
    address1,
    address2,
    city,
    country,
    firstName,
    lastName,
    phone,
    state,
    zip_code,
    user,
  } = shippingAddress;

  const { coupon, couponId, subTotal, total, shippingFees } = group;

  let discountedAmount = 0;
  if (couponId && coupon) {
    discountedAmount = ((subTotal + shippingFees) * coupon.discount) / 100;
  }
  return (
    <div className="relative py-2">
      <div className="w-full px-1">
        <div className="space-y-3">
          <h2 className="line-clamp-1 overflow-ellipsis text-xl font-bold leading-10">
            Order Details
          </h2>
          <h6 className="text-2xl font-semibold leading-9">#{group.id}</h6>
          <div className="flex items-center gap-x-2">
            <PaymentStatusTag status={paymentStatus} />
            <OrderStatusSelect
              storeId={group.storeId}
              groupId={group.id}
              status={group.status as OrderStatus}
            />
          </div>
        </div>
        <div className="mb-6 mt-3 grid grid-cols-1 gap-3 border-gray-100 py-4">
          {/* Shipping info */}
          <div className="grid grid-cols-2">
            <div>
              <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
                Shipping Service
              </p>
              <h6 className="text-lg font-semibold leading-9">
                {group.shippingService}
              </h6>
            </div>
            <div>
              <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
                Expected Delivery Date
              </p>
              <h6 className="text-lg font-semibold leading-9">
                {minDate} - {maxDate}
              </h6>
            </div>
          </div>
          {/* Payment info */}
          <div className="grid grid-cols-2">
            <div>
              <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
                Payment Method
              </p>
              <h6 className="text-lg font-semibold leading-9">
                {paymentDetails?.paymentMethod || "-"}
              </h6>
            </div>
            <div>
              <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
                Payment Reference
              </p>
              <h6 className="text-lg font-semibold leading-9">
                {paymentDetails?.paymentInetntId || "-"}
              </h6>
            </div>
          </div>
          {/* Address */}
          <div>
            <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
              Address
            </p>
            <h6 className="text-lg font-semibold leading-9">
              {address1}, {address2 && `${address2},`} {state}, {city},&nbsp;
              {zip_code}, {country.name}
            </h6>
          </div>
          {/* Customer */}
          <div>
            <p className="mb-3 text-base font-normal leading-7 text-gray-500 transition-all duration-500">
              Customer
            </p>
            <h6 className="text-lg font-semibold leading-9">
              {firstName} {lastName}, {phone}, {user.email}
            </h6>
          </div>
        </div>
        {/* Products */}
        {group.items.map((product, index) => (
          <div
            key={index}
            className="grid w-full gap-4 border-t border-gray-100 py-3"
            style={{ gridTemplateColumns: "144px 1.3fr 1fr" }}
          >
            {/* Product image  */}
            <div className="h-full w-full">
              <Image
                src={product.image}
                alt=""
                width={200}
                height={200}
                className="h-36 w-36 rounded-xl object-cover"
              />
            </div>
            {/* Product info  */}
            <div className="flex flex-col gap-y-1">
              <h5 className="line-clamp-1 overflow-ellipsis text-sm font-semibold leading-4">
                {product.name}
              </h5>
              <div className="text-sm">
                <p className="font-normal text-gray-500">
                  Sku : <span className="ms-1">{product.sku}</span>
                </p>
              </div>
              <div className="text-sm">
                <p className="font-normal text-gray-500">
                  Size : <span className="ms-1">{product.size}</span>
                </p>
              </div>
              <div className="text-sm">
                <p className="font-normal text-gray-500">
                  Quantity : <span className="ms-1">{product.quantity}</span>
                </p>
              </div>
              <div className="text-sm">
                <p className="font-normal text-gray-500">
                  Price :&nbsp;
                  <span className="ms-1">${product.price.toFixed(2)}</span>
                </p>
              </div>
              <div className="text-sm">
                <p className="font-normal text-gray-500">
                  Shipping Fee :{" "}
                  <span className="ms-1">
                    ${product.shippingFee.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            {/* Product status - total  */}
            <div className="flex flex-col items-center justify-center">
              <ProductStatusSelect
                orderItemId={product.id}
                storeId={group.storeId}
                status={product.status as ProductStatus}
              />
              <div className="grid place-items-center">
                <h5 className="mt-3 text-3xl font-semibold leading-10">
                  ${product.totalPrice.toFixed(2)}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreOrderSummary;
