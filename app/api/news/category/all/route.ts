// import db from "@/app/lib/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     // Prisma ile kategorilere göre gruplanmış haber sayısını alıyoruz
//     const categories = await db.news.groupBy({
//       by: ["category"], // Kategorilere göre grupla
//       _count: {
//         category: true, // Her kategorideki haber sayısını al
//       },
//     });

//     // Gruplanan kategorilerin haber sayılarını hazırlıyoruz
//     const result = categories.map((category) => ({
//       category: category.category,
//       count: category._count.category,
//     }));


//     return NextResponse.json({ categories: result }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }



// app/api/news/category/all/route.ts
import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1. Önce CategoryNews'ten TÜM kategorileri al (slug ile birlikte)
    const allCategories = await db.categoryNews.findMany({
      orderBy: { name: 'asc' },
      select: {
        name: true,
        slug: true,
      }
    });

    // 2. News tablosundan her kategorideki aktif haber sayısını al
    const newsCounts = await db.news.groupBy({
      by: ["category"],
      where: {
        status: "active" // Sadece aktif haberleri say
      },
      _count: {
        category: true,
      },
    });

    // 3. Count'ları bir Map'e çevir (kolay erişim için)
    const countMap = new Map();
    newsCounts.forEach((item) => {
      countMap.set(item.category, item._count.category);
    });

    // 4. Tüm kategorileri count ile birleştir (haberi olmayanlar için count = 0)
    const result = allCategories.map((category) => ({
      name: category.name,
      slug: category.slug,
      count: countMap.get(category.name) || 0,
    }));

    return NextResponse.json({ 
      success: true,
      categories: result 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Kategoriler getirilirken hata:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        categories: [] 
      },
      { status: 500 },
    );
  }
}