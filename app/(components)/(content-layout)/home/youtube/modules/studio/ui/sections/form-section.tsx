"use client";

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "next/navigation";

import {
  CopyCheckIcon,
  CopyIcon,
  Globe2Icon,
  ImagePlusIcon,
  Loader2Icon,
  LockIcon,
  MoreVerticalIcon,
  RotateCcwIcon,
  SparklesIcon,
  TrashIcon,
} from "lucide-react";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Textarea } from "../../../../components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

import { VideoPlayer } from "../../../video/ui/components/video-player";
import { ThumbnailUploadModal } from "../components/thumbnail-upload-modal";
import { ThumbnailGenerateModal } from "../components/thumbnail-generate-modal";

interface FormSectionProps {
  videoId: string;
}

const THUMBNAIL_FALLBACK = "/youtube/fallback-thumbnail.png"; // fallback

export const FormSection = ({ videoId }: FormSectionProps) => {
  return (
    <Suspense fallback={<FormSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <FormSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

export const FormSectionSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-7 w-32 mb-2" />
      <Skeleton className="h-4 w-40 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Skeleton className="h-[400px] lg:col-span-3" />
        <Skeleton className="h-[400px] lg:col-span-2" />
      </div>
    </div>
  );
};

const FormSectionSuspense = () => {
  const params = useParams() as { videoId: string };
  const videoId = params.videoId;

  console.log("VIDEO ID =>", videoId);

  const router = useRouter();

  const [video, setVideo] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const [thumbnailGenerateModalOpen, setThumbnailGenerateModalOpen] =
    useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch video + categories

  const form = useForm({
    defaultValues: {}, // başlangıçta boş
  });

  useEffect(() => {
    if (!videoId) return;

    const fetchData = async () => {
      try {
        const [videoRes, categoriesRes] = await Promise.all([
          fetch(`/api/video/studio/videos/${videoId}`).then((r) => r.json()),
          fetch(`/api/video/videocategories`).then((r) => r.json()),
        ]);

        setVideo(videoRes);
        setCategories(categoriesRes);

        form.reset(videoRes); // <-- BURADA RESET
      } catch (err) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [videoId]);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/video/studio/videos/${videoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedVideo = await res.json();
      setVideo(updatedVideo);
      toast.success("Video updated");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const removeVideo = async () => {
    try {
      const res = await fetch(`/api/video/studio/videos/${videoId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Video removed");
      router.push("/studio");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const revalidateVideo = async () => {
    try {
      await fetch(`/api/video/studio/videos/${videoId}/revalidate`, {
        method: "POST",
      });
      toast.success("Video revalidated");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const generateTitle = async () => {
    try {
      await fetch(`/api/video/workflows/title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoId,
          userId: video.userId, // video state’den alınıyor
        }),
      });
      toast.success("Title generation started");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const generateDescription = async () => {
    try {
      await fetch(`/api/video/workflows/description`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoId,
          userId: video.userId, // video’dan gelir
        }),
      });
      toast.success("Description generation started");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const restoreThumbnail = async () => {
    try {
      if (!video) return toast.error("Video not loaded yet");

      await fetch(`/api/video/studio/videos/${videoId}/thumbnail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          thumbnailUrl: video.thumbnailUrl || "/youtube/fallback-thumbnail.png",
        }),
      });

      toast.success("Thumbnail restored");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/home/youtube/main/videos/${videoId}`;

  const onCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (loading || !video) return <FormSectionSkeleton />;

  return (
    <>
      <ThumbnailGenerateModal
        open={thumbnailGenerateModalOpen}
        onOpenChange={setThumbnailGenerateModalOpen}
        videoId={videoId}
      />
      <ThumbnailUploadModal
        open={thumbnailModalOpen}
        onOpenChange={setThumbnailModalOpen}
        videoId={videoId}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Video details</h1>
            <div className="flex gap-x-2">
              <Button
                type="submit"
                className="bg-slate-500 text-white"
                disabled={!form.formState.isDirty}
              >
                Save
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-slate-500 text-white"
                  align="end"
                >
                  <DropdownMenuItem onClick={revalidateVideo}>
                    <RotateCcwIcon className="mr-2" />
                    Revalidate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={removeVideo}>
                    <TrashIcon className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-x-2">
                    Title
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      onClick={generateTitle}
                    >
                      <SparklesIcon />
                    </Button>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Add a title to your video" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-x-2">
                    Description
                    <Button
                      size="icon"
                      variant="outline"
                      type="button"
                      onClick={generateDescription}
                    >
                      <SparklesIcon />
                    </Button>
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={10}
                    placeholder="Add a description to your video"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={() => (
              <FormItem className="mt-3">
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <div className="p-0.5 border border-dashed relative h-[84px] w-[153px] group">
                    <Image
                      src={video.thumbnailUrl || THUMBNAIL_FALLBACK}
                      fill
                      className="object-cover"
                      alt="Thumbnail"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          size="icon"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-slate-300"
                        >
                          <MoreVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-500 text-white">
                        <DropdownMenuItem
                          onClick={() => setThumbnailModalOpen(true)}
                        >
                          <ImagePlusIcon className="mr-1" />
                          Change
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setThumbnailGenerateModalOpen(true)}
                        >
                          <SparklesIcon className="mr-1" />
                          AI-generated
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={restoreThumbnail}>
                          <RotateCcwIcon className="mr-1" />
                          Restore
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="mt-3">
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-black">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Player */}
          <div className="aspect-video w mt-6 w-[700px]">
            <VideoPlayer
              playbackId={video.muxPlaybackId}
              thumbnailUrl={video.thumbnailUrl}
            />
          </div>

          {/* Video Link */}
          <div className="mt-4 flex items-center gap-x-2">
            <Link href={fullUrl}>
              <p className="text-blue-500 line-clamp-1">{fullUrl}</p>
            </Link>
            <Button type="button" variant="ghost" size="icon" onClick={onCopy}>
              {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
            </Button>
          </div>

          {/* Visibility */}
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem className="mt-3 mb-3">
                <FormLabel>Visibility</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="h-auto mb-3">
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white h-auto mb-3">
                    <SelectItem value="public">
                      <Globe2Icon className="mr-2" />
                      Public
                    </SelectItem>
                    <SelectItem value="private">
                      <LockIcon className="mr-2" />
                      Private
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
