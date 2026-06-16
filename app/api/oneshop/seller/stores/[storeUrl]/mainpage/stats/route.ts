import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';


export async function GET(
  request: NextRequest,
  context: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const storeUrl = context.params.storeUrl;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30days';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '90days':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default: // 30days
        startDate.setDate(now.getDate() - 30);
    }

    // Get store
    const store = await db.store.findUnique({
      where: { url: storeUrl },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    if (store.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get order stats
    const orderGroups = await db.orderGroup.findMany({
      where: {
        storeId: store.id,
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      include: {
        items: true,
        order: true,
      },
    });

    // Calculate order stats
    const totalOrders = orderGroups.length;
    const pendingOrders = orderGroups.filter(g => g.status === 'Pending').length;
    const completedOrders = orderGroups.filter(g => g.status === 'Delivered').length;
    const cancelledOrders = orderGroups.filter(g => g.status === 'Cancelled').length;
    const totalRevenue = orderGroups.reduce((sum, group) => sum + group.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get product stats
    const products = await db.product.findMany({
      where: {
        storeId: store.id,
      },
      include: {
        variants: {
          include: {
            sizes: true,
          },
        },
      },
    });

    const totalProducts = products.length;
    const totalViews = products.reduce((sum, p) => sum + p.views, 0);
    const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
    const conversionRate = totalViews > 0 ? (totalSales / totalViews) * 100 : 0;

    // Get follower count
    const followerCount = await db.userFollowingStore.count({
      where: {
        storeId: store.id,
      },
    });

    return NextResponse.json({
      orderStats: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        totalRevenue,
        averageOrderValue,
      },
      storeStats: {
        totalProducts,
        totalViews,
        totalSales,
        conversionRate,
        followerCount,
      },
      period,
      startDate: startDate.toISOString(),
      endDate: now.toISOString(),
    });
  } catch (error) {
    console.error('Error fetching store stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}