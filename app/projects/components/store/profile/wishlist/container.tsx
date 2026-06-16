"use client";
import { ProductWishlistType } from "@/app/lib/types";
import ProductList from "../../shared/product-list";
import Pagination from "../../shared/pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WishlistContainer({
  products,
  page,
  totalPages,
}: {
  products: ProductWishlistType[];
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const [currentPage, setPage] = useState<number>(page);

  useEffect(() => {
    if (currentPage !== page) {
      router.push(`/profile/wishlist/${currentPage}`);
    }
  }, [currentPage, page]);
  return (
    <div>
      <div className="flex flex-wrap pb-16">
        <ProductList products={products} />
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
