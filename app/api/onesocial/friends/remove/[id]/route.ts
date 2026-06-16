// app/api/onesocial/friends/remove/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'

interface Params {
  params: {
    id: string
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Arkadaşlık ilişkisini bul
    const friendRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: id, status: 'accepted' },
          { userId: id, friendId: user.id, status: 'accepted' }
        ]
      }
    })

    if (!friendRequest) {
      return NextResponse.json(
        { error: 'Friend relationship not found' },
        { status: 404 }
      )
    }

    // Arkadaşlığı kaldır (sil)
    await db.friendRequest.delete({
      where: { id: friendRequest.id }
    })

    // Bildirim oluştur (opsiyonel)
    await db.notificationSocial.create({
      data: {
        type: 'friendRemoved',
        message: `${user.username} removed you from friends`,
        fromUserId: user.id,
        toUserId: id,
        isRead: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Friend removed'
    })
  } catch (error) {
    console.error('Error removing friend:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}