// app/api/seller/store/[storeUrl]/products/[productId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store ownership kontrolü
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Product'ı getir
    const product = await db.product.findUnique({
      where: {
        id: params.productId,
        storeId: store.id,
      },
      include: {
        category: true,
        subCategory: true,
        variants: {
          include: {
            sizes: true,
            colors: true,
            images: true,
          },
        },
        specs: true,
        questions: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                avatarUrl: true,
              },
            },
            images: true,
          },
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
            variants: true,
            wishlist: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      brand,
      categoryId,
      subCategoryId,
      shippingFeeMethod,
    } = body;

    // Store ownership kontrolü
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Product'ı güncelle
    const product = await db.product.update({
      where: {
        id: params.productId,
        storeId: store.id,
      },
      data: {
        name,
        description,
        brand,
        categoryId,
        subCategoryId,
        shippingFeeMethod,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Store ownership kontrolü
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Product'ı sil
    await db.product.delete({
      where: {
        id: params.productId,
        storeId: store.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

