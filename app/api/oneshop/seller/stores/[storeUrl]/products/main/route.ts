// app/api/seller/store/[storeUrl]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Store'u URL'den bul
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Filtreleme koşulları
    const where: any = {
      storeId: store.id,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categoryId = category;
    }

    if (status) {
      // Status filtresi için (örneğin: active, low-stock, out-of-stock)
      // Burada varsayılan bir status alanınız yoksa, variant'lardaki stok durumuna göre filtreleme yapabilirsiniz
    }

    // Toplam ürün sayısı
    const totalProducts = await db.product.count({ where });

    // Sıralama
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Ürünleri getir
    const products = await db.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
          },
        },
        variants: {
          include: {
            sizes: true,
            images: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
          take: 1, // İlk variant'ı al
        },
        _count: {
          select: {
            variants: true,
            reviews: true,
          },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // Toplam stok hesaplama
    const productsWithStock = products.map(product => {
      const totalStock = product.variants.reduce((sum, variant) => {
        return sum + variant.sizes.reduce((sizeSum, size) => sizeSum + size.quantity, 0);
      }, 0);

      return {
        ...product,
        totalStock,
      };
    });

    return NextResponse.json({
      products: productsWithStock,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}