"use client"; // This makes the component client-side

import QuestionCard from "@/app/projects/components/stackoverflow/cards/QuestionCard";
import DataRenderer from "@/app/projects/components/stackoverflow/DataRenderer";
import LocalSearch from "@/app/projects/components/stackoverflow/search/LocalSearch";
import ROUTES from "@/app/constants/routes";
import { EMPTY_QUESTION } from "@/app/constants/states";
import { CollectionFilters } from "@/app/constants/filter";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CommonFilter from "@/app/projects/components/stackoverflow/filters/CommonFilter";
import Pagination from "@/app/projects/components/stackoverflow/Pagination";

const Collection = () => {
  const searchParams = useSearchParams();
  const [collection, setCollection] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNext, setIsNext] = useState(false);

  // Parametreleri URL'den al
  const query = searchParams.get("query") || "";
  const filter = searchParams.get("filter") || "mostrecent";
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  // fetchSavedQuestions fonksiyonunu async olarak tanımlıyoruz
  const fetchSavedQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forumuser/collection/savedquestion/${"userId"}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (response.ok) {
        setCollection(result.collection);
      } else {
        setError(
          result.error || "An error occurred while fetching the questions.",
        );
      }
    } catch (error) {
      setError("An error occurred while fetching the questions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedQuestions();
  }, [page, pageSize, query, filter]);

  return (
    <>
      <h1 className="h1-bold text-[#1E293B] dark:text-[#F1F5F9]">
        Saved Questions
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route={ROUTES.COLLECTION}
          imgSrc="/assets/stackoverflow/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />

        <CommonFilter
          filters={CollectionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        success={true}
        error={error}
        data={collection}
        empty={EMPTY_QUESTION}
        isLoading={isLoading}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item: any) => (
              <QuestionCard key={item.id} question={item} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext} />
    </>
  );
};

export default Collection;
