// app/api/oneshop/countries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import  db  from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    // Countries'leri veritabanından al
    const countries = await db.country.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          },
          {
            code: {
              contains: search,
              mode: 'insensitive'
            }
          }
        ]
      },
      take: limit,
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        code: true
      }
    });

    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch countries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Sadece admin veya seller kullanıcılar yeni country ekleyebilir
    const users = await db.user.findUnique({
      where: { email: user.email },
      select: { role: true, roleshop: true }
    });

    if (!users || (user.roleshop !== 'ADMIN' && user.roleshop !== 'SELLER')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();
    
    if (!body.name || !body.code) {
      return NextResponse.json(
        { error: 'Name and code are required' },
        { status: 400 }
      );
    }

    // Check if country already exists
    const existingCountry = await db.country.findFirst({
      where: {
        OR: [
          { name: body.name },
          { code: body.code }
        ]
      }
    });

    if (existingCountry) {
      return NextResponse.json(
        { error: 'Country already exists' },
        { status: 400 }
      );
    }

    // Create new country
    const newCountry = await db.country.create({
      data: {
        name: body.name,
        code: body.code.toUpperCase()
      },
      select: {
        id: true,
        name: true,
        code: true
      }
    });

    return NextResponse.json(newCountry, { status: 201 });
  } catch (error) {
    console.error('Error creating country:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create country',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}