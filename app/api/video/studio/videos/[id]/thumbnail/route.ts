import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import cloudinary from "cloudinary";

// Cloudinary konfigürasyonu
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,  // Cloudinary Cloud Name
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,        // Cloudinary API Key
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET   // Cloudinary API Secret
});

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Video ID'yi alıyoruz
        const { id: videoId } = context.params;


    // Kullanıcı doğrulama
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Video kontrolü
    const video = await db.video.findFirst({
      where: {
        id: videoId,
        userId: user.id,
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Cloudinary'ye yükleme işlemi
    const { thumbnailUrl } = await req.json();  // Frontend'den gelen URL

    if (!thumbnailUrl) {
      return NextResponse.json({ error: "Thumbnail URL is required" }, { status: 400 });
    }

    // Veritabanındaki video kaydını güncelliyoruz
    const updatedVideo = await db.video.update({
      where: {
        id: videoId,
        userId: user.id,
      },
      data: {
        thumbnailUrl,
        thumbnailKey: thumbnailUrl.split("/").pop(), // URL'nin son kısmını key olarak alıyoruz
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
