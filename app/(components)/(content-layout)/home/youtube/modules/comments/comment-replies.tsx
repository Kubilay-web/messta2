"use client";

import { useEffect, useState } from "react";
import { CornerDownRightIcon, Loader2Icon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { CommentItem } from "./comment-item";

export const CommentReplies = ({ parentId, videoId, onDelete }) => {
  const LIMIT = 10;

  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNext, setIsFetchingNext] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // İlk yükleme
  useEffect(() => {
    setIsLoading(true);

    const query = `/api/video/studio/videos/${videoId}/comments?parentId=${parentId}&limit=${LIMIT}`;

    fetch(query)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }
        return res.json();
      })
      .then((data) => {
        if (data.items) {
          setItems(data.items || []);
          setCursor(data.nextCursor || null);
          setHasNext(Boolean(data.nextCursor));
        } else {
          console.error("Unexpected response format:", data);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setIsLoading(false);
      });
  }, [parentId, videoId]);

  // Reply silme işlemi sonrası state güncelleme
  const handleDeleteReply = (deletedCommentId) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedCommentId)
    );

    onDelete(deletedCommentId); // Ana bileşene reply silindiğini bildir
  };

  // Sonraki sayfa
  const loadMore = () => {
    if (!cursor) return;

    setIsFetchingNext(true);

    const query = `/api/video/studio/videos/${videoId}/comments?parentId=${parentId}&limit=${LIMIT}&cursor=${cursor}`;

    fetch(query)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch more comments");
        }
        return res.json();
      })
      .then((data) => {
        setItems((prev) => [...prev, ...(data.items || [])]);
        setCursor(data.nextCursor || null);
        setHasNext(Boolean(data.nextCursor));
        setIsFetchingNext(false);
      })
      .catch((err) => {
        console.error("Error loading more comments:", err);
        setIsFetchingNext(false);
      });
  };

  return (
    <div className="pl-14">
      <div className="flex flex-col gap-4 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading &&
          items.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              variant="reply"
              onDelete={handleDeleteReply}
            />
          ))}
      </div>

      {hasNext && (
        <Button
          variant="tertiary"
          size="sm"
          onClick={loadMore}
          disabled={isFetchingNext}
          className="mt-2"
        >
          <CornerDownRightIcon />
          {isFetchingNext ? "Loading..." : "Show more replies"}
        </Button>
      )}
    </div>
  );
};
