"use client";

import { useEffect, useState } from "react";
import { HomeView } from "../modules/home/ui/views/home-view";

// PageProps interface to type the incoming searchParams
interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

export default function Home({ searchParams }: PageProps) {
  const [videoCategories, setVideoCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  // Fetch the searchParams value and set categoryId
  useEffect(() => {
    async function getCategoryId() {
      const resolvedParams = await searchParams;
      setCategoryId(resolvedParams.categoryId);
    }

    getCategoryId();
  }, [searchParams]);

  // Fetch video categories
  useEffect(() => {
    async function fetchVideoCategories() {
      try {
        const response = await fetch("/api/video/videocategories");
        if (!response.ok) {
          throw new Error("Veri çekilirken bir hata oluştu");
        }
        const data = await response.json();
        setVideoCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideoCategories();
  }, []); // Empty dependency array to fetch only once when the component mounts

  return (
    <div>  
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <HomeView categoryId={categoryId} />
      )}
    </div>
  );
}
