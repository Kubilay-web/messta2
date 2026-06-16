import { NextResponse } from "next/server";
import db from "@/app/lib/db";

// GET Request Handler
export async function GET(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    // Kullanıcıyı veritabanından alıyoruz
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true, // İhtiyaç duyduğunuz diğer alanları da buraya ekleyebilirsiniz
      },
    });

    // Kullanıcı bulunamazsa, 404 hata döndür
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Sayfa ve sayfa boyutu parametrelerini alıyoruz (Varsayılan olarak sayfa 1 ve 10 soru)
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    // Pagination Logic
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    // Kullanıcıya ait toplam soru sayısını alıyoruz
    const totalQuestions = await db.questionForum.count({
      where: { UserId: userId },
    });

    // Kullanıcıya ait soruları alıyoruz
    const questions = await db.questionForum.findMany({
      where: { UserId: userId },
      skip: skip,
      take: limit,
      include: {
        tagQuestions: {
          include: {
            tag: {
              select: { name: true },
            },
          },
        },
        user: {
          select: { username: true, avatarUrl: true },
        },
      },
    });

    // Soruların olduğu sayfa var mı, kontrol ediyoruz
    const isNext = totalQuestions > skip + questions.length;

    // Başarılı bir yanıt döndürüyoruz
    return NextResponse.json(
      {
        success: true,
        data: {
          user,
          questions,
          isNext,
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
