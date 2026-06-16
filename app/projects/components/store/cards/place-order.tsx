import { Coupon, ShippingAddress } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import FastDelivery from "./product/fast-delivery";
import { SecurityPrivacyCard } from "../product-page/returns-security-privacy-card";
import toast from "react-hot-toast";
import { emptyUserCart, placeOrder } from "@/app/queries/user";
import { useCartStore } from "@/app/cart-store/useCartStore";
import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { CartWithCartItemsType } from "@/app/lib/types";
import ApplyCouponForm from "../forms/apply-coupon";
import { PulseLoader } from "react-spinners";

interface Props {
  shippingAddress: ShippingAddress | null;
  cartData: CartWithCartItemsType;
  setCartData: Dispatch<SetStateAction<CartWithCartItemsType>>;
}

const PlaceOrderCard: FC<Props> = ({
  shippingAddress,
  setCartData,
  cartData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id, coupon, subTotal, shippingFees, total } = cartData;
  const { push } = useRouter();
  const emptyCart = useCartStore((state) => state.emptyCart);
  const handlePlaceOrder = async () => {
    setLoading(true);
    if (!shippingAddress) {
      toast.error("Select a shipping address first !");
    } else {
      const order = await placeOrder(shippingAddress, id);
      if (order) {
        emptyCart();
        await emptyUserCart();
        push(`/home/shop/order/${order.orderId}`);
      }
    }
    setLoading(false);
  };

  let discountedAmount = 0;
  const applicableStoreItems = cartData.cartItems.filter(
    (item) => item.storeId === coupon?.storeId
  );

  const storeSubTotal = applicableStoreItems.reduce(
    (acc, item) => acc + item.price * item.quantity + item.shippingFee,
    0
  );

  if (coupon) {
    discountedAmount = (storeSubTotal * coupon.discount) / 100;
  }

  return (
    <div className="sticky top-4 max-h-max lg:ml-5 lg:w-[380px]">
      <div className="relative bg-white px-6 py-4">
        <h1 className="mb-4 text-xl font-bold text-gray-900">Summary</h1>
        <Info title="Subtotal" text={`${subTotal.toFixed(2)}`} />
        <Info title="Shipping Fees" text={`+${shippingFees.toFixed(2)}`} />
        <Info title="Taxes" text="+0.00" />
        {coupon && (
          <Info
            title={`Coupon (${coupon.code}) (-${coupon.discount}%)`}
            text={`-$${discountedAmount.toFixed(2)}`}
          />
        )}
        <Info title="Total" text={`+${total.toFixed(2)}`} isBold noBorder />
      </div>
      <div className="mt-2">
        {coupon ? (
          <div className="flex bg-white">
            <svg width={16} height={96} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 8 0 
         Q 4 4.8, 8 9.6 
         T 8 19.2 
         Q 4 24, 8 28.8 
         T 8 38.4 
         Q 4 43.2, 8 48 
         T 8 57.6 
         Q 4 62.4, 8 67.2 
         T 8 76.8 
         Q 4 81.6, 8 86.4 
         T 8 96 
         L 0 96 
         L 0 0 
         Z"
                fill="#66cdaa"
                stroke="#66cdaa"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
            <div className="5 mx-2 w-full overflow-hidden">
              <p className="mr-3 mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-8 text-[#66cdaa]">
                Coupon applied !
              </p>
              <p className="max-h-10 overflow-hidden break-all leading-5 text-zinc-400">
                ({coupon.code}) ({coupon.discount}%) discount
              </p>
              <p className="overflow-hidden break-words text-sm leading-5 text-zinc-400">
                Coupon applied only to items from {coupon.store.name}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4">
            <ApplyCouponForm cartId={id} setCartData={setCartData} />
          </div>
        )}
      </div>
      <div className="mt-2 bg-white p-4">
        <Button onClick={() => handlePlaceOrder()}>
          {loading ? (
            <PulseLoader size={5} color="#6b7280" />
          ) : (
            <span className="text-red-600">Place order</span>
          )}
        </Button>
      </div>
      <div className="mt-2 bg-white p-4 px-6">
        <FastDelivery />
      </div>
      <div className="mt-2 bg-white p-4 px-6">
        <SecurityPrivacyCard />
      </div>
    </div>
  );
};

export default PlaceOrderCard;

const Info = ({
  title,
  text,
  isBold,
  noBorder,
}: {
  title: string;
  text: string;
  isBold?: boolean;
  noBorder?: boolean;
}) => {
  return (
    <div
      className={cn(
        "mt-2 flex items-center border-b pb-1 text-sm font-medium text-[#222]",
        {
          "font-bold": isBold,
          "border-b-0": noBorder,
        }
      )}
    >
      <h2 className="overflow-hidden text-[22px] text-ellipsis whitespace-nowrap break-normal">
        {title}
      </h2>
      <h3 className="w-0 min-w-0 flex-1 text-right">
        <div className="px-0.5 text-black">
          <span className="inline-block break-all text-lg text-black">
            {text}
          </span>
        </div>
      </h3>
    </div>
  );
};
