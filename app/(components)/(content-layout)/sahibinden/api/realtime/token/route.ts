import { NextResponse } from "next/server";
import crypto from "crypto";
import { validateRequest } from "@/app/auth";

export const dynamic = "force-dynamic";

// base64url yardımcıları
function b64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Render'daki Socket.IO sunucusuyla AYNI REALTIME_JWT_SECRET ile imzalı,
// kısa ömürlü (HS256) bir JWT üretir. jsonwebtoken.verify ile uyumludur.
function signJwt(payload: Record<string, unknown>, secret: string, expiresInSec = 3600) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSec };
  const data = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(body))}`;
  const sig = b64url(crypto.createHmac("sha256", secret).update(data).digest());
  return `${data}.${sig}`;
}

export async function GET() {
  const { user } = await validateRequest();
  if (!user) return NextResponse.json({ error: "auth" }, { status: 401 });

  const secret = process.env.REALTIME_JWT_SECRET;
  const url = process.env.NEXT_PUBLIC_REALTIME_URL ?? null;
  if (!secret) return NextResponse.json({ error: "not-configured" }, { status: 503 });

  const token = signJwt(
    {
      sub: user.id,
      name: (user as any).displayName || (user as any).username || "Üye",
      avatar: (user as any).avatarUrl ?? null,
    },
    secret,
  );

  return NextResponse.json({ token, url });
}
