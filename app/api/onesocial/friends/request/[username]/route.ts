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
      select: { id: true }
    });

    const targetUser = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Zaten arkadaşlık isteği var mı kontrol et
    const existingRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: currentUser.id, friendId: targetUser.id },
          { userId: targetUser.id, friendId: currentUser.id }
        ]
      }
    });

    if (existingRequest) {
      return NextResponse.json({ error: 'Request already exists' }, { status: 400 });
    }

    // Arkadaşlık isteği oluştur
    const friendRequest = await db.friendRequest.create({
      data: {
        userId: currentUser.id,
        friendId: targetUser.id,
        status: 'pending'
      }
    });

    // Bildirim oluştur
    await db.notificationSocial.create({
      data: {
        type: 'friendRequest',
        message: `${user.username} sent you a friend request`,
        fromUserId: currentUser.id,
        toUserId: targetUser.id,
        isRead: false
      }
    });

    return NextResponse.json({ success: true, friendRequest });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}