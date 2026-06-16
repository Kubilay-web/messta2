// app/api/onesocial/friends/accept/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'

interface Params {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Request'i bul ve kontrol et
    const friendRequest = await db.friendRequest.findUnique({
      where: { id }
    })

    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend request not found' },
        { status: 404 }
      )
    }

    if (friendRequest.friendId !== user.id) {
      return NextResponse.json(
        { error: 'Not authorized to accept this request' },
        { status: 403 }
      )
    }

    // Request'i kabul et
    await db.friendRequest.update({
      where: { id },
      data: { status: 'accepted' }
    })

    // Bildirim oluştur
    await db.notificationSocial.create({
      data: {
        type: 'friendRequest',
        message: `${user.username} accepted your friend request`,
        fromUserId: user.id,
        toUserId: friendRequest.userId,
        isRead: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Friend request accepted'
    })
  } catch (error) {
    console.error('Error accepting friend request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}