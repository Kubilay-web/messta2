import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";

// Sunucuda kalıcı WebSocket olmadığı için WebRTC sinyalleşmesini DB + polling ile taşırız.
// Sinyal türleri: ring | offer | answer | ice | accept | reject | end | busy | cancel
const RING_TTL_MS = 60_000;
const VALID_TYPES = new Set([
  "ring",
  "offer",
  "answer",
  "ice",
  "accept",
  "reject",
  "end",
  "busy",
  "cancel",
]);
const TERMINAL = new Set(["end", "reject", "cancel", "busy"]);

// Sinyal gönder
export async function POST(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { type, callId, listingId, toId, payload, video } = body as {
    type?: string;
    callId?: string;
    listingId?: string;
    toId?: string;
    payload?: unknown;
    video?: boolean;
  };

  if (!type || !VALID_TYPES.has(type) || !callId || !toId || !listingId) {
    return NextResponse.json({ error: "param" }, { status: 400 });
  }

  await prisma.shCallSignal.create({
    data: {
      callId,
      listingId,
      fromId: user.id,
      toId,
      type,
      video: video ?? true,
      payload: payload == null ? null : typeof payload === "string" ? payload : JSON.stringify(payload),
    },
  });

  return NextResponse.json({ ok: true });
}

// Sinyal al
export async function GET(req: NextRequest) {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const callId = searchParams.get("callId");
  const incoming = searchParams.get("incoming");

  // Uygulama genelinde gelen arama dinleyicisi: bana gelen, henüz işlenmemiş "ring".
  if (incoming) {
    const since = new Date(Date.now() - RING_TTL_MS);
    const rings = await prisma.shCallSignal.findMany({
      where: { toId: user.id, type: "ring", consumed: false, createdAt: { gte: since } },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    for (const ring of rings) {
      // Bu çağrı zaten sonlandıysa atla (ve ring'i tüket).
      const terminal = await prisma.shCallSignal.findFirst({
        where: { callId: ring.callId, type: { in: Array.from(TERMINAL) } },
        select: { id: true },
      });
      if (terminal) {
        await prisma.shCallSignal.updateMany({
          where: { callId: ring.callId, type: "ring" },
          data: { consumed: true },
        });
        continue;
      }

      const [caller, listing] = await Promise.all([
        prisma.user.findUnique({
          where: { id: ring.fromId },
          select: { displayName: true, username: true, name: true, avatarUrl: true },
        }),
        prisma.shListing.findUnique({
          where: { id: ring.listingId },
          select: { title: true },
        }),
      ]);

      return NextResponse.json({
        incoming: {
          callId: ring.callId,
          listingId: ring.listingId,
          fromId: ring.fromId,
          fromName: caller?.displayName || caller?.name || caller?.username || "Üye",
          fromAvatar: caller?.avatarUrl ?? null,
          listingTitle: listing?.title ?? "İlan",
          video: ring.video,
        },
      });
    }
    return NextResponse.json({ incoming: null });
  }

  if (!callId) return NextResponse.json({ error: "param" }, { status: 400 });

  // Belirli bir arama için bana gelen tüm işlenmemiş sinyalleri al ve tüket.
  const signals = await prisma.shCallSignal.findMany({
    where: { callId, toId: user.id, consumed: false },
    orderBy: { createdAt: "asc" },
    take: 100,
  });

  if (signals.length) {
    await prisma.shCallSignal.updateMany({
      where: { id: { in: signals.map((s) => s.id) } },
      data: { consumed: true },
    });
  }

  return NextResponse.json({
    signals: signals.map((s) => ({
      type: s.type,
      from: s.fromId,
      video: s.video,
      payload: s.payload ? safeParse(s.payload) : null,
    })),
  });
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}
