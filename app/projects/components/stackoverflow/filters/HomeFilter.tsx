"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/app/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/app/lib/url";

const filters = [
  { name: "React", value: "react" },
  { name: "JavaScript", value: "javascript" },

  // { name: "Newest", value: "newest" },
  // { name: "Popular", value: "popular" },
  // { name: "Unanswered", value: "unanswered" },
  // { name: "Recommeded", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");

      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            "body-medium rounded-lg border px-6 py-3 capitalize shadow-none",
            active === filter.value
              ? "bg-primary-500 hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600 border-primary-500 dark:border-primary-500 text-blue-400 dark:text-white"
              : "bg-light-800 text-light-300 hover:bg-light-700 dark:bg-dark-400 dark:text-light-500 dark:hover:bg-dark-300 border-light-400 dark:border-dark-500",
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
