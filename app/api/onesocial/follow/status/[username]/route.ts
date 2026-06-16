import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const username = params.username;
    
    const currentUser = await db.user.findUnique({
      where: { email: user.email },
      select: { id: true }
    });

    const targetUser = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Takip durumunu kontrol et
    const follow = await db.followSocial.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUser.id
        }
      }
    });

    return NextResponse.json({ isFollowing: !!follow });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}