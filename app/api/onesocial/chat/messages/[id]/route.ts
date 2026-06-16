import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { validateRequest } from '@/app/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {user} = await validateRequest()
    if (!user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messageId = params.id

    // Mesajın alıcısı kontrol et
    const message = await db.messages.findUnique({
      where: { id: messageId }
    })

    if (!message || message.receiverId !== user.id) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    }

    // Mesajı okundu olarak işaretle
    const updatedMessage = await db.messages.update({
      where: { id: messageId },
      data: { messageStatus: 'read' }
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.error('Error marking message as read:', error)
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    )
  }
}