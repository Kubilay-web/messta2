import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "ID parametresi eksik" },
        { status: 400 },
      );
    }

    const question = await db.questionForum.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatarUrl: true, // opsiyonel: UserAvatar için kullanışlı
          },
        },
        tagQuestions: {
          include: {
            tag: true, // Tag verisini alıyoruz
          },
        },
      },
    });

    if (!question) {
      return NextResponse.json({ error: "Soru bulunamadı" }, { status: 404 });
    }

    // Tag'leri daha okunabilir şekilde sadeleştir (opsiyonel ama frontend için kolaylık sağlar)
    const tags = question.tagQuestions.map((tq) => tq.tag);

    return NextResponse.json(
      {
        ...question,
        tags, // Eklenen tag listesi
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Soru getirilirken hata:", error);
    return NextResponse.json({ error: "Soru getirilemedi" }, { status: 500 });
  }
}

const IncrementViewsSchema = z.object({
  id: z.string(),
});

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const parsed = IncrementViewsSchema.safeParse({ id });
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Geçersiz ID parametresi" },
        { status: 400 },
      );
    }

    const updatedQuestion = await db.questionForum.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        id: true,
        views: true,
      },
    });

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error: any) {
    console.error("View artırılırken hata:", error);
    return NextResponse.json(
      { error: "View sayısı artırılamadı" },
      { status: 500 },
    );
  }
}
