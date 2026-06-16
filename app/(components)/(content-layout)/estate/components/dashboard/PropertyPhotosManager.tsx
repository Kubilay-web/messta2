"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2, Star, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { addPropertyImage, deletePropertyImage, setPropertyImageCover } from "../../actions/property-images";

type Photo = {
  id:      string;
  url:     string;
  title:   string | null;
  isCover: boolean;
  order:   number;
};

type Props = {
  propertyId: string;
  initialPhotos: Photo[];
};

export default function PropertyPhotosManager({ propertyId, initialPhotos }: Props) {
  const router                    = useRouter();
  const fileInputRef              = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [pending,   startTransition] = useTransition();
  const [photos, setPhotos]       = useState<Photo[]>(initialPhotos);

  async function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);

        const res  = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();

        if (data.secure_url) {
          const saved = await addPropertyImage({
            propertyId,
            url:     data.secure_url,
            title:   file.name.replace(/\.[^.]+$/, ""),
          });
          setPhotos((prev) => [...prev, saved as Photo]);
          toast.success("Fotoğraf eklendi.");
        }
      } catch {
        toast.error(`${file.name} yüklenemedi.`);
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleDelete(imageId: string) {
    startTransition(async () => {
      try {
        await deletePropertyImage(imageId, propertyId);
        setPhotos((prev) => prev.filter((p) => p.id !== imageId));
        toast.success("Fotoğraf silindi.");
      } catch {
        toast.error("Silinemedi.");
      }
    });
  }

  function handleSetCover(imageId: string) {
    startTransition(async () => {
      try {
        await setPropertyImageCover(imageId, propertyId);
        setPhotos((prev) => prev.map((p) => ({ ...p, isCover: p.id === imageId })));
        toast.success("Kapak fotoğrafı ayarlandı.");
      } catch {
        toast.error("Güncellenemedi.");
      }
    });
  }

  return (
    <div className="space-y-4">
      {/* Upload alanı */}
      <div
        className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-blue-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        ) : (
          <ImagePlus className="w-7 h-7 text-gray-400" />
        )}
        <p className="text-sm text-black">
          {uploading ? "Yükleniyor…" : "Tıkla veya birden fazla fotoğraf seç"}
        </p>
        <p className="text-xs text-gray-400">JPG, PNG, WEBP — maks. 10 MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Fotoğraf grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-center text-black py-4">Henüz fotoğraf yok.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos
            .sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0) || a.order - b.order)
            .map((photo) => (
              <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-100">
                <img
                  src={photo.url}
                  alt={photo.title ?? ""}
                  className="w-full h-full object-cover"
                />

                {/* Kapak etiketi */}
                {photo.isCover && (
                  <Badge className="absolute top-1.5 left-1.5 text-[10px] bg-blue-600">Kapak</Badge>
                )}

                {/* Hover aksiyonlar */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!photo.isCover && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8"
                      title="Kapak yap"
                      disabled={pending}
                      onClick={() => handleSetCover(photo.id)}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    title="Sil"
                    disabled={pending}
                    onClick={() => handleDelete(photo.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {photo.title && (
                  <p className="absolute bottom-0 left-0 right-0 text-[10px] text-white bg-black/50 px-2 py-1 truncate">
                    {photo.title}
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
