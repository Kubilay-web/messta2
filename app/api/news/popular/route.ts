// app/api/news/popular/route.ts

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 'active' statüde olan, en çok görüntülenen 4 popüler haberi alıyoruz
    const popularNews = await db.news.findMany({
      where: {
        status: "active", // 'active' statüsüne sahip haberler
      },
      orderBy: {
        count: "desc", // Görüntülenme sayısına göre azalan sıralama
      },
      take: 4, // Sadece ilk 4 haberi alıyoruz
    });

    // Popüler haberleri döndürüyoruz
    return NextResponse.json({ popularNews }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
