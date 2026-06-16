// /pages/api/videoCategories.ts
import db from "@/app/lib/db";  // db bağlantısını doğru şekilde yapın

export async function GET() {
  try {
    // Veritabanından tüm VideoCategory'leri alıyoruz
    const videoCategories = await db.videoCategory.findMany();

    return new Response(JSON.stringify(videoCategories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Veri çekilirken hata oluştu:', error);
    return new Response(
      JSON.stringify({ error: 'Veri çekilirken hata oluştu' }),
      { status: 500 }
    );
  }
}
