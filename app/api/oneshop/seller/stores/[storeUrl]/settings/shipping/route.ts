// app/api/seller/store/[storeUrl]/shipping/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
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

    // Store ID'sine göre shipping rate'leri getir
    const shippingRates = await db.shippingRate.findMany({
      where: {
        storeId: store.id
      },
      include: {
        country: true
      }
    });

    return NextResponse.json(shippingRates);
  } catch (error) {
    console.error('Error fetching shipping rates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
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

    // Country işlemleri
    let countryId = body.countryId;
    if (body.countryName && !body.countryId) {
      const existingCountry = await db.country.findFirst({
        where: { name: body.countryName }
      });

      if (existingCountry) {
        countryId = existingCountry.id;
      } else {
        // Yeni country oluştur
        const newCountry = await db.country.create({
          data: {
            name: body.countryName,
            code: body.countryName.substring(0, 3).toUpperCase()
          }
        });
        countryId = newCountry.id;
      }
    }

    // Shipping rate oluştur
    const shippingRate = await db.shippingRate.create({
      data: {
        shippingService: body.shippingService,
        shippingFeePerItem: parseFloat(body.shippingFeePerItem || '0'),
        shippingFeeForAdditionalItem: parseFloat(body.shippingFeeForAdditionalItem || '0'),
        shippingFeePerKg: parseFloat(body.shippingFeePerKg || '0'),
        shippingFeeFixed: parseFloat(body.shippingFeeFixed || '0'),
        deliveryTimeMin: parseInt(body.deliveryTimeMin || '7'),
        deliveryTimeMax: parseInt(body.deliveryTimeMax || '31'),
        returnPolicy: body.returnPolicy || 'Return in 30 days.',
        countryId: countryId,
        storeId: store.id
      },
      include: {
        country: true
      }
    });

    return NextResponse.json(shippingRate, { status: 201 });
  } catch (error) {
    console.error('Error creating shipping rate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}