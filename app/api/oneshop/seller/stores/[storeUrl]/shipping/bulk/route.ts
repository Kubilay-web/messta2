// app/api/seller/store/[storeUrl]/shipping/bulk/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { rates } = body;

    if (!Array.isArray(rates) || rates.length === 0) {
      return NextResponse.json(
        { error: 'No shipping rates provided' },
        { status: 400 }
      );
    }

    // Önce store'u URL'ye göre bul ve kullanıcıya ait olduğunu kontrol et
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

    // Toplu shipping rate oluşturma/update işlemi
    const results = await Promise.allSettled(
      rates.map(async (rate) => {
        const {
          countryId,
          shippingService,
          shippingFeePerItem,
          shippingFeeForAdditionalItem,
          shippingFeePerKg,
          shippingFeeFixed,
          deliveryTimeMin,
          deliveryTimeMax,
          returnPolicy
        } = rate;

        // Bu ülke için zaten shipping rate var mı kontrol et
        const existingRate = await db.shippingRate.findFirst({
          where: {
            storeId: store.id,
            countryId
          }
        });

        if (existingRate) {
          // Update existing rate
          return await db.shippingRate.update({
            where: { id: existingRate.id },
            data: {
              shippingService,
              shippingFeePerItem: parseFloat(shippingFeePerItem || '0'),
              shippingFeeForAdditionalItem: parseFloat(shippingFeeForAdditionalItem || '0'),
              shippingFeePerKg: parseFloat(shippingFeePerKg || '0'),
              shippingFeeFixed: parseFloat(shippingFeeFixed || '0'),
              deliveryTimeMin: parseInt(deliveryTimeMin || '7'),
              deliveryTimeMax: parseInt(deliveryTimeMax || '31'),
              returnPolicy: returnPolicy || 'Return in 30 days.'
            },
            include: {
              country: true
            }
          });
        } else {
          // Create new rate
          return await db.shippingRate.create({
            data: {
              shippingService,
              shippingFeePerItem: parseFloat(shippingFeePerItem || '0'),
              shippingFeeForAdditionalItem: parseFloat(shippingFeeForAdditionalItem || '0'),
              shippingFeePerKg: parseFloat(shippingFeePerKg || '0'),
              shippingFeeFixed: parseFloat(shippingFeeFixed || '0'),
              deliveryTimeMin: parseInt(deliveryTimeMin || '7'),
              deliveryTimeMax: parseInt(deliveryTimeMax || '31'),
              returnPolicy: returnPolicy || 'Return in 30 days.',
              countryId,
              storeId: store.id
            },
            include: {
              country: true
            }
          });
        }
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').map(r => (r as PromiseFulfilledResult<any>).value);
    const failed = results.filter(r => r.status === 'rejected').map(r => (r as PromiseRejectedResult).reason);

    return NextResponse.json({
      message: `${successful.length} shipping rates processed successfully`,
      successful,
      failed: failed.length > 0 ? failed : undefined
    }, { status: 201 });
  } catch (error) {
    console.error('Error bulk processing shipping rates:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process shipping rates',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}