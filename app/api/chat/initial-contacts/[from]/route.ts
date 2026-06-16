import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ from: string }> }
) {
  try {
    // ✅ params artık await ediliyor
    const { from: userId } = await params;

    // Online kullanıcıları al
    const onlineUsers = await db.onlineUser.findMany({
      select: { userId: true },
    });

    // Kullanıcının mesajlarını al
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        sentMessages: {
          include: { receiver: true, sender: true },
          orderBy: { createdAt: "desc" },
        },
        receivedMessages: {
          include: { receiver: true, sender: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const messages = [...user.sentMessages, ...user.receivedMessages];
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const users = new Map<string, any>();
    const messageStatusChange: string[] = [];

    messages.forEach((msg) => {
      const isSender = msg.senderId === userId;
      const calculatedId = isSender ? msg.receiverId : msg.senderId;

      if (msg.messageStatus === "sent") {
        messageStatusChange.push(msg.id);
      }

      if (!users.has(calculatedId)) {
        let contact = {
          messageId: msg.id,
          type: msg.type,
          message: msg.message,
          messageStatus: msg.messageStatus,
          createdAt: msg.createdAt,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
        };

        if (isSender) {
          contact = {
            ...contact,
            ...msg.receiver,
            totalUnreadMessages: 0,
          };
        } else {
          contact = {
            ...contact,
            ...msg.sender,
            totalUnreadMessages: msg.messageStatus !== "read" ? 1 : 0,
          };
        }

        users.set(calculatedId, contact);
      } else if (msg.messageStatus !== "read" && !isSender) {
        const existing = users.get(calculatedId);
        users.set(calculatedId, {
          ...existing,
          totalUnreadMessages: existing.totalUnreadMessages + 1,
        });
      }
    });

    // sent → delivered
    if (messageStatusChange.length) {
      await db.messages.updateMany({
        where: { id: { in: messageStatusChange } },
        data: { messageStatus: "delivered" },
      });
    }

    return NextResponse.json({
      users: Array.from(users.values()),
      onlineUsers: onlineUsers.map((u) => u.userId),
    });
  } catch (error) {
    console.error("❌ getInitialContactsWithMessage error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
