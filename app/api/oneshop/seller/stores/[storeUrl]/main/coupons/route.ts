import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// GET: Mağazanın kuponlarını getir
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

    // Mağazayı bul
    const store = await db.store.findUnique({
      where: { url: storeUrl },
      include: {
        coupons: {
          orderBy: { createdAt: 'desc' },
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
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Mağaza sahibi kontrolü
    if (store.userId !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ coupons: store.coupons });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}

// POST: Yeni kupon oluştur
export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl } = params;
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

    // Kupon kodu benzersiz mi kontrol et
    const existingCoupon = await db.coupon.findUnique({
      where: { code },
    });

    if (existingCoupon) {
      return NextResponse.json(
        { error: 'Coupon code already exists' },
        { status: 400 }
      );
    }

    // Yeni kupon oluştur
    const coupon = await db.coupon.create({
      data: {
        code,
        discount,
        startDate,
        endDate,
        storeId: store.id,
      },
    });

    return NextResponse.json({ coupon }, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: 'Failed to create coupon' },
      { status: 500 }
    );
  }
}