import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import db from "@/app/lib/db";

// Cloudinary URL'sinden public_id'yi çıkartma
function getCloudinaryPublicId(url: string) {
  if (!url) return null;
  
  try {
    // URL'yi parse ediyoruz
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    
    // 'upload' kelimesinden sonraki kısmı al
    const uploadIndex = pathParts.indexOf('upload');
    if (uploadIndex === -1) return null;
    
    // Versiyon numarasını atla (v1770892023)
    let publicIdParts = pathParts.slice(uploadIndex + 2);
    const publicIdWithExtension = publicIdParts.join('/');
    
    // Uzantıyı kaldır
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
    
    return publicId;
  } catch (error) {
    console.error("Public ID çıkarma hatası:", error);
    return null;
  }
}

// Dosya türünü belirleme
function getResourceType(url: string): "image" | "video" | "raw" | "auto" {
  if (!url) return "auto";
  
  // Dosya uzantısına göre resource type belirle
  const extension = url.split('.').pop()?.toLowerCase() || '';
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(extension)) {
    return "image";
  } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension)) {
    return "video";
  } else {
    return "raw"; // PDF, DOC, XLS, TXT vb. dosyalar için
  }
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { doctorId, fileUrl } = await req.json();

    if (!doctorId || !fileUrl) {
      return NextResponse.json(
        { error: "Doctor ID ve dosya URL'si gerekli" },
        { status: 400 }
      );
    }

    // 1️⃣ Cloudinary public_id'yi al
    const public_id = getCloudinaryPublicId(fileUrl);
    
    if (!public_id) {
      console.error("Geçersiz public_id:", fileUrl);
      return NextResponse.json(
        { error: "Dosya public_id'si alınamadı" },
        { status: 400 }
      );
    }

    // 2️⃣ Dosya türünü belirle
    const resource_type = getResourceType(fileUrl);
    
    console.log("Silme işlemi başlıyor:", { public_id, resource_type, fileUrl });

    // 3️⃣ Cloudinary'den dosyayı sil
    try {
      const result = await cloudinary.uploader.destroy(public_id, {
        resource_type: resource_type,
        invalidate: true,
      });
      
      console.log("Cloudinary silme sonucu:", result);
      
      if (result.result !== "ok" && result.result !== "not found") {
        throw new Error(`Cloudinary silme hatası: ${result.result}`);
      }
    } catch (cloudinaryError) {
      console.error("Cloudinary silme hatası:", cloudinaryError);
    }

    // 4️⃣ Doktoru bul
    const doctor = await db.doctorProfile.findUnique({
      where: { id: doctorId },
      select: { boardCertificates: true }
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "Doktor bulunamadı" },
        { status: 404 }
      );
    }

    // 5️⃣ URL'yi array'den çıkar
    const updatedCertificates = doctor.boardCertificates.filter(
      (url: string) => url !== fileUrl
    );

    // 6️⃣ Doktoru güncelle
    await db.doctorProfile.update({
      where: { id: doctorId },
      data: {
        boardCertificates: updatedCertificates,
      },
    });

    return NextResponse.json({ 
      success: true,
      message: "Dosya başarıyla silindi" 
    });

  } catch (error) {
    console.error("SİLME HATASI:", error);
    return NextResponse.json(
      { error: "Dosya silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
