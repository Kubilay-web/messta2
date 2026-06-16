"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ResponsiveModal } from "../../../../components/responsive-modal";

interface ThumbnailUploadModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailUploadModalProps) => {
  const [uploading, setUploading] = useState(false);

  const uploadThumbnailToCloudinary = async (file: File) => {
    try {
      setUploading(true);

      // Cloudinary API'ye dosya yüklemek için gerekli URL'yi alıyoruz
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const uploadPreset = "cloudinary";  // Cloudinary ayarlarınıza göre upload preset

      // FormData oluşturuyoruz ve Cloudinary'ye göndereceğimiz verileri ekliyoruz
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "thumbnails"); // İsteğe bağlı, dosyaları organize etmek için klasör ekleyebilirsiniz

      // Cloudinary API'sine dosyayı gönderiyoruz
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Cloudinary upload failed");

      // Yükleme başarılıysa URL'yi alıyoruz
      const data = await res.json();
      const thumbnailUrl = data.secure_url; // Cloudinary'den gelen dosya URL'si

      // Yükleme işlemi tamamlandıktan sonra videonun thumbnail'ını güncelliyoruz
      const updateRes = await fetch(`/api/video/studio/videos/${videoId}/thumbnail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thumbnailUrl }), // Cloudinary URL'sini gönderiyoruz
      });

      if (!updateRes.ok) throw new Error("Failed to update thumbnail");

      toast.success("Thumbnail updated");
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while uploading thumbnail");
    } finally {
      setUploading(false);
    }
  };

  // Dosya seçildiğinde bu fonksiyon çalışacak
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadThumbnailToCloudinary(file);
    }
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div>
        <input
          type="file"
          accept="image/*" // sadece resim dosyalarını kabul et
          onChange={onFileChange}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
      </div>
    </ResponsiveModal>
  );
};
