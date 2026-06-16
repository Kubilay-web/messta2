import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Fetching filters from database...');

    // 1. Kategorileri getir
    const categories = await db.category.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        url: true,
        subCategories: {
          select: {
            id: true,
            name: true,
            url: true,
            image: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    // Her kategori için ürün sayısını getir
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await db.product.count({
          where: { categoryId: category.id }
        });

        const subCategoriesWithCounts = await Promise.all(
          category.subCategories.map(async (subCategory) => {
            const subProductCount = await db.product.count({
              where: { subCategoryId: subCategory.id }
            });
            return {
              ...subCategory,
              _count: { product: subProductCount }
            };
          })
        );

        return {
          ...category,
          subCategories: subCategoriesWithCounts,
          _count: { products: productCount }
        };
      })
    );

    // 2. Markaları getir ve say
    const allProducts = await db.product.findMany({
      select: { brand: true }
    });

    const brandCounts = new Map<string, number>();
    allProducts.forEach(product => {
      const brand = product.brand;
      if (brand && brand.trim() !== '' && brand !== 'null') {
        brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
      }
    });

    const brands = Array.from(brandCounts.entries())
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => a.brand.localeCompare(b.brand));

    // 3. Aktif mağazaları getir
    const stores = await db.store.findMany({
      where: {
        status: 'ACTIVE'
      },
      select: {
        id: true,
        name: true,
        logo: true,
        averageRating: true
      },
      take: 20,
      orderBy: { averageRating: 'desc' }
    });

    // 4. Fiyat aralığını hesapla
    let minPrice = 0;
    let maxPrice = 10000;

    try {
      // Tüm variant'lardaki fiyatları kontrol et
      const allVariants = await db.productVariant.findMany({
        include: {
          sizes: {
            select: { price: true }
          }
        },
        take: 100
      });

      const allPrices: number[] = [];
      allVariants.forEach(variant => {
        variant.sizes.forEach(size => {
          if (size.price > 0) {
            allPrices.push(size.price);
          }
        });
      });

      if (allPrices.length > 0) {
        minPrice = Math.floor(Math.min(...allPrices));
        maxPrice = Math.ceil(Math.max(...allPrices));
      }
    } catch (error) {
      console.warn('⚠️ Could not calculate price range:', error);
      // Varsayılan değerleri kullan
      minPrice = 0;
      maxPrice = 10000;
    }

    // 5. Free shipping ürün sayısı
    const freeShippingCount = await db.product.count({
      where: {
        OR: [
          { freeShippingForAllCountries: true },
          { freeShipping: { isNot: null } }
        ]
      }
    });

    console.log('✅ Filters fetched successfully');

    return NextResponse.json({
      success: true,
      filters: {
        categories: categoriesWithCounts,
        brands,
        stores,
        priceRange: {
          min: minPrice,
          max: maxPrice
        },
        freeShipping: freeShippingCount
      }
    });

  } catch (error) {
    console.error('❌ Error fetching filters:', error);

    return NextResponse.json({
      success: true,
      filters: {
        categories: [],
        brands: [],
        stores: [],
        priceRange: {
          min: 0,
          max: 10000
        },
        freeShipping: 0
      }
    });
  }
}