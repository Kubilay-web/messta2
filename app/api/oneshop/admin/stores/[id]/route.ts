import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Tek bir mağaza detayını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const store = await db.store.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
        products: {
          include: {
            variants: {
              include: {
                sizes: true,
                colors: true,
                images: true,
              },
            },
            category: {
              select: {
                name: true,
                url: true,
              },
            },
            subCategory: {
              select: {
                name: true,
                url: true,
              },
            },
            _count: {
              select: {
                reviews: true,
                wishlist: true,
              },
            },
          },
          take: 10, // Son 10 ürün
          orderBy: {
            createdAt: 'desc',
          },
        },
        shippingRates: {
          include: {
            country: true,
          },
        },
        coupons: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            products: true,
            followers: true,
            orderGroups: true,
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Format response
    const formattedStore = {
      id: store.id,
      name: store.name,
      description: store.description,
      email: store.email,
      phone: store.phone,
      url: store.url,
      logo: store.logo,
      cover: store.cover,
      status: store.status,
      featured: store.featured,
      averageRating: store.averageRating,
      returnPolicy: store.returnPolicy,
      defaultShippingService: store.defaultShippingService,
      defaultShippingFeePerItem: store.defaultShippingFeePerItem,
      defaultShippingFeeForAdditionalItem: store.defaultShippingFeeForAdditionalItem,
      defaultShippingFeePerKg: store.defaultShippingFeePerKg,
      defaultShippingFeeFixed: store.defaultShippingFeeFixed,
      defaultDeliveryTimeMin: store.defaultDeliveryTimeMin,
      defaultDeliveryTimeMax: store.defaultDeliveryTimeMax,
      owner: store.user,
      productCount: store._count.products,
      followerCount: store._count.followers,
      orderCount: store._count.orderGroups,
      products: store.products.map(product => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        rating: product.rating,
        sales: product.sales,
        numReviews: product.numReviews,
        category: product.category,
        subCategory: product.subCategory,
        variantCount: product.variants.length,
        reviewCount: product._count.reviews,
        wishlistCount: product._count.wishlist,
        createdAt: product.createdAt,
      })),
      shippingRates: store.shippingRates,
      coupons: store.coupons,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    };

    return NextResponse.json({
      success: true,
      data: formattedStore,
    });

  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching store',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PATCH: Mağaza güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Mağaza var mı kontrol et
    const existingStore = await db.store.findUnique({
      where: { id },
    });

    if (!existingStore) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Email ve URL unique kontrolü (diğer mağazalarda var mı)
    if (body.email || body.url) {
      const duplicateStore = await db.store.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(body.email ? [{ email: body.email }] : []),
                ...(body.url ? [{ url: body.url }] : []),
              ],
            },
          ],
        },
      });

      if (duplicateStore) {
        return NextResponse.json(
          { 
            success: false, 
            message: duplicateStore.email === body.email 
              ? 'Email already exists' 
              : 'URL already exists' 
          },
          { status: 409 }
        );
      }
    }

    // Mağazayı güncelle
    const updatedStore = await db.store.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.email && { email: body.email }),
        ...(body.phone !== undefined && { phone: body.phone }),
        ...(body.url && { url: body.url }),
        ...(body.logo !== undefined && { logo: body.logo }),
        ...(body.cover !== undefined && { cover: body.cover }),
        ...(body.status && { status: body.status }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.averageRating !== undefined && { averageRating: body.averageRating }),
        ...(body.returnPolicy !== undefined && { returnPolicy: body.returnPolicy }),
        ...(body.defaultShippingService !== undefined && { defaultShippingService: body.defaultShippingService }),
        ...(body.defaultShippingFeePerItem !== undefined && { defaultShippingFeePerItem: body.defaultShippingFeePerItem }),
        ...(body.defaultShippingFeeForAdditionalItem !== undefined && { defaultShippingFeeForAdditionalItem: body.defaultShippingFeeForAdditionalItem }),
        ...(body.defaultShippingFeePerKg !== undefined && { defaultShippingFeePerKg: body.defaultShippingFeePerKg }),
        ...(body.defaultShippingFeeFixed !== undefined && { defaultShippingFeeFixed: body.defaultShippingFeeFixed }),
        ...(body.defaultDeliveryTimeMin !== undefined && { defaultDeliveryTimeMin: body.defaultDeliveryTimeMin }),
        ...(body.defaultDeliveryTimeMax !== undefined && { defaultDeliveryTimeMax: body.defaultDeliveryTimeMax }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Store updated successfully',
      data: updatedStore,
    });

  } catch (error) {
    console.error('Error updating store:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating store',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE: Mağaza sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Mağaza var mı kontrol et
    const existingStore = await db.store.findUnique({
      where: { id },
    });

    if (!existingStore) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Mağazayı sil
    await db.store.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Store deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error deleting store',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}