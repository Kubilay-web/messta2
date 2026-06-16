// app/api/seller/store/[storeUrl]/shipping/default/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store'u URL'ye göre bul
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

    // Store'un default shipping ayarlarını döndür
    return NextResponse.json({
      defaultShippingService: store.defaultShippingService,
      defaultShippingFeePerItem: store.defaultShippingFeePerItem,
      defaultShippingFeeForAdditionalItem: store.defaultShippingFeeForAdditionalItem,
      defaultShippingFeePerKg: store.defaultShippingFeePerKg,
      defaultShippingFeeFixed: store.defaultShippingFeeFixed,
      defaultDeliveryTimeMin: store.defaultDeliveryTimeMin,
      defaultDeliveryTimeMax: store.defaultDeliveryTimeMax,
      returnPolicy: store.returnPolicy
    });
  } catch (error) {
    console.error('Error fetching default shipping settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
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

    // Default shipping ayarlarını güncelle
    const updatedStore = await db.store.update({
      where: { id: store.id },
      data: {
        defaultShippingService: body.defaultShippingService,
        defaultShippingFeePerItem: parseFloat(body.defaultShippingFeePerItem || '0'),
        defaultShippingFeeForAdditionalItem: parseFloat(body.defaultShippingFeeForAdditionalItem || '0'),
        defaultShippingFeePerKg: parseFloat(body.defaultShippingFeePerKg || '0'),
        defaultShippingFeeFixed: parseFloat(body.defaultShippingFeeFixed || '0'),
        defaultDeliveryTimeMin: parseInt(body.defaultDeliveryTimeMin || '7'),
        defaultDeliveryTimeMax: parseInt(body.defaultDeliveryTimeMax || '31'),
        returnPolicy: body.returnPolicy
      }
    });

    return NextResponse.json({
      defaultShippingService: updatedStore.defaultShippingService,
      defaultShippingFeePerItem: updatedStore.defaultShippingFeePerItem,
      defaultShippingFeeForAdditionalItem: updatedStore.defaultShippingFeeForAdditionalItem,
      defaultShippingFeePerKg: updatedStore.defaultShippingFeePerKg,
      defaultShippingFeeFixed: updatedStore.defaultShippingFeeFixed,
      defaultDeliveryTimeMin: updatedStore.defaultDeliveryTimeMin,
      defaultDeliveryTimeMax: updatedStore.defaultDeliveryTimeMax,
      returnPolicy: updatedStore.returnPolicy
    });
  } catch (error) {
    console.error('Error updating default shipping settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}