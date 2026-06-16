import { useCartStore } from "@/app/cart-store/useCartStore";
import { CartProductType, Country } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { addToWishlist } from "@/app/queries/user";
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Trash,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";

interface Props {
  product: CartProductType;
  selectedItems: CartProductType[];
  setSelectedItems: Dispatch<SetStateAction<CartProductType[]>>;
  setTotalShipping: Dispatch<SetStateAction<number>>;
  userCountry: Country;
}

const CartProduct: FC<Props> = ({
  product,
  selectedItems,
  setSelectedItems,
  setTotalShipping,
  userCountry,
}) => {
  const {
    productId,
    variantId,
    productSlug,
    variantSlug,
    name,
    variantName,
    sizeId,
    image,
    price,
    quantity,
    stock,
    size,
    weight,
    shippingMethod,
    shippingService,
    shippingFee,
    extraShippingFee,
  } = product;

  // Store previous values to avoid unnecessary re-renders
  const prevShippingFeeRef = useRef(shippingFee);
  const prevUserCountryRef = useRef(userCountry);

  const unique_id = `${productId}-${variantId}-${sizeId}`;

  const totalPrice = price * quantity;

  const [shippingInfo, setShippingInfo] = useState({
    initialFee: 0,
    extraFee: 0,
    totalFee: 0,
    method: shippingMethod,
    weight: weight,
    shippingService: shippingService,
  });

  // Function to calculate shipping fee
  const calculateShipping = (newQty?: number) => {
    let initialFee = 0;
    let extraFee = 0;
    let totalFee = 0;

    const quantityToUse = newQty !== undefined ? newQty : quantity; // Use newQty if passed, else fallback to current quantity

    if (shippingMethod === "ITEM") {
      initialFee = shippingFee;
      extraFee = quantityToUse > 1 ? extraShippingFee * (quantityToUse - 1) : 0;
      totalFee = initialFee + extraFee;
    } else if (shippingMethod === "WEIGHT") {
      totalFee = shippingFee * weight * quantityToUse;
    } else if (shippingMethod === "FIXED") {
      totalFee = shippingFee;
    }

    // Subtract the previous shipping total for this product before updating
    // if (stock > 0) {
    //   setTotalShipping(
    //     (prevTotal) => prevTotal - shippingInfo.totalFee + totalFee,
    //   );
    // }

    if (stock > 0) {
      setTotalShipping(totalFee);
    }

    // Update state
    setShippingInfo({
      initialFee,
      extraFee,
      totalFee,
      method: shippingMethod,
      weight,
      shippingService,
    });
  };

  // Recalculate shipping fees whenever quantity, country or fees changes
  useEffect(() => {
    if (
      shippingFee !== prevShippingFeeRef.current ||
      userCountry !== prevUserCountryRef.current
    ) {
      calculateShipping();
    }

    // Update refs after calculating shipping
    prevShippingFeeRef.current = shippingFee;
    prevUserCountryRef.current = userCountry;

    // Add a check to recalculate shipping fee on component load (after a refresh)
    if (!shippingInfo.totalFee) {
      calculateShipping();
    }
  }, [quantity, shippingFee, userCountry, shippingInfo.totalFee, stock]);

  const selected = selectedItems.find(
    (p) => unique_id === `${p.productId}-${p.variantId}-${p.sizeId}`,
  );

  const { updateProductQuantity, removeFromCart } = useCartStore(
    (state) => state,
  );

  const handleSelectProduct = () => {
    setSelectedItems((prev) => {
      const exists = prev.some(
        (item) =>
          item.productId === product.productId &&
          item.variantId === product.variantId &&
          item.sizeId === product.sizeId,
      );
      return exists
        ? prev.filter((item) => item !== product) // Remove if exists
        : [...prev, product]; // Add if not exists
    });
  };

  const updateProductQuantityHandler = (type: "add" | "remove") => {
    if (type === "add" && quantity < stock) {
      // Increase quantity by 1 but ensure it doesn't exceed stock
      updateProductQuantity(product, quantity + 1);
      calculateShipping(quantity + 1);
    } else if (type === "remove" && quantity > 1) {
      // Decrease quantity by 1 but ensure it doesn't go below 1
      updateProductQuantity(product, quantity - 1);
      calculateShipping(quantity - 1);
    }
  };

  // Handle add product to wishlist
  const handleaddToWishlist = async () => {
    try {
      const res = await addToWishlist(productId, variantId, sizeId);
      if (res) toast.success("Product successfully added to wishlist.");
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <div
      className={cn("bordet-t-[#ebebeb] select-none border-t bg-white px-6", {
        "bg-red-100": stock === 0,
      })}
    >
      <div className="py-4">
        <div className="relative flex self-start">
          {/* Image */}
          <div className="flex items-center">
            {stock > 0 && (
              <label
                htmlFor={unique_id}
                className="mr-2 inline-flex cursor-pointer items-center p-0 align-middle text-sm leading-6 text-gray-900"
              >
                <span className="inline-flex cursor-pointer p-0.5 leading-8">
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white leading-8 hover:border-orange-background",
                      {
                        "border-orange-background": selected,
                      },
                    )}
                  >
                    {selected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-background">
                        <Check className="mt-0.5 w-3.5 text-white" />
                      </span>
                    )}
                  </span>
                </span>
                <input
                  type="checkbox"
                  id={unique_id}
                  hidden
                  onChange={() => handleSelectProduct()}
                />
              </label>
            )}
            <Link href={`/home/shop/product/${productSlug}?variant=${variantSlug}`}>
              <div className="relative m-0 ml-2 mr-4 h-28 w-28 rounded-lg bg-gray-200">
                <Image
                  src={image}
                  alt={name}
                  height={200}
                  width={200}
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
                href={`/home/shop/product/${productSlug}?variant=${variantSlug}`}
                className="inline-block overflow-hidden overflow-ellipsis whitespace-nowrap text-sm"
              >
                {name} · {variantName}
              </Link>
              <div className="absolute right-0 top-0">
                <span
                  className="mr-2.5 inline-block cursor-pointer"
                  onClick={() => handleaddToWishlist()}
                >
                  <Heart className="w-4 hover:stroke-orange-seconadry" />
                </span>
                <span
                  className="inline-block cursor-pointer"
                  onClick={() => removeFromCart(product)}
                >
                  <Trash className="w-4 hover:stroke-orange-seconadry" />
                </span>
              </div>
            </div>
            {/* Style - size */}
            <div className="my-1">
              <button className="relative h-[24px] max-w-full cursor-pointer whitespace-normal rounded-xl bg-gray-100 px-2.5 py-0 text-xs font-bold leading-4 text-main-primary outline-0">
                <span className="flex flex-wrap items-center justify-between">
                  <div className="inline-block max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap text-left">
                    {size}
                  </div>
                  <span className="ml-0.5">
                    <ChevronRight className="w-3" />
                  </span>
                </span>
              </button>
            </div>
            {/* Price - Delivery */}
            <div className="relative mt-2 flex flex-col gap-y-2 sm:flex-row sm:items-center sm:justify-between">
              {stock > 0 ? (
                <div>
                  <span className="inline-block break-all">
                    ${price.toFixed(2)} x {quantity} = ${totalPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="inline-block break-all text-sm text-red-500">
                    Out of stock
                  </span>
                </div>
              )}
              {/* Quantity changer */}
              <div className="text-xs">
                <div className="inline-flex list-none items-center text-sm leading-6 text-gray-900">
                  <div
                    className="grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-gray-100 text-xs leading-6 hover:bg-gray-200"
                    onClick={() => updateProductQuantityHandler("remove")}
                  >
                    <Minus className="w-3 stroke-[#555]" />
                  </div>
                  <input
                    type="text"
                    value={quantity}
                    min={1}
                    max={stock}
                    className="m-1 h-6 w-[32px] border-none bg-transparent text-center font-bold leading-6 tracking-normal text-gray-900 outline-none"
                  />
                  <div
                    className="grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-gray-100 text-xs leading-6 hover:bg-gray-200"
                    onClick={() => updateProductQuantityHandler("add")}
                  >
                    <Plus className="w-3 stroke-[#555]" />
                  </div>
                </div>
              </div>
            </div>
            {/* Shipping info */}
            {stock > 0 && (
              <div className="mt-1 cursor-pointer text-xs text-[#999]">
                <div className="mb-1 flex items-center">
                  <span>
                    <Truck className="inline-block w-4 text-[#01A971]" />
                    {shippingInfo.totalFee > 0 ? (
                      <span className="ml-1 text-[#01A971]">
                        {shippingMethod === "ITEM" ? (
                          <>
                            ${shippingInfo.initialFee} (first item)
                            {quantity > 1
                              ? `+ 
                              ${quantity - 1} item(s) x $${extraShippingFee} 
                              (additional items)`
                              : " x 1"}
                            = ${shippingInfo.totalFee.toFixed(2)}
                          </>
                        ) : shippingMethod === "WEIGHT" ? (
                          <>
                            ${shippingFee} x {shippingInfo.weight}kg x&nbsp;
                            {quantity} {quantity > 1 ? "items" : "item"} = $
                            {shippingInfo.totalFee.toFixed(2)}
                          </>
                        ) : (
                          <>Fixed Fee : ${shippingInfo.totalFee.toFixed(2)}</>
                        )}
                      </span>
                    ) : (
                      <span className="ml-1 text-[#01A971]">Free Delivery</span>
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
