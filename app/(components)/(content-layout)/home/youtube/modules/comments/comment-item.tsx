"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MessageSquareIcon,
  MoreVerticalIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "../../components/ui/button";
import { UserAvatar } from "../../components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { CommentForm } from "./comment-form";
import { CommentReplies } from "./comment-replies";

export const CommentItem = ({ comment, variant = "comment", onDelete }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);


  console.log("comment-------------",comment)

  // ✅ State ekliyoruz
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikeCount || 0);
  const [viewerReaction, setViewerReaction] = useState(
    comment.userReaction || null
  );
  const [repliesCount, setRepliesCount] = useState(comment.repliesCount || 0);

  console.log("comment.repliesCount", comment.repliesCount);

  const deleteComment = () => {
    fetch(`/api/video/studio/videos/comments/${comment.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) return toast.error("Error");
      toast.success("Comment deleted");
      onDelete?.(comment.id); // ← yorum state’ten silinir
    });
  };

  const like = async () => {
    try {
      const res = await fetch(
        `/api/video/studio/videos/comments/${comment.id}/like`,
        {
          method: "POST",
        }
      );
      if (!res.ok) throw new Error("Like failed");

      const data = await res.json();

      // ✅ Sayfa reload olmadan state güncelle
      setLikeCount(data.likeCount);
      setDislikeCount(data.dislikeCount);
      setViewerReaction(data.viewerReaction);
    } catch (err) {
      toast.error("Could not like comment");
      console.error(err);
    }
  };

  const dislike = async () => {
    try {
      const res = await fetch(
        `/api/video/studio/videos/comments/${comment.id}/dislike`,
        {
          method: "POST",
        }
      );
      if (!res.ok) throw new Error("Like failed");

      const data = await res.json();

      // ✅ Sayfa reload olmadan state güncelle
      setLikeCount(data.likeCount);
      setDislikeCount(data.dislikeCount);
      setViewerReaction(data.viewerReaction);
    } catch (err) {
      toast.error("Could not dislike comment");
      console.error(err);
    }
  };

  // Reply silme işlemi sonrası repliesCount'ı güncelle
  const handleDeleteReply = (deletedCommentId) => {
    setRepliesCount((prevCount) => {
      const updatedCount = prevCount - 1;
      // Reply sayısı sıfırlandığında replies butonunu gizle
      if (updatedCount === 0) {
        setIsRepliesOpen(false); // replies'ı gizle
      }
      return updatedCount;
    });
  };

  // Reply ekleme sonrası repliesCount'ı artırma
  const handleAddReply = () => {
    setRepliesCount((prevCount) => prevCount + 1); // reply eklenince sayıyı artır
    setIsRepliesOpen(true); // reply'leri göster
    setIsReplyOpen(false); // Reply formunu kapat
  };

  return (
    <div>
      <div className="flex gap-4">
        <Link href={`/home/youtube/main/users/${comment.user.id}`}>
          <UserAvatar
            size={variant === "comment" ? "lg" : "sm"}
            imageUrl={comment.user.avatarUrl}
            name={comment.user.username}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/home/youtube/main/users/${comment.user.id}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-sm pb-0.5">
                {comment.user.username}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </Link>

          <p className="text-sm">{comment.value}</p>

          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={like}
              >
                <ThumbsUpIcon
                  className={cn(viewerReaction === "like" && "fill-black")}
                />
              </Button>

              <span className="text-xs text-muted-foreground">{likeCount}</span>

              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={dislike}
              >
                <ThumbsDownIcon
                  className={cn(viewerReaction === "dislike" && "fill-black")}
                />
              </Button>

              <span className="text-xs text-muted-foreground">
                {dislikeCount}
              </span>
            </div>

            {variant === "comment" && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => setIsReplyOpen(true)}
              >
                Reply
              </Button>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsReplyOpen(true)}>
              <MessageSquareIcon className="size-4" /> Reply
            </DropdownMenuItem>

            <DropdownMenuItem onClick={deleteComment}>
              <Trash2Icon className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isReplyOpen && variant === "comment" && (
        <div className="mt-4 pl-14">
          <CommentForm
            variant="reply"
            parentId={comment.id}
            videoId={comment.videoId}
            onCancel={() => setIsReplyOpen(false)}
            onSuccess={handleAddReply} // reply başarıyla eklenince sayıyı artır
          />
        </div>
      )}

      {/* Eğer repliesCount sıfırsa, "1 reply" butonu gizlensin */}
      {repliesCount > 0 && variant === "comment" && (
        <div className="pl-14">
          <Button
            variant="tertiary"
            size="sm"
            onClick={() => setIsRepliesOpen(!isRepliesOpen)}
          >
            {isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {repliesCount} replies
          </Button>
        </div>
      )}

      {repliesCount > 0 && variant === "comment" && isRepliesOpen && (
        <CommentReplies
          parentId={comment.id}
          videoId={comment.videoId}
          onDelete={handleDeleteReply}
        />
      )}
    </div>
  );
};
