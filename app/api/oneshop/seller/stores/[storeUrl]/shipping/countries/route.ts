// app/api/seller/store/[storeUrl]/shipping/countries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
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

    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    // Store'un shipping rate'lerinde kullanılan ülkeleri getir
    const usedCountries = await db.shippingRate.findMany({
      where: {
        storeId: store.id
      },
      select: {
        countryId: true
      },
      distinct: ['countryId']
    });

    const usedCountryIds = usedCountries.map(c => c.countryId);

    // Tüm ülkeleri getir
    const countries = await db.country.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            code: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      },
      take: limit,
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        code: true
      }
    });

    // Her ülke için store'un shipping rate'ini kontrol et
    const countriesWithShipping = await Promise.all(
      countries.map(async (country) => {
        const shippingRate = await db.shippingRate.findFirst({
          where: {
            storeId: store.id,
            countryId: country.id
          },
          select: {
            id: true,
            shippingService: true,
            shippingFeePerItem: true,
            deliveryTimeMin: true,
            deliveryTimeMax: true
          }
        });

        return {
          ...country,
          hasShippingRate: !!shippingRate,
          shippingRate: shippingRate || null
        };
      })
    );

    return NextResponse.json(countriesWithShipping);
  } catch (error) {
    console.error('Error fetching countries with shipping rates:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch countries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}