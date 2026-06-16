import { NextRequest, NextResponse } from 'next/server';
import db  from '@/app/lib/db';

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, image, url, featured } = body;

    // Check if category with same URL already exists
    const existingCategory = await db.category.findUnique({
      where: { url }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this URL already exists' },
        { status: 400 }
      );
    }

    // Create new category
    const category = await db.category.create({
      data: {
        name,
        image,
        url,
        featured: featured || false
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// GET - Fetch all categories



// GET - Fetch all categories with pagination and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (featured !== null && featured !== '') {
      where.featured = featured === 'true';
    }

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get categories with counts
    const [categories, total] = await Promise.all([
      db.category.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              products: true,
              subCategories: true
            }
          },
          subCategories: {
            take: 3,
            select: {
              id: true,
              name: true,
              url: true
            }
          }
        },
        orderBy
      }),
      db.category.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        categories,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

