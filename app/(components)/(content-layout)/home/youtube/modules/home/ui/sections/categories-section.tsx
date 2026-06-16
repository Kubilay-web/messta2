"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { FilterCarousel } from "../../../../components/filter-carousel";

interface CategoriesSectionProps {
  categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const CategoriesSectionSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

/* -----------------------------
   Suspense fetch
----------------------------- */
let _categoriesPromise: Promise<any> | null = null;
let _categoriesCache: any[] | null = null;

function fetchCategories() {
  if (_categoriesCache) return _categoriesCache;

  if (!_categoriesPromise) {
    _categoriesPromise = fetch("/api/video/videocategories", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Kategori alınamadı");
        return res.json();
      })
      .then((data) => {
        _categoriesCache = data; // Cache'le
        return data;
      });
  }

  throw _categoriesPromise; // Suspense devreye giriyor
}

/* -----------------------------
   Component
----------------------------- */
const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();

  // Suspense promise fırlatır, çözülünce aşağıdaki değişken gerçek veri olur
  const categories = fetchCategories();

  const data = categories.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) url.searchParams.set("categoryId", value);
    else url.searchParams.delete("categoryId");

    router.push(url.toString());
  };

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
};
