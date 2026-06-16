import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { productSlug: string; variantSlug: string } }
) {
  try {
    const { productSlug, variantSlug } = params;

    const product = await db.product.findUnique({
      where: { slug: productSlug },
      select: { id: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }

    const variant = await db.productVariant.findFirst({
      where: {
        productId: product.id,
        slug: variantSlug,
      },
      include: {
        sizes: {
          orderBy: {
            price: 'asc',
          },
        },
        colors: true,
        images: true,
        specs: {
          select: {
            name: true,
            value: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            description: true,
            storeId: true,
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
          },
        },
      },
    });

    if (!variant) {
      return NextResponse.json(
        { error: "Varyant bulunamadı" },
        { status: 404 }
      );
    }

    // Benzer ürünleri getir
    const similarProducts = await db.product.findMany({
      where: {
        categoryId: product.id,
        id: { not: product.id },
      },
      include: {
        variants: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            images: {
              take: 1,
            },
            sizes: {
              take: 1,
            },
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
      take: 8,
    });

    return NextResponse.json({
      variant,
      similarProducts,
    });
  } catch (error) {
    console.error("Varyant getirme hatası:", error);
    return NextResponse.json(
      { error: "Varyant getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}