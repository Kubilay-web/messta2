import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { mux } from "@/app/lib/mux";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const video = await db.video.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    if (!video.muxUploadId) {
      return NextResponse.json({ error: "No upload ID" }, { status: 400 });
    }

    const upload = await mux.video.uploads.retrieve(video.muxUploadId);

    if (!upload || !upload.asset_id) {
      return NextResponse.json({ error: "Upload not found" }, { status: 400 });
    }

    const asset = await mux.video.assets.retrieve(upload.asset_id);

    if (!asset) {
      return NextResponse.json({ error: "Asset not found" }, { status: 400 });
    }

    const playbackId = asset.playback_ids?.[0]?.id;
    const duration = asset.duration ? Math.round(asset.duration * 1000) : 0;

    const updatedVideo = await db.video.update({
      where: {
        id: params.id,
        userId: user.id,
      },
      data: {
        muxStatus: asset.status,
        muxPlaybackId: playbackId,
        muxAssetId: asset.id,
        duration,
      },
    });

    return NextResponse.json(updatedVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}