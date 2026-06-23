import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// Süresi dolan aktif ilanları EXPIRED yapar. Harici zamanlayıcıyla çağrılır.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const res = await prisma.shListing.updateMany({
    where: { status: "ACTIVE", expiresAt: { lt: new Date() } },
    data: { status: "EXPIRED" },
  });

  return NextResponse.json({ ok: true, expired: res.count });
}
