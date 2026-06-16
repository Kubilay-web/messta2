// app/api/seller/store/[storeUrl]/shipping/[rateId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: { storeUrl: string; rateId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Önce store'u URL'ye göre bul
    const store = await db.store.findFirst({
      where: { 
        url: params.storeUrl,
        user: {
          email: user.email
        }
      }
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Shipping rate'in store'a ait olduğunu kontrol et
    const shippingRate = await db.shippingRate.findFirst({
      where: {
        id: params.rateId,
        storeId: store.id
      }
    });

    if (!shippingRate) {
      return NextResponse.json({ error: 'Shipping rate not found' }, { status: 404 });
    }

    // Shipping rate'i güncelle
    const updatedShippingRate = await db.shippingRate.update({
      where: { id: params.rateId },
      data: {
        shippingService: body.shippingService,
        shippingFeePerItem: parseFloat(body.shippingFeePerItem || '0'),
        shippingFeeForAdditionalItem: parseFloat(body.shippingFeeForAdditionalItem || '0'),
        shippingFeePerKg: parseFloat(body.shippingFeePerKg || '0'),
        shippingFeeFixed: parseFloat(body.shippingFeeFixed || '0'),
        deliveryTimeMin: parseInt(body.deliveryTimeMin || '7'),
        deliveryTimeMax: parseInt(body.deliveryTimeMax || '31'),
        returnPolicy: body.returnPolicy,
      },
      include: {
        country: true
      }
    });

    return NextResponse.json(updatedShippingRate);
  } catch (error) {
    console.error('Error updating shipping rate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeUrl: string; rateId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Önce store'u URL'ye göre bul
    const store = await db.store.findFirst({
      where: { 
        url: params.storeUrl,
        user: {
          email: user.email
        }
      }
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Shipping rate'in store'a ait olduğunu kontrol et
    const shippingRate = await db.shippingRate.findFirst({
      where: {
        id: params.rateId,
        storeId: store.id
      }
    });

    if (!shippingRate) {
      return NextResponse.json({ error: 'Shipping rate not found' }, { status: 404 });
    }

    // Shipping rate'i sil
    await db.shippingRate.delete({
      where: { id: params.rateId }
    });

    return NextResponse.json({ message: 'Shipping rate deleted successfully' });
  } catch (error) {
    console.error('Error deleting shipping rate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}