import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary konfigürasyonu
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Base64'i Cloudinary'e yükleme fonksiyonu
const uploadBase64ToCloudinary = async (
  base64Data: string,
  type: "image" | "video" = "image"
): Promise<string> => {
  try {
    const uploadResult = await cloudinary.uploader.upload(base64Data, {
      resource_type: type,
      folder: "social-posts",
      transformation:
        type === "image" ? [{ width: 1000, height: 1000, crop: "limit" }] : [],
    });

    return uploadResult.secure_url; // Yüklenen medya URL'sini döndürüyoruz
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// POST /api/postsocial - Cloudinary ile yeni post oluştur
export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    let { text, images = [], videos = [], background, type } = body;

    // Base64 resimleri Cloudinary'e yükle
    const cloudinaryUrls: string[] = [];

    if (images && images.length > 0) {
      for (const image of images) {
        if (typeof image === "string" && image.startsWith("data:")) {
          try {
            // Dosya tipini belirle (image veya video)
            const fileType = image.includes("data:video") ? "video" : "image";

            const cloudinaryUrl = await uploadBase64ToCloudinary(
              image,
              fileType
            );
            cloudinaryUrls.push(cloudinaryUrl);
          } catch (uploadError) {
            console.error("Cloudinary upload failed:", uploadError);
            // Hata durumunda orijinal base64'ü ekle (ama tavsiye edilmez)
            cloudinaryUrls.push(image); // Veya hata mesajı döndürülebilir.
          }
        } else if (typeof image === "string") {
          // Zaten URL ise direkt ekle
          cloudinaryUrls.push(image);
        }
      }
    }

    // Yeni post oluştur (Cloudinary URL'leri ile)
    const post = await db.postSocial.create({
      data: {
        type,
        text,
        images: cloudinaryUrls, // Cloudinary URL'leri
        videos: videos,
        background,
        userId: user.id,
        createdAt: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        createdAt: post.createdAt,
        caption: post.text,
        images: post.images,
        background: post.background,
        type: post.type,
        user: {
          id: post.user.id,
          name: post.user.displayName || post.user.username,
          avatar: post.user.avatarUrl,
        },
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        isSaved: false,
        comments: [],
        reacts: [],
      },
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create post",
      },
      { status: 500 }
    );
  }
}
