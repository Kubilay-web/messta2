import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateHeaderValue } from 'node:http';
import { validateRequest } from '@/app/auth';

// GET: Tekil sipariş detaylarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string; orderGroupId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, orderGroupId } = params;

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

    // Siparişi bul
    const orderGroup = await db.orderGroup.findUnique({
      where: { id: orderGroupId },
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
                phone: true,
              },
            },
            shippingAddress: {
              include: {
                country: true,
              },
            },
            paymentDetails: true,
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
        store: {
          select: {
            id: true,
            name: true,
            url: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!orderGroup || orderGroup.storeId !== store.id) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ order: orderGroup });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH: Sipariş durumunu güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { storeUrl: string; orderGroupId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, orderGroupId } = params;
    const body = await request.json();
    const { status, trackingNumber, shippingCompany, note } = body;

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

    // Siparişi bul
    const orderGroup = await db.orderGroup.findUnique({
      where: { id: orderGroupId },
      include: {
        order: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!orderGroup || orderGroup.storeId !== store.id) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Güncelleme verilerini hazırla
    const updateData: any = { status };
    
    if (trackingNumber !== undefined) {
      updateData.trackingNumber = trackingNumber;
    }
    
    if (shippingCompany !== undefined) {
      updateData.shippingCompany = shippingCompany;
    }
    
    if (note !== undefined) {
      updateData.note = note;
    }

    // Siparişi güncelle
    const updatedOrderGroup = await db.orderGroup.update({
      where: { id: orderGroupId },
      data: updateData,
    });

    // TODO: Burada kullanıcıya bildirim gönderilebilir

    return NextResponse.json({ order: updatedOrderGroup });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}