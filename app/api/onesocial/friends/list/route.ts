// app/api/onesocial/friends/list/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'


export async function GET(request: NextRequest) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // User'ın arkadaşlarını bul (kabul edilmiş friend requests)
    const friendRequests = await db.friendRequest.findMany({
      where: {
        OR: [
          { userId: user.id, status: 'accepted' },
          { friendId: user.id, status: 'accepted' }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            bio: true
          }
        },
        friend: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            bio: true
          }
        }
      }
    })

    // Arkadaşları formatla
    const friends = friendRequests.map(request => {
      const isUserSender = request.userId === user.id
      const friendUser = isUserSender ? request.friend : request.user
      
      return {
        id: request.id,
        userId: friendUser.id,
        username: friendUser.username,
        displayName: friendUser.displayName,
        avatarUrl: friendUser.avatarUrl,
        bio: friendUser.bio,
        mutualCount: 0, // Bu kısım için ek sorgu yapılabilir
        status: 'accepted',
        createdAt: request.createdAt
      }
    })

    return NextResponse.json({
      success: true,
      friends
    })
  } catch (error) {
    console.error('Error fetching friends:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}