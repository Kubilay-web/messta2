import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: NextRequest, { params }: { params: { commentId: string } }) {
  try {
    // Parametreyi düzgün bir şekilde alın
    const { commentId } = params;

    // Eğer commentId yoksa, hatalı yanıt dön
    if (!commentId) return NextResponse.json({ error: "Comment ID required" }, { status: 400 });

    // Kullanıcı doğrulama işlemi
    const { user } = await validateRequest();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Kullanıcı daha önce bir reaction yapmış mı diye kontrol et
    const existing = await db.commentReaction.findFirst({
      where: { userId: user.id, commentId },
    });

    if (existing?.type === "like") {
      // Zaten "like" varsa, silelim
      try {
        await db.commentReaction.delete({ where: { id: existing.id } });
      } catch (e) {
        console.warn("Comment reaction already deleted", e);
      }
    } else if (existing?.type === "dislike") {
      // "dislike" varsa, bunu "like" olarak güncelle
      await db.commentReaction.update({
        where: { id: existing.id },
        data: { type: "like" },
      });
    } else {
      // Yeni bir "like" oluştur
      await db.commentReaction.create({
        data: { userId: user.id, commentId, type: "like" },
      });
    }

    // Güncel like ve dislike sayıları
    const likeCount = await db.commentReaction.count({
      where: { commentId, type: "like" },
    });
    const dislikeCount = await db.commentReaction.count({
      where: { commentId, type: "dislike" },
    });

    // "like" silindiyse viewerReaction null olacak
    const viewerReaction = existing?.type === "like" ? null : "like";

    return NextResponse.json({ success: true, likeCount, dislikeCount, viewerReaction });

  } catch (err) {
    console.error("LIKE ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
