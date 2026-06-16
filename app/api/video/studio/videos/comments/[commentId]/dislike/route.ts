import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest, { params }: { params: { commentId: string } }) {
  try {
    const { commentId } = params;
    if (!commentId) return NextResponse.json({ error: "Comment ID required" }, { status: 400 });

    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Var olan reaction kontrolü
    const existing = await db.commentReaction.findFirst({
      where: { userId: user.id, commentId },
    });

    if (existing?.type === "dislike") {
      // Zaten dislike varsa sil
      try {
        await db.commentReaction.delete({ where: { id: existing.id } });
      } catch (e) {
        // Silinmemişse ignore et
        console.warn("Comment reaction already deleted", e);
      }
    } else if (existing?.type === "like") {
      // like → dislike olarak güncelle
      await db.commentReaction.update({
        where: { id: existing.id },
        data: { type: "dislike" },
      });
    } else {
      // Yeni dislike oluştur
      await db.commentReaction.create({
        data: { userId: user.id, commentId, type: "dislike" },
      });
    }

    // Güncel sayılar ve viewerReaction
    const likeCount = await db.commentReaction.count({
      where: { commentId, type: "like" },
    });
    const dislikeCount = await db.commentReaction.count({
      where: { commentId, type: "dislike" },
    });

    // Eğer toggle ile dislike silindiyse viewerReaction null olur
    const viewerReaction = existing?.type === "dislike" ? null : "dislike";

    return NextResponse.json({ success: true, likeCount, dislikeCount, viewerReaction });

  } catch (err) {
    console.error("DISLIKE ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
