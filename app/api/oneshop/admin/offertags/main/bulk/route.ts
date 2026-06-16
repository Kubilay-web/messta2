import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// POST - Bulk operations (delete, update, assign)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ids, data } = body;

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

    if (!action || !['delete', 'update'].includes(action)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid action',
          message: 'Action must be either "delete" or "update"'
        },
        { status: 400 }
      );
    }

    if (action === 'update' && !data) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing data',
          message: 'Update data is required for update action'
        },
        { status: 400 }
      );
    }

    let result: any;
    let message = '';

    if (action === 'delete') {
      // Remove offer tags from products first
      await db.product.updateMany({
        where: {
          offerTagId: {
            in: ids
          }
        },
        data: { offerTagId: null }
      });

      // Delete offer tags
      result = await db.offerTag.deleteMany({
        where: {
          id: { in: ids }
        }
      });

      message = `${result.count} offer tags deleted successfully`;
    } else if (action === 'update') {
      // Update multiple offer tags
      result = await db.offerTag.updateMany({
        where: {
          id: { in: ids }
        },
        data
      });

      message = `${result.count} offer tags updated successfully`;
    }

    return NextResponse.json({
      success: true,
      data: {
        affectedCount: result.count
      },
      message
    });
  } catch (error) {
    console.error('Error in bulk operation:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to perform bulk operation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}