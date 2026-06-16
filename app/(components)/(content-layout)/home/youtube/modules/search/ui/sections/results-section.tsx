"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InfiniteScroll } from "../../../../components/infinite-scroll";
import { VideoRowCard, VideoRowCardSkeleton } from "../../../video/ui/components/video-row-card";
import { VideoGridCard, VideoGridCardSkeleton } from "../../../video/ui/components/video-grid-card";

// Varsayılan limit değeri
const DEFAULT_LIMIT = 20;

interface ResultsSectionProps {
  query: string | undefined;
  categoryId: string | undefined;
};

export const ResultsSection = (props: ResultsSectionProps) => {
  return (
    <Suspense key={`${props.query}-${props.categoryId}`} fallback={<ResultsSectionSkeleton />}>
      <ResultsSectionSuspense {...props} />
    </Suspense>
  );
};

// Yükleme sırasında gösterilecek Skeleton
export const ResultsSectionSkeleton = () => {
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const ResultsSectionSuspense = ({ query, categoryId }: ResultsSectionProps) => {
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const url = new URL("/api/video/studio/videos/search", window.location.href);
        if (query) url.searchParams.set("query", query);
        if (categoryId) url.searchParams.set("categoryId", categoryId);
        url.searchParams.set("limit", `${DEFAULT_LIMIT}`);

        if (nextCursor) {
          url.searchParams.set("cursor", nextCursor);
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        setResults((prev) => [...prev, ...data.items]);
        setNextCursor(data.nextCursor);
        setHasNextPage(data.nextCursor !== null);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, categoryId, nextCursor]);

  // Video kartlarını oluşturma ve render etme
  return (
    <>
    
       <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {results.map((video) => (
          <VideoGridCard key={video.id} data={video} viewsCount={video.viewsCount} likesCount={video.likesCount} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {results.map((video) => (
          <VideoRowCard key={video.id} data={video} viewsCount={video.viewsCount} likesCount={video.likesCount} />
        ))}
      </div>

      {/* Infinite scroll bileşeni */}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isLoading}
        fetchNextPage={() => setNextCursor(nextCursor)}
      />
    </>
  );
};
