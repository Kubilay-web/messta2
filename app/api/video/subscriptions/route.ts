import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client
import { validateRequest } from "@/app/auth";

const DEFAULT_LIMIT = 30; // Ön tanımlı limit

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const { user } = await validateRequest();
    const viewerId = user?.id; // Hangi kullanıcının abonelikleri
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
    const cursor = url.searchParams.get("cursor");

    if (!viewerId) {
      return NextResponse.json({ error: "viewerId gerekli" }, { status: 400 });
    }

    // MongoDB ObjectId string olduğu için cursor'ü kullanacağız
    const subscriptions = await db.subscription.findMany({
      where: { viewerId },
      take: limit + 1, // hasMore kontrolü için bir fazla al
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        creator: {
          include: {
            subscriptions: true, // subscriber sayısı için
            videos: true, // video sayısı için
          },
        },
      },
    });

    const hasMore = subscriptions.length > limit;
    const items = hasMore ? subscriptions.slice(0, -1) : subscriptions;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    // Frontend ile uyumlu format
    const formattedItems = await Promise.all(
      items.map(async (sub) => {
        const subscriberCount = await db.subscription.count({
          where: { creatorId: sub.creatorId },
        });

        return {
          creatorId: sub.creatorId,
          user: {
            id: sub.creator.id,
            name: sub.creator.username,
            imageUrl: sub.creator.avatarUrl || "",
            subscriberCount,
            videoCount: sub.creator.videos?.length || 0,
          },
        };
      })
    );

    return NextResponse.json({
      items: formattedItems,
      nextCursor,
      hasMore,
    });
  } catch (error) {
    console.error("Abonelikler alınamadı:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}



