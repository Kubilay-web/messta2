"use client";
import { FiltersQueryType, ProductType } from "@/app/lib/types";
import { getProducts } from "@/app/queries/product";
import { useEffect, useState } from "react";
import ProductCard from "../cards/product/product-card";
import ProductPageStoreProductsSkeletonLoader from "../skeletons/product-page/store-products";

export default function StoreProducts({
  searchParams,
  store,
}: {
  searchParams: FiltersQueryType;
  store: string;
}) {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { category, offer, search, size, sort, subCategory } = searchParams;

  useEffect(() => {
    const getFilteredProducts = async () => {
      setLoading(true);
      const { products } = await getProducts(
        {
          category,
          offer,
          search,
          size: Array.isArray(size) ? size : size ? [size] : undefined,
          subCategory,
          store,
        },
        sort,
        1,
        100,
      );
      setData(products);
      setLoading(false);
    };
    getFilteredProducts();
  }, [searchParams]);
  return (
    <>
      {loading ? (
        <div className="p-4">
          <ProductPageStoreProductsSkeletonLoader />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center rounded-md bg-white p-2 pb-16 md:justify-start">
          {data.map((product) => (
            <ProductCard key={product.id + product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
