import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';

// GET - Fetch all offer tags with pagination, search, and sorting
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
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

    // Build orderBy
    const orderBy: any = {};
    if (sortBy === 'productsCount') {
      orderBy.products = {
        _count: sortOrder
      };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    // Get offer tags with optimized queries
    const [offerTags, total] = await Promise.all([
      db.offerTag.findMany({
        where,
        skip,
        take: limit,
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
          },
          products: {
            take: 3,
            select: {
              id: true,
              name: true,
              slug: true,
              rating: true
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy
      }),
      db.offerTag.count({ where })
    ]);

    // Calculate additional stats
    const totalProductsWithTags = await db.product.count({
      where: {
        offerTagId: {
          not: null
        }
      }
    });

    const mostUsedTag = await db.offerTag.findFirst({
      select: {
        name: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        products: {
          _count: 'desc'
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        offerTags,
        stats: {
          totalProductsWithTags,
          mostUsedTag: mostUsedTag ? {
            name: mostUsedTag.name,
            productCount: mostUsedTag._count.products
          } : null,
          totalOfferTags: total
        },
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
    console.error('Error fetching offer tags:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch offer tags',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create new offer tag
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url } = body;

    // Validate required fields
    if (!name || !url) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          message: 'Name and URL are required'
        },
        { status: 400 }
      );
    }

    // Validate URL format
    const urlRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!urlRegex.test(url)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid URL format',
          message: 'URL must contain only lowercase letters, numbers, and hyphens'
        },
        { status: 400 }
      );
    }

    // Check if offer tag with same URL already exists
    const existingTag = await db.offerTag.findUnique({
      where: { url }
    });

    if (existingTag) {
      return NextResponse.json(
        { 
          success: false,
          error: 'URL already exists',
          message: 'Offer tag with this URL already exists'
        },
        { status: 409 }
      );
    }

    // Check if name already exists
    const existingName = await db.offerTag.findFirst({
      where: { name }
    });

    if (existingName) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Name already exists',
          message: 'Offer tag with this name already exists'
        },
        { status: 409 }
      );
    }

    // Create new offer tag
    const offerTag = await db.offerTag.create({
      data: {
        name,
        url
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
      message: 'Offer tag created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating offer tag:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create offer tag',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}