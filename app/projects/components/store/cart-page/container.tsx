"use client";

import { useCartStore } from "@/app/cart-store/useCartStore";
import useFromStore from "@/app/hooks/useFromStore";
import { CartProductType } from "@/app/lib/types";
import { Country } from "@prisma/client";
import React, { useEffect, useState } from "react";
import CartHeader from "./cart-header";
import CartProduct from "../cards/cart-product";
import CartSummary from "./summary";
import FastDelivery from "../cards/product/fast-delivery";
import { SecurityPrivacyCard } from "../product-page/returns-security-privacy-card";
import EmptyCart from "./empty-cart";
import Header from "../layout/header/header";
import { updateCartWithLatest } from "@/app/queries/user";
import CountryNote from "./country-note";

export default function CartContainer({
  userCountry,
}: {
  userCountry: Country;
}) {
  const cartItems = useFromStore(useCartStore, (state) => state.cart);
  const setCart = useCartStore((state) => state.setCart);

  const [loading, setLoading] = useState<boolean>(true);
  const [isCartLoaded, setIsCartLoaded] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<CartProductType[]>([]);
  const [totalShipping, setTotalShipping] = useState<number>(0);

  useEffect(() => {
    if (cartItems !== undefined) {
      setIsCartLoaded(true);
    }
  }, [cartItems]);

  useEffect(() => {
    const loadAndSyncCart = async () => {
      if (cartItems?.length) {
        try {
          const updatedCart = await updateCartWithLatest(cartItems);
          console.log("updatedCart---->", updatedCart);
          setCart(updatedCart);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Failed to sync cart:", error);
        }
      }
    };

    loadAndSyncCart();
  }, [isCartLoaded, userCountry]);

  return (
    <div>
      {cartItems && cartItems.length > 0 ? (
        <>
          {loading ? (
            // Loading Spinner
            <div className="flex items-center justify-center min-h-[calc(100vh-125px)] bg-gray-100">
              <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-16 h-16"></div>
            </div>
          ) : (
            <div className="min-h-[calc(100vh-125px)] bg-[#f5f5f5]">
              <div className="mx-auto flex max-w-[1200px] py-6">
                <div className="min-w-0 flex-1">
                  <CartHeader
                    cartItems={cartItems}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                  <div className="my-2">
                    <CountryNote country={userCountry.name} />
                  </div>
                  <div className="mt-2 h-auto overflow-auto overflow-x-hidden">
                    {cartItems.map((product) => (
                      <CartProduct
                        key={`${product.productId}-${product.variantId}-${product.sizeId}`}
                        product={product}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        setTotalShipping={setTotalShipping}
                        userCountry={userCountry}
                      />
                    ))}
                  </div>
                </div>
                <div className="sticky top-4 ml-5 max-h-max w-[380px]">
                  <CartSummary
                    cartItems={cartItems}
                    shippingFees={totalShipping}
                  />
                  <div className="mt-2 bg-white p-4 px-6">
                    <FastDelivery />
                  </div>
                  <div className="mt-2 bg-white p-4 px-6">
                    <SecurityPrivacyCard />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
