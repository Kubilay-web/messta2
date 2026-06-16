import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

interface Params {
  params: {
    id: string;
  };
}

// GET - Get single category
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        subCategories: {
          select: {
            id: true,
            name: true,
            url: true,
            image: true,
            createdAt: true,
            _count: {
              select: {
                product: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        products: {
          take: 5,
          select: {
            id: true,
            name: true,
            slug: true,
            rating: true
          }
        },
        _count: {
          select: {
            products: true,
            subCategories: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not found',
          message: 'Category not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const body = await request.json();
    const { name, image, url, featured } = body;

    // Check if another category has the same URL
    if (url) {
      const existingCategory = await db.category.findFirst({
        where: {
          url,
          NOT: {
            id: params.id
          }
        }
      });

      if (existingCategory) {
        return NextResponse.json(
          { 
            success: false,
            error: 'URL already exists',
            message: 'Another category with this URL already exists'
          },
          { status: 409 }
        );
      }
    }

    const category = await db.category.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(image && { image }),
        ...(url && { url }),
        ...(featured !== undefined && { featured })
      },
      include: {
        _count: {
          select: {
            products: true,
            subCategories: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: category,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            subCategories: true,
            products: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Not found',
          message: 'Category not found'
        },
        { status: 404 }
      );
    }

    // Check if category has subcategories
    if (category._count.subCategories > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Has subcategories',
          message: 'Cannot delete category with subcategories. Delete subcategories first.'
        },
        { status: 400 }
      );
    }

    // Check if category has products
    if (category._count.products > 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Has products',
          message: 'Cannot delete category with products. Reassign or delete products first.'
        },
        { status: 400 }
      );
    }

    await db.category.delete({
      where: { id: params.id }
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete category',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}