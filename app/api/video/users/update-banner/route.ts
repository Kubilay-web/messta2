import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import db from "@/app/lib/db"; // Prisma client

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const { bannerUrl } = await request.json();

    if (!userId || !bannerUrl) {
      return NextResponse.json({ error: "userId and bannerUrl are required" }, { status: 400 });
    }

    // Banner URL'i doğrudan Cloudinary'den gelen URL ile güncelle
    await db.user.update({
      where: { id: userId },
      data: { bannerUrl },
    });

    return NextResponse.json({ message: "Banner updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
