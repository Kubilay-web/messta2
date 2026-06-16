// app/api/profile/addresses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const addresses = await db.shippingAddress.findMany({
      where: { userId: user.id },
      include: { country: true },
      orderBy: { default: 'desc' }
    });

    return NextResponse.json(addresses);
  } catch (error: any) {
    console.error('Get addresses error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Eğer default olarak işaretleniyorsa, diğer adreslerin default'unu false yap
    if (body.default) {
      await db.shippingAddress.updateMany({
        where: { userId: user.id, default: true },
        data: { default: false }
      });
    }

    const address = await db.shippingAddress.create({
      data: {
        ...body,
        userId: user.id
      },
      include: { country: true }
    });

    return NextResponse.json({ success: true, address });
  } catch (error: any) {
    console.error('Create address error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create address' },
      { status: 500 }
    );
  }
}