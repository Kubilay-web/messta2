"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { FiltersQueryType } from "@/app/lib/types";
import SizeLink from "./color";
import { getFilteredColors } from "@/app/queries/color";
import ColorCircle from "./color";

export default function ColorFilter({
  queries,
  storeUrl,
}: {
  queries: FiltersQueryType;
  storeUrl?: string;
}) {
  const { category, subCategory, offer, search } = queries;
  const [show, setShow] = useState<boolean>(true);
  const [colors, setColors] = useState<{ name: string }[]>([]);
  const [total, setTotal] = useState<number>(10);
  const [take, setTake] = useState<number>(10);

  useEffect(() => {
    handleGetColors();
  }, [category, subCategory, offer, take]);

  const handleGetColors = async () => {
    const data = await getFilteredColors(
      { category, offer, subCategory, storeUrl },
      take,
    );
    setColors(data.colors);
    setTotal(data.count);
  };
  console.log("colors", colors);
  return (
    <div className="pb-4 pt-5">
      {/* Header */}
      <div
        className="relative flex cursor-pointer select-none items-center justify-between"
        onClick={() => setShow((prev) => !prev)}
      >
        <h3 className="line-clamp-1 overflow-ellipsis text-sm font-bold capitalize text-main-primary">
          Color
        </h3>
        <span className="absolute right-0">
          {show ? <Minus className="w-3" /> : <Plus className="w-3" />}
        </span>
      </div>
      {/* Filter */}
      <div
        className={cn("mt-2.5 grid grid-cols-6 gap-4", {
          hidden: !show,
        })}
      >
        {colors.map((color) => (
          <ColorCircle key={color.name} color={color.name} />
        ))}
      </div>
    </div>
  );
}
