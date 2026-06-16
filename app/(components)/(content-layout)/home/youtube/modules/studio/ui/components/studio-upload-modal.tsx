"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";

import { Button } from "../../../../components/ui/button";
import { ResponsiveModal } from "../../../../components/responsive-modal";
import { StudioUploader } from "./studio-uploader";

export const StudioUploadModal = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  const createVideo = async () => {
    try {
      setIsPending(true);

      const res = await fetch("/api/video/studio/videos", {
        method: "POST",
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();

      setUploadUrl(data.url);      // upload endpoint
      setVideoId(data.video.id);   // created video id

      toast.success("Video created, preparing upload...");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  const onSuccess = () => {
    if (!videoId) return;

    // Reset state
    setUploadUrl(null);
    setVideoId(null);

    router.push(`/home/youtube/main/videos/${videoId}`);
  };

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={!!uploadUrl}
        onOpenChange={() => {
          setUploadUrl(null);
          setVideoId(null);
        }}
      >
        {uploadUrl ? (
          <StudioUploader endpoint={uploadUrl} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon className="animate-spin" />
        )}
      </ResponsiveModal>

      <Button className="bg-slate-500 text-white" variant="secondary" onClick={createVideo} disabled={isPending}>
        {isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  );
};
