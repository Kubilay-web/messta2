import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// GET: Mağazanın siparişlerini getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl } = params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const skip = (page - 1) * limit;

    // Mağazayı bul
    const store = await db.store.findUnique({
      where: { url: storeUrl },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Mağaza sahibi kontrolü
    if (store.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Filtreler oluştur
    const where: any = {
      storeId: store.id,
    };

    // Status filtresi
    if (status && status !== 'all') {
      where.status = status;
    }

    // Tarih filtresi
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    // Arama filtresi
    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { order: { 
          user: {
            OR: [
              { username: { contains: search, mode: 'insensitive' } },
              { displayName: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          }
        }},
        { items: { some: { 
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { sku: { contains: search, mode: 'insensitive' } }
          ]
        }}}
      ];
    }

    // Siparişleri getir
    const [orderGroups, total] = await Promise.all([
      db.orderGroup.findMany({
        where,
        include: {
          order: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  displayName: true,
                  email: true,
                  avatarUrl: true,
                },
              },
              shippingAddress: true,
            },
          },
          items: true, // Sadece OrderItem alanlarını getir
          coupon: {
            select: {
              id: true,
              code: true,
              discount: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.orderGroup.count({ where }),
    ]);

    // İstatistikleri hesapla
    const stats = await db.orderGroup.groupBy({
      by: ['status'],
      where: { storeId: store.id },
      _count: true,
      _sum: {
        total: true,
      },
    });

    const summary = {
      totalRevenue: stats.reduce((sum, stat) => sum + (stat._sum.total || 0), 0),
      totalOrders: total,
      byStatus: stats.reduce((acc, stat) => {
        acc[stat.status] = {
          count: stat._count,
          revenue: stat._sum.total || 0,
        };
        return acc;
      }, {} as Record<string, { count: number; revenue: number }>),
    };

    return NextResponse.json({
      orders: orderGroups,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      summary,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}