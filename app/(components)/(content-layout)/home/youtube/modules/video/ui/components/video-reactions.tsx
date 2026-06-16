"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";

interface VideoReactionsProps {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReaction: "like" | "dislike" | null;
  userId?: string;
}

export const VideoReactions = ({
  videoId,
  likes,
  dislikes,
  viewerReaction: initialReaction,
  userId,
}: VideoReactionsProps) => {
 const [reaction, setReaction] = useState<"like" | "dislike" | null>(initialReaction);
  const [likesCount, setLikesCount] = useState<number>(Number(likes)); // NaN kontrolü için Number() kullandık
  const [dislikesCount, setDislikesCount] = useState<number>(Number(dislikes)); // NaN kontrolü için Number() kullandık
  const [loading, setLoading] = useState(false);

  const handleReaction = async (type: "like" | "dislike") => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/video/studio/videos/videoreactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, type }),
      });

      if (!res.ok) throw new Error("Failed to react");

      // Reaksiyon kaldırma veya güncelleme işlemi
      if (type === "like") {
        // Beğeni veriliyorsa
        if (reaction === "like") {
          // Aynı reaksiyona tıklanırsa, beğeni kaldırılır
          setLikesCount(prev => prev - 1);
          setReaction(null); // Reaksiyon kaldırıldı
        } else {
          // Beğeni verilmemişse, beğeni sayısı artar
          setLikesCount(prev => prev + 1);
          if (reaction === "dislike") {
            // Beğenmeme varsa, beğenmeme sayısı azalır
            setDislikesCount(prev => prev - 1);
          }
          setReaction("like"); // Yeni reaksiyon
        }
      } else {
        // Beğenmeme veriliyorsa
        if (reaction === "dislike") {
          // Aynı reaksiyona tıklanırsa, beğenmeme kaldırılır
          setDislikesCount(prev => prev - 1);
          setReaction(null); // Reaksiyon kaldırıldı
        } else {
          // Beğenmeme verilmemişse, beğenmeme sayısı artar
          setDislikesCount(prev => prev + 1);
          if (reaction === "like") {
            // Beğeni varsa, beğeni sayısı azalır
            setLikesCount(prev => prev - 1);
          }
          setReaction("dislike"); // Yeni reaksiyon
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-none">
      <Button
        onClick={() => handleReaction("like")}
        disabled={loading}
        variant="secondary"
        className="rounded-l-full rounded-r-none gap-2 pr-4 bg-slate-500 text-white"
      >
        <ThumbsUpIcon className={cn("size-5", reaction === "like" && "fill-black")} />
        {likesCount}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        onClick={() => handleReaction("dislike")}
        disabled={loading}
        variant="secondary"
        className="rounded-l-none rounded-r-full pl-3 bg-slate-500 text-white"
      >
        <ThumbsDownIcon className={cn("size-5", reaction === "dislike" && "fill-black")} />
        {dislikesCount}
      </Button>


      {/* 1.26.54 */}
    </div>
  );
};
