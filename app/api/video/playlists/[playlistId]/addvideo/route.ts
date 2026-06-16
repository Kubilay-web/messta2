import { NextResponse } from 'next/server';
import db from "@/app/lib/db"
import { z } from 'zod';

const addVideoToPlaylistSchema = z.object({
  playlistId: z.string(),
  videoId: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = addVideoToPlaylistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const { playlistId, videoId } = parsed.data;

    // Video zaten playlist'te varsa hata döndür
    const existing = await db.playlistVideo.findFirst({
      where: { playlistId, videoId },
    });

    if (existing) {
      return NextResponse.json({ error: 'Video already in playlist' }, { status: 409 });
    }

    const createdPlaylistVideo = await db.playlistVideo.create({
      data: { playlistId, videoId },
    });

    return NextResponse.json(createdPlaylistVideo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
