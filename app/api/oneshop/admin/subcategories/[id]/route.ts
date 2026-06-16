import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Tek bir alt kategori detayını getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const subCategory = await db.subCategory.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            url: true,
            image: true,
          },
        },
        product: {
          include: {
            variants: {
              include: {
                sizes: true,
                images: true,
              },
            },
            store: {
              select: {
                id: true,
                name: true,
                url: true,
              },
            },
            _count: {
              select: {
                reviews: true,
                wishlist: true,
              },
            },
          },
          take: 20,
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            product: true,
          },
        },
      },
    });

    if (!subCategory) {
      return NextResponse.json(
        { success: false, message: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: subCategory,
    });

  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching subcategory',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PATCH: Alt kategori güncelle
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Alt kategori var mı kontrol et
    const existingSubCategory = await db.subCategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      return NextResponse.json(
        { success: false, message: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // URL unique kontrolü (diğer alt kategorilerde var mı)
    if (body.url && body.url !== existingSubCategory.url) {
      const duplicateSubCategory = await db.subCategory.findFirst({
        where: {
          url: body.url,
          id: { not: id },
        },
      });

      if (duplicateSubCategory) {
        return NextResponse.json(
          { success: false, message: 'URL already exists' },
          { status: 409 }
        );
      }
    }

    // Kategori var mı kontrol et (eğer categoryId değiştiyse)
    if (body.categoryId && body.categoryId !== existingSubCategory.categoryId) {
      const categoryExists = await db.category.findUnique({
        where: { id: body.categoryId },
      });

      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: 'Category not found' },
          { status: 404 }
        );
      }
    }

    // Alt kategoriyi güncelle
    const updatedSubCategory = await db.subCategory.update({
      where: { id },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.image && { image: body.image }),
        ...(body.url && { url: body.url }),
        ...(body.featured !== undefined && { featured: body.featured }),
        ...(body.categoryId && { categoryId: body.categoryId }),
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Subcategory updated successfully',
      data: updatedSubCategory,
    });

  } catch (error) {
    console.error('Error updating subcategory:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error updating subcategory',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE: Alt kategori sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Alt kategori var mı kontrol et
    const existingSubCategory = await db.subCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            product: true,
          },
        },
      },
    });

    if (!existingSubCategory) {
      return NextResponse.json(
        { success: false, message: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Alt kategoriye bağlı ürün var mı kontrol et
    if (existingSubCategory._count.product > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Cannot delete subcategory with associated products. Please remove products first.' 
        },
        { status: 400 }
      );
    }

    // Alt kategoriyi sil
    await db.subCategory.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Subcategory deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting subcategory:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error deleting subcategory',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}