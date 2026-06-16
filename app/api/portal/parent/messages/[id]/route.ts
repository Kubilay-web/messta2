// GET    /api/portal/parent/messages/[id]  → tek mesaj
// PUT    /api/portal/parent/messages/[id]  → okundu işaretle
// DELETE /api/portal/parent/messages/[id]  → mesajı sil

import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const msg = await db.messages.findUnique({
    where: { id: context.params.id },
    include: {
      sender: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
      receiver: { select: { id: true, displayName: true, email: true, avatarUrl: true } },
    },
  });

  if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (msg.senderId !== user.id && msg.receiverId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(msg);
}

export async function PUT(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const msg = await db.messages.findUnique({ where: { id: context.params.id } });
  if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (msg.receiverId !== user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await db.messages.update({
    where: { id: context.params.id },
    data: { messageStatus: "read" },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, context: any) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const msg = await db.messages.findUnique({ where: { id: context.params.id } });
  if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (msg.senderId !== user.id && msg.receiverId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await db.messages.delete({ where: { id: context.params.id } });
  return NextResponse.json({ success: true });
}
