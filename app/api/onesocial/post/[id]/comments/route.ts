import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// GET /api/postsocial/[id]/comments - Post'un yorumlarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await validateRequest();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const comments = await db.commentSocial.findMany({
      where: { postId: params.id },
      include: {
        commentBy: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { commentAt: "desc" },
      skip,
      take: limit,
    });

    const totalComments = await db.commentSocial.count({
      where: { postId: params.id },
    });

    return NextResponse.json({
      success: true,
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.comment,
        image: comment.image,
        createdAt: comment.commentAt,
        user: {
          id: comment.commentBy.id,
          name: comment.commentBy.displayName || comment.commentBy.username,
          avatar: comment.commentBy.avatarUrl,
        },
      })),
      pagination: {
        page,
        limit,
        total: totalComments,
        totalPages: Math.ceil(totalComments / limit),
        hasMore: skip + limit < totalComments,
      },
    });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch comments",
      },
      { status: 500 }
    );
  }
}

// POST /api/postsocial/[id]/comments - Yeni yorum ekle



export async function POST(
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

    const body = await request.json();
    const { comment, image } = body;

    if (!comment?.trim()) {
      return NextResponse.json(
        { success: false, error: "Comment content is required" },
        { status: 400 }
      );
    }

    // ✅ 1. Yorumu oluştur
    const createdComment = await db.commentSocial.create({
      data: {
        comment: comment.trim(),
        image: image ?? null,
        commentById: user.id,
        postId: params.id,
        commentAt: new Date(),
      },
      include: {
        commentBy: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        post: {
          select: { userId: true },
        },
      },
    });

    // ✅ 2. Bildirim (post sahibine)
    if (createdComment.post.userId !== user.id) {
      await db.notificationSocial.create({
        data: {
          type: "comment",
          message: "commented on your post",
          fromUserId: user.id,
          toUserId: createdComment.post.userId,
          postId: params.id,
          isRead: false,
          createdAt: new Date(),
        },
      });
    }

    // ✅ 3. FRONTEND’İN BEKLEDİĞİ FORMATTA DÖN
    return NextResponse.json({
      success: true,
      comment: {
        id: createdComment.id,
        comment: createdComment.comment,
        commentAt: createdComment.commentAt,
        image: createdComment.image,
        commentBy: {
          id: createdComment.commentBy.id,
          username:
            createdComment.commentBy.displayName ||
            createdComment.commentBy.username,
          avatarUrl: createdComment.commentBy.avatarUrl,
        },
      },
    });
  } catch (error) {
    console.error("Add comment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
