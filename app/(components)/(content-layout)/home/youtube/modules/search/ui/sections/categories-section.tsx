"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { FilterCarousel } from "../../../../components/filter-carousel";

// Props
interface CategoriesSectionProps {
  categoryId?: string;
}

// Ana bileşen
export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
  return (
    <Suspense fallback={<CategoriesSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CategoriesSectionSuspense categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

// Yükleme sırasında gösterilecek Skeleton
export const CategoriesSectionSkeleton = () => {
  return <FilterCarousel isLoading data={[]} onSelect={() => {}} />;
};

// Asıl içerik
const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Kategorileri almak için useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/video/videocategories"); // API'den kategorileri alıyoruz
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Kategorileri almak sırasında bir hata oluştuysa veya veri yükleniyorsa boş bir array gösteriyoruz.
  if (loading) {
    return <CategoriesSectionSkeleton />;
  }

  // Kategorileri `FilterCarousel` bileşenine aktarıyoruz
  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Seçim yapıldığında URL'yi güncelleme işlemi
  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return <FilterCarousel onSelect={onSelect} value={categoryId} data={data} />;
};
