import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// POST - Bulk delete offer tags
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request',
          message: 'Offer tag IDs array is required'
        },
        { status: 400 }
      );
    }

    // Check if any offer tag has products
    const tagsWithProducts = await db.offerTag.findMany({
      where: {
        id: { in: ids }
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    const invalidTags = tagsWithProducts.filter(
      tag => tag._count.products > 0
    );

    if (invalidTags.length > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Has products',
          message: 'Some offer tags have products and cannot be deleted',
          data: {
            invalidTags: invalidTags.map(tag => ({
              id: tag.id,
              name: tag.name,
              products: tag._count.products
            }))
          }
        },
        { status: 400 }
      );
    }

    // Delete offer tags
    const result = await db.offerTag.deleteMany({
      where: {
        id: { in: ids }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        deletedCount: result.count
      },
      message: `${result.count} offer tags deleted successfully`
    });
  } catch (error) {
    console.error('Error in bulk delete:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete offer tags',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}