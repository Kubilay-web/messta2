import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// GET: Kupon istatistikleri
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl } = await params;

    // Mağazayı bul ve kullanıcı yetkisini kontrol et
    const store = await db.store.findUnique({
      where: { url: storeUrl },
      select: { id: true, userId: true }
    });

    if (!store) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Kullanıcının bu mağazanın sahibi olup olmadığını kontrol et
    if (store.userId !== user.id) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    const now = new Date().toISOString().split('T')[0];

    // Toplam kupon sayısı
    const totalCoupons = await db.coupon.count({
      where: { storeId: store.id },
    });

    // Aktif kupon sayısı
    const activeCoupons = await db.coupon.count({
      where: {
        storeId: store.id,
        startDate: { lte: now },
        endDate: { gte: now },
      },
    });

    // Süresi dolmuş kupon sayısı
    const expiredCoupons = await db.coupon.count({
      where: {
        storeId: store.id,
        endDate: { lt: now },
      },
    });

    // Henüz başlamamış kupon sayısı
    const upcomingCoupons = await db.coupon.count({
      where: {
        storeId: store.id,
        startDate: { gt: now },
      },
    });

    // Toplam kullanım sayısı
    const totalUsage = await db.orderGroup.count({
      where: {
        coupon: {
          storeId: store.id,
        },
      },
    }) + await db.cart.count({
      where: {
        coupon: {
          storeId: store.id,
        },
      },
    });

    // Toplam indirim tutarı (tahmini)
    const orderGroupsWithCoupons = await db.orderGroup.findMany({
      where: {
        coupon: {
          storeId: store.id,
        },
      },
      select: {
        total: true,
        coupon: {
          select: {
            discount: true,
          },
        },
      },
    });

    let estimatedSavings = 0;
    orderGroupsWithCoupons.forEach(group => {
      const discountAmount = group.total * (group.coupon.discount / 100);
      estimatedSavings += discountAmount;
    });

    // En çok kullanılan kuponlar (top 5)
    const topCoupons = await db.coupon.findMany({
      where: {
        storeId: store.id,
      },
      take: 5,
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            orders: true,
            carts: true,
          },
        },
      },
    });

    // Aylık kupon kullanımı (son 6 ay)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyUsage = await db.orderGroup.groupBy({
      by: ['createdAt'],
      where: {
        coupon: {
          storeId: store.id,
        },
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    const stats = {
      totalCoupons,
      activeCoupons,
      expiredCoupons,
      upcomingCoupons,
      totalUsage,
      estimatedSavings: Math.round(estimatedSavings * 100) / 100,
      topCoupons: topCoupons.map(coupon => ({
        code: coupon.code,
        discount: coupon.discount,
        usageCount: coupon._count.orders + coupon._count.carts,
      })),
      monthlyUsage: monthlyUsage.map(month => ({
        month: month.createdAt.toISOString().slice(0, 7),
        count: month._count.id,
      })),
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching coupon statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}