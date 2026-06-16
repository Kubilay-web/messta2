import { ProductType, VariantSimplified } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StarRatings from "react-star-ratings";

export default function ProductCardClean({
  product,
}: {
  product: ProductType;
}) {
  const [variant, setVariant] = useState<VariantSimplified>(
    product.variants[0],
  );

  const size = variant.sizes.reduce((lowest, current) => {
    const currentPriceAfterDiscount =
      current.price * (1 - current.discount / 100);
    const lowestPriceAfterDiscount = lowest.price * (1 - lowest.discount / 100);

    return currentPriceAfterDiscount < lowestPriceAfterDiscount
      ? current
      : lowest;
  });
  const numReviews = new Intl.NumberFormat().format(product.numReviews);
  return (
    <Link href={`/home/shop/product/${product.slug}?variant=${variant.variantSlug}`}>
      <div className="card">
        <div className="image-container">
          <Image src={variant.images[0].url} alt="" width={300} height={300} />
          <div className="price">${size.price}</div>
        </div>
        <div className="flex align-center flex-col">
          <div className="brand line-clamp-1">{variant.variantName}</div>
          <div className="product-name line-clamp-1">{product.name}</div>
          <div className="color-size-container">
            <div className="">
              <ul className="flex items-center gap-x-0.5">
                {product.variantImages.map((img, i) => (
                  <li
                    key={i}
                    className=""
                    onMouseEnter={() => setVariant(product.variants[i])}
                  >
                    <Image
                      src={img.image}
                      alt=""
                      width={50}
                      height={50}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rating h-4">
            <StarRatings
              rating={product.rating}
              starRatedColor="#FFD804"
              starEmptyColor="#e2dfdf"
              starHoverColor="#FFD804"
              numberOfStars={5}
              name="rating"
              starDimension="12px"
              starSpacing="2px"
            />
            ({numReviews})
          </div>
        </div>
      </div>
    </Link>
  );
}
