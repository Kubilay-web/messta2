// app/api/oneshop/products/[productSlug]/related/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { slug: params.productSlug },
      include: {
        category: true,
        subCategory: true,
        store: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Find related products
    const relatedProducts = await db.product.findMany({
      where: {
        AND: [
          { id: { not: product.id } },
          {
            OR: [
              { categoryId: product.categoryId },
              { subCategoryId: product.subCategoryId },
              { storeId: product.storeId }
            ]
          }
        ]
      },
      include: {
        variants: {
          take: 1,
          include: {
            sizes: {
              take: 1
            },
            images: {
              take: 1
            }
          }
        },
        store: {
          select: {
            name: true,
            logo: true
          }
        }
      },
      take: 8,
      orderBy: { sales: 'desc' }
    });

    // Format the products with variantSlug
    const formattedProducts = relatedProducts.map(p => {
      const variant = p.variants[0];
      const size = variant?.sizes[0];
      const image = variant?.images?.[0]?.url || variant?.variantImage || '/images/default-product.png';
      const variantSlug = variant?.slug || `${p.slug}-default`;
      
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        variantSlug: variantSlug, // BU SATIR ÇOK ÖNEMLİ!
        image: image,
        price: size?.price || 0,
        originalPrice: size?.price || 0,
        rating: p.rating,
        reviews: p.numReviews,
        store: p.store
      };
    });

    return NextResponse.json({ products: formattedProducts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch related products' }, { status: 500 });
  }
}