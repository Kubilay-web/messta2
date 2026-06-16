// app/api/video/playlists/[playlistId]/videos/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { playlistId: string } }
) {
  const { playlistId } = params;
  const { searchParams } = new URL(req.url);

  const limit = parseInt(searchParams.get("limit") || "20", 10);
  let cursor = searchParams.get("cursor") || null;

  if (!cursor || cursor === "undefined") cursor = null;

  if (!playlistId) {
    return NextResponse.json(
      { error: "playlistId is required" },
      { status: 400 }
    );
  }

  try {
    const playlistVideos = await db.playlistVideo.findMany({
      where: { playlistId },
      take: limit + 1,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      include: {
        video: {
          include: {
            user: true,
            views: true,
            reactions: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    const hasNextPage = playlistVideos.length > limit;
    const items = hasNextPage ? playlistVideos.slice(0, -1) : playlistVideos;
    const nextCursor = hasNextPage ? items[items.length - 1].id : null;

    return NextResponse.json({
      items: items.map((pv) => ({
        id: pv.video.id, // ✅ frontend ile uyumlu
        title: pv.video.title,
        thumbnailUrl: pv.video.thumbnailUrl,
        duration: pv.video.duration,
        previewUrl: pv.video.previewUrl ?? "",
        user: {
          avatarUrl: pv.video.user.avatarUrl ?? "",
          username: pv.video.user.username ?? "Unknown",
        },
        viewsCount: pv.video.views.length,
        likesCount: pv.video.reactions.length,
        description: pv.video.description ?? "",
        createdAt: pv.video.createdAt?.toISOString() ?? null, // ✅ burada ekledik
      })),
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching playlist videos:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
