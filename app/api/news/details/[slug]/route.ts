// app/api/news/[slug]/route.ts

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const { slug } = params; // URL'den slug'ı alıyoruz

  try {
    // Slug'a göre haberin detayını bulup görüntülenme sayısını bir artırıyoruz
    const news = await db.news.update({
      where: { slug },
      data: { count: { increment: 1 } }, // Görüntülenme sayısını artırıyoruz
    });

    // İlişkili haberleri buluyoruz (aynı kategori, farklı slug)
    const relatedNews = await db.news.findMany({
      where: {
        slug: { not: slug }, // Aynı slug'dan farklı haberler
        category: news.category, // Aynı kategorideki haberler
      },
      take: 4, // 4 haber alıyoruz
      orderBy: {
        createdAt: "desc", // En yeni haberleri alıyoruz
      },
    });

    // Yanıt olarak haberin detaylarını ve ilişkili haberleri döndürüyoruz
    return NextResponse.json({ news, relatedNews }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
