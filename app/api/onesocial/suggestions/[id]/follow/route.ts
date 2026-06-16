import { NextRequest, NextResponse } from 'next/server'
import db from "@/app/lib/db"
import { validateRequest } from '@/app/auth'


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
        error: 'Cannot follow yourself'
      }, { status: 400 })
    }

    // Kullanıcı var mı kontrol et
    const targetUser = await db.user.findUnique({
      where: { id: targetUserId },
      select: {
        id: true,
        displayName: true,
        username: true,
        avatarUrl: true
      }
    })

    if (!targetUser) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      }, { status: 404 })
    }

    // Zaten takip ediyor mu kontrol et
    const existingFollow = await db.followSocial.findFirst({
      where: {
        followerId: user.id,
        followingId: targetUserId
      }
    })

    if (existingFollow) {
      // Takibi bırak
      await db.followSocial.delete({
        where: { id: existingFollow.id }
      })

      return NextResponse.json({
        success: true,
        action: 'unfollowed',
        following: false,
        message: 'Unfollowed successfully'
      })
    }

    // Yeni takip oluştur
    await db.followSocial.create({
      data: {
        followerId: user.id,
        followingId: targetUserId
      }
    })

    // Bildirim oluştur
    try {
      await db.notificationSocial.create({
        data: {
          type: 'follow',
          message: `${user.displayName || user.username} started following you`,
          fromUserId: user.id,
          toUserId: targetUserId,
          isRead: false
        }
      })
    } catch (notificationError) {
      console.warn('Failed to create notification:', notificationError)
    }

    return NextResponse.json({
      success: true,
      action: 'followed',
      following: true,
      message: 'Followed successfully',
      user: {
        id: targetUser.id,
        name: targetUser.displayName || targetUser.username,
        username: targetUser.username,
        avatar: targetUser.avatarUrl
      }
    })
  } catch (error) {
    console.error('Follow user error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to follow user'
    }, { status: 500 })
  }
}

// GET /api/onesocial/follow/[userId] - Takip durumunu kontrol et
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { user } = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json({
        success: false,
        isFollowing: false
      })
    }

    const targetUserId = params.userId

    const existingFollow = await db.followSocial.findFirst({
      where: {
        followerId: user.id,
        followingId: targetUserId
      }
    })

    return NextResponse.json({
      success: true,
      isFollowing: !!existingFollow
    })
  } catch (error) {
    console.error('Check follow error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check follow status'
    }, { status: 500 })
  }
}