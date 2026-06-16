import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    // Kullanıcıyı veritabanından alıyoruz
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Kullanıcıya bağlı soru sayısını alıyoruz
    const totalQuestions = await db.questionForum.count({
      where: { UserId: userId },
    });

    // Kullanıcıya bağlı cevap sayısını alıyoruz
    const totalAnswers = await db.answerForum.count({
      where: { UserId: userId },
    });

    // Başarılı yanıt döndürüyoruz
    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          totalQuestions,
          totalAnswers,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    // Hata durumunda yanıt döndürüyoruz
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
