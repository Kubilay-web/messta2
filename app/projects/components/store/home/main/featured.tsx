"use client";

import Link from "next/link";
import MainSwiper from "../../shared/swiper";
import { SimpleProduct } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Featured() {
  const is1170px = useMediaQuery({ query: "(min-width: 1170px)" });
  const is1700px = useMediaQuery({ query: "(min-width: 1700px)" });

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [products, setProducts] = useState<SimpleProduct[]>([]);

  // ekran genişliğini dinle
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ürünleri client-side API'den çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/featured-products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Ürünleri çekerken hata oluştu:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-md">
      <div
        className="flex w-full items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/images/ads/featured.webp)" }}
      >
        {/* Coupon */}
        <Link href="/home/shop">
          <div className="relative float-left h-[190px] w-52 px-3">
            <div className="flex h-[103px] flex-col items-center justify-center">
              <h3 className="my-1 w-full font-bold leading-5 text-white">
                Welcome Newcomers!
              </h3>
              <p className="w-full text-sm text-white">
                Enjoy shopping made easy like nothing before
              </p>
            </div>
            <div
              className="absolute bottom-[35px] h-[55px] w-[192px] overflow-hidden bg-contain bg-no-repeat pl-[14px] pr-[45px] text-left text-white"
              style={{ backgroundImage: "url(/assets/images/ads/coupon.gif)" }}
            >
              <h3 className="mb-1 mt-[11px] w-full text-[20px] leading-6 text-white">
                use &#39;666&#39;
              </h3>

              <p className="w-full -translate-y-1 overflow-hidden overflow-ellipsis text-xs">
                for 50% off
              </p>
            </div>
          </div>
        </Link>

        {/* Product swiper */}
        <div
          className={is1700px ? "ml-10" : ""}
          style={{
            width: !is1170px
              ? `${screenWidth - 300}px`
              : is1700px
                ? "750px"
                : `calc(500px + 5vw)`,
          }}
        >
          {products.length > 0 && (
            <MainSwiper
              products={products}
              type="simple"
              slidesPerView={1}
              spaceBetween={-10}
            />
          )}
        </div>
      </div>
    </div>
  );
}
