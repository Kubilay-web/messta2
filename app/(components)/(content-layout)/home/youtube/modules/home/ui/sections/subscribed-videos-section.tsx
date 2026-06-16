"use client";

import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import { VideoGridCard,VideoGridCardSkeleton } from "../../../video/ui/components/video-grid-card";

export const SubscribedVideosSection = () => {
  return (
    <Suspense fallback={<SubscribedVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <SubscribedVideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

/* -------------------- SKELETON -------------------- */
const SubscribedVideosSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
      {Array.from({ length: 30 }).map((_, index) => (
        <VideoGridCardSkeleton key={index} />
      ))}
    </div>
  );
};

/* -------------------- FETCH + INFINITE SCROLL -------------------- */

const LIMIT = 30; // DEFAULT_LIMIT YOK!

const SubscribedVideosSectionSuspense = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  /* ---- İlk sayfa fetch ---- */
  useEffect(() => {
    loadMore();
  }, []);

  /* ---- Fetch fonksiyonu ---- */
  const loadMore = useCallback(async () => {
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);

    const url = cursor
      ? `/api/video/studio/videos/subscribed?limit=${LIMIT}&cursor=${cursor}`
      : `/api/video/studio/videos/subscribed?limit=${LIMIT}`;

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    setVideos((p) => [...p, ...data.items]);
    setCursor(data.nextCursor);
    setHasNextPage(!!data.nextCursor);
    setIsFetching(false);
  }, [cursor, isFetching, hasNextPage]);

  return (
    <div>
      {/* GRID */}
      <div className="gap-4 bg-black gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {videos.map((video) => (
          <VideoGridCard key={video.id} data={video} />
        ))}
      </div>

      {/* INFINITE SCROLL */}
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetching}
        fetchNextPage={loadMore}
      />
    </div>
  );
};
