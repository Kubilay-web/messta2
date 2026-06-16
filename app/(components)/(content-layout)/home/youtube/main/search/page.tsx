"use client";

import { useState, useEffect } from "react";
import { SearchView } from "../../modules/search/ui/views/search-view";

// Sabit değer
const DEFAULT_LIMIT = 20;

interface PageProps {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
}

const Page = ({ searchParams }: PageProps) => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<any[]>([]); // Arama sonuçlarını tutar
  const [loading, setLoading] = useState<boolean>(true);

  // Arama parametrelerini almak için ilk useEffect
  useEffect(() => {
    const fetchSearchParams = async () => {
      const { query, categoryId } = await searchParams;
      setQuery(query);
      setCategoryId(categoryId);
    };

    fetchSearchParams();
  }, [searchParams]); // Bu useEffect sadece searchParams değiştiğinde çalışır

  // Arama sonuçlarını almak için ikinci useEffect
  useEffect(() => {
    if (!query && !categoryId) {
      setLoading(false); // Eğer query veya categoryId yoksa, yükleme durumu sonlandırılır.
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true); // Yüklemeyi başlatıyoruz

      try {
        const response = await fetch("/api/video/studio/videos/search", {
          method: "POST",
          body: JSON.stringify({ query, categoryId, limit: DEFAULT_LIMIT }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setSearchResults(data.items); // response'dan gelen veriyi işliyoruz
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // Eğer hata olursa, sonuçları boş yapıyoruz
      } finally {
        setLoading(false); // Yükleme tamamlandığında durumu false yapıyoruz
      }
    };

    fetchSearchResults(); // Arama sonuçlarını alıyoruz
  }, [query, categoryId]); // query veya categoryId değiştiğinde çalışır

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Yükleme mesajı, loading true olduğunda gösterilir
      ) : (
        <>
          {searchResults.length === 0 ? (
            <p>No results found.</p> // Eğer sonuç yoksa gösterilecek mesaj
          ) : (
            <SearchView
              results={searchResults}
              query={query}
              categoryId={categoryId}
            /> // Veriler geldiğinde, SearchView bileşeni gösterilir
          )}
        </>
      )}
    </div>
  );
};

export default Page;
