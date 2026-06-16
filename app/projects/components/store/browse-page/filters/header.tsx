"use client";
import { FiltersQueryType } from "@/app/lib/types";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FiltersHeader({
  queries,
}: {
  queries: FiltersQueryType;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [currentParams, setCurrentParams] = useState<string>(
    searchParams.toString()
  );

  useEffect(() => {
    // Update currentParams whenever the searchParams change in the URL
    setCurrentParams(searchParams.toString());
  }, [searchParams]);

  // Destructure queries into an array format
  const queriesArray = Object.entries(queries);
  const queriesLength = queriesArray.reduce((count, [queryKey, queryValue]) => {
    if (queryKey === "sort") return count; // Exclude sort from the count
    if (queryKey === "search" && queryValue === "") return count; // Exclude empty search from count
    return count + (Array.isArray(queryValue) ? queryValue.length : 1); // Count array lengths or single values
  }, 0);

  // Handle Clearing all parameters
  const handleClearQueries = () => {
    const params = new URLSearchParams(searchParams);

    params.forEach((_, key) => {
      params.delete(key);
    });

    // Replace the URL with the pathname and no query string
    replace(pathname);
  };

  // Handle removing specific query values or entire queries
  const handleRemoveQuery = (
    query: string,
    array?: string[],
    specificValue?: string
  ) => {
    const params = new URLSearchParams(searchParams);

    if (specificValue && array) {
      // Remove the specific value from the array and update the params
      const updatedArray = array.filter((value) => value !== specificValue);
      params.delete(query); // Remove the query from params
      // Re-add remaining values if any
      updatedArray.forEach((value) => params.append(query, value));
    } else {
      // Remove the entire query
      params.delete(query);
    }

    // Replace the URL with updated params
    replace(`${pathname}?${params.toString()}`);
    setCurrentParams(params.toString()); // Trigger re-render with updated params
  };
  return (
    <div className="pt-2.5 pb-5">
      <div className="flex items-center justify-between h-4 leading-5">
        <div className="text-sm font-bold">Filter ({queriesLength})</div>
        {queriesLength > 0 && (
          <div
            className="text-xs text-orange-background cursor-pointer hover:underline"
            onClick={() => handleClearQueries()}
          >
            Clear All
          </div>
        )}
      </div>
      {/* Display filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        {queriesArray.map(([queryKey, queryValue]) => {
          if (queryKey === "sort") return null;
          if (queryKey === "search" && queryValue === "") return null;
          const isArrayQuery = Array.isArray(queryValue);
          const queryValues = isArrayQuery ? queryValue : [queryValue];

          return (
            <div key={queryKey} className="flex flex-wrap gap-2">
              {queryValues.map((value, index) => (
                <div
                  key={index}
                  className="border cursor-pointer py-0.5 px-1.5 rounded-sm text-sm w-fit text-center"
                >
                  <span className="text-main-secondary overflow-hidden text-ellipsis whitespace-nowrap mr-2">
                    {value}
                  </span>
                  <X
                    className="w-3 text-main-secondary hover:text-black cursor-pointer inline-block"
                    onClick={() => {
                      isArrayQuery
                        ? handleRemoveQuery(queryKey, queryValues, value) // Remove specific value from array query
                        : handleRemoveQuery(queryKey); // Remove entire query
                    }}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
