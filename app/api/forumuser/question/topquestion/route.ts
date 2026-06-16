import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// Soruları alacak API route'u
export async function GET(request: Request) {
  try {
    // Prisma ile soruları alıyoruz, views ve upvotes'e göre sıralıyoruz
    const questions = await db.questionForum.findMany({
      orderBy: [
        { views: "desc" }, // Views'e göre azalan sıralama
        { upvotes: "desc" }, // Upvotes'a göre azalan sıralama
      ],
      take: 5, // Yalnızca ilk 5 kaydı alıyoruz
      include: {
        // Sorulara tag'leri dahil ediyoruz
        tagQuestions: {
          include: {
            tag: true, // Tag verilerini de dahil ediyoruz
          },
        },
        // Kullanıcı bilgilerini dahil ediyoruz
        user: {
          select: { id: true, username: true, avatarUrl: true },
        },
      },
    });

    // Soruları Tag'lerle birlikte mapliyoruz
    const questionsWithTags = questions.map((question) => ({
      ...question,
      tags: question.tagQuestions.map((tq) => tq.tag),
    }));

    // Başarılı bir yanıt döndürüyoruz
    return NextResponse.json(
      { success: true, data: questionsWithTags },
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
