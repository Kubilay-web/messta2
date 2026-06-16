import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const shippingAddresses = await db.shippingAddress.findMany({
      where: {
        userId: user.id,
      },
      include: {
        country: true,
      },
      orderBy: {
        default: 'desc',
      },
    });

    return NextResponse.json(shippingAddresses);
  } catch (error) {
    console.error('Error fetching shipping addresses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shipping addresses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // If setting as default, update all other addresses
    if (data.default) {
      await db.shippingAddress.updateMany({
        where: {
          userId: user.id,
          default: true,
        },
        data: {
          default: false,
        },
      });
    }

    const shippingAddress = await db.shippingAddress.create({
      data: {
        ...data,
        userId: user.id,
      },
      include: {
        country: true,
      },
    });

    return NextResponse.json({ shippingAddress });
  } catch (error) {
    console.error('Error adding shipping address:', error);
    return NextResponse.json(
      { error: 'Failed to add shipping address' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Address ID required' }, { status: 400 });
    }

    const data = await request.json();
    
    // If setting as default, update all other addresses
    if (data.default) {
      await db.shippingAddress.updateMany({
        where: {
          userId: user.id,
          id: { not: id },
          default: true,
        },
        data: {
          default: false,
        },
      });
    }

    const shippingAddress = await db.shippingAddress.update({
      where: {
        id,
        userId: user.id,
      },
      data,
      include: {
        country: true,
      },
    });

    return NextResponse.json({ shippingAddress });
  } catch (error) {
    console.error('Error updating shipping address:', error);
    return NextResponse.json(
      { error: 'Failed to update shipping address' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const {user} = await validateRequest();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Address ID required' }, { status: 400 });
    }

    await db.shippingAddress.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting shipping address:', error);
    return NextResponse.json(
      { error: 'Failed to delete shipping address' },
      { status: 500 }
    );
  }
}