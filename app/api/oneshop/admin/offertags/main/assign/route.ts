import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// POST - Assign offer tag to multiple products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { offerTagId, productIds, action = 'assign' } = body;

    if (!offerTagId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing offer tag ID',
          message: 'Offer tag ID is required'
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid product IDs',
          message: 'Product IDs array is required'
        },
        { status: 400 }
      );
    }

    // Check if offer tag exists
    const offerTag = await db.offerTag.findUnique({
      where: { id: offerTagId }
    });

    if (!offerTag) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Offer tag not found',
          message: 'Offer tag does not exist'
        },
        { status: 404 }
      );
    }

    let result: any;
    let message = '';

    if (action === 'assign') {
      // Assign offer tag to products
      result = await db.product.updateMany({
        where: {
          id: { in: productIds }
        },
        data: { offerTagId }
      });

      message = `Offer tag assigned to ${result.count} products`;
    } else if (action === 'remove') {
      // Remove offer tag from products
      result = await db.product.updateMany({
        where: {
          id: { in: productIds },
          offerTagId
        },
        data: { offerTagId: null }
      });

      message = `Offer tag removed from ${result.count} products`;
    }

    // Get updated stats
    const updatedTag = await db.offerTag.findUnique({
      where: { id: offerTagId },
      select: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        affectedCount: result.count,
        currentProductCount: updatedTag?._count.products || 0
      },
      message
    });
  } catch (error) {
    console.error('Error assigning offer tag:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to assign offer tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}