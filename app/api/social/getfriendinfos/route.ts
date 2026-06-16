import { NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';

export async function GET(req: Request) {
  try {
    // 1️⃣ Kullanıcı doğrulama
    const { user } = await validateRequest();
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2️⃣ Kullanıcının gelen ve gönderilen pending friend requestlerini al
    const currentUser = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        avatarUrl: true,

        // Gelen pending friend requestler
        FriendRequestSocial: {
          where: { status: 'pending' },
          select: {
            user: { select: { id: true, username: true, avatarUrl: true } }
          }
        },

        // Gönderilen pending friend requestler
        FriendRequestSocials: {
          where: { status: 'pending' },
          select: {
            friend: { select: { id: true, username: true, avatarUrl: true } }
          }
        }
      }
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 3️⃣ Kabul edilmiş arkadaşları al
    const acceptedFriends = await db.friendRequest.findMany({
      where: {
        OR: [
          { userId: userId, status: 'accepted' },
          { friendId: userId, status: 'accepted' }
        ]
      },
      select: {
        userId: true,
        friendId: true,
        user: { select: { id: true, username: true, avatarUrl: true } },
        friend: { select: { id: true, username: true, avatarUrl: true } }
      }
    });

    // Arkadaş listesini map et
    const friendsList = acceptedFriends.map(f => (f.userId === userId ? f.friend : f.user));

    // 4️⃣ JSON response
    return NextResponse.json({
      friends: friendsList,
      requests: currentUser.FriendRequestSocial.map(r => r.user),
      sentRequests: currentUser.FriendRequestSocials.map(s => s.friend)
    });

  } catch (error) {
    console.error('Error fetching friend data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
