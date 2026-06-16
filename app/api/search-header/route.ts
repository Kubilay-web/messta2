import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const currentUserId = searchParams.get('currentUserId');

    if (!query || query.length < 2) {
      return NextResponse.json({ users: [] });
    }

    // Kullanıcı arama geçmişine ekle
    if (currentUserId) {
      const searchResults = await db.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
        },
        take: 10,
      });

      // Arama geçmişine kaydet (tekrarları önlemek için)
      for (const user of searchResults) {
        if (user.id !== currentUserId) {
          await db.userSearch.upsert({
            where: {
              userId_searchedUserId: {
                userId: currentUserId,
                searchedUserId: user.id,
              },
            },
            update: {
              createdAt: new Date(),
            },
            create: {
              userId: currentUserId,
              searchedUserId: user.id,
            },
          });
        }
      }

      return NextResponse.json({ users: searchResults });
    } else {
      const searchResults = await db.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
        },
        take: 10,
      });

      return NextResponse.json({ users: searchResults });
    }
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}