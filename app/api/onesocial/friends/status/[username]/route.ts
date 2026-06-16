import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';
import { validateRequest } from '@/app/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const session = await validateRequest();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const username = params.username;
    
    // Mevcut kullanıcıyı bul
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    });

    // Hedef kullanıcıyı bul
    const targetUser = await db.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!currentUser || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Arkadaşlık durumunu kontrol et
    const friendRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: currentUser.id, friendId: targetUser.id },
          { userId: targetUser.id, friendId: currentUser.id }
        ]
      }
    });

    if (friendRequest) {
      return NextResponse.json({ 
        status: friendRequest.status === 'accepted' ? 'friends' : 'pending' 
      });
    }

    return NextResponse.json({ status: 'not_friends' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}