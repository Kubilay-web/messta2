import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db"

export async function GET(request: NextRequest) {
  try {
    // URL'den query parametrelerini al
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Blog'ları veritabanından çek
    const blogs = await db.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: limit,
      skip: skip,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        image: true,
        createdAt: true,
      }
    });

    // Toplam blog sayısını al
    const totalBlogs = await db.blog.count();

    // Tarihi daha okunabilir formata çevir
    const formattedBlogs = blogs.map(blog => ({
      ...blog,
      timeAgo: getTimeAgo(blog.createdAt),
      formattedDate: formatDate(blog.createdAt)
    }));

    return NextResponse.json({
      success: true,
      data: formattedBlogs,
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// Zaman farkını hesaplayan yardımcı fonksiyon
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}hr`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mon`;
  return `${Math.floor(diffInSeconds / 31536000)}y`;
}

// Tarihi formatlayan yardımcı fonksiyon
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}