import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET: Tüm alt kategorileri getir
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Filtre oluştur
    const where: any = {};
    
    if (categoryId) {
      where.categoryId = categoryId;
    }
    
    if (featured !== null) {
      where.featured = featured === 'true';
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Sıralama
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Alt kategorileri ve sayısını getir
    const [subCategories, total] = await Promise.all([
      db.subCategory.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
              url: true,
            },
          },
          _count: {
            select: {
              product: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      db.subCategory.count({ where }),
    ]);

    // Format response
    const formattedSubCategories = subCategories.map(subCategory => ({
      id: subCategory.id,
      name: subCategory.name,
      image: subCategory.image,
      url: subCategory.url,
      featured: subCategory.featured,
      productCount: subCategory._count.product,
      category: subCategory.category,
      createdAt: subCategory.createdAt,
      updatedAt: subCategory.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formattedSubCategories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching subcategories',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Yeni alt kategori oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Gerekli alanları kontrol et
    const requiredFields = ['name', 'url', 'categoryId', 'image'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // URL unique kontrolü
    const existingSubCategory = await db.subCategory.findUnique({
      where: { url: body.url },
    });

    if (existingSubCategory) {
      return NextResponse.json(
        { success: false, message: 'URL already exists' },
        { status: 409 }
      );
    }

    // Kategori var mı kontrol et
    const categoryExists = await db.category.findUnique({
      where: { id: body.categoryId },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    // Alt kategoriyi oluştur
    const subCategory = await db.subCategory.create({
      data: {
        name: body.name,
        image: body.image,
        url: body.url,
        featured: body.featured || false,
        categoryId: body.categoryId,
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
      message: 'Subcategory created successfully',
      data: subCategory,
    });

  } catch (error) {
    console.error('Error creating subcategory:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating subcategory',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}