import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth"; // Giriş yapan kullanıcıyı almak için

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const limit = Number(url.searchParams.get("limit") || 20);
    const cursor = url.searchParams.get("cursor");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const { user: currentUser } = await validateRequest(); // giriş yapan kullanıcı
    const currentUserId = currentUser?.id;

    // Kullanıcının videoları
    const videos = await db.video.findMany({
      where: { userId },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          include: {
            videos: true, // videoCount
          },
        },
        views: true,
      },
    });

    const hasMore = videos.length > limit;
    const items = hasMore ? videos.slice(0, -1) : videos;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    // Kullanıcıya abonelik bilgilerini ekle
    const subscriberCount = await db.subscription.count({
      where: { creatorId: userId },
    });

    const viewerSubscribed = currentUserId
      ? !!(await db.subscription.findFirst({
          where: { creatorId: userId, viewerId: currentUserId },
        }))
      : false;

    const formattedItems = items.map((video) => ({
      data: {
        ...video,
        viewCount: video.views.length,
        createdAt: video.createdAt.toISOString(),
        updatedAt: video.updatedAt.toISOString(),
        user: {
          ...video.user,
          subscriberCount,
          videoCount: video.user.videos.length,
          viewerSubscribed,
          createdAt: video.user.createdAt.toISOString(),
          updatedAt: video.user.updatedAt.toISOString(),
        },
      },
    }));

    return NextResponse.json({
      items: formattedItems,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
