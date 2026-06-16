

// import db from "@/app/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     // 'active' statüde olan, en son 5 haberi alıyoruz, createdAt'a göre sıralıyoruz
//     const latestNews = await db.news.findMany({
//       where: {
//         status: "active", // Sadece 'active' statüsündeki haberler
//       },
//       orderBy: {
//         createdAt: "desc", // En son oluşturulandan önceki haberler
//       },
//       take: 5, // İlk 5 haberi alıyoruz
//     });

//     // Sonuçları döndürüyoruz
//     return NextResponse.json({ latestNews }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }











// app/api/news/latest/route.ts

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Son 5 aktif haberi al
    const latestNews = await db.news.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // JSON yanıtı oluştur
    const res = NextResponse.json({ latestNews }, { status: 200 });

    // ✅ CORS header ekle (her domain'e açık)
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return res;
  } catch (error) {
    console.error(error);

    const res = NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}

// Preflight OPTIONS isteğini handle et
export async function OPTIONS(req: NextRequest) {
  const res = NextResponse.json({}, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}