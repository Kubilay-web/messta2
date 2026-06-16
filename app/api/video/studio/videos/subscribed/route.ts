import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  // Kullanıcı doğrulama
  const { user } = await validateRequest();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId } = await req.json();
  if (!userId)
    return NextResponse.json({ error: "userId required" }, { status: 400 });

  // Eğer kendi videoma abone olmak istemiyorsan aç
  if (userId === user.id) {
    return NextResponse.json(
      { error: "No subscription own video." },
      { status: 400 }
    );
  }

  // Mevcut aboneliği kontrol et
  const existing = await db.subscription.findFirst({
    where: { viewerId: user.id, creatorId: userId },
  });

  if (existing) {
    // Abonelik varsa sil
    await db.subscription.delete({ where: { id: existing.id } });
  } else {
    // Abonelik yoksa oluştur
    await db.subscription.create({
      data: {
        viewerId: user.id,
        creatorId: userId,
      },
    });
  }

  return NextResponse.json({ isSubscribed: !existing });
}

// DELETE: Abonelik silme
export async function DELETE(req: Request) {
  const { user } = await validateRequest();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId gerekli" }, { status: 400 });

  // Kendi aboneliğini silmek mantıklı değil
  if (userId === user.id)
    return NextResponse.json(
      { error: "Kendi aboneliğini silemezsin" },
      { status: 400 }
    );

  const deleted = await db.subscription.deleteMany({
    where: { viewerId: user.id, creatorId: userId },
  });

  return NextResponse.json({ deleted });
}

/////////////////////////////////////////////////////////////////////////

const LIMIT_DEFAULT = 20;

export async function GET(req: Request) {
  try {
    // Kullanıcı doğrulama
    const { user } = await validateRequest();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || `${LIMIT_DEFAULT}`);
    const cursor = url.searchParams.get("cursor");

    // Kullanıcının abone olduğu kanalları al
    const subscriptions = await db.subscription.findMany({
      where: { viewerId: user.id },
      select: { creatorId: true },
    });

    if (!subscriptions.length) {
      return NextResponse.json({ items: [], nextCursor: null });
    }

    const creatorIds = subscriptions.map((s) => s.creatorId);

    // Videoları al
    let videos;
    if (!cursor) {
      videos = await db.video.findMany({
        where: { userId: { in: creatorIds }, visibility: "public" },
        take: limit + 1,
        orderBy: { createdAt: "desc" },
      });
    } else {
      const lastVideo = await db.video.findUnique({ where: { id: cursor } });
      if (!lastVideo) return NextResponse.json({ items: [], nextCursor: null });

      videos = await db.video.findMany({
        where: {
          userId: { in: creatorIds },
          visibility: "public",
          createdAt: { lt: lastVideo.createdAt },
        },
        take: limit + 1,
        orderBy: { createdAt: "desc" },
      });
    }

    if (!videos.length)
      return NextResponse.json({ items: [], nextCursor: null });

    // Video istatistiklerini al
    const items = await Promise.all(
      videos.slice(0, limit).map(async (video) => {
        const [views, likes, dislikes, user] = await Promise.all([
          db.videoView.count({ where: { videoId: video.id } }),
          db.videoReaction.count({
            where: { videoId: video.id, type: "like" },
          }),
          db.videoReaction.count({
            where: { videoId: video.id, type: "dislike" },
          }),
          db.user.findUnique({ where: { id: video.userId } }),
        ]);

        return {
          ...video,
          user,
          viewCount: views,
          likeCount: likes,
          dislikeCount: dislikes,
        };
      })
    );

    const hasMore = videos.length > limit;
    const nextCursor = hasMore ? videos[limit].id : null;

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    console.error("GET /subscribed/videos error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
