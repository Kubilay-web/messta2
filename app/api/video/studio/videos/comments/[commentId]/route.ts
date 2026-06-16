import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const { commentId } = params;

    if (!commentId) {
      return NextResponse.json({ error: "commentId is required" }, { status: 400 });
    }

    // MongoDB ObjectId doğrulaması
    if (!ObjectId.isValid(commentId)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Yorum var mı kontrol et
    const existing = await db.commentVideo.findUnique({
      where: { id: commentId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Yorumun sahibi olup olmadığını kontrol et
    if (existing.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Yorumun alt yorumları varsa (parentId kontrolü)
    const childComments = await db.commentVideo.findMany({
      where: { parentId: commentId },  // Alt yorumları bul
    });

    if (childComments.length > 0) {
      // Alt yorumları sil
      await Promise.all(
        childComments.map((comment) =>
          db.commentVideo.delete({
            where: { id: comment.id },
          })
        )
      );
    }

    // Yorumun reaksiyonları varsa sil
    await db.commentReaction.deleteMany({
      where: { commentId: commentId },
    });

    // Şimdi ana yorumu silebilirsiniz
    await db.commentVideo.delete({
      where: { id: commentId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE COMMENT ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
