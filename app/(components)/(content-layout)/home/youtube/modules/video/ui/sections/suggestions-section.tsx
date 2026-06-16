"use client"

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "../components/video-row-card";

interface SuggestionsSectionProps {
  videoId: string;
  isManual?: boolean;
}

const DEFAULT_LIMIT = 10;

export const SuggestionsSection = ({
  videoId,
  isManual,
}: SuggestionsSectionProps) => {
  return (
    <Suspense fallback={<SuggestionsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Hata oluştu</p>}>
        <SuggestionsSectionSuspense videoId={videoId} isManual={isManual} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const SuggestionsSectionSkeleton = () => {
  return (
    <>
      <div className="hidden md:block space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} size="compact" />
        ))}
      </div>
      <div className="block md:hidden space-y-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
};

const SuggestionsSectionSuspense = ({
  videoId,
  isManual,
}: SuggestionsSectionProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (isFetchingNextPage || !hasNextPage) return;

    setIsFetchingNextPage(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/${videoId}/suggestions?limit=${DEFAULT_LIMIT}&cursor=${nextCursor}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Öneriler alınamadı");

      const data = await res.json();

      const items = data.items || [];

      setSuggestions((prev) => [...prev, ...items]);

      setHasNextPage(items.length === DEFAULT_LIMIT);
      setNextCursor(data.nextCursor || null);
    } catch (error) {
      console.error("Öneriler alınırken hata oluştu:", error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    setSuggestions([]);
    setNextCursor(null);
    setHasNextPage(true);
    fetchSuggestions();
  }, [videoId]);

  return (
    <>
      <div className="hidden md:block space-y-3">
        {suggestions.map((video) => (
          <VideoRowCard key={video.id} data={video} size="compact" />
        ))}
      </div>

      <div className="block md:hidden space-y-10">
        {suggestions.map((video) => (
          <VideoGridCard key={video.id} data={video} />
        ))}
      </div>

      <InfiniteScroll
        isManual={isManual}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchSuggestions}
      />
    </>
  );
};
