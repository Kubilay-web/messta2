import Image from "next/image";
import { formatDuration } from "@/app/lib/utils";
import { Skeleton } from "@/app/(components)/(content-layout)/home/youtube/components/ui/skeleton";

interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
}

/* ------------------------------
   SKELETON
------------------------------ */
export const VideoThumbnailSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

/* ------------------------------
   THUMBNAIL
------------------------------ */
export const VideoThumbnail = ({
  title,
  duration,
  imageUrl,
  previewUrl,
}: VideoThumbnailProps) => {
  // Next.js Image “src required” hatasını önlemek için fallback
  const safeImage = imageUrl || "/youtube/placeholder.svg";

  return (
    <div className="relative group">
      {/* Thumbnail Wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        {/* MAIN IMAGE */}
        <Image
          src={safeImage}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-0"
        />

        {/* PREVIEW IMAGE (hover) - only if exists */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt={`${title} preview`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        )}
      </div>

      {/* Duration Box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};
