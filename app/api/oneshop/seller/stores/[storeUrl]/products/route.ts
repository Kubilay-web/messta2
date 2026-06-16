// app/api/seller/store/[storeUrl]/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
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

    // Store'u URL'den bul
    const store = await db.store.findUnique({
      where: {
        url: params.storeUrl,
        userId: user.id,
      },
      include: {
        products: {
          include: {
            variants: true,
            category: true,
            subCategory: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    return NextResponse.json(store.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
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
      variants,
      specs,
      questions,
      shippingFeeMethod,
    } = body;

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

    // Generate slug
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create product with transaction
    const product = await db.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          name,
          description,
          brand,
          slug,
          shippingFeeMethod,
          storeId: store.id,
          categoryId,
          subCategoryId,
        },
      });

      // Create variants if provided
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const variantSlug = variant.variantName.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          const newVariant = await tx.productVariant.create({
            data: {
              variantName: variant.variantName,
              variantDescription: variant.variantDescription,
              variantImage: variant.variantImage,
              slug: variantSlug,
              isSale: variant.isSale || false,
              saleEndDate: variant.saleEndDate,
              keywords: variant.keywords || '',
              sku: variant.sku,
              weight: variant.weight || 0,
              productId: newProduct.id,
            },
          });

          // Create sizes
          if (variant.sizes && variant.sizes.length > 0) {
            await tx.size.createMany({
              data: variant.sizes.map((size: any) => ({
                size: size.size,
                quantity: size.quantity,
                price: size.price,
                discount: size.discount || 0,
                productVariantId: newVariant.id,
              })),
            });
          }

          // Create colors
          if (variant.colors && variant.colors.length > 0) {
            await tx.color.createMany({
              data: variant.colors.map((color: string) => ({
                name: color,
                productVariantId: newVariant.id,
              })),
            });
          }

          // Create variant images
          if (variant.images && variant.images.length > 0) {
            await tx.productVariantImage.createMany({
              data: variant.images.map((image: string) => ({
                url: image,
                alt: '',
                productVariantId: newVariant.id,
              })),
            });
          }
        }
      }

      // Create specs
      if (specs && specs.length > 0) {
        await tx.spec.createMany({
          data: specs.map((spec: { name: string; value: string }) => ({
            name: spec.name,
            value: spec.value,
            productId: newProduct.id,
          })),
        });
      }

      // Create questions
      if (questions && questions.length > 0) {
        await tx.question.createMany({
          data: questions.map((q: { question: string; answer: string }) => ({
            question: q.question,
            answer: q.answer,
            productId: newProduct.id,
          })),
        });
      }

      return newProduct;
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}