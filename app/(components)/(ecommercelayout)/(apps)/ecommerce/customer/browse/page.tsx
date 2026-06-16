"use client";  // This ensures the component is rendered on the client-side

import { useEffect, useState } from "react";
import ProductFilters from "@/app/projects/components/store/browse-page/filters";
import ProductSort from "@/app/projects/components/store/browse-page/sort";
import ProductCard from "@/app/projects/components/store/cards/product/product-card";
import Header from "@/app/projects/components/store/layout/header/header";
import { FiltersQueryType } from "@/app/lib/types";
import { getProducts } from "@/app/queries/product";
import { getFilteredSizes } from "@/app/queries/size";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<FiltersQueryType>;
}) {
  const [params, setParams] = useState<FiltersQueryType | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verileri almak için async işlemi useEffect içinde yapıyoruz
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await searchParams;
      setParams(resolvedParams);

      const {
        category,
        offer,
        search,
        size,
        sort,
        subCategory,
        maxPrice,
        minPrice,
        color,
      } = resolvedParams;

      try {
        const products_data = await getProducts(
          {
            search,
            minPrice: Number(minPrice) || 0,
            maxPrice: Number(maxPrice) || Number.MAX_SAFE_INTEGER,
            category,
            subCategory,
            offer,
            size: Array.isArray(size)
              ? size
              : size
              ? [size]
              : undefined,
            color: Array.isArray(color)
              ? color
              : color
              ? [color]
              : undefined,
          },
          sort
        );

        setProducts(products_data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Data'yı çekme işlemini başlatıyoruz.
  }, [searchParams]);  // searchParams değiştiğinde yeniden çalıştırılacak.

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative h-screen overflow-hidden">
  

      {/* Filters Sidebar */}
      <div className="scrollbar fixed left-2 top-[124px] h-[calc(100vh-64px)] overflow-auto pt-4 md:left-4 lg:top-16">
        <ProductFilters queries={params} />
      </div>

      {/* Main Content */}
      <div className="ml-[190px] pt-[140px] md:ml-[220px] lg:pt-20">
        {/* Sort Section */}
        <div className="sticky top-[64px] z-10 flex items-center px-4 py-2">
          <ProductSort />
        </div>

        {/* Product List */}
        <div className="scrollbar mt-4 flex max-h-[calc(100vh-155px)] w-full flex-wrap overflow-y-auto px-4 pb-28">
          {products.map((product) => (
            <ProductCard key={product.id + product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
