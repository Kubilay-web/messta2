import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Video ID kontrolü
    if (!id) {
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid videoId format" }, { status: 400 });
    }

    // URL parametrelerini al
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const cursor = url.searchParams.get("cursor") || null;
    const parentId = url.searchParams.get("parentId"); // parentId burada alınıyor

    // Kullanıcı doğrulama
    const { user } = await validateRequest().catch(() => ({ user: null }));
    const userId = user?.id;

    // Pagination ve seçenekler
    const options: any = {
      take: limit + 1, // Bir fazla al, pagination kontrolü için
      orderBy: { createdAt: "desc" }, // Yorumları tarih sırasına göre sırala
      include: {
        user: true,
        reactions: true,
        replies: {
          include: {
            user: true,
            reactions: true,
          },
          orderBy: { createdAt: "asc" }, // Cevapları sıralamak
        },
      },
    };

    // parentId varsa, yorumları buna göre filtrele
    if (parentId) {
      options.where = { videoId: id, parentId: parentId }; // Parent ID'ye göre filtrele
    } else {
      options.where = { videoId: id, parentId: null }; // ParentId null olanları al
    }

    // Cursor'a göre sayfalama
    if (cursor) {
      options.skip = 1;
      options.cursor = { id: cursor };
    }

    // Veritabanından yorumlar
    const comments = await db.commentVideo.findMany({
      where: options.where,
      ...options,
    });

    // Pagination için nextCursor
    let nextCursor: string | null = null;
    if (comments.length > limit) {
      const extra = comments.pop(); // Fazladan alınan öğeyi çıkar
      nextCursor = extra?.id || null; // Sonraki cursor'ı belirle
    }

    // Kullanıcı tepkilerini almak
    let userReactions: any[] = [];
    if (userId) {
      userReactions = await db.commentReaction.findMany({
        where: { userId },
      });
    }

    // Yorumları frontend'e uygun formatta düzenle
    const items = comments.map((comment) => {
      const userReaction = userReactions.find(
        (r) => r.commentId.toString() === comment.id.toString()
      );

      // Tepkileri say
      const likeCount = comment.reactions.filter(r => r.type === "like").length;
      const dislikeCount = comment.reactions.filter(r => r.type === "dislike").length;

      // Cevapları say ve formatla
      const replies = comment.replies.map((reply) => {
        const replyUserReaction = userReactions.find(
          (r) => r.commentId.toString() === reply.id.toString()
        );

        const rLikeCount = reply.reactions.filter(r => r.type === "like").length;
        const rDislikeCount = reply.reactions.filter(r => r.type === "dislike").length;

        return {
          id: reply.id,
          parentId: reply.parentId,
          videoId: reply.videoId,
          value: reply.value,
          createdAt: reply.createdAt,
          user: reply.user,
          reactions: reply.reactions,
          likeCount: rLikeCount,
          dislikeCount: rDislikeCount,
          userReaction: replyUserReaction ? replyUserReaction.type : null,
        };
      });

      return {
        id: comment.id,
        parentId: comment.parentId,
        videoId: comment.videoId,
        value: comment.value,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        user: comment.user,
        reactions: comment.reactions,
        likeCount,
        dislikeCount,
        userReaction: userReaction ? userReaction.type : null,
        replies,
        repliesCount: comment.replies.length,
      };
    });

    return NextResponse.json({
      videoId: id,
      items,
      nextCursor,
    });

  } catch (err) {
    console.error("COMMENT API ERROR:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
