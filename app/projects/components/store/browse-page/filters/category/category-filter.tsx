"use client";
import { useState } from "react";
import { CatgegoryWithSubsType } from "@/app/lib/types";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/app/lib/utils";
import CategoryLink from "./category-link";

export default function CategoryFilter({
  categories,
}: {
  categories: CatgegoryWithSubsType[];
}) {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="pt-5 pb-4">
      {/* Header */}
      <div
        className="relative cursor-pointer flex items-center justify-between select-none"
        onClick={() => setShow((prev) => !prev)}
      >
        <h3 className="text-sm font-bold overflow-ellipsis capitalize line-clamp-1 text-main-primary">
          Category
        </h3>
        <span className="absolute right-0">
          {show ? <Minus className="w-3" /> : <Plus className="w-3" />}
        </span>
      </div>
      {/* Filter */}
      <div
        className={cn("mt-2.5", {
          hidden: !show,
        })}
      >
        {categories.map((category) => (
          <CategoryLink key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
