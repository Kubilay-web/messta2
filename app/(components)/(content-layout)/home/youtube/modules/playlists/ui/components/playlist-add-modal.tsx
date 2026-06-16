"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";

import { Button } from "@/app/(components)/(content-layout)/home/youtube/components/ui/button";
import { ResponsiveModal } from "../../../../components/responsive-modal";
import { InfiniteScroll } from "../../../../components/infinite-scroll";

interface PlaylistAddModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string;
}

interface PlaylistItem {
  id: string;
  name: string;
  containsVideo: boolean;
}

interface PlaylistPage {
  items: PlaylistItem[];
  nextCursor: string | null;
}

export const PlaylistAddModal = ({
  open,
  onOpenChange,
  videoId,
}: PlaylistAddModalProps) => {
  const [pages, setPages] = useState<PlaylistPage[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  /* -----------------------------------------
      FETCH INITIAL (When modal opens)
  ----------------------------------------- */
  useEffect(() => {
    if (!open || !videoId) return;

    setPages([]);
    setCursor(null);
    setIsLoading(true);

    const url = new URL("/api/video/playlists", window.location.origin);
    url.searchParams.set("videoId", videoId);

    fetch(url.toString())
      .then((r) => r.json())
      .then((data: PlaylistPage) => {
        setPages([data]);
        setCursor(data.nextCursor);
      })
      .finally(() => setIsLoading(false));
  }, [open, videoId]);

  /* -----------------------------------------
      FETCH NEXT PAGE
  ----------------------------------------- */
  const fetchNextPage = async () => {
    if (!cursor || isFetchingNextPage) return;

    setIsFetchingNextPage(true);

    const url = new URL("/api/video/playlists", window.location.origin);
    url.searchParams.set("videoId", videoId);
    url.searchParams.set("cursor", cursor);

    const data = await fetch(url.toString()).then((r) => r.json());

    setPages((prev) => [...prev, data]);
    setCursor(data.nextCursor);
    setIsFetchingNextPage(false);
  };

  const allPlaylists = pages.flatMap((p) => p.items);

  /* -----------------------------------------
      ADD VIDEO TO PLAYLIST  (PUT)
  ----------------------------------------- */
  const addVideo = async (playlistId: string) => {
    try {
      await fetch("/api/video/playlists", {
        method: "PUT",
        body: JSON.stringify({ playlistId, videoId }),
      });

      toast.success("Video added to playlist");

      // UI güncelle
      setPages((prev) =>
        prev.map((page) => ({
          ...page,
          items: page.items.map((p) =>
            p.id === playlistId ? { ...p, containsVideo: true } : p
          ),
        }))
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* -----------------------------------------
      REMOVE VIDEO  (DELETE)
  ----------------------------------------- */
  const removeVideo = async (playlistId: string) => {
    try {
      await fetch("/api/video/playlists", {
        method: "DELETE",
        body: JSON.stringify({ playlistId, videoId }),
      });

      toast.success("Video removed from playlist");

      setPages((prev) =>
        prev.map((page) => ({
          ...page,
          items: page.items.map((p) =>
            p.id === playlistId ? { ...p, containsVideo: false } : p
          ),
        }))
      );
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* -----------------------------------------
      UI
  ----------------------------------------- */
  return (
    <ResponsiveModal
      title="Add to playlist"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-2">
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading &&
          allPlaylists.map((playlist) => (
            <Button
              key={playlist.id}
              variant="ghost"
              className="w-full justify-start px-2 [&_svg]:size-5"
              size="lg"
              onClick={() => {
                playlist.containsVideo
                  ? removeVideo(playlist.id)
                  : addVideo(playlist.id);
              }}
            >
              {playlist.containsVideo ? (
                <SquareCheckIcon className="mr-2" />
              ) : (
                <SquareIcon className="mr-2" />
              )}
              {playlist.name}
            </Button>
          ))}

        {!isLoading && (
          <InfiniteScroll
            hasNextPage={!!cursor}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            isManual
          />
        )}
      </div>
    </ResponsiveModal>
  );
};
