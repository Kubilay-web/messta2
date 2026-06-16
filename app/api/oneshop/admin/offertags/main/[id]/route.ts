import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

interface Params {
  params: {
    id: string;
  };
}

// GET - Get single offer tag with details
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const offerTag = await db.offerTag.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        url: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            rating: true,
            sales: true,
            price: true,
            store: {
              select: {
                id: true,
                name: true
              }
            },
            category: {
              select: {
                id: true,
                name: true
              }
            },
            variants: {
              take: 1,
              select: {
                variantImage: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 20
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

    // Get related stats
    const productStats = await db.product.aggregate({
      where: { offerTagId: params.id },
      _avg: {
        rating: true,
        price: true
      },
      _sum: {
        sales: true,
        views: true
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        ...offerTag,
        stats: {
          averageRating: productStats._avg.rating || 0,
          averagePrice: productStats._avg.price || 0,
          totalSales: productStats._sum.sales || 0,
          totalViews: productStats._sum.views || 0
        }
      }
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

    // Check if offer tag exists
    const existingTag = await db.offerTag.findUnique({
      where: { id: params.id }
    });

    if (!existingTag) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not found',
          message: 'Offer tag not found'
        },
        { status: 404 }
      );
    }

    // Check if another offer tag has the same URL
    if (url && url !== existingTag.url) {
      const urlExists = await db.offerTag.findFirst({
        where: {
          url,
          NOT: {
            id: params.id
          }
        }
      });

      if (urlExists) {
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

    // Check if another offer tag has the same name
    if (name && name !== existingTag.name) {
      const nameExists = await db.offerTag.findFirst({
        where: {
          name,
          NOT: {
            id: params.id
          }
        }
      });

      if (nameExists) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Name already exists',
            message: 'Another offer tag with this name already exists'
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
      select: {
        id: true,
        name: true,
        url: true,
        createdAt: true,
        updatedAt: true,
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

    // Remove offer tag from products first (cascade would be better but we handle it manually)
    if (offerTag._count.products > 0) {
      await db.product.updateMany({
        where: { offerTagId: params.id },
        data: { offerTagId: null }
      });
    }

    // Delete the offer tag
    await db.offerTag.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Offer tag deleted successfully. Removed from all products.'
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