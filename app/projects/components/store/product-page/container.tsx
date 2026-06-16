"use client";

import { CartProductType, ProductPageDataType } from "@/app/lib/types";
import { ReactNode, FC, useState, useEffect, useMemo } from "react";
import ProductSwiper from "./product-swiper";
import ProductInfo from "./product-info/product-info";
import ShipTo from "./shipping/ship-to";
import ShippingDetails from "./shipping/shipping-details";
import ReturnPrivacySecurityCard from "./returns-security-privacy-card";
import { isProductValidToAdd, updateProductHistory } from "@/app/lib/utils";
import QuantitySelector from "./quantity-selector";
import SocialShare from "../shared/social-share";
import { ProductVariantImage } from "@prisma/client";
import { useCartStore } from "@/app/cart-store/useCartStore";
import { useToast } from "@/app/projects/components/ui/use-toast";
import useFromStore from "@/app/hooks/useFromStore";
import { setCookie } from "cookies-next";

interface Props {
  productData: ProductPageDataType;
  sizeId: string | undefined;
  children: ReactNode;
}

const ProductPageContainer: FC<Props> = ({ productData, sizeId, children }) => {
  if (!productData) return null;

  const { images, shippingDetails, sizes, productId, variantId, variantSlug } =
    productData;

  if (typeof shippingDetails === "boolean") return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toast } = useToast();

  const [variantImages, setVariantImages] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<ProductVariantImage[]>(images);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeImage, setActiveImage] = useState<ProductVariantImage | null>(
    images[0],
  );

  // Initialize the default product data for the cart item
  const data: CartProductType = {
    productId: productData.productId,
    variantId: productData.variantId,
    productSlug: productData.productSlug,
    variantSlug: productData.variantSlug,
    name: productData.name,
    variantName: productData.variantName,
    image: productData.images[0].url,
    variantImage: productData.variantImage,
    quantity: 1,
    price: 0,
    sizeId: sizeId || "",
    size: "",
    stock: 1,
    weight: productData.weight || 0,
    shippingMethod: shippingDetails.shippingFeeMethod,
    shippingService: shippingDetails.shippingService,
    shippingFee: shippingDetails.shippingFee,
    extraShippingFee: shippingDetails.extraShippingFee,
    deliveryTimeMin: shippingDetails.deliveryTimeMin,
    deliveryTimeMax: shippingDetails.deliveryTimeMax,
    isFreeShipping: shippingDetails.isFreeShipping,
  };

  const [productToBeAddedToCart, setProductToBeAddedToCart] =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState<CartProductType>(data);

  const { stock } = productToBeAddedToCart;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isProductValid, setIsProductValid] = useState<boolean>(false);

  const handleChange = (property: keyof CartProductType, value: any) => {
    setProductToBeAddedToCart((prevProduct) => ({
      ...prevProduct,
      [property]: value,
    }));
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const check = isProductValidToAdd(productToBeAddedToCart);
    if (check !== isProductValid) {
      setIsProductValid(check);
    }
  }, [productToBeAddedToCart]);

  console.log(
    "productToBeAddedToCart---->>>",
    productToBeAddedToCart.stock,
    productToBeAddedToCart.quantity,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addToCart = useCartStore((state) => state.addToCart);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cartItems = useFromStore(useCartStore, (state) => state.cart);
  console.log("cart items -->>", cartItems);

  const handleAddToCart = () => {
    if (maxQty <= 0) return;
    addToCart(productToBeAddedToCart);
    toast({
      description: "Product add to cart.",
    });
  };

  updateProductHistory(variantId);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const maxQty = useMemo(() => {
    const search_product = cartItems?.find(
      (p) =>
        p.productId === productId &&
        p.variantId === variantId &&
        p.sizeId === sizeId,
    );
    return search_product
      ? search_product.stock - search_product.quantity
      : stock;
  }, [cartItems, productId, variantId, sizeId, stock]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addCart = useCartStore((state) => state.addToCart);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setCart = useCartStore((state) => state.setCart);

  // Keeping cart state updated
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the "cart" key was changed in localStorage
      if (event.key === "cart") {
        try {
          const parsedValue = event.newValue
            ? JSON.parse(event.newValue)
            : null;

          // Check if parsedValue and state are valid and then update the cart
          if (
            parsedValue &&
            parsedValue.state &&
            Array.isArray(parsedValue.state.cart)
          ) {
            setCart(parsedValue.state.cart);
          }
        } catch (error) {}
      }
    };

    // Attach the event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  setCookie(`viewedProduct_${productId}`, "true", {
    maxAge: 3600,
    path: "/",
  });

  return (
    <div className="relative">
      <div className="w-full xl:flex xl:gap-4">
        <ProductSwiper
          images={variantImages.length > 0 ? variantImages : images}
          activeImage={activeImage || images[0]}
          setActiveImage={setActiveImage}
        />
        <div className="mt-4 flex w-full flex-col gap-4 md:mt-0 md:flex-row">
          <ProductInfo
            productData={productData}
            sizeId={sizeId}
            handleChange={handleChange}
            setVariantImages={setVariantImages}
            setActiveImage={setActiveImage}
          />

          <div className="w-[390px]">
            <div className="z-20">
              <div className="overflow-hidden overflow-y-auto rounded-md border bg-white p-4 pb-0">
                {typeof shippingDetails !== "boolean" && (
                  <>
                    <ShipTo
                      countryCode={shippingDetails.countryCode}
                      countryName={shippingDetails.countryName}
                      city={shippingDetails.city}
                    />
                    <div className="mt-3 space-y-3">
                      <ShippingDetails
                        shippingDetails={shippingDetails}
                        quantity={1}
                        weight={productData.weight}
                        loading={false}
                        countryName={shippingDetails.countryName}
                      />
                    </div>
                    <ReturnPrivacySecurityCard
                      returnPolicy={shippingDetails.returnPolicy}
                      loading={false}
                    />
                  </>
                )}
                <div className="sticky bottom-0 mt-5 space-y-3 bg-white pb-4">
                  {sizeId && (
                    <div className="mt-4 flex w-full justify-end">
                      <QuantitySelector
                        productId={productToBeAddedToCart.productId}
                        variantId={productToBeAddedToCart.variantId}
                        sizeId={productToBeAddedToCart.sizeId}
                        quantity={productToBeAddedToCart.quantity}
                        stock={productToBeAddedToCart.stock}
                        handleChange={handleChange}
                        sizes={sizes}
                      />
                    </div>
                  )}

                  <button className="ease-bezier-1 relative inline-block h-11 w-full min-w-20 cursor-pointer select-none whitespace-nowrap rounded-3xl border border-orange-border bg-orange-background py-2.5 font-bold leading-6 text-white transition-all duration-300 hover:bg-orange-hover">
                    <span>Buy now</span>
                  </button>

                  <button
                    disabled={!isProductValid || maxQty <= 0}
                    onClick={handleAddToCart}
                    className={`ease-bezier-1 relative inline-block h-11 w-full min-w-20 cursor-pointer select-none whitespace-nowrap rounded-3xl border border-orange-border bg-orange-border py-2.5 font-bold leading-6 text-orange-hover transition-all duration-300 hover:bg-[#e4cdce] ${!isProductValid || maxQty <= 0 ? "cursor-not-allowed" : ""}`}
                  >
                    <span>Add to cart</span>
                  </button>

                  <SocialShare
                    url={`/home/shop/product/${productData.productSlug}/${productData.variantSlug}`}
                    quote={`${productData.name} . ${productData.variantName}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 w-[calc(100%-390px)] pb-16">{children}</div>
    </div>
  );
};

export default ProductPageContainer;
