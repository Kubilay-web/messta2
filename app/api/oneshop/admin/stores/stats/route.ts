import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Mağaza istatistikleri
export async function GET(request: NextRequest) {
  try {
    // Toplam mağaza sayısı
    const totalStores = await db.store.count();

    // Duruma göre mağaza sayıları
    const storesByStatus = await db.store.groupBy({
      by: ['status'],
      _count: {
        id: true,
      },
    });

    // Günlük yeni mağazalar
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newStoresToday = await db.store.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // Haftalık yeni mağazalar
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const newStoresThisWeek = await db.store.count({
      where: {
        createdAt: {
          gte: weekAgo,
        },
      },
    });

    // Aylık yeni mağazalar
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    const newStoresThisMonth = await db.store.count({
      where: {
        createdAt: {
          gte: monthAgo,
        },
      },
    });

    // En çok ürünü olan mağazalar (top 5)
    const topStoresByProducts = await db.store.findMany({
      take: 5,
      orderBy: {
        products: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            products: true,
            followers: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // En çok takipçisi olan mağazalar (top 5)
    const topStoresByFollowers = await db.store.findMany({
      take: 5,
      orderBy: {
        followers: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            products: true,
            followers: true,
          },
        },
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // Featured mağazalar
    const featuredStoresCount = await db.store.count({
      where: {
        featured: true,
      },
    });

    // Ortalama rating
    const avgRatingAgg = await db.store.aggregate({
      _avg: {
        averageRating: true,
      },
      where: {
        averageRating: {
          gt: 0,
        },
      },
    });

    const stats = {
      totalStores,
      storesByStatus: storesByStatus.reduce((acc, item) => {
        acc[item.status] = item._count.id;
        return acc;
      }, {} as Record<string, number>),
      newStoresToday,
      newStoresThisWeek,
      newStoresThisMonth,
      featuredStoresCount,
      averageRating: avgRatingAgg._avg.averageRating || 0,
      topStoresByProducts: topStoresByProducts.map(store => ({
        id: store.id,
        name: store.name,
        owner: store.user.username,
        productCount: store._count.products,
        followerCount: store._count.followers,
      })),
      topStoresByFollowers: topStoresByFollowers.map(store => ({
        id: store.id,
        name: store.name,
        owner: store.user.username,
        productCount: store._count.products,
        followerCount: store._count.followers,
      })),
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('Error fetching store stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching store statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}