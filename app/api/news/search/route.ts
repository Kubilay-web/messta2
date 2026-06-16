import { NextResponse } from "next/server";
import db from "@/app/lib/db"; // Prisma client'ınızı doğru şekilde import edin

export async function GET(req) {
  // `nextUrl.searchParams.get` ile URL query parametresini alıyoruz.
  const value = req.nextUrl.searchParams.get("value");

  try {
    // Eğer search parametresi gelmezse hata döndür
    if (!value) {
      return NextResponse.json(
        { message: "Search value is required" },
        { status: 400 },
      );
    }

    // Prisma ile başlıklarda arama işlemi
    const news = await db.news.findMany({
      where: {
        status: "active", // Sadece aktif haberleri al
        title: {
          contains: value, // Title alanında value içeren haberleri bul
          mode: "insensitive", // Küçük/büyük harf duyarsız arama
        },
      },
    });

    return NextResponse.json({ news });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
