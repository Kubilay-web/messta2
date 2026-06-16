// app/api/profile/wishlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const wishlist = await db.wishlist.findMany({
      where: { userId: user.id },
      include: {
        product: {
          include: {
            store: {
              select: {
                name: true,
                logo: true,
                url: true
              }
            },
            category: {
              select: {
                name: true,
                url: true
              }
            }
          }
        },
        variant: {
          include: {
            images: true,
            colors: true,
            sizes: true
          }
        },
        size: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(wishlist);
  } catch (error: any) {
    console.error('Get wishlist error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}