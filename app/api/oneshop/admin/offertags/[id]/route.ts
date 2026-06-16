import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

interface Params {
  params: {
    id: string;
  };
}

// GET - Get single offer tag
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const offerTag = await db.offerTag.findUnique({
      where: { id: params.id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            store: {
              select: {
                id: true,
                name: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!offerTag) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not found',
          message: 'Offer tag not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: offerTag
    });
  } catch (error) {
    console.error('Error fetching offer tag:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch offer tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update offer tag
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    const { name, url } = body;

    // Check if another offer tag has the same URL
    if (url) {
      const existingTag = await db.offerTag.findFirst({
        where: {
          url,
          NOT: {
            id: params.id
          }
        }
      });

      if (existingTag) {
        return NextResponse.json(
          { 
            success: false,
            error: 'URL already exists',
            message: 'Another offer tag with this URL already exists'
          },
          { status: 409 }
        );
      }
    }

    const offerTag = await db.offerTag.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(url && { url })
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: offerTag,
      message: 'Offer tag updated successfully'
    });
  } catch (error) {
    console.error('Error updating offer tag:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update offer tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete offer tag
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Check if offer tag exists
    const offerTag = await db.offerTag.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!offerTag) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not found',
          message: 'Offer tag not found'
        },
        { status: 404 }
      );
    }

    // Check if offer tag has products
    if (offerTag._count.products > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Has products',
          message: 'Cannot delete offer tag with products. Remove products first.'
        },
        { status: 400 }
      );
    }

    await db.offerTag.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Offer tag deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting offer tag:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete offer tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}