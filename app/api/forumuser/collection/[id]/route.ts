import { NextResponse } from "next/server";
import db from "@/app/lib/db";

import { revalidatePath } from "next/cache";
import { validateRequest } from "@/app/auth";

// PATCH: Soruyu kaydet veya kaldır
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const questionId = params.id;

    const question = await db.questionForum.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      return NextResponse.json({ error: "Soru bulunamadı" }, { status: 404 });
    }

    const existing = await db.collectionForum.findFirst({
      where: {
        questionId,
        userId,
      },
    });

    if (existing) {
      await db.collectionForum.delete({
        where: { id: existing.id },
      });

      revalidatePath(`/forum/${questionId}`);
      return NextResponse.json({ saved: false }, { status: 200 });
    }

    await db.collectionForum.create({
      data: {
        userId,
        questionId,
      },
    });

    revalidatePath(`/forum/${questionId}`);
    return NextResponse.json({ saved: true }, { status: 200 });
  } catch (error: any) {
    console.error("toggleSaveQuestion Hatası:", error);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }
}

// GET: Soru kaydedilmiş mi kontrol et
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;
    const questionId = params.id;

    const saved = await db.collectionForum.findFirst({
      where: {
        questionId,
        userId,
      },
    });

    return NextResponse.json({ saved: !!saved }, { status: 200 });
  } catch (error: any) {
    console.error("hasSavedQuestion Hatası:", error);
    return NextResponse.json({ error: "Kontrol başarısız" }, { status: 500 });
  }
}
