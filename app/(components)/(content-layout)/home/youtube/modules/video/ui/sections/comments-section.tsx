"use client";

import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { InfiniteScroll } from "../../../../components/infinite-scroll";

import { CommentForm } from "../../../comments/comment-form";
import { CommentItem } from "../../../comments/comment-item";

interface CommentsSectionProps {
  videoId: string;
}

const LIMIT = 10;

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  const [comments, setComments] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
      const url = `${baseUrl}/api/video/studio/videos/${videoId}/comments?limit=${LIMIT}&cursor=${nextCursor || ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Yorumlar alınamadı");

      const data = await res.json();
      setComments((prev) => [...prev, ...data.items]);
      setNextCursor(data.nextCursor);
      setHasNextPage(data.nextCursor !== null);
    } catch (err) {
      console.error("Yorumlar fetch hatası:", err);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);


  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center">
        <Loader2Icon className="w-6 h-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <h2 className="text-xl font-bold">{comments.length} Comment</h2>

      <CommentForm
        videoId={videoId}
        onSuccess={(newComment) => {
          if (!newComment) return;

          const normalizedComment = {
            id: newComment.id,
            value: newComment.value,
            createdAt: newComment.createdAt,
            videoId: newComment.videoId,
            userId: newComment.userId,

            // GET formatına zorunlu user objesi
            user: {
              id: newComment.userId,
              name: newComment.user?.username || "Unknown",
              imageUrl: newComment.user?.imageUrl || null,
            },

            // Reaction defaults
            reactions: [],
            reactionsCount: 0,
            userReaction: null,

            // Likes – dislike defaults
            likeCount: newComment.likeCount ?? 0,
            dislikeCount: newComment.dislikeCount ?? 0,

            // Replies defaults
            replies: [],
            replyCount: newComment.replyCount ?? 0,
          };

          setComments((prev) => [normalizedComment, ...prev]);
        }}
      />

      <div className="flex flex-col gap-4 mt-2">
        {comments.filter(Boolean).map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={(id) => {
              setComments((prev) => prev.filter((c) => c.id !== id));
            }}
          />
        ))}

        <InfiniteScroll
          isManual
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetching}
          fetchNextPage={fetchComments}
        />

        {isFetching && (
          <div className="flex justify-center items-center mt-2">
            <Loader2Icon className="w-6 h-6 text-muted-foreground animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
