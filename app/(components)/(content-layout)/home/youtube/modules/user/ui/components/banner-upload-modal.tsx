"use client";

import { useState } from "react";
import { ResponsiveModal } from "../../../../components/responsive-modal";

interface BannerUploadModalProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BannerUploadModal = ({
  userId,
  open,
  onOpenChange,
}: BannerUploadModalProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cloudinary"); // Cloudinary preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");

      // API'ye POST atarak kullanıcı bannerını güncelle
      const updateRes = await fetch(
        `/api/video/users/update-banner?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bannerUrl: data.secure_url }),
        }
      );

      if (!updateRes.ok) throw new Error("Failed to update user banner");

      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert("Banner upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ResponsiveModal
      title="Upload a banner"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div>
        <button
          type="button"
          onClick={() => document.getElementById("fileInput")?.click()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          disabled={uploading}
        >
          Choose a file
        </button>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
        {uploading && (
          <p className="text-sm text-gray-500 mt-2">Uploading...</p>
        )}
      </div>
      {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </ResponsiveModal>
  );
};
