// app/api/profile/followed-stores/route.ts
import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const followedStores = await db.userFollowingStore.findMany({
      where: { userId: user.id },
      include: {
        store: {
          include: {
            user: {
              select: {
                username: true,
                displayName: true,
                avatarUrl: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(followedStores);
  } catch (error: any) {
    console.error('Get followed stores error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch followed stores' },
      { status: 500 }
    );
  }
}