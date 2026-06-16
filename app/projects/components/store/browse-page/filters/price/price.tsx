"use client";
import { FC, useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Input from "@/app/projects/components/store/ui/input";

const PriceFilter: FC = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [minPrice, setMinPrice] = useState<string | number>(""); // Initial value as empty string
  const [maxPrice, setMaxPrice] = useState<string | number>("");

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Update URL params
  const updateUrlParams = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) {
      params.set("minPrice", String(minPrice));
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", String(maxPrice));
    } else {
      params.delete("maxPrice");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  // Handle minPrice change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  // Handle maxPrice change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  // Use effect to handle debounce of the URL update
  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      updateUrlParams();
    }, 500); // Debouncing for 500ms delay

    setDebounceTimeout(timeout);

    // Cleanup the timeout when the component unmounts or changes
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [minPrice, maxPrice]);

  return (
    <div className="pt-5 pb-4">
      <div className="relative cursor-pointer flex items-center justify-between select-none">
        <h3 className="text-sm font-bold overflow-ellipsis capitalize line-clamp-1 text-main-primary">
          Price
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-2.5">
        <input
          name="minPrice"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          placeholder="Min Price"
          className="h-[32px] w-20 text-main-primary bg-white border rounded-md text-xs pl-1"
        />
        <input
          name="maxPrice"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          placeholder="Max Price"
          className="h-[32px] w-20 text-main-primary bg-white border rounded-md text-xs pl-1"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
