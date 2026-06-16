import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const news_id = params.id;

  if (!news_id || !ObjectId.isValid(news_id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    // Haber detaylarını bul
    const existingNews = await db.news.findUnique({
      where: { id: news_id },
    });

    if (!existingNews) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    // Cloudinary'den görseli sil
    if (existingNews.image) {
      const segments = existingNews.image.split("/");
      const filename = segments[segments.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(`news_images/${filename}`);
    }

    // Haberi veritabanından sil
    await db.news.delete({
      where: { id: news_id },
    });

    return NextResponse.json(
      { message: "News deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
