"use client";

import { toast } from "sonner";
import { Suspense, useState, useEffect } from "react";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";

interface PlaylistHeaderSectionProps {
  playlistId: string;
}

export const PlaylistHeaderSection = ({
  playlistId
}: PlaylistHeaderSectionProps) => {
  return (
    <Suspense fallback={<PlaylistHeaderSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <PlaylistHeaderSectionSuspense playlistId={playlistId} />
      </ErrorBoundary>
    </Suspense>
  )
}

export const PlaylistHeaderSectionSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  );
};

const PlaylistHeaderSectionSuspense = ({
  playlistId,
}: PlaylistHeaderSectionProps) => {
  const [playlist, setPlaylist] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const router = useRouter();

  // Playlist bilgisini almak için API isteği
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`/api/video/playlists/${playlistId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch playlist");
        }

        const data = await response.json();
        setPlaylist(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  // Playlist'i silmek için API isteği
  const removePlaylist = async () => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/video/playlists/${playlistId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove playlist");
      }

      toast.success("Playlist removed");
      router.push("/home/youtube/main/playlists"); 
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsRemoving(false);
    }
  };

  if (isLoading) {
    return <PlaylistHeaderSectionSkeleton />;
  }

  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{playlist.name}</h1>
        <p className="text-xs text-muted-foreground">
          Videos from the playlist
        </p>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        onClick={removePlaylist}
        disabled={isRemoving}
      >
        <Trash2Icon />
      </Button>
    </div>
  );
};
