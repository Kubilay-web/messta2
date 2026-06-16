import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// GET: Ürünün varyantlarını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, productId } = params;

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

    // Ürünü ve varyantlarını getir
    const product = await db.product.findUnique({
      where: {
        id: productId,
        storeId: store.id,
      },
      include: {
        variants: {
          include: {
            sizes: true,
            images: true,
            colors: true,
            specs: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        category: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product, variants: product.variants });
  } catch (error) {
    console.error('Error fetching product variants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product variants' },
      { status: 500 }
    );
  }
}

// POST: Yeni varyant oluştur
export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string; productId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { storeUrl, productId } = params;
    const body = await request.json();

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

    // Ürünü bul
    const product = await db.product.findUnique({
      where: {
        id: productId,
        storeId: store.id,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Slug kontrolü
    const existingVariant = await db.productVariant.findUnique({
      where: { slug: body.slug },
    });

    if (existingVariant) {
      return NextResponse.json(
        { error: 'Variant slug already exists' },
        { status: 400 }
      );
    }

    // Varyant oluştur
    const variant = await db.productVariant.create({
      data: {
        variantName: body.variantName,
        variantDescription: body.variantDescription || '',
        variantImage: body.variantImage || '',
        slug: body.slug,
        keywords: body.keywords || '',
        sku: body.sku,
        weight: body.weight || 0,
        productId: product.id,
        // Boyutları oluştur
        sizes: {
          create: body.sizes?.map((size: any) => ({
            size: size.size,
            quantity: size.quantity,
            price: size.price,
            discount: size.discount || 0,
          })) || [],
        },
        // Renkleri oluştur
        colors: {
          create: body.colors?.map((color: any) => ({
            name: color.name,
          })) || [],
        },
        // Özellikleri oluştur
        specs: {
          create: body.specs?.map((spec: any) => ({
            name: spec.name,
            value: spec.value,
          })) || [],
        },
      },
      include: {
        sizes: true,
        colors: true,
        specs: true,
      },
    });

    // Resimleri ekle (eğer varsa)
    if (body.images && body.images.length > 0) {
      await db.productVariantImage.createMany({
        data: body.images.map((image: any) => ({
          url: image.url,
          alt: image.alt || '',
          productVariantId: variant.id,
        })),
      });
    }

    // Tam varyant bilgisiyle dön
    const fullVariant = await db.productVariant.findUnique({
      where: { id: variant.id },
      include: {
        sizes: true,
        colors: true,
        specs: true,
        images: true,
      },
    });

    return NextResponse.json({ variant: fullVariant }, { status: 201 });
  } catch (error) {
    console.error('Error creating variant:', error);
    return NextResponse.json(
      { error: 'Failed to create variant' },
      { status: 500 }
    );
  }
}