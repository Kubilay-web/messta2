// GET  /api/portal/parent/messages  → gelen+gönderilen mesajlar
// POST /api/portal/parent/messages  → yeni mesaj gönder

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await db.messages.findMany({
    where: {
      OR: [{ senderId: user.id }, { receiverId: user.id }],
    },
    include: {
      sender: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
      receiver: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ messages, currentUserId: user.id });
}

export async function POST(req: Request) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { receiverId, message } = await req.json();
  if (!receiverId || !message) {
    return NextResponse.json({ error: "receiverId and message required" }, { status: 400 });
  }

  const created = await db.messages.create({
    data: {
      senderId: user.id,
      receiverId,
      message,
      messageStatus: "sent",
    },
    include: {
      sender: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
      receiver: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
    },
  });

  return NextResponse.json(created, { status: 201 });
}
