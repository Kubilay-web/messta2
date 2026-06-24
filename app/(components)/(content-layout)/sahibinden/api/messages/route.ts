import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";

const ONLINE_WINDOW_MS = 35_000; // son 35 sn içinde aktifse "çevrimiçi"
const TYPING_WINDOW_MS = 6_000; // son 6 sn içinde tuş varsa "yazıyor..."

// Bir konuşmanın mesajlarını + karşı tarafın çevrimiçi/yazıyor durumunu döndürür
// ve karşı taraftan gelenleri okundu işaretler.
export async function GET(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  const otherId = searchParams.get("otherId");
  if (!listingId || !otherId) return NextResponse.json({ error: "param" }, { status: 400 });

  const [messages, other, conv] = await Promise.all([
    prisma.shMessage.findMany({
      where: {
        listingId,
        OR: [
          { senderId: user.id, receiverId: otherId },
          { senderId: otherId, receiverId: user.id },
        ],
      },
      orderBy: { createdAt: "asc" },
      take: 300,
      include: {
        replyTo: { select: { id: true, content: true, kind: true, imageUrl: true, senderId: true, deletedAt: true } },
      },
    }),
    prisma.user.findUnique({
      where: { id: otherId },
      select: { shLastSeenAt: true },
    }),
    prisma.shConversation.findFirst({
      where: {
        listingId,
        OR: [
          { buyerId: user.id, sellerId: otherId },
          { buyerId: otherId, sellerId: user.id },
        ],
      },
      select: { buyerId: true, buyerTypingAt: true, sellerTypingAt: true },
    }),
  ]);

  // okundu işaretle (karşı taraftan gelenler)
  await prisma.shMessage.updateMany({
    where: { listingId, senderId: otherId, receiverId: user.id, isRead: false },
    data: { isRead: true },
  });

  const now = Date.now();
  const otherTypingAt =
    conv && (conv.buyerId === otherId ? conv.buyerTypingAt : conv.sellerTypingAt);
  const otherTyping = !!otherTypingAt && now - new Date(otherTypingAt).getTime() < TYPING_WINDOW_MS;
  const otherOnline =
    !!other?.shLastSeenAt && now - new Date(other.shLastSeenAt).getTime() < ONLINE_WINDOW_MS;

  return NextResponse.json({
    otherOnline,
    otherLastSeenAt: other?.shLastSeenAt ? new Date(other.shLastSeenAt).toISOString() : null,
    otherTyping,
    messages: messages.map((m) => ({
      id: m.id,
      content: m.content,
      mine: m.senderId === user.id,
      createdAt: m.createdAt.toISOString(),
      isRead: m.isRead,
      kind: m.kind,
      imageUrl: m.imageUrl,
      audioUrl: m.audioUrl,
      audioDuration: m.audioDuration,
      fileUrl: m.fileUrl,
      fileName: m.fileName,
      fileSize: m.fileSize,
      callOutcome: m.callOutcome,
      callDuration: m.callDuration,
      callVideo: m.callVideo,
      deleted: !!m.deletedAt,
      editedAt: m.editedAt ? m.editedAt.toISOString() : null,
      reactions: (Array.isArray(m.reactions) ? m.reactions : []) as { userId: string; emoji: string }[],
      replyTo: m.replyTo
        ? {
            id: m.replyTo.id,
            mine: m.replyTo.senderId === user.id,
            kind: m.replyTo.kind,
            content: m.replyTo.deletedAt ? "" : m.replyTo.content,
            imageUrl: m.replyTo.imageUrl,
            deleted: !!m.replyTo.deletedAt,
          }
        : null,
    })),
  });
}

// Hafif gerçek-zaman pingi: çevrimiçi durumunu ve isteğe bağlı "yazıyor" bilgisini günceller.
export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { listingId, otherId, typing } = body as {
    listingId?: string;
    otherId?: string;
    typing?: boolean;
  };

  // her ping çevrimiçi sayacını tazeler
  await prisma.user
    .update({ where: { id: user.id }, data: { shLastSeenAt: new Date() } })
    .catch(() => {});

  if (typing && listingId && otherId) {
    const listing = await prisma.shListing.findUnique({
      where: { id: listingId },
      select: { userId: true },
    });
    if (listing) {
      const sellerId = listing.userId;
      const buyerId = user.id === sellerId ? otherId : user.id;
      const meIsBuyer = user.id === buyerId;
      await prisma.shConversation
        .update({
          where: { listingId_buyerId_sellerId: { listingId, buyerId, sellerId } },
          data: meIsBuyer ? { buyerTypingAt: new Date() } : { sellerTypingAt: new Date() },
        })
        .catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}
