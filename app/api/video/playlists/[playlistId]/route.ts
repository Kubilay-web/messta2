import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db"; 

// Playlist ve videolarını almak
export async function GET(req: NextRequest, context: { params: any }) {
  const { playlistId } = await context.params; // ✅ unwrap et

  try {
    // Playlist verisini al
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
      include: {
        playlistVideos: {
          include: {
            video: true, // Videoları dahil et
          },
        },
      },
    });

    if (!playlist) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    // Playlist'i ve videoları döndür
    return NextResponse.json({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      videos: playlist.playlistVideos.map((playlistVideo) => ({
        videoId: playlistVideo.video.id,
        title: playlistVideo.video.title,
        thumbnailUrl: playlistVideo.video.thumbnailUrl,
        duration: playlistVideo.video.duration,
      })),
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}



// Playlist'i tamamen silme
export async function DELETE(
  req: NextRequest,
  context: { params: { playlistId: string } }
) {
  const { playlistId } = context.params;

  // Gerekli parametre kontrolü
  if (!playlistId) {
    return NextResponse.json(
      { error: "PlaylistId is required" },
      { status: 400 }
    );
  }

  try {
    // Playlist var mı kontrol et
    const playlist = await db.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist) {
      return NextResponse.json(
        { error: "Playlist not found" },
        { status: 404 }
      );
    }

    // Playlist'e ait videoları sil
    await db.playlistVideo.deleteMany({
      where: { playlistId },
    });

    // Playlist'i sil
    await db.playlist.delete({
      where: { id: playlistId },
    });

    return NextResponse.json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
