import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'

// GET: İki kullanıcı arasındaki mesajları getir
export async function GET(req: NextRequest) {
  try {
    const {user} = await validateRequest()
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const otherUserId = searchParams.get('otherUserId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    if (!otherUserId) {
      return NextResponse.json(
        { error: 'otherUserId is required' },
        { status: 400 }
      )
    }

    // Mesajları getir
    const messages = await db.messages.findMany({
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
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take: limit
    })

    // Toplam mesaj sayısı
    const totalMessages = await db.messages.count({
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
      }
    })

    return NextResponse.json({
      messages: messages.reverse(), // En eskiden en yeniye sırala
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: page
    })
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

// POST: Yeni mesaj gönder
export async function POST(req: NextRequest) {
  try {
    const {user} = await validateRequest()
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { receiverId, message, type = 'text' } = await req.json()

    if (!receiverId || !message) {
      return NextResponse.json(
        { error: 'receiverId and message are required' },
        { status: 400 }
      )
    }

    // Mesajı kaydet
    const newMessage = await db.messages.create({
      data: {
        senderId: user.id,
        receiverId,
        message,
        type,
        messageStatus: 'sent'
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        },
        receiver: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}