import { CartProductType } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { FC, useEffect, useState } from "react";

interface SimplifiedSize {
  id: string;
  size: string;
  quantity: number;
  price: number;
  discount: number;
}

interface Props {
  sizeId?: string | undefined;
  sizes: SimplifiedSize[];
  isCard?: boolean;
  handleChange?: (property: keyof CartProductType, value: any) => void;
  weight?: number;
}

const ProductPrice: FC<Props> = ({
  sizeId,
  sizes,
  isCard,
  handleChange,
  weight,
}) => {
  const [selectedSize, setSelectedSize] = useState<SimplifiedSize | undefined>(
    undefined,
  );

  useEffect(() => {
    if (sizes && sizes.length > 0) {
      if (sizeId) {
        const foundSize = sizes.find((size) => size.id === sizeId);
        if (foundSize) {
          setSelectedSize(foundSize);
          const discountedPrice =
            foundSize.price * (1 - foundSize.discount / 100);
          handleChange("price", discountedPrice);
          handleChange("stock", foundSize.quantity);
        }
      }
    }
  }, [sizeId, sizes]);

  // If no sizeId passed, calculate range of prices and total quantity
  if (!sizeId && sizes && sizes.length > 0) {
    const discountedPrices = sizes.map(
      (size) => size.price * (1 - size.discount / 100),
    );

    const totalQuantity = sizes.reduce(
      (total, size) => total + size.quantity,
      0,
    );

    const minPrice = Math.min(...discountedPrices).toFixed(2);
    const maxPrice = Math.max(...discountedPrices).toFixed(2);

    const priceDisplay =
      minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

    return (
      <div>
        <div className="mr-2.5 inline-block font-bold leading-none text-orange-primary">
          <span
            className={cn("inline-block text-nowrap text-4xl", {
              "text-lg": isCard,
            })}
          >
            {priceDisplay}
          </span>
        </div>
        {!sizeId && !isCard && (
          <div className="mt-1 text-xs leading-4 text-orange-background">
            <span>Note : Select a size to see the exact price</span>
          </div>
        )}
        {!sizeId && !isCard && (
          <p className="mt-2 text-xs">{totalQuantity} pieces</p>
        )}
      </div>
    );
  }

  // If sizeId passed, show specific size price and quantity
  if (selectedSize) {
    const discountedPrice =
      selectedSize.price * (1 - selectedSize.discount / 100);

    return (
      <div>
        <div className="mr-2.5 inline-block font-bold leading-none text-orange-primary">
          <span className="inline-block text-4xl">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
        {selectedSize.price !== discountedPrice && (
          <span className="mr-2 inline-block text-xl font-normal leading-6 text-[#999] line-through">
            ${selectedSize.price.toFixed(2)}
          </span>
        )}
        {selectedSize.discount > 0 && (
          <span className="inline-block text-xl leading-6 text-orange-seconadry">
            {selectedSize.discount}% off
          </span>
        )}
        <p className="mt-2 text-xs">
          {weight && <span>{weight}kg - </span>}
          {selectedSize.quantity > 0 ? (
            `${selectedSize.quantity} items`
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </p>
      </div>
    );
  }

  return null; // Return nothing if no valid sizeId
};

export default ProductPrice;
