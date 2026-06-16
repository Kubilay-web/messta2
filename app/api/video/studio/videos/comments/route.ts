import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Kullanıcı oturumunu al
    const {user} = await validateRequest();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Not login." },
        { status: 401 }
      );
    }

    const userId = user.id;

    // İstekten JSON al
    const { videoId, value, parentId } = await req.json();

    // Zorunlu alan kontrolü
    if (!videoId || !value) {
      return NextResponse.json(
        { error: "Eksik alan: videoId veya value" },
        { status: 400 }
      );
    }

    if (typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json(
        { error: "Geçersiz yorum değeri" },
        { status: 400 }
      );
    }

    if (parentId && typeof parentId !== "string") {
      return NextResponse.json(
        { error: "Geçersiz parentId" },
        { status: 400 }
      );
    }

    // Veritabanına kaydet
    const createdComment = await db.commentVideo.create({
      data: {
        userId,
        videoId,
        parentId: parentId || null,
        value,
      },
    });

    return NextResponse.json(createdComment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
