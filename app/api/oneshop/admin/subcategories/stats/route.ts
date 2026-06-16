import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Alt kategori istatistikleri
export async function GET(request: NextRequest) {
  try {
    // Toplam alt kategori sayısı
    const totalSubCategories = await db.subCategory.count();

    // Featured alt kategori sayısı
    const featuredSubCategories = await db.subCategory.count({
      where: { featured: true },
    });

    // Kategori başına alt kategori sayıları
    const subCategoriesByCategory = await db.category.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            subCategories: true,
          },
        },
      },
      orderBy: {
        subCategories: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    // En çok ürünü olan alt kategoriler (top 5)
    const topSubCategoriesByProducts = await db.subCategory.findMany({
      take: 5,
      orderBy: {
        product: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: {
            product: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    // Günlük yeni alt kategoriler
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const newSubCategoriesToday = await db.subCategory.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    // Haftalık yeni alt kategoriler
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const newSubCategoriesThisWeek = await db.subCategory.count({
      where: {
        createdAt: {
          gte: weekAgo,
        },
      },
    });

    const stats = {
      totalSubCategories,
      featuredSubCategories,
      newSubCategoriesToday,
      newSubCategoriesThisWeek,
      subCategoriesByCategory: subCategoriesByCategory.map(category => ({
        id: category.id,
        name: category.name,
        count: category._count.subCategories,
      })),
      topSubCategoriesByProducts: topSubCategoriesByProducts.map(sc => ({
        id: sc.id,
        name: sc.name,
        categoryName: sc.category.name,
        productCount: sc._count.product,
      })),
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error('Error fetching subcategory stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching subcategory statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}