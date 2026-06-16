import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Filtre parametreleri
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subCategory');
    const brand = searchParams.get('brand');
    const store = searchParams.get('store');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '10000');
    const sortBy = searchParams.get('sortBy') || 'newest';
    const search = searchParams.get('q') || '';
    const rating = parseFloat(searchParams.get('rating') || '0');

    console.log('🔄 Fetching products with filters:', {
      category,
      subCategory,
      brand,
      store,
      minPrice,
      maxPrice,
      sortBy,
      search,
      page,
      limit,
      rating
    });

    // Where koşulu
    const where: any = {};

    // Arama filtresi
    if (search && search.trim() !== '') {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Kategori filtresi
    if (category && category.trim() !== '' && category !== 'null') {
      where.categoryId = category;
    }

    // Alt kategori filtresi
    if (subCategory && subCategory.trim() !== '' && subCategory !== 'null') {
      where.subCategoryId = subCategory;
    }

    // Marka filtresi
    if (brand && brand.trim() !== '' && brand !== 'null') {
      where.brand = brand;
    }

    // Mağaza filtresi
    if (store && store.trim() !== '' && store !== 'null') {
      where.storeId = store;
    }

    // Rating filtresi
    if (rating > 0) {
      where.rating = { gte: rating };
    }

    // Ürünleri getir
    const products = await db.product.findMany({
      where,
      include: {
        store: { select: { id: true, name: true, logo: true, averageRating: true } },
        category: { select: { id: true, name: true, url: true } },
        subCategory: { select: { id: true, name: true, url: true } },
        variants: {
          include: {
            sizes: { orderBy: { price: 'asc' }, take: 1 },
            images: { take: 1 }
          },
          take: 1
        },
        reviews: { select: { rating: true } },
        _count: { select: { reviews: true, wishlist: true } }
      },
      skip,
      take: limit,
      orderBy: getOrderBy(sortBy)
    });

    // Toplam ürün sayısı
    const total = await db.product.count({ where });

    // Fiyat filtresini client-side'da uygula
    let filteredProducts = products;
    if (minPrice > 0 || maxPrice < 10000) {
      filteredProducts = products.filter(product => {
        const price = product.variants[0]?.sizes[0]?.price || 0;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Sıralamayı uygula (client-side)
    const sortedProducts = sortProducts(filteredProducts, sortBy);

    // Her ürün için rating hesapla
    const productsWithRating = sortedProducts.map(product => {
      const reviews = product.reviews || [];
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

      return {
        ...product,
        rating: averageRating,
        numReviews: reviews.length
      };
    });

    console.log(`✅ Found ${total} products, returning ${productsWithRating.length}`);

    return NextResponse.json({
      success: true,
      products: productsWithRating,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit
      }
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Prisma için sıralama
function getOrderBy(sortBy: string) {
  switch (sortBy) {
    case 'newest':
      return { createdAt: 'desc' };
    case 'oldest':
      return { createdAt: 'asc' };
    case 'popular':
      return { sales: 'desc' };
    case 'rating':
      return { rating: 'desc' };
    case 'sales':
      return { sales: 'desc' };
    default:
      return { createdAt: 'desc' };
  }
}

// Client-side sıralama (fiyat için)
function sortProducts(products: any[], sortBy: string) {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0]?.sizes[0]?.price || 0;
        const priceB = b.variants[0]?.sizes[0]?.price || 0;
        return priceA - priceB;
      });
    case 'price-high':
      return sorted.sort((a, b) => {
        const priceA = a.variants[0]?.sizes[0]?.price || 0;
        const priceB = b.variants[0]?.sizes[0]?.price || 0;
        return priceB - priceA;
      });
    default:
      return sorted;
  }
}