"use client";
import { FeaturedCategoryType } from "@/app/lib/types";
import CategoryCard from "./category-card";
import { useEffect, useState } from "react";
import { getHomeFeaturedCategories } from "@/app/queries/home";

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<FeaturedCategoryType[]>();

  useEffect(() => {
    const getCategories = async () => {
      const featuredCategories = await getHomeFeaturedCategories();
      setCategories(featuredCategories);
    };
    getCategories();
  }, []);
  return (
    <div className="mx-auto w-full">
      {/* Header */}
      <div className="flex h-[32px] justify-center text-center text-[24px] font-extrabold leading-[32px] text-[#222]">
        <div className="mx-[14px] my-4 h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)]" />
        <span>Featured Categories</span>
        <div className="mx-[14px] my-4 h-[1px] flex-1 border-t-[2px] border-t-[hsla(0,0%,59.2%,.3)]" />
      </div>
      {/* List */}
      <div className="mt-7 grid w-full gap-4 min-[770px]:grid-cols-2 min-[1120px]:grid-cols-3">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
