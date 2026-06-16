import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { ObjectId } from "mongodb";

interface Context {
  params: Promise<{ id: string }>;
}

// ---------------------- GET ----------------------




export async function GET(req: NextRequest, context: Context) {
  try {
    const { id: rawId } = await context.params;
    const id = rawId.split(":")[0]; // "ABC:200" -> "ABC"

    const { user } = await validateRequest();
    const userId = user?.id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
    }

    // Video'yu al ve tüm reaksiyonları dahil et
    const video = await db.video.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            _count: { select: { subscribers: true } },
          },
        },
        _count: {
          select: { views: true },
        },
        reactions: true, // tüm reaksiyonları al
      },
    });

    if (!video)
      return NextResponse.json({ error: "Video not found" }, { status: 404 });

    // Viewer bilgileri
    let viewerReaction = null;
    let viewerSubscribed = false;

    if (userId) {
      const reaction = await db.videoReaction.findFirst({
        where: { videoId: id, userId },
      });
      if (reaction) viewerReaction = reaction.type;

      const subscription = await db.subscription.findFirst({
        where: { viewerId: userId, creatorId: video.userId },
      });

      viewerSubscribed = !!subscription;
    }

    // Like ve dislike sayısını hesapla
    const likeCount = video.reactions.filter(r => r.type === "like").length;
    const dislikeCount = video.reactions.filter(r => r.type === "dislike").length;

    return NextResponse.json({
      ...video,
      user: {
        ...video.user,
        subscriberCount: video.user._count.subscribers,
        viewerSubscribed,
        isOwner: userId === video.userId, // isOwner'ı ekliyoruz
      },
      viewCount: video._count.views,
      likeCount,
      dislikeCount,
      viewerReaction,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



// ---------------------- PUT ----------------------
export async function PUT(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const { user } = await validateRequest();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const video = await db.video.update({
      where: { id, userId: user.id },
      data: {
        title: body.title,
        description: body.description,
        categoryId: body.categoryId || null,
        visibility: body.visibility,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Video not found or unauthorized" },
      { status: 404 }
    );
  }
}

// ---------------------- DELETE ----------------------
export async function DELETE(req: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    const { user } = await validateRequest();

    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const video = await db.video.delete({
      where: { id, userId: user.id },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Video not found or unauthorized" },
      { status: 404 }
    );
  }
}
