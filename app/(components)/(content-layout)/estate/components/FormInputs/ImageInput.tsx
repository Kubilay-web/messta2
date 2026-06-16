"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";

type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: any;
  endpoint?: any;
  className?: string;
  size?: "sm" | "lg";
};

export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  className,
  size = "lg",
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleUpload(file);

    // Aynı dosyayı tekrar seçebilmek için input'u resetle
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const heightClass = size === "sm" ? "h-20" : "h-40";

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title}
            src={imageUrl}
            width={500}
            height={500}
            className={cn(
              `${heightClass} w-full rounded-md object-cover`,
              className
            )}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleButtonClick}
            disabled={uploading}
            className="w-full rounded-md bg-blue-600/80 py-2 text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}