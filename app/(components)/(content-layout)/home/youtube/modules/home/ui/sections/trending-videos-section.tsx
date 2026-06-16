"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import { VideoGridCard,VideoGridCardSkeleton } from "../../../video/ui/components/video-grid-card";


const DEFAULT_LIMIT = 20; // Sabit limit, daha önce constants'dan alınıyordu

export const TrendingVideosSection = () => {
  return (
    <Suspense fallback={<TrendingVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <TrendingVideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const TrendingVideosSectionSkeleton = () => {
  return (
    <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
      {Array.from({ length: 18 }).map((_, index) => (
        <VideoGridCardSkeleton key={index} />
      ))}
    </div>
  );
};

const TrendingVideosSectionSuspense = () => {
  const [videos, setVideos] = useState<any[]>([]);  // Videoların state'i
  const [nextCursor, setNextCursor] = useState<string | null>(null);  // Bir sonraki sayfa için cursor
  const [isFetching, setIsFetching] = useState(false);  // Veri çekme durumu
  const [hasNextPage, setHasNextPage] = useState(true);  // Bir sonraki sayfa var mı?

  // İlk veri çekme işlemi
  useEffect(() => {
    const fetchTrendingVideos = async () => {
      setIsFetching(true);
      try {
        const url = new URL("/api/video/studio/videos/trending", window.location.origin);
        url.searchParams.set("limit", String(DEFAULT_LIMIT));

        if (nextCursor) {
          url.searchParams.set("cursor", nextCursor);
        }

        const res = await fetch(url.toString());
        const data = await res.json();
        setVideos((prev) => [...prev, ...data.items]);  // Yeni gelen videoları mevcut videolarla birleştiriyoruz
        setNextCursor(data.nextCursor);  // Yeni cursor'ı güncelliyoruz
        setHasNextPage(data.hasMore);  // Daha fazla sayfa var mı kontrol ediyoruz
      } catch (error) {
        console.error("Error fetching trending videos:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTrendingVideos();  // Sayfa yüklendiğinde ilk veriyi çek
  }, [nextCursor]);  // nextCursor değiştikçe veri çekme işlemi tetiklenecek

  // Infinite scroll için veri çekme
  const fetchNextPage = () => {
    if (!hasNextPage || isFetching) return;  // Eğer daha fazla sayfa yoksa veya zaten veri çekiliyorsa işlem yapma
    setNextCursor(nextCursor);  // nextCursor değiştikçe yeni sayfa çekilecek
  };

  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
        {videos.map((video) => (
          <VideoGridCard key={video.id} data={video} />
        ))}
      </div>

      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetching}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};


// 7.14.35