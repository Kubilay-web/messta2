import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"; // <- Prisma client burada tanımlı

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = params.postId;

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    // 1. Reaksiyonları sil
    await db.react.deleteMany({
      where: { postRefId: postId },
    });

    // 2. Yorumları sil
    await db.commentSocial.deleteMany({
      where: { postId },
    });

    // 3. Kaydedilenler (SavedPost) sil
    await db.savedPost.deleteMany({
      where: { postId },
    });

    // 4. Postu sil
    await db.postSocial.delete({
      where: { id: postId },
    });

    return NextResponse.json({ status: "ok", message: "Post deleted" });
  } catch (error) {
    console.error("deletePost error:", error);
    return NextResponse.json(
      { error: "Failed to delete post", details: error.message },
      { status: 500 }
    );
  }
}
