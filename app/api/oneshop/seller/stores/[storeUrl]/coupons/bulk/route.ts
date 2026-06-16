import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';


// POST: Toplu kupon işlemleri
export async function POST(
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
    const body = await request.json();
    const { action, couponIds, data } = body;

    if (!action || !couponIds || !Array.isArray(couponIds)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

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

    switch (action) {
      case 'delete':
        // Kullanılmış kuponları kontrol et
        const usedCoupons = await db.coupon.findMany({
          where: {
            id: {
              in: couponIds,
            },
            storeId: store.id,
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

        const hasUsedCoupons = usedCoupons.some(
          coupon => (coupon._count.orders + coupon._count.carts) > 0
        );

        if (hasUsedCoupons) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Cannot delete coupons that have been used' 
            },
            { status: 400 }
          );
        }

        await db.coupon.deleteMany({
          where: {
            id: {
              in: couponIds,
            },
            storeId: store.id,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Deleted ${couponIds.length} coupons`,
        });

      case 'generate':
        // Toplu kupon oluşturma
        if (!data || !data.count || !data.discount || !data.startDate || !data.endDate) {
          return NextResponse.json(
            { success: false, message: 'Missing required fields for generation' },
            { status: 400 }
          );
        }

        const coupons = [];
        const now = Date.now();
        
        for (let i = 0; i < data.count; i++) {
          const code = `STORE${now.toString(36).toUpperCase()}${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
          
          coupons.push({
            code,
            discount: parseInt(data.discount),
            startDate: data.startDate,
            endDate: data.endDate,
            storeId: store.id,
          });
        }

        await db.coupon.createMany({
          data: coupons,
        });

        return NextResponse.json({
          success: true,
          message: `Generated ${data.count} coupons successfully`,
          data: coupons.map(c => ({ code: c.code })),
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error performing bulk operation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}