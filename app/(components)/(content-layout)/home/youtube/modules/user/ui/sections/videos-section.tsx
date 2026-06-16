"use client";

import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import { VideoGridCard, VideoGridCardSkeleton } from "../../../video/ui/components/video-grid-card";

interface VideosSectionProps {
  userId: string;
}

const VideosSection = (props: VideosSectionProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <VideosSectionContent {...props} />
    </ErrorBoundary>
  );
};

const ErrorFallback = ({ error }: { error: Error }) => (
  <div role="alert">
    <p>Error: {error.message}</p>
  </div>
);

const VideosSectionContent = ({ userId }: VideosSectionProps) => {
  const [videos, setVideos] = useState<any[]>([]); // Video verilerini tutar
  const [loading, setLoading] = useState(false); // Yükleme durumu
  const [hasMore, setHasMore] = useState(true); // Sonsuz kaydırma durumu
  const [nextCursor, setNextCursor] = useState<string | null>(null); // Sonraki sayfa için cursor (sınırlama)

  const LIMIT = 20; // Sabit limit

  // Veri çekme fonksiyonu
  const fetchVideos = async () => {
    if (loading || !hasMore) return; // Yükleniyor veya daha fazla veri yoksa işleme yapma
    setLoading(true);

    try {
      const url = `/api/video/users?userId=${userId}&limit=${LIMIT}&cursor=${nextCursor ?? ""}`;
      const response = await fetch(url);

      // API hatalı dönüyorsa işlemi sonlandır
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();

      // Yeni veriyi mevcut verilere ekle
      setVideos((prevVideos) => [...prevVideos, ...data.items]);

      // Yeni cursor ve sayfa bilgisi
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore); // Yeni sayfa olup olmadığını kontrol et
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // İlk yükleme
  }, [userId]); // userId değiştiğinde veri yeniden yüklensin

  // Yükleme yapılırken gösterilecek skeleton
  if (loading && videos.length === 0) {
    return <VideosSectionSkeleton />;
  }

  return (
    <div>
      <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
        {videos.map((video) => (
         <VideoGridCard key={video.data.id} data={video.data} />
        ))}
      </div>

      <InfiniteScroll
        hasNextPage={hasMore}
        isFetchingNextPage={loading}
        fetchNextPage={fetchVideos}
      />
    </div>
  );
};

const VideosSectionSkeleton = () => (
  <div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
    {Array.from({ length: 20 }).map((_, index) => (
      <VideoGridCardSkeleton key={index} />
    ))}
  </div>
);

export default VideosSection;
