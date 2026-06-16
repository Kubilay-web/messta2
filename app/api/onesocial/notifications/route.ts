// app/api/notifications/route.ts
import { NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'


export async function GET(request: Request) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized', notifications: [] },
        { status: 401 }
      )
    }

    // URL'den query parametrelerini al
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = parseInt(searchParams.get('skip') || '0')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    // Sorgu koşullarını oluştur
    const whereClause: any = {
      toUserId: user.id
    }

    if (unreadOnly) {
      whereClause.isRead = false
    }

    // MongoDB'den bildirimleri çek (daha hızlı)
    const [notifications, totalCount] = await Promise.all([
      db.notificationSocial.findMany({
        where: whereClause,
        include: {
          fromUser: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              image: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: skip
      }),
      db.notificationSocial.count({
        where: whereClause
      })
    ])

    // Frontend için formatla
    const formattedNotifications = notifications.map(notification => {
      let title = ''
      let description = notification.message || ''
      let isFriendRequest = false

      switch (notification.type) {
        case 'like':
          title = `${notification.fromUser.displayName || notification.fromUser.username} gönderinizi beğendi`
          break
        case 'comment':
          title = `${notification.fromUser.displayName || notification.fromUser.username} gönderinize yorum yaptı`
          break
        case 'follow':
          title = `${notification.fromUser.displayName || notification.fromUser.username} sizi takip etti`
          break
        case 'friendRequest':
          title = `${notification.fromUser.displayName || notification.fromUser.username} arkadaşlık isteği gönderdi`
          isFriendRequest = true
          break
        case 'mention':
          title = `${notification.fromUser.displayName || notification.fromUser.username} sizden bahsetti`
          break
        default:
          title = notification.message || 'Yeni bildirim'
          description = ''
      }

      // Avatar için
      let avatar = notification.fromUser.avatarUrl || notification.fromUser.image
      let textAvatar = null

      // Eğer avatar yoksa, text avatar oluştur
      if (!avatar && notification.fromUser.displayName) {
        const initials = notification.fromUser.displayName
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)

        // Rastgele renk seç
        const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        textAvatar = {
          text: initials,
          variant: randomColor
        }
      }

      return {
        id: notification.id,
        title,
        description,
        time: notification.createdAt,
        isRead: notification.isRead,
        isFriendRequest,
        avatar,
        textAvatar,
        type: notification.type,
        fromUserId: notification.fromUserId,
        postId: notification.postId
      }
    })

    return NextResponse.json({
      notifications: formattedNotifications,
      hasMore: totalCount > skip + limit,
      totalCount,
      unreadCount: await db.notificationSocial.count({
        where: {
          toUserId: user.id,
          isRead: false
        }
      })
    })

  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Internal server error', notifications: [] },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const {user} = await validateRequest()
    
    if (!user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, notificationId } = body

    switch (action) {
      case 'markAsRead':
        if (notificationId) {
          await db.notificationSocial.update({
            where: { id: notificationId },
            data: { isRead: true }
          })
        }
        break

      case 'markAllAsRead':
        await db.notificationSocial.updateMany({
          where: { 
            toUserId: user.id,
            isRead: false 
          },
          data: { isRead: true }
        })
        break

      case 'delete':
        if (notificationId) {
          await db.notificationSocial.delete({
            where: { id: notificationId }
          })
        }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing notification action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}