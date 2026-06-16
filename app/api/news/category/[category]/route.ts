// app/api/news/category/[category]/route.ts

import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { category: string } },
// ) {
//   const { category } = params; // URL'den kategori parametresini alıyoruz

//   try {
//     // Belirli kategori ve aktif statüdeki haberleri getiriyoruz
//     const news = await db.news.findMany({
//       where: {
//         category: category, // Belirtilen kategori
//         status: "active", // Sadece 'active' olanlar
//       },
//       orderBy: {
//         createdAt: "desc", // En yeni haberler önce
//       },
//     });

//     // Haberleri döndürüyoruz
//     return NextResponse.json({ news }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }










// export async function PUT(
//   req: Request,
//   { params }: { params: { category: string } }
// ) {
//   try {
//     const { newName } = await req.json();
//     const oldName = decodeURIComponent(params.category);
    
//     if (!newName || !newName.trim()) {
//       return NextResponse.json(
//         { success: false, message: "New category name is required" },
//         { status: 400 }
//       );
//     }

//     // Transaction ile tüm tablolardaki kategori adını güncelle
//     await db.$transaction([
//       // News tablosundaki kategoriyi güncelle
//       db.news.updateMany({
//         where: { category: oldName },
//         data: { category: newName },
//       }),
//       // Writer tablosundaki kategoriyi güncelle
//       db.writer.updateMany({
//         where: { category: oldName },
//         data: { category: newName },
//       }),
//     ]);

//     return NextResponse.json({
//       success: true,
//       message: "Category updated successfully",
//       category: { name: newName, value: newName }
//     });
//   } catch (error) {
//     console.error("Category update error:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }




export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  
  try {
    // 1. Önce slug ile kategori ara (CategoryNews tablosunda)
    let categoryRecord = await db.categoryNews.findFirst({
      where: { slug: category }
    });
    
    // 2. Slug ile bulamazsa, name ile ara (decode edilmiş)
    if (!categoryRecord) {
      const decodedCategory = decodeURIComponent(category);
      categoryRecord = await db.categoryNews.findFirst({
        where: { name: decodedCategory }
      });
    }
    
    // 3. Kategori bulunamazsa
    if (!categoryRecord) {
      return NextResponse.json(
        { success: false, message: "Category not found", news: [] },
        { status: 404 }
      );
    }
    
    // 4. Kategori adını kullanarak haberleri getir
    const news = await db.news.findMany({
      where: {
        category: categoryRecord.name, // Kategori adını kullan
        status: "active",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ 
      success: true, 
      news,
      category: categoryRecord 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching category news:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", news: [] },
      { status: 500 },
    );
  }
}



export async function PUT(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    const { newName } = await req.json();
    const oldName = decodeURIComponent(params.category);
    
    if (!newName || !newName.trim()) {
      return NextResponse.json(
        { success: false, message: "New category name is required" },
        { status: 400 }
      );
    }

    const trimmedNewName = newName.trim();
    const newSlug = trimmedNewName.toLowerCase().replace(/\s+/g, '-');

    // ✅ CategoryNews tablosunu da güncelle
    await db.$transaction([
      // CategoryNews tablosunu güncelle
      db.categoryNews.updateMany({
        where: { name: oldName },
        data: { 
          name: trimmedNewName,
          slug: newSlug 
        },
      }),
      // News tablosunu güncelle
      db.news.updateMany({
        where: { category: oldName },
        data: { category: trimmedNewName },
      }),
      // Writer tablosunu güncelle
      db.writer.updateMany({
        where: { category: oldName },
        data: { category: trimmedNewName },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Category updated successfully",
      category: { name: trimmedNewName, value: newSlug }
    });
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}






// export async function DELETE(
//   req: Request,
//   { params }: { params: { category: string } }
// ) {
//   try {
//     const categoryName = decodeURIComponent(params.category);
    
//     // Kategoriyi kullanan kayıtlar var mı kontrol et
//     const newsCount = await db.news.count({
//       where: { category: categoryName },
//     });

//     const writerCount = await db.writer.count({
//       where: { category: categoryName },
//     });

//     if (newsCount > 0 || writerCount > 0) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           message: `Cannot delete category. It is used by ${newsCount} news and ${writerCount} writers.` 
//         },
//         { status: 400 }
//       );
//     }

//     // Kategori kullanılmıyorsa başarılı yanıt dön
//     return NextResponse.json({
//       success: true,
//       message: "Category deleted successfully"
//     });
//   } catch (error) {
//     console.error("Category delete error:", error);
//     return NextResponse.json(
//       { success: false, message: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }







export async function DELETE(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    const categoryName = decodeURIComponent(params.category);
    
    console.log("Silinecek kategori:", categoryName); // Debug
    
    // Kategoriyi kullanan kayıtlar var mı kontrol et
    const newsCount = await db.news.count({
      where: { category: categoryName },
    });

    const writerCount = await db.writer.count({
      where: { category: categoryName },
    });

    if (newsCount > 0 || writerCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot delete category. It is used by ${newsCount} news and ${writerCount} writers.` 
        },
        { status: 400 }
      );
    }

    // ✅ Kategoriyi CategoryNews tablosundan SİL
    const deletedCategory = await db.categoryNews.deleteMany({
      where: { name: categoryName }
    });

    console.log("Silinen kayıt sayısı:", deletedCategory.count); // Debug

    if (deletedCategory.count === 0) {
      return NextResponse.json(
        { success: false, message: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Category delete error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong: " + error.message },
      { status: 500 }
    );
  }
}
