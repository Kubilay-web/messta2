import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";

// Bir konuşmanın mesajlarını döndürür ve karşı taraftan gelenleri okundu işaretler.
export async function GET(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const otherId = searchParams.get("otherId");
  if (!listingId || !otherId) return NextResponse.json({ error: "param" }, { status: 400 });

  const messages = await prisma.shMessage.findMany({
    where: {
      listingId,
      OR: [
        { senderId: user.id, receiverId: otherId },
        { senderId: otherId, receiverId: user.id },
      ],
    },
    orderBy: { createdAt: "asc" },
    take: 200,
  });

  // okundu işaretle (karşı taraftan gelenler)
  await prisma.shMessage.updateMany({
    where: { listingId, senderId: otherId, receiverId: user.id, isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json({
    messages: messages.map((m) => ({
      id: m.id,
      content: m.content,
      mine: m.senderId === user.id,
      createdAt: m.createdAt.toISOString(),
      isRead: m.isRead,
    })),
  });
}
