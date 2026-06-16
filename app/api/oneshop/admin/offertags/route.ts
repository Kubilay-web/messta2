import { NextRequest, NextResponse } from 'next/server';
import db  from '@/app/lib/db';

// GET - Fetch all offer tags with pagination and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get offer tags with product counts
    const [offerTags, total] = await Promise.all([
      db.offerTag.findMany({
        where,
        skip,
        take: limit,
        include: {
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
              slug: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      db.offerTag.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        offerTags,
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

    // Create new offer tag
    const offerTag = await db.offerTag.create({
      data: {
        name,
        url
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