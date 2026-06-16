// app/api/oneshop/admin/landingpage/sections/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(request: NextRequest) {
  try {
    const sections = await db.landingPageSection.findMany({
      include: {
        images: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('GET Sections Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { type, title, subtitle, active = true, order = 0 } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required' },
        { status: 400 }
      );
    }

    // Calculate next order if not provided
    let finalOrder = order;
    if (!order) {
      const maxOrder = await db.landingPageSection.aggregate({
        _max: { order: true }
      });
      finalOrder = (maxOrder._max.order || 0) + 1;
    }

    const section = await db.landingPageSection.create({
      data: {
        type,
        title,
        subtitle,
        active,
        order: finalOrder,
        data: {}
      },
      include: {
        images: true
      }
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('POST Section Error:', error);
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    );
  }
}