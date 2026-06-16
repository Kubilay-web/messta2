import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth"; // kendi token kontrol fonksiyonun

// GET /api/social/saved-posts
export async function GET() {
  try {
    // 🔹 Login olmuş kullanıcıyı al
    const { user } = await validateRequest(); // validateRequest() genelde { user } döner
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔹 Kullanıcının SavedPost kayıtlarını al
    const savedPosts = await db.savedPost.findMany({
      where: { userId: user.id },
      include: {
        post: {
          include: {
            user: true,         // gönderiyi paylaşan kullanıcı
            comments: {
              include: {
                commentBy: true // yorum yapan kullanıcı
              },
            },
            React: {
              include: {
                reactBy: true   // kim beğenmiş
              },
            },
          },
        },
      },
      orderBy: { savedAt: "desc" },
    });

    return NextResponse.json({ savedPosts });
  } catch (error) {
    console.error("❌ SavedPosts Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
