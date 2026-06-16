import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// POST - Bulk delete categories
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request',
          message: 'Category IDs array is required'
        },
        { status: 400 }
      );
    }

    // Check if any category has subcategories or products
    const categoriesWithRelations = await db.category.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        _count: {
          select: {
            subCategories: true,
            products: true
          }
        }
      }
    });

    const invalidCategories = categoriesWithRelations.filter(
      cat => cat._count.subCategories > 0 || cat._count.products > 0
    );

    if (invalidCategories.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Has relations',
          message: 'Some categories have subcategories or products and cannot be deleted',
          data: {
            invalidCategories: invalidCategories.map(cat => ({
              id: cat.id,
              name: cat.name,
              subCategories: cat._count.subCategories,
              products: cat._count.products
            }))
          }
        },
        { status: 400 }
      );
    }

    // Delete categories
    const result = await db.category.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        deletedCount: result.count
      },
      message: `${result.count} categories deleted successfully`
    });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}