import { NextRequest, NextResponse } from 'next/server';
import  db from '@/app/lib/db';

// POST: Toplu işlemler (featured update, delete multiple)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, subCategoryIds, data } = body;

    if (!action || !subCategoryIds || !Array.isArray(subCategoryIds)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'update-featured':
        if (data?.featured === undefined) {
          return NextResponse.json(
            { success: false, message: 'Featured status is required' },
            { status: 400 }
          );
        }

        await db.subCategory.updateMany({
          where: {
            id: {
              in: subCategoryIds,
            },
          },
          data: {
            featured: data.featured,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Updated featured status for ${subCategoryIds.length} subcategories`,
        });

      case 'delete':
        // Silinecek alt kategorilerde ürün var mı kontrol et
        const subCategoriesWithProducts = await db.subCategory.findMany({
          where: {
            id: {
              in: subCategoryIds,
            },
          },
          include: {
            _count: {
              select: {
                product: true,
              },
            },
          },
        });

        const hasProducts = subCategoriesWithProducts.some(
          sc => sc._count.product > 0
        );

        if (hasProducts) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Cannot delete subcategories with associated products' 
            },
            { status: 400 }
          );
        }

        await db.subCategory.deleteMany({
          where: {
            id: {
              in: subCategoryIds,
            },
          },
        });

        return NextResponse.json({
          success: true,
          message: `Deleted ${subCategoryIds.length} subcategories`,
        });

      default:
        return NextResponse.json(
          { success: false, message: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error performing bulk operation',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}