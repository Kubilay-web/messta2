import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  context: { params: { storeUrl: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const storeUrl = context.params.storeUrl;

    const store = await db.store.findUnique({
      where: { url: storeUrl },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true,
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json({ error: 'Store not found' }, { status: 404 });
    }

    // Check if user owns the store
    if (store.userId !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}