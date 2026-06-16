import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const limit = parseInt(searchParams.get("limit") || "20");

    // -------------------------------------------------
    // 1) Tüm videoları visibility=public olarak çek
    // NOT: Prisma + MongoDB JOIN desteklemediği için include yok!
    // -------------------------------------------------

    let videos = await db.video.findMany({
      where: { visibility: "public" },
      orderBy: { createdAt: "desc" },
    });

    if (!videos.length) {
      return NextResponse.json({ items: [], nextCursor: null });
    }

    // -------------------------------------------------
    // 2) HER VIDEO İÇİN viewCount, like, dislike al
    // -------------------------------------------------

    const videosWithStats = await Promise.all(
      videos.map(async (v) => {
        const [views, likes, dislikes, user] = await Promise.all([
          db.videoView.count({ where: { videoId: v.id } }),
          db.videoReaction.count({
            where: { videoId: v.id, type: "like" },
          }),
          db.videoReaction.count({
            where: { videoId: v.id, type: "dislike" },
          }),
          db.user.findUnique({ where: { id: v.userId } }),
        ]);

        const score = views + likes * 2 - dislikes * 1;

        return {
          ...v,
          user,
          viewCount: views,
          likeCount: likes,
          dislikeCount: dislikes,
          score,
        };
      })
    );

    // -------------------------------------------------
    // 3) Trending sıralaması (skor → createdAt → id)
    // -------------------------------------------------

    videosWithStats.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    // -------------------------------------------------
    // 4) CURSOR BASED PAGINATION
    // -------------------------------------------------

    let startIndex = 0;

    if (cursor) {
      startIndex = videosWithStats.findIndex((v) => v.id === cursor) + 1;
    }

    const paginated = videosWithStats.slice(startIndex, startIndex + limit + 1);

    const hasMore = paginated.length > limit;
    const items = hasMore ? paginated.slice(0, -1) : paginated;

    const nextCursor = hasMore ? items[items.length - 1].id : null;

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    return NextResponse.json({
      items,
      nextCursor,
    });
  } catch (error) {
    console.error("TRENDING API ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
