import { NextRequest, NextResponse } from 'next/server';
import  db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

// GET: Mağazaya ait kuponları getir
export async function GET(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl } = await params;
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // active, expired, upcoming
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Mağazayı bul ve kullanıcı yetkisini kontrol et
    const store = await db.store.findUnique({
      where: { url: storeUrl },
      select: { id: true, userId: true, name: true }
    });

    if (!store) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Kullanıcının bu mağazanın sahibi olup olmadığını kontrol et
    if (store.userId !== user.id) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    // Filtre oluştur
    const where: any = {
      storeId: store.id,
    };

    if (status) {
      const now = new Date().toISOString().split('T')[0];
      switch (status) {
        case 'active':
          where.AND = [
            { startDate: { lte: now } },
            { endDate: { gte: now } },
          ];
          break;
        case 'expired':
          where.endDate = { lt: now };
          break;
        case 'upcoming':
          where.startDate = { gt: now };
          break;
      }
    }

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Sıralama
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Kuponları ve sayısını getir
    const [coupons, total] = await Promise.all([
      db.coupon.findMany({
        where,
        include: {
          _count: {
            select: {
              carts: true,
              orders: true,
              userRelations: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
      db.coupon.count({ where }),
    ]);

    // Format response
    const now = new Date().toISOString().split('T')[0];
    const formattedCoupons = coupons.map(coupon => {
      const isActive = coupon.startDate <= now && coupon.endDate >= now;
      const isExpired = coupon.endDate < now;
      const isUpcoming = coupon.startDate > now;

      return {
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount,
        startDate: coupon.startDate,
        endDate: coupon.endDate,
        status: isExpired ? 'expired' : isUpcoming ? 'upcoming' : 'active',
        isActive,
        isExpired,
        isUpcoming,
        usageCount: coupon._count.orders + coupon._count.carts,
        uniqueUsers: coupon._count.userRelations,
        createdAt: coupon.createdAt,
        updatedAt: coupon.updatedAt,
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedCoupons,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error fetching coupons',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST: Yeni kupon oluştur
export async function POST(
  request: NextRequest,
  { params }: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { storeUrl } = await params;
    const body = await request.json();

    // Mağazayı bul ve kullanıcı yetkisini kontrol et
    const store = await db.store.findUnique({
      where: { url: storeUrl },
      select: { id: true, userId: true }
    });

    if (!store) {
      return NextResponse.json(
        { success: false, message: 'Store not found' },
        { status: 404 }
      );
    }

    // Kullanıcının bu mağazanın sahibi olup olmadığını kontrol et
    if (store.userId !==  user.id) {
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    // Gerekli alanları kontrol et
    const requiredFields = ['code', 'discount', 'startDate', 'endDate'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Tarih validasyonu
    if (new Date(body.startDate) > new Date(body.endDate)) {
      return NextResponse.json(
        { success: false, message: 'Start date cannot be after end date' },
        { status: 400 }
      );
    }

    // İndirim validasyonu
    if (body.discount < 1 || body.discount > 100) {
      return NextResponse.json(
        { success: false, message: 'Discount must be between 1 and 100' },
        { status: 400 }
      );
    }

    // Kupon kodu unique kontrolü (mağaza içinde)
    const existingCoupon = await db.coupon.findFirst({
      where: {
        code: body.code,
        storeId: store.id,
      },
    });

    if (existingCoupon) {
      return NextResponse.json(
        { success: false, message: 'Coupon code already exists for this store' },
        { status: 409 }
      );
    }

    // Kuponu oluştur
    const coupon = await db.coupon.create({
      data: {
        code: body.code.toUpperCase(),
        discount: parseInt(body.discount),
        startDate: body.startDate,
        endDate: body.endDate,
        storeId: store.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon,
    });

  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error creating coupon',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}