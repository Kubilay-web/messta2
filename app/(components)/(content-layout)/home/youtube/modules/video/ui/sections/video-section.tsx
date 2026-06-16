"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { cn } from "@/app/lib/utils";
import { VideoBanner } from "../components/video-banner";
import { VideoPlayer, VideoPlayerSkeleton } from "../components/video-player";
import { VideoTopRow, VideoTopRowSkeleton } from "../components/video-top-row";
import { useSession } from "@/app/SessionProvider";

interface VideoSectionProps {
  videoId: string;
}

export const VideoSection = ({ videoId }: VideoSectionProps) => {
  // useSession ile oturum bilgisini alıyoruz
  const {user}=useSession();
  const userId = user?.id; // Kullanıcı ID'si burada alınır.


  return (
    <Suspense fallback={<VideoSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error loading video</p>}>
        <VideoSectionSuspense videoId={videoId} userId={userId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const VideoSectionSkeleton = () => (
  <>
    <VideoPlayerSkeleton />
    <VideoTopRowSkeleton />
  </>
);

const VideoSectionSuspense = ({ videoId, userId }: VideoSectionProps & { userId: string | undefined }) => {
  const [video, setVideo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // fetch video data
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/${videoId}`);
        if (!res.ok) throw new Error("Failed to fetch video");
        const data = await res.json();
        setVideo(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchVideo();
  }, [videoId]);

  // create view (play count) only if userId exists
  const handlePlay = async () => {
    if (!userId) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/video/studio/videos/${videoId}/views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, userId }),
      });
   
    } catch (err) {
      console.error("Failed to create view", err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!video) return <VideoSectionSkeleton />;

  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl overflow-hidden relative",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          muted
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
