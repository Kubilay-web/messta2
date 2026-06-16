import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'

// POST /api/onesocial/suggestions/[id]/friend-request - Arkadaşlık isteği gönder
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const targetUserId = params.id

    if (user.id === targetUserId) {
      return NextResponse.json({
        success: false,
        error: 'Cannot send friend request to yourself'
      }, { status: 400 })
    }

    // Kullanıcı var mı kontrol et
    const targetUser = await db.user.findUnique({
      where: { id: targetUserId }
    })

    if (!targetUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Zaten arkadaş mıyız kontrol et
    const existingFriendship = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: targetUserId, status: 'accepted' },
          { userId: targetUserId, friendId: user.id, status: 'accepted' }
        ]
      }
    })

    if (existingFriendship) {
      return NextResponse.json({
        success: false,
        error: 'Already friends'
      }, { status: 400 })
    }

    // Bekleyen istek var mı kontrol et
    const existingRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: targetUserId, status: 'pending' },
          { userId: targetUserId, friendId: user.id, status: 'pending' }
        ]
      }
    })

    if (existingRequest) {
      // İsteği kabul et
      if (existingRequest.userId === targetUserId) {
        await db.friendRequest.update({
          where: { id: existingRequest.id },
          data: { status: 'accepted' }
        })

        return NextResponse.json({
          success: true,
          action: 'accepted',
          message: 'Friend request accepted'
        })
      }

      return NextResponse.json({
        success: false,
        error: 'Friend request already sent'
      }, { status: 400 })
    }

    // Yeni arkadaşlık isteği oluştur
    const newFriendRequest = await db.friendRequest.create({
      data: {
        userId: user.id,
        friendId: targetUserId,
        status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            username: true,
            avatarUrl: true
          }
        },
        friend: {
          select: {
            id: true,
            displayName: true,
            username: true,
            avatarUrl: true
          }
        }
      }
    })

    // Bildirim oluştur
    await db.notificationSocial.create({
      data: {
        type: 'friendRequest',
        message: `${user.displayName || user.username} sent you a friend request`,
        fromUserId: user.id,
        toUserId: targetUserId,
        isRead: false
      }
    })

    return NextResponse.json({
      success: true,
      action: 'sent',
      message: 'Friend request sent successfully',
      request: {
        id: newFriendRequest.id,
        fromUser: {
          id: newFriendRequest.user.id,
          name: newFriendRequest.user.displayName || newFriendRequest.user.username,
          username: newFriendRequest.user.username,
          avatar: newFriendRequest.user.avatarUrl
        },
        toUser: {
          id: newFriendRequest.friend.id,
          name: newFriendRequest.friend.displayName || newFriendRequest.friend.username,
          username: newFriendRequest.friend.username,
          avatar: newFriendRequest.friend.avatarUrl
        },
        status: newFriendRequest.status
      }
    })
  } catch (error) {
    console.error('Friend request error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to send friend request'
    }, { status: 500 })
  }
}

// DELETE /api/onesocial/suggestions/[id]/friend-request - Arkadaşlık isteğini iptal et
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user } = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 401 })
    }

    const targetUserId = params.id

    // Arkadaşlık isteğini bul
    const friendRequest = await db.friendRequest.findFirst({
      where: {
        OR: [
          { userId: user.id, friendId: targetUserId, status: 'pending' },
          { userId: targetUserId, friendId: user.id, status: 'pending' }
        ]
      }
    })

    if (!friendRequest) {
      return NextResponse.json({
        success: false,
        error: 'Friend request not found'
      }, { status: 404 })
    }

    // İsteği sil
    await db.friendRequest.delete({
      where: { id: friendRequest.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Friend request cancelled'
    })
  } catch (error) {
    console.error('Cancel friend request error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel friend request'
    }, { status: 500 })
  }
}