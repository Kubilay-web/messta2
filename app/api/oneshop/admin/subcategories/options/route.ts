import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Kategori seçenekleri (dropdown için)
export async function GET(request: NextRequest) {
  try {
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        image: true,
        _count: {
          select: {
            subCategories: true,
            products: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    const options = categories.map(category => ({
      value: category.id,
      label: category.name,
      url: category.url,
      image: category.image,
      subCategoryCount: category._count.subCategories,
      productCount: category._count.products,
    }));

    return NextResponse.json({
      success: true,
      data: options,
    });

  } catch (error) {
    console.error('Error fetching category options:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching categories',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}