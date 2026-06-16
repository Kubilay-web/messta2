"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../components/infinite-scroll";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../../video/ui/components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "../../video/ui/components/video-row-card";
import { useSession } from "@/app/SessionProvider";

const LIMIT = 10; // Sabit limit

export const LikedVideosSection = () => {
  return (
    <Suspense fallback={<LikedVideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading liked videos</p>}>
        <LikedVideosSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const LikedVideosSectionSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 18 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} size="compact" />
        ))}
      </div>
    </div>
  );
};

const LikedVideosSectionContent = () => {
  const [videos, setVideos] = useState<any[]>([]); // Videoların state'i
  const [cursor, setCursor] = useState<any>(null); // Cursor
  const [hasMore, setHasMore] = useState(true); // Daha fazla video var mı?
  const [loading, setLoading] = useState(false); // Veri çekme durumu

  const { user } = useSession();
  const userId = user.id;

  const fetchVideos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    let url = `/api/video/playlists/liked?userId=${userId}&limit=${LIMIT}`;
    if (cursor) {
      url += `&cursorId=${cursor.id}&cursorUpdatedAt=${cursor.updatedAt}`;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch liked videos");
      const data = await res.json();

      // Yeni gelen videoları mevcut listeye ekle

      setVideos((prev) => [...prev, ...data.items]);

   
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor); // Eğer nextCursor varsa daha fazla veri var
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Sayfa yüklendiğinde veriyi çek
  useEffect(() => {
    fetchVideos();
  }, []); // İlk yükleme

  return (
    <>
      {/* Mobil için Video Grid Card */}
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {videos.map((video, index) => (
          <VideoGridCard
            key={`${video.id}-${video.userId}-${index}`}
            data={video.data}
          />
        ))}
      </div>

      {/* Masaüstü için Video Row Card */}
      <div className="hidden flex-col gap-4 md:flex">
        {videos.map((video, index) => (
          <VideoRowCard
            key={`${video.id}-${video.userId}-${index}`}
            data={video.data}
            size="compact"
          />
        ))}
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        hasNextPage={hasMore}
        isFetchingNextPage={loading}
        fetchNextPage={fetchVideos}
      />
    </>
  );
};
