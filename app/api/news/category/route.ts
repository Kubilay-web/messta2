// import { NextResponse } from "next/server";
// import db from "@/app/lib/db";

// export async function GET() {
//   try {
//     // News ve Writer tablolarındaki tüm kategorileri birleştirip benzersiz hale getir
//     const [newsCategories, writerCategories] = await Promise.all([
//       db.news.findMany({
//         select: { category: true },
//         distinct: ['category'],
//       }),
//       db.writer.findMany({
//         select: { category: true },
//         distinct: ['category'],
//       }),
//     ]);

//     // Her iki kaynaktan gelen kategorileri birleştir ve benzersiz yap
//     const allCategories = [
//       ...newsCategories.map(item => item.category),
//       ...writerCategories.map(item => item.category),
//     ];

//     // Benzersiz kategorileri al ve alfabetik sırala
//     const uniqueCategories = [...new Set(allCategories)].filter(Boolean).sort();

//     // Eğer hiç kategori yoksa varsayılan kategorileri döndür
//     const defaultCategories = [
//       "Education",
//       "Travel",
//       "Health", 
//       "International",
//       "Sports",
//       "Technology",
//       "Business"
//     ];

//     return NextResponse.json({
//       success: true,
//       categories: uniqueCategories.length > 0 ? uniqueCategories : defaultCategories,
//     });
//   } catch (error) {
//     console.error("Kategoriler getirilirken hata:", error);
    
//     // Hata durumunda varsayılan kategorileri döndür
//     const defaultCategories = [
//       "Education",
//       "Travel",
//       "Health",
//       "International", 
//       "Sports",
//       "Technology",
//       "Business"
//     ];
    
//     return NextResponse.json({
//       success: false,
//       categories: defaultCategories,
//       message: "Kategoriler yüklenirken hata oluştu, varsayılan kategoriler gösteriliyor"
//     });
//   }
// }




// // app/api/news/category/route.ts (POST method ekleyin)
// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name } = body;

//     if (!name || name.trim() === '') {
//       return NextResponse.json(
//         { success: false, message: "Kategori adı gerekli" },
//         { status: 400 }
//       );
//     }

//     const trimmedName = name.trim();
//     const slug = trimmedName.toLowerCase().replace(/\s+/g, '-');

//     // Kategori zaten var mı kontrol et
//     const existingNewsCategory = await db.news.findFirst({
//       where: { category: trimmedName }
//     });

//     const existingWriterCategory = await db.writer.findFirst({
//       where: { category: trimmedName }
//     });

//     if (existingNewsCategory || existingWriterCategory) {
//       return NextResponse.json(
//         { success: false, message: "Bu kategori zaten mevcut" },
//         { status: 400 }
//       );
//     }    
//     return NextResponse.json({
//       success: true,
//       message: "Kategori başarıyla eklendi",
//       category: { name: trimmedName, value: slug }
//     });
//   } catch (error) {
//     console.error("Kategori eklenirken hata:", error);
//     return NextResponse.json(
//       { success: false, message: "Kategori eklenirken bir hata oluştu" },
//       { status: 500 }
//     );
//   }
// }















// app/api/news/category/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

// GET - Tüm kategorileri CategoryNews tablosundan listele
export async function GET() {
  try {
    // ✅ Artık CategoryNews tablosundan çek
    const categories = await db.categoryNews.findMany({
      orderBy: { name: 'asc' }
    });

    if (categories.length === 0) {
      // Hiç kategori yoksa varsayılanları ekle
      const defaultCategories = [
        "Education", "Travel", "Health", 
        "International", "Sports", "Technology", "Business"
      ];
      
      for (const cat of defaultCategories) {
        await db.categoryNews.create({
          data: {
            name: cat,
            slug: cat.toLowerCase().replace(/\s+/g, '-')
          }
        });
      }
      
      const newCategories = await db.categoryNews.findMany({
        orderBy: { name: 'asc' }
      });
      
      return NextResponse.json({
        success: true,
        categories: newCategories.map(c => c.name),
      });
    }

    return NextResponse.json({
      success: true,
      categories: categories.map(c => c.name),
    });
  } catch (error) {
    console.error("Kategoriler getirilirken hata:", error);
    
    // Hata durumunda varsayılan kategorileri döndür
    const defaultCategories = [
      "Education", "Travel", "Health",
      "International", "Sports", "Technology", "Business"
    ];
    
    return NextResponse.json({
      success: false,
      categories: defaultCategories,
      message: "Kategoriler yüklenirken hata oluştu"
    });
  }
}

// POST - Yeni kategori ekle (CategoryNews tablosuna kaydet)
export async function POST(request: Request) {
  try {
    // ✅ Admin yetki kontrolü EKLE (ÖNEMLİ!)
    const { user } = await validateRequest();
    
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Unauthorized - Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: "Kategori adı gerekli" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const slug = trimmedName.toLowerCase().replace(/\s+/g, '-');

    // ✅ CategoryNews tablosunda var mı kontrol et
    const existingCategory = await db.categoryNews.findFirst({
      where: { name: trimmedName }
    });

    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: "Category existing." },
        { status: 400 }
      );
    }

    // ✅ Yeni kategoriyi CategoryNews tablosuna KAYDET
    const newCategory = await db.categoryNews.create({
      data: {
        name: trimmedName,
        slug: slug,
      }
    });
    
    return NextResponse.json({
      success: true,
      message: "Kategori başarıyla eklendi",
      category: { name: newCategory.name, value: newCategory.slug }
    });
  } catch (error) {
    console.error("Kategori eklenirken hata:", error);
    return NextResponse.json(
      { success: false, message: "Kategori eklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

