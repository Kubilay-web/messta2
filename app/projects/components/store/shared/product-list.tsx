import { ProductType } from "@/app/lib/types";
import { cn } from "@/app/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import ProductCard from "../cards/product/product-card";

interface Props {
  products: ProductType[];
  title?: string;
  link?: string;
  arrow?: boolean;
}

const ProductList: FC<Props> = ({ products, title, link, arrow }) => {
  const Title = () => {
    if (link) {
      <Link href={link} className="h-12">
        <h2 className="text-xl font-bold text-main-primary">
          {title}&nbsp;
          {arrow && <ChevronRight className="inline-block w-3" />}
        </h2>
      </Link>;
    } else {
      return (
        <h2 className="text-xl font-bold text-main-primary">
          {title}&nbsp;
          {arrow && <ChevronRight className="inline-block w-3" />}
        </h2>
      );
    }
  };
  return (
    <div className="relative">
      {title && <Title />}
      {products.length > 0 ? (
        <div
          className={cn("flex flex-wrap", {
            "mt-2": title,
          })}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        "No Products."
      )}
    </div>
  );
};

export default ProductList;
