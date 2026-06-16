import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

// Playlist'e video ekleme
export async function POST(req: NextRequest, { params }: { params: { playlistId: string; videoId: string } }) {
  const { playlistId, videoId } = params;

  try {
    // Playlist ve video var mı kontrol et
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    const video = await db.video.findUnique({
      where: { id: videoId },
    });

    if (!playlist || !video) {
      return NextResponse.json({ error: "Playlist or video not found" }, { status: 404 });
    }

    // Playlist'e video ekle
    const existingPlaylistVideo = await db.playlistVideo.findFirst({
      where: { playlistId, videoId },
    });

    if (existingPlaylistVideo) {
      return NextResponse.json({ error: "Video already in playlist" }, { status: 400 });
    }

    await db.playlistVideo.create({
      data: {
        playlistId,
        videoId,
      },
    });

    return NextResponse.json({ message: "Video added to playlist" }, { status: 200 });
  } catch (error) {
    console.error("Error adding video to playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// Playlist'ten video çıkarma
export async function DELETE(req: NextRequest, { params }: { params: { playlistId: string; videoId: string } }) {
  const { playlistId, videoId } = params;

  try {
    // Playlist ve video var mı kontrol et
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    const video = await db.video.findUnique({
      where: { id: videoId },
    });

    if (!playlist || !video) {
      return NextResponse.json({ error: "Playlist or video not found" }, { status: 404 });
    }

    // Playlist'ten video çıkar
    const playlistVideo = await db.playlistVideo.findFirst({
      where: { playlistId, videoId },
    });

    if (!playlistVideo) {
      return NextResponse.json({ error: "Video not found in playlist" }, { status: 404 });
    }

    await db.playlistVideo.delete({
      where: { id: playlistVideo.id },
    });

    return NextResponse.json({ message: "Video removed from playlist" }, { status: 200 });
  } catch (error) {
    console.error("Error removing video from playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
