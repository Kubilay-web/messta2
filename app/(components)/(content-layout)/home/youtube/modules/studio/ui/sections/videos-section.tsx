"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { snakeCaseToTitle } from "@/app/lib/utils";
import { Skeleton } from "../../../../components/ui/skeleton";
import { InfiniteScroll } from "../../../../components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { VideoThumbnail } from "../../../video/ui/components/video-thumbnail";

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideosSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionClient />
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSkeleton = () => {
  return (
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6 w-[510px]">Video</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Comments</TableHead>
            <TableHead className="text-right pr-6">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="pl-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-36" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
              <TableCell className="text-right pr-6"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

/* -----------------------------------------------------
   FETCH + INFINITE SCROLL + NO TRPC VERSION
----------------------------------------------------- */

const VideosSectionClient = () => {
  const LIMIT = 10;

  const [pages, setPages] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchVideos = async () => {
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);

    const url = `/api/video/studio/videos?limit=${LIMIT}${cursor ? `&cursor=${cursor}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    setPages((prev) => [...prev, ...data.items]);
    setCursor(data.nextCursor || null);
    setHasNextPage(Boolean(data.nextCursor));
    setIsFetching(false);
  };

  // İlk yükleme
  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pages.map((video) => (
              <Link
                prefetch
                href={`/home/youtube/studio/videos/${video.id}`}
                key={video.id}
                legacyBehavior
              >
                <TableRow className="cursor-pointer">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-4">
                      <div className="relative aspect-video w-36 shrink-0">
                        <VideoThumbnail
                          imageUrl={video.thumbnailUrl}
                          previewUrl={video.previewUrl}
                          title={video.title}
                          duration={video.duration || 0}
                        />
                      </div>

                      <div className="flex flex-col overflow-hidden gap-y-1">
                        <span className="text-sm line-clamp-1">
                          {video.title}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {video.description || "No description"}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center">
                      {video.visibility === "private" ? (
                        <LockIcon className="size-4 mr-2" />
                      ) : (
                        <Globe2Icon className="size-4 mr-2" />
                      )}
                      {snakeCaseToTitle(video.visibility)}
                    </div>
                  </TableCell>

                  <TableCell>
                    {snakeCaseToTitle(video.muxStatus || "error")}
                  </TableCell>

                  <TableCell className="text-sm truncate">
                    {format(new Date(video.createdAt), "d MMM yyyy")}
                  </TableCell>

                  <TableCell className="text-right text-sm">
                    {video.viewCount}
                  </TableCell>

                  <TableCell className="text-right text-sm">
                    {video.commentCount}
                  </TableCell>

                  <TableCell className="text-right text-sm pr-6">
                    {video.likeCount}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </div>

      <InfiniteScroll
        isManual
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetching}
        fetchNextPage={fetchVideos}
      />
    </div>
  );
};
