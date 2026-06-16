import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    // Kullanıcı doğrula
    const { user } = await validateRequest(req);

    // FormData al
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    // Blob → Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // MIME tip kontrolü
    const mime = file.type || "image/png";

    // Buffer → base64
    const base64Image = `data:${mime};base64,${buffer.toString("base64")}`;

    // Cloudinary upload
    const uploaded = await cloudinary.uploader.upload(base64Image, {
      folder: "covers",
    });

    // DB güncelle
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { cover: uploaded.secure_url },
      select: { id: true, cover: true },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Update cover error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
