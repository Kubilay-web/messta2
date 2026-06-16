// app/api/seller/store/[storeUrl]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store'u URL'ye göre bul
    const store = await db.store.findFirst({
      where: { 
        url: params.storeUrl,
        user: {
          email: user.email
        }
      },
      include: {
        shippingRates: {
          include: {
            country: true
          }
        },
        products: {
          take: 5,
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
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
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Store'u URL'ye göre bul ve kullanıcıya ait olduğunu kontrol et
    const existingStore = await db.store.findFirst({
      where: { 
        url: params.storeUrl,
        user: {
          email: user.email
        }
      }
    });

    if (!existingStore) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // URL değişirse kontrol et (benzersiz olmalı)
    if (body.url && body.url !== params.storeUrl) {
      const urlExists = await db.store.findFirst({
        where: { 
          url: body.url,
          id: { not: existingStore.id }
        }
      });

      if (urlExists) {
        return NextResponse.json({ error: 'Store URL already exists' }, { status: 400 });
      }
    }

    // Store'u güncelle
    const updatedStore = await db.store.update({
      where: { id: existingStore.id },
      data: {
        name: body.name,
        description: body.description,
        email: body.email,
        phone: body.phone,
        url: body.url || params.storeUrl, // URL'yi güncelle veya mevcut URL'yi koru
        logo: body.logo,
        cover: body.cover,
        returnPolicy: body.returnPolicy,
        defaultShippingService: body.defaultShippingService,
        defaultShippingFeePerItem: parseFloat(body.defaultShippingFeePerItem || '0'),
        defaultShippingFeeForAdditionalItem: parseFloat(body.defaultShippingFeeForAdditionalItem || '0'),
        defaultShippingFeePerKg: parseFloat(body.defaultShippingFeePerKg || '0'),
        defaultShippingFeeFixed: parseFloat(body.defaultShippingFeeFixed || '0'),
        defaultDeliveryTimeMin: parseInt(body.defaultDeliveryTimeMin || '7'),
        defaultDeliveryTimeMax: parseInt(body.defaultDeliveryTimeMax || '31'),
      }
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error('Error updating store:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store'u URL'ye göre bul ve kullanıcıya ait olduğunu kontrol et
    const existingStore = await db.store.findFirst({
      where: { 
        url: params.storeUrl,
        user: {
          email: user.email
        }
      }
    });

    if (!existingStore) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Store'u sil
    await db.store.delete({
      where: { id: existingStore.id }
    });

    return NextResponse.json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}