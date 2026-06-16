import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { file } = await req.json();
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 400 });
    }

    // Cloudinary upload
    const uploadRes = await cloudinary.uploader.upload(file, {
      folder: "profile_pictures",
      format: "jpg",
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    });

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { avatarUrl: uploadRes.secure_url },
    });

    return NextResponse.json({
      avatarUrl: updatedUser.avatarUrl,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
