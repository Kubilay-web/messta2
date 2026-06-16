import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'

export async function GET(req: NextRequest) {
  try {
    const {user} = await validateRequest()
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Kullanıcının tüm konuşmalarını getir
    const conversations = await db.messages.groupBy({
      by: ['senderId', 'receiverId'],
      where: {
        OR: [
          { senderId: user.id },
          { receiverId: user.id }
        ]
      },
      _max: {
        createdAt: true
      }
    })

    // Konuşma detaylarını getir
    const conversationDetails = await Promise.all(
      conversations.map(async (conv) => {
        const otherUserId = 
          conv.senderId === user.id ? conv.receiverId : conv.senderId
        
        const otherUser = await db.user.findUnique({
          where: { id: otherUserId },
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
            status:true,
          }
        })

        // Son mesajı getir
        const lastMessage = await db.messages.findFirst({
          where: {
            OR: [
              {
                senderId: user.id,
                receiverId: otherUserId
              },
              {
                senderId: otherUserId,
                receiverId: user.id
              }
            ]
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        })

        // Okunmamış mesaj sayısı
        const unreadCount = await db.messages.count({
          where: {
            senderId: otherUserId,
            receiverId: user.id,
            messageStatus: 'sent'
          }
        })

        return {
          user: otherUser,
          lastMessage,
          unreadCount,
          lastActivity: conv._max.createdAt
        }
      })
    )

    // Son aktiviteye göre sırala
    const sortedConversations = conversationDetails.sort((a, b) => {
      return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
    })

    return NextResponse.json(sortedConversations)
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch conversations' },
      { status: 500 }
    )
  }
}