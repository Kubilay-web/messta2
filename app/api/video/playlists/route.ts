import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";


export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "20");
    const cursor = searchParams.get("cursor");
    const videoId = searchParams.get("videoId") || null;

    // Playlistleri alıyoruz
    const playlists = await db.playlist.findMany({
      take: limit + 1, // pagination için bir fazla
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        playlistVideos: {
          include: {
            video: true,
          },
        },
      },
    });

    // Pagination
    const hasMore = playlists.length > limit;
    const items = hasMore ? playlists.slice(0, -1) : playlists;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    // FRONTEND’İN BEKLEDİĞİ ŞEKİLDE TRANSFORM EDİYORUZ
    const transformed = items.map((p) => ({
      id: p.id,
      name: p.name,
      thumbnailUrl:
        p.playlistVideos[0]?.video?.thumbnailUrl || null, // playlistte video yoksa null
      videoCount: p.playlistVideos.length,
      containsVideo: videoId
        ? p.playlistVideos.some((pv) => pv.videoId === videoId)
        : false,
    }));

    return NextResponse.json(
      {
        items: transformed,
        nextCursor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


// POST API: Yeni bir playlist oluştur
export async function POST(req: NextRequest) {
  try {
    const { name, description, userId } = await req.json();

    // Zorunlu alanların kontrolü
    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and userId are required" },
        { status: 400 }
      );
    }

    // Yeni playlist oluşturuluyor
    const newPlaylist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    return NextResponse.json(newPlaylist, { status: 201 });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// POST API: Videoyu playlist'e ekle
export async function PUT(req: NextRequest) {
  try {
    const { playlistId, videoId } = await req.json();

    // Zorunlu alanların kontrolü
    if (!playlistId || !videoId) {
      return NextResponse.json(
        { error: "PlaylistId and VideoId are required" },
        { status: 400 }
      );
    }

    // Playlist ve video ilişkilendiriliyor
    const playlistVideo = await db.playlistVideo.create({
      data: {
        playlistId,
        videoId,
      },
    });

    return NextResponse.json(playlistVideo, { status: 201 });
  } catch (error) {
    console.error("Error adding video to playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE API: Videoyu playlist'ten çıkar
export async function DELETE(req: NextRequest) {
  try {
    const { playlistId, videoId } = await req.json();

    // Zorunlu alanların kontrolü
    if (!playlistId || !videoId) {
      return NextResponse.json(
        { error: "PlaylistId and VideoId are required" },
        { status: 400 }
      );
    }

    // Playlist'ten video çıkarılıyor
    await db.playlistVideo.deleteMany({
      where: {
        playlistId,
        videoId,
      },
    });

    return NextResponse.json({ message: "Video removed from playlist" }, { status: 200 });
  } catch (error) {
    console.error("Error removing video from playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
