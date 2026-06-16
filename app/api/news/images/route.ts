// örnek (Next.js API route için)
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { v2 as cloudinary } from "cloudinary";

export async function GET(req: Request) {
  try {
    const { user } = await validateRequest();

    // user.id burada User tablosundaki id olmalı (ObjectId)
    // Önce Writer'ı bul:
    const writer = await db.writer.findUnique({
      where: { userId: user.id }, // user.id User tablosundan gelen id olmalı
    });

    if (!writer) {
      return NextResponse.json(
        { success: false, message: "Writer not found" },
        { status: 404 },
      );
    }

    // Writer'ın ObjectId'si writer.id
    const images = await db.image.findMany({
      where: { writerId: writer.id }, // burada geçerli ObjectId kullanıyoruz
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { message: "Images array is required" },
        { status: 400 },
      );
    }

    const writer = await db.writer.findUnique({
      where: { userId: user.id },
    });

    if (!writer) {
      return NextResponse.json(
        { message: "Writer not found" },
        { status: 404 },
      );
    }

    const uploadedImages = [];

    for (const image of images) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "news_images",
      });

      const createdImage = await db.image.create({
        data: {
          writerId: writer.id,
          url: uploadRes.secure_url,
        },
      });

      uploadedImages.push(createdImage);
    }

    return NextResponse.json(
      { message: "Images Uploaded Successfully", images: uploadedImages },
      { status: 201 },
    );
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
