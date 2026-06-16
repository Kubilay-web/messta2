import { NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { z } from 'zod';

const historySchema = z.object({
  userId: z.string(),
  limit: z.number().min(1).max(100),
  cursor: z.object({
    id: z.string().uuid(),
    viewedAt: z.date(),
  }).optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || '';  // User ID'yi URL'den alıyoruz
    const limit = parseInt(searchParams.get('limit') || '10');
    const cursorId = searchParams.get('cursorId');
    const cursorUpdatedAt = searchParams.get('cursorUpdatedAt');
    const cursor = cursorId && cursorUpdatedAt
      ? { id: cursorId, viewedAt: new Date(cursorUpdatedAt) }
      : undefined;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const data = await db.videoView.findMany({
      where: { userId },
      take: limit + 1,  // Limit + 1 to check if there's more data
      skip: cursor ? 1 : 0,  // Skip the cursor if we have one
      cursor: cursor ? { id: cursor.id } : undefined,
      orderBy: { updatedAt: 'desc' }, // Sorting by most recent
      include: {
        video: true, // Include video details
        user: true,  // Include user details
      },
    });

    const hasMore = data.length > limit;
    const items = hasMore ? data.slice(0, -1) : data;
    const nextCursor = hasMore ? { id: items[items.length - 1].id, updatedAt: items[items.length - 1].updatedAt } : null;

    // Veriyi frontend bileşenine uygun formatta döndürüyoruz
    const formattedItems = await Promise.all(items.map(async (item) => {
      // Video beğeni sayısını hesaplamak
      const likesCount = await db.videoReaction.count({
        where: {
          videoId: item.video.id,
          type: 'like',
        },
      });

      // Video izlenme sayısını hesaplamak
      const viewsCount = await db.videoView.count({
        where: {
          videoId: item.video.id,
        },
      });

      // Burada video ve kullanıcı bilgilerini tek bir 'data' nesnesine birleştiriyoruz
      return {
        data: {
          id: item.video.id,  // Video ID
          title: item.video.title,  // Video Başlığı
          thumbnailUrl: item.video.thumbnailUrl,  // Thumbnail URL
          previewUrl: item.video.previewUrl,  // Preview URL
          duration: item.video.duration,  // Video Süresi
          viewsCount: viewsCount,  // Hesaplanan izlenme sayısı
          likesCount: likesCount,  // Hesaplanan beğeni sayısı
          description: item.video.description, // Video açıklaması

          // Kullanıcı Bilgileri
          user: {
            id: item.user.id, // Kullanıcı ID'si
            username: item.user.username, // Kullanıcı adı
            displayName: item.user.displayName, // Kullanıcı görüntü adı
            avatarUrl: item.user.avatarUrl, // Kullanıcı avatarı
          },

          createdAt: item.updatedAt.toISOString(), // Dönüşüm sağlanıyor
        }
      };
    }));

    return NextResponse.json({ items: formattedItems, nextCursor });
  } catch (error) {
    console.error('Error:', error); // Detaylı hata loglama
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
