import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary yapılandırması (env değişkenleri kullan)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Cloudinary'den resim silme fonksiyonu
async function deleteImageFromCloudinary(url: string) {
  try {
    // URL'den publicId'yi çıkar
    // Örnek URL: https://res.cloudinary.com/demo/image/upload/v1681234567/folder/image.jpg
    const parts = url.split("/");
    const filename = parts[parts.length - 1]; // image.jpg
    const publicId = url
      .split("/")
      .slice(-2)
      .join("/")
      .replace(/\.[^/.]+$/, ""); // folder/image

    await cloudinary.uploader.destroy(publicId);
    console.log("Deleted image from Cloudinary:", publicId);
  } catch (err) {
    console.error("Cloudinary delete failed for", url, err);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const postId = params.id;

    // Post'u bul ve user kontrolü yap
    const post = await db.postSocial.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    if (post.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "You can only delete your own posts" },
        { status: 403 }
      );
    }

    // Cloudinary'deki resimleri sil
    if (post.images && post.images.length > 0) {
      for (const imageUrl of post.images) {
        await deleteImageFromCloudinary(imageUrl);
      }
    }

    // Cascade delete sayesinde tüm ilişkili yorum, like, saved post otomatik silinecek
    await db.postSocial.delete({ where: { id: postId } });

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete post error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
