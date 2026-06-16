import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// GET metoduyla popüler tag'leri alıyoruz
export async function GET(request: Request) {
  try {
    // Popüler 5 tag'i almak için Prisma'da sıralama yapıyoruz
    const topTags = await db.tagForum.findMany({
      orderBy: {
        tagQuestions: {
          _count: "desc", // Tag'e bağlı soru sayısına göre sıralama yapıyoruz
        },
      },
      take: 5, // Yalnızca ilk 5 tag
      include: {
        tagQuestions: {
          select: {
            questionId: true, // Tag'e bağlı soruların ID'lerini alıyoruz
          },
        },
      },
    });

    // Her tag'in soruları sayısını ekleyelim
    const tagsWithQuestionCount = topTags.map((tag) => ({
      ...tag,
      questions: tag.tagQuestions.length,
    }));

    // Başarılı bir yanıt döndürüyoruz
    return NextResponse.json(
      { success: true, data: tagsWithQuestionCount },
      { status: 200 },
    );
  } catch (error) {
    // Hata durumunda yanıt döndürme
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
