import { NextResponse } from 'next/server';
import db from "@/app/lib/db"
import { z } from 'zod';

const removeVideoFromPlaylistSchema = z.object({
  playlistId: z.string(),
  videoId: z.string(),
});

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const parsed = removeVideoFromPlaylistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { playlistId, videoId } = parsed.data;

    // PlaylistVideo ilişkisi var mı kontrol et
    const existingPlaylistVideo = await db.playlistVideo.findFirst({
      where: { playlistId, videoId },
    });

    if (!existingPlaylistVideo) {
      return NextResponse.json({ error: 'Video not found in playlist' }, { status: 404 });
    }

    const deletedPlaylistVideo = await db.playlistVideo.delete({
      where: { id: existingPlaylistVideo.id },
    });

    return NextResponse.json(deletedPlaylistVideo, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
