import { NextRequest } from 'next/server'
import { Server as NetServer } from 'http'
import { Server as ServerIO } from 'socket.io'
import db from "@/app/lib/db"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Socket.io başlatma
  if (!(global as any).io) {
    const httpServer: NetServer = (global as any).httpServer || new NetServer()
    const io = new ServerIO(httpServer, {
      cors: {
        origin: process.env.NEXT_PUBLIC_BASE_URL,
        methods: ['GET', 'POST']
      }
    })

    // Socket.io event'leri
    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id)

      // Kullanıcı online durumunu güncelle
      socket.on('user-online', async (userId: string) => {
        await db.onlineUser.upsert({
          where: { userId },
          update: { socketId: socket.id, connectedAt: new Date() },
          create: {
            userId,
            socketId: socket.id,
            connectedAt: new Date()
          }
        })
        
        socket.join(`user-${userId}`)
        io.emit('online-users', { userId, status: 'online' })
      })

      // Mesaj gönderme
      socket.on('send-message', async (data) => {
        try {
          const { senderId, receiverId, message, type = 'text' } = data
          
          // Mesajı veritabanına kaydet
          const newMessage = await db.messages.create({
            data: {
              senderId,
              receiverId,
              message,
              type,
              messageStatus: 'sent'
            }
          })

          // Alıcıya mesajı gönder
          const receiver = await db.onlineUser.findUnique({
            where: { userId: receiverId }
          })

          if (receiver) {
            io.to(receiver.socketId).emit('receive-message', newMessage)
          }

          // Gönderene başarılı mesajı gönder
          socket.emit('message-sent', newMessage)

        } catch (error) {
          console.error('Error sending message:', error)
          socket.emit('error', { message: 'Failed to send message' })
        }
      })

      // Mesaj okundu olarak işaretle
      socket.on('mark-as-read', async ({ messageId, userId }) => {
        try {
          const updatedMessage = await db.messages.update({
            where: { id: messageId },
            data: { messageStatus: 'read' }
          })

          // Gönderene mesajın okunduğunu bildir
          const sender = await db.onlineUser.findUnique({
            where: { userId: updatedMessage.senderId }
          })

          if (sender) {
            io.to(sender.socketId).emit('message-read', {
              messageId,
              readAt: new Date()
            })
          }
        } catch (error) {
          console.error('Error marking message as read:', error)
        }
      })

      // Typing durumu
      socket.on('typing', ({ receiverId, senderId, isTyping }) => {
        const receiver = io.sockets.adapter.rooms.get(`user-${receiverId}`)
        if (receiver) {
          io.to(`user-${receiverId}`).emit('user-typing', {
            senderId,
            isTyping
          })
        }
      })

      // Bağlantı kesildiğinde
      socket.on('disconnect', async () => {
        console.log('Client disconnected:', socket.id)
        
        // Kullanıcıyı offline yap
        const onlineUser = await db.onlineUser.findFirst({
          where: { socketId: socket.id }
        })

        if (onlineUser) {
          await db.onlineUser.delete({
            where: { id: onlineUser.id }
          })
          
          io.emit('online-users', { 
            userId: onlineUser.userId, 
            status: 'offline' 
          })
        }
      })
    })

    ;(global as any).io = io
    ;(global as any).httpServer = httpServer
  }

  return new Response(null, { status: 200 })
}