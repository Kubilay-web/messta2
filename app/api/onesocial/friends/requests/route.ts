// app/api/onesocial/friends/requests/route.ts
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

    // User'a gelen pending friend requests
    const requests = await db.friendRequest.findMany({
      where: {
        friendId: user.id,
        status: 'pending'
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      requests: requests.map(req => ({
        id: req.id,
        userId: req.userId,
        friendId: req.friendId,
        user: req.user,
        status: req.status,
        createdAt: req.createdAt
      }))
    })
  } catch (error) {
    console.error('Error fetching friend requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}