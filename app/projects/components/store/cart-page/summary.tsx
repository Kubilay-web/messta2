import { CartProductType, CartWithCartItemsType } from "@/app/lib/types";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveUserCart } from "@/app/queries/user";
import { PulseLoader } from "react-spinners";

interface Props {
  cartItems: CartProductType[];
  shippingFees: number;
}

const CartSummary: FC<Props> = ({ cartItems, shippingFees }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  // Calculate subtotal from cartItems
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Calculate total price including shipping fees
  const total = subtotal + shippingFees;

  const handleSaveCart = async () => {
    try {
      setLoading(true);
      const res = await saveUserCart(cartItems);
      console.log("res-->", res);
      if (res) router.push("/shop/checkout");
      setLoading(false);
    } catch (error: any) {
      toast.error(error.toString());
    }
  };
  return (
    <div className="relative bg-white px-6 py-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Summary</h1>
      <div className="mt-4 flex items-center border-b pb-1 text-sm font-medium text-[#222]">
        <h2 className="overflow-hidden text-[22px] text-ellipsis whitespace-nowrap break-normal">
          Subtotal
        </h2>
        <h3 className="w-0 min-w-0 flex-1 text-right">
          <span className="px-0.5 text-black">
            <div className="inline-block break-all text-lg text-black">
              ${subtotal.toFixed(2)}
            </div>
          </span>
        </h3>
      </div>
      <div className="mt-2 flex items-center border-b pb-1 text-sm font-medium text-[#222]">
        <h2 className="overflow-hidden text-[22px] text-ellipsis whitespace-nowrap break-normal">
          Shipping Fees
        </h2>
        <h3 className="w-0 min-w-0 flex-1 text-right">
          <span className="px-0.5 text-black">
            <div className="inline-block break-all text-lg text-black">
              +${shippingFees.toFixed(2)}
            </div>
          </span>
        </h3>
      </div>
      <div className="mt-2 flex items-center border-b pb-1 text-sm font-medium text-[#222]">
        <h2 className="overflow-hidden text-[22px] text-ellipsis whitespace-nowrap break-normal">
          Taxes
        </h2>
        <h3 className="w-0 min-w-0 flex-1 text-right">
          <span className="px-0.5 text-black">
            <div className="inline-block break-all text-lg text-black">
              +$0.00
            </div>
          </span>
        </h3>
      </div>
      <div className="mt-2 flex items-center text-sm font-bold text-[#222]">
        <h2 className="overflow-hidden text-[22px] text-ellipsis whitespace-nowrap break-normal">
          Total
        </h2>
        <h3 className="w-0 min-w-0 flex-1 text-right">
          <span className="px-0.5 text-black">
            <div className="inline-block break-all text-lg text-black">
              ${total.toFixed(2)}
            </div>
          </span>
        </h3>
      </div>
      <div className="5 my-2">
        <Button onClick={() => handleSaveCart()}>
          {loading ? (
           <PulseLoader size={5} color="#6b7280" />
          ) : (
            <span className="text-red-600">Checkout ({cartItems.length})</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
