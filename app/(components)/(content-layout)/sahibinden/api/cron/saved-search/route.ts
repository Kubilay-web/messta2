import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { matchSavedSearches } from "../../../actions";

// Harici zamanlayıcı (Vercel Cron / cron-job.org) tarafından çağrılır.
// Olay-temelli eşleştirme zaten createListing içinde çalışır; bu uçnokta yedektir.
// Güvenlik: CRON_SECRET tanımlıysa Authorization: Bearer <secret> beklenir.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const { searchParams } = new URL(req.url);
  const minutes = Math.min(1440, Number(searchParams.get("minutes")) || 30);
  const since = new Date(Date.now() - minutes * 60000);

  const listings = await prisma.shListing.findMany({
    where: { status: "ACTIVE", createdAt: { gte: since } },
    select: {
      id: true,
      categoryId: true,
      userId: true,
      title: true,
      description: true,
      price: true,
      city: true,
      type: true,
    },
    take: 200,
  });

  for (const l of listings) {
    await matchSavedSearches(l).catch(() => {});
  }

  return NextResponse.json({ ok: true, processed: listings.length, sinceMinutes: minutes });
}
