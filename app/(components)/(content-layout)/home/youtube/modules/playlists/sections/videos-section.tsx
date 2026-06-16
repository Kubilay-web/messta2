"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

import { InfiniteScroll } from "../../../components/infinite-scroll";
import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "../../video/ui/components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "../../video/ui/components/video-row-card";

interface VideosViewProps {
  playlistId: string;
}

const DEFAULT_LIMIT = 20; // Sabit limit değeri

export const VideosSection = (props: VideosViewProps) => {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const VideosSectionSkeleton = () => {
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

const VideosSectionSuspense = ({ playlistId }: VideosViewProps) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = new URL(
          `/api/video/playlists/${playlistId}/videos`,
          window.location.origin
        );
        url.searchParams.set("limit", String(DEFAULT_LIMIT));

        const response = await fetch(url.toString());
        const data = await response.json();

        setVideos(data.items); // İlk sayfadaki videolar
        setCursor(data.nextCursor); // Sonraki cursor
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [playlistId]); // sadece playlistId değişince çalışır

  const fetchNextPage = async () => {
    if (isFetchingNextPage || !cursor) return;

    setIsFetchingNextPage(true);

    const url = new URL(
      `/api/video/playlists/${playlistId}/videos`,
      window.location.origin
    );
    url.searchParams.set("limit", String(DEFAULT_LIMIT));
    url.searchParams.set("cursor", cursor);

    try {
      const response = await fetch(url.toString());
      const data = await response.json();

      setVideos((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor);
    } catch (error) {
      console.error("Error fetching next page of videos:", error);
    } finally {
      setIsFetchingNextPage(false);
    }
  };

  const removeVideo = async (videoId: string) => {

    try {
      const response = await fetch(
        `/api/video/playlists/${playlistId}/videos/${videoId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Video removed from playlist");
        // Burada, güncellenmiş video listesi alınabilir
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== videoId)
        );
      } else {
        toast.error("Failed to remove video");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error removing video:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {isLoading
          ? Array.from({ length: 18 }).map((_, index) => (
              <VideoGridCardSkeleton key={index} />
            ))
          : videos.map((video) => (
              <VideoGridCard
                key={video.id} // 👈 videoId kullan
                data={{
                  id: video.id, // 👈 backend uyumlu id
                  title: video.title,
                  thumbnailUrl: video.thumbnailUrl,
                  previewUrl: video.previewUrl,
                  duration: video.duration,
                  user: video.user,
                  viewsCount: video.viewsCount,
                  likesCount: video.likesCount,
                  description: video.description,
                  createdAt: video.createdAt,
                }}
                onRemove={() => removeVideo(video.id)} // ✅ id kullan
              />
            ))}
      </div>

      <div className="hidden flex-col gap-4 md:flex">
        {isLoading
          ? Array.from({ length: 18 }).map((_, index) => (
              <VideoRowCardSkeleton key={index} size="compact" />
            ))
          : videos.map((video) => (
              <VideoRowCard
                key={video.id}
                data={{
                  id: video.id,
                  title: video.title,
                  thumbnailUrl: video.thumbnailUrl,
                  previewUrl: video.previewUrl,
                  duration: video.duration,
                  user: video.user,
                  viewsCount: video.viewsCount,
                  likesCount: video.likesCount,
                  description: video.description,
                  createdAt: video.createdAt,
                }}
                size="compact"
                onRemove={() => removeVideo(video.id)} // ✅ id kullan
              />
            ))}
      </div>

      <InfiniteScroll
        hasNextPage={cursor !== null}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};
