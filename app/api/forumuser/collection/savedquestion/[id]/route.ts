import { validateRequest } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // URL'den query parametrelerini al
    const {
      page = "1",
      pageSize = "10",
      filter = "mostrecent",
      query = "",
    } = req.nextUrl.searchParams;

    // Sayfalama ve sıralama için gerekli hesaplamalar
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    // Sıralama seçeneklerini tanımla
    const sortOptions: Record<string, Record<string, "asc" | "desc">> = {
      mostrecent: { createdAt: "desc" },
      oldest: { createdAt: "asc" },
      mostvoted: { upvotes: "desc" },
      mostviewed: { views: "desc" },
      mostanswered: { answers: "desc" },
    };

    // Seçilen filtreye göre sıralama
    const sortCriteria = sortOptions[filter as keyof typeof sortOptions] || {
      createdAt: "desc",
    };

    // Kullanıcının kaydettiği soruları Prisma ile sorgulama
    const savedQuestions = await db.collectionForum.findMany({
      where: {
        userId: user.id,
      },
      include: {
        question: {
          include: {
            user: true,
            tagQuestions: {
              include: {
                tag: true,
              },
            },
          },
        },
      },
      skip,
      take: limit,
      orderBy: sortCriteria, // Filtreye göre sıralama
    });

    // Toplam kaydedilen soru sayısını al
    const totalSaved = await db.collectionForum.count({
      where: {
        userId: user.id,
      },
    });

    // Filtreleme sorgusu için içerik araması (query) ekleme
    let filteredQuestions = savedQuestions;

    if (query) {
      filteredQuestions = savedQuestions.filter((item) => {
        const question = item.question;
        return (
          question.title.toLowerCase().includes(query.toLowerCase()) ||
          question.content.toLowerCase().includes(query.toLowerCase())
        );
      });
    }

    // Sonuçları döndür
    return NextResponse.json(
      {
        collection: filteredQuestions.map((item) => item.question),
        isNext: totalSaved > skip + filteredQuestions.length,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching saved questions:", error);
    return NextResponse.json({ error: "İşlem başarısız" }, { status: 500 });
  }
}
