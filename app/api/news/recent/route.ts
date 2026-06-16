import db from "@/app/lib/db";
import { NextResponse } from "next/server"; // NextResponse import edilmesi lazım

export async function GET() {
  try {
    const news = await db.news.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        createdAt: "desc", // Sonuçları en son eklenen haberle başlat
      },
      skip: 6, // İlk 6 kaydı atla
      take: 5, // Sadece 5 haber al
    });

    return NextResponse.json({ news }); // NextResponse ile JSON döndürülüyor
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
