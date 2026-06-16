import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

// GET: Tekil kupon detaylarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string; couponId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, couponId } = params;

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

    // Kuponu bul
    const coupon = await db.coupon.findUnique({
      where: { id: couponId },
      include: {
        userRelations: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                displayName: true,
                avatarUrl: true,
              },
            },
          },
        },
        orders: {
          select: {
            id: true,
            createdAt: true,
            total: true,
            status: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!coupon || coupon.storeId !== store.id) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error fetching coupon:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupon' },
      { status: 500 }
    );
  }
}

// PUT: Kuponu güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { storeUrl: string; couponId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, couponId } = params;
    const body = await request.json();
    const { code, discount, startDate, endDate } = body;

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

    // Kuponu bul ve mağazaya ait mi kontrol et
    const existingCoupon = await db.coupon.findUnique({
      where: { id: couponId },
    });

    if (!existingCoupon || existingCoupon.storeId !== store.id) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // Kupon kodu benzersiz mi kontrol et (kendi hariç)
    if (code !== existingCoupon.code) {
      const codeExists = await db.coupon.findUnique({
        where: { code },
      });

      if (codeExists) {
        return NextResponse.json(
          { error: 'Coupon code already exists' },
          { status: 400 }
        );
      }
    }

    // Kuponu güncelle
    const coupon = await db.coupon.update({
      where: { id: couponId },
      data: {
        code,
        discount,
        startDate,
        endDate,
      },
    });

    return NextResponse.json({ coupon });
  } catch (error) {
    console.error('Error updating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to update coupon' },
      { status: 500 }
    );
  }
}

// DELETE: Kuponu sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeUrl: string; couponId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, couponId } = params;

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

    // Kuponu bul ve mağazaya ait mi kontrol et
    const coupon = await db.coupon.findUnique({
      where: { id: couponId },
    });

    if (!coupon || coupon.storeId !== store.id) {
      return NextResponse.json({ error: 'Coupon not found' }, { status: 404 });
    }

    // Kuponu sil
    await db.coupon.delete({
      where: { id: couponId },
    });

    return NextResponse.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return NextResponse.json(
      { error: 'Failed to delete coupon' },
      { status: 500 }
    );
  }
}