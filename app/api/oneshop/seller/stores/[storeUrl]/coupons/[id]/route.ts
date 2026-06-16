import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';


// GET: Tek kupon detayını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string; id: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl, id } = await params;

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

    // Kuponu getir
    const coupon = await db.coupon.findUnique({
      where: {
        id,
        storeId: store.id,
      },
      include: {
        _count: {
          select: {
            carts: true,
            orders: true,
            userRelations: true,
          },
        },
        orders: {
          take: 10,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            order: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        userRelations: {
          take: 10,
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Format response
    const now = new Date().toISOString().split('T')[0];
    const isActive = coupon.startDate <= now && coupon.endDate >= now;
    const isExpired = coupon.endDate < now;
    const isUpcoming = coupon.startDate > now;

    const formattedCoupon = {
      id: coupon.id,
      code: coupon.code,
      discount: coupon.discount,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      status: isExpired ? 'expired' : isUpcoming ? 'upcoming' : 'active',
      isActive,
      isExpired,
      isUpcoming,
      usageCount: coupon._count.orders + coupon._count.carts,
      uniqueUsers: coupon._count.userRelations,
      recentOrders: coupon.orders.map(order => ({
        id: order.id,
        orderId: order.order.id,
        user: order.order.user,
        createdAt: order.createdAt,
      })),
      recentUsers: coupon.userRelations.map(relation => ({
        id: relation.id,
        user: relation.user,
        createdAt: relation.createdAt,
      })),
      createdAt: coupon.createdAt,
      updatedAt: coupon.updatedAt,
    };

    return NextResponse.json({
      success: true,
      data: formattedCoupon,
    });

  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching coupon',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PATCH: Kupon güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeUrl: string; id: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl, id } = await params;
    const body = await request.json();

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

    // Kupon var mı kontrol et
    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
        storeId: store.id,
      },
    });

    if (!existingCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Tarih validasyonu
    if (body.startDate && body.endDate) {
      if (new Date(body.startDate) > new Date(body.endDate)) {
        return NextResponse.json(
          { success: false, message: 'Start date cannot be after end date' },
          { status: 400 }
        );
      }
    }

    // İndirim validasyonu
    if (body.discount && (body.discount < 1 || body.discount > 100)) {
      return NextResponse.json(
        { success: false, message: 'Discount must be between 1 and 100' },
        { status: 400 }
      );
    }

    // Kupon kodu unique kontrolü (diğer kuponlarda var mı)
    if (body.code && body.code !== existingCoupon.code) {
      const duplicateCoupon = await db.coupon.findFirst({
        where: {
          code: body.code.toUpperCase(),
          storeId: store.id,
          id: { not: id },
        },
      });

      if (duplicateCoupon) {
        return NextResponse.json(
          { success: false, message: 'Coupon code already exists for this store' },
          { status: 409 }
        );
      }
    }

    // Kuponu güncelle
    const updatedCoupon = await db.coupon.update({
      where: { id },
      data: {
        ...(body.code && { code: body.code.toUpperCase() }),
        ...(body.discount && { discount: parseInt(body.discount) }),
        ...(body.startDate && { startDate: body.startDate }),
        ...(body.endDate && { endDate: body.endDate }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Coupon updated successfully',
      data: updatedCoupon,
    });

  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating coupon',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE: Kupon sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeUrl: string; id: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl, id } = await params;

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

    // Kupon var mı kontrol et
    const existingCoupon = await db.coupon.findUnique({
      where: {
        id,
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

    if (!existingCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Kupon kullanılmış mı kontrol et
    const totalUsage = existingCoupon._count.orders + existingCoupon._count.carts;
    if (totalUsage > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Cannot delete coupon that has been used. You can deactivate it by setting an expired end date.' 
        },
        { status: 400 }
      );
    }

    // Kuponu sil
    await db.coupon.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error deleting coupon',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}