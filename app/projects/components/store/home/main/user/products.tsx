"use client";
import MainSwiper from "@/app/projects/components/store/shared/swiper";
import { SimpleProduct } from "@/app/lib/types";

export default function UserCardProducts({
  products,
}: {
  products: SimpleProduct[];
}) {
  return (
    <div className="absolute bottom-0 left-0 w-[345px]">
      <MainSwiper
        products={products}
        type="simple"
        slidesPerView={3}
        spaceBetween={-5}
      />
    </div>
  );
}
