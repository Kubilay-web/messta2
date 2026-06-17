"use client";

// Cloudinary'ye imzasız (unsigned) tek dosya yükler ve secure_url döndürür.
// Proje genelindeki kalıbın aynısı: NEXT_PUBLIC_CLOUDINARY_PRESET_NAME + cloud name.

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export const MAX_IMAGE_MB = 10;

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!CLOUD || !PRESET) {
    throw new Error("Cloudinary yapılandırması eksik (cloud name / preset).");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Yalnızca görsel dosyaları yüklenebilir.");
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    throw new Error(`Görsel ${MAX_IMAGE_MB}MB'den küçük olmalı.`);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", PRESET);
  formData.append("folder", "sahibinden/listings");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let msg = "Görsel yüklenemedi.";
    try {
      const e = await res.json();
      msg = e?.error?.message ?? msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  const data = await res.json();
  if (!data.secure_url) throw new Error("Görsel yüklenemedi (yanıt geçersiz).");
  return data.secure_url as string;
}
