import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { from: string; to: string } }) {
  try {
    const { from, to } = params; // Destructure from and to from params

    if (!from || !to) {
      return new Response(JSON.stringify({ error: 'Both from and to parameters are required' }), {
        status: 400,
      });
    }

    // Fetch messages from the database
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: from,
            receiverId: to,
          },
          {
            senderId: to,
            receiverId: from,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc', // Sort messages by creation date
      },
    });

    // Handle unread messages and update their status
    const unreadMessages = messages
      .filter((message) => message.messageStatus !== 'read' && message.senderId === to)
      .map((message) => message.id);

    // If there are unread messages, update their status to "read"
    if (unreadMessages.length > 0) {
      await prisma.messages.updateMany({
        where: {
          id: {
            in: unreadMessages,
          },
        },
        data: {
          messageStatus: 'read',
        },
      });
    }

    // Return messages as a response
    return new Response(JSON.stringify({ messages }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
