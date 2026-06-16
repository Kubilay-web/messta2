import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { StoreStatus } from '@prisma/client';

// GET: Tüm mağazaları getir
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as StoreStatus | undefined;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Filtre oluştur
    const where: any = {};
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { url: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Sıralama
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Mağazaları ve sayısını getir
    const [stores, total] = await Promise.all([
      db.store.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          _count: {
            select: {
              products: true,
              followers: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      db.store.count({ where }),
    ]);

    // Format response
    const formattedStores = stores.map(store => ({
      id: store.id,
      name: store.name,
      email: store.email,
      url: store.url,
      status: store.status,
      logo: store.logo,
      cover: store.cover,
      featured: store.featured,
      averageRating: store.averageRating,
      productCount: store._count.products,
      followerCount: store._count.followers,
      owner: {
        id: store.user.id,
        username: store.user.username,
        email: store.user.email,
      },
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formattedStores,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching stores',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Yeni mağaza oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Gerekli alanları kontrol et
    const requiredFields = ['name', 'email', 'url', 'userId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Email ve URL unique kontrolü
    const existingStore = await db.store.findFirst({
      where: {
        OR: [
          { email: body.email },
          { url: body.url }
        ]
      }
    });

    if (existingStore) {
      return NextResponse.json(
        { 
          success: false, 
          message: existingStore.email === body.email 
            ? 'Email already exists' 
            : 'URL already exists' 
        },
        { status: 409 }
      );
    }

    // Mağazayı oluştur
    const store = await db.store.create({
      data: {
        name: body.name,
        description: body.description || '',
        email: body.email,
        phone: body.phone || '',
        url: body.url,
        logo: body.logo || '/default-store-logo.png',
        cover: body.cover || '/default-store-cover.jpg',
        status: body.status || 'PENDING',
        userId: body.userId,
        featured: body.featured || false,
        returnPolicy: body.returnPolicy || 'Return in 30 days.',
        defaultShippingService: body.defaultShippingService || 'International Delivery',
        defaultShippingFeePerItem: body.defaultShippingFeePerItem || 0,
        defaultShippingFeeForAdditionalItem: body.defaultShippingFeeForAdditionalItem || 0,
        defaultShippingFeePerKg: body.defaultShippingFeePerKg || 0,
        defaultShippingFeeFixed: body.defaultShippingFeeFixed || 0,
        defaultDeliveryTimeMin: body.defaultDeliveryTimeMin || 7,
        defaultDeliveryTimeMax: body.defaultDeliveryTimeMax || 31,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Store created successfully',
      data: store,
    });

  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating store',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}