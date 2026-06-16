import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function POST(
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
      select: { id: true, username: true }
    });

    const targetUser = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Zaten takip ediyor mu kontrol et
    const existingFollow = await db.followSocial.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUser.id
        }
      }
    });

    if (existingFollow) {
      return NextResponse.json({ error: 'Already following' }, { status: 400 });
    }

    // Takip et
    const follow = await db.followSocial.create({
      data: {
        followerId: currentUser.id,
        followingId: targetUser.id
      }
    });

    // Bildirim oluştur
    await db.notificationSocial.create({
      data: {
        type: 'follow',
        message: `${currentUser.username} started following you`,
        fromUserId: currentUser.id,
        toUserId: targetUser.id,
        isRead: false
      }
    });

    return NextResponse.json({ success: true, follow });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}