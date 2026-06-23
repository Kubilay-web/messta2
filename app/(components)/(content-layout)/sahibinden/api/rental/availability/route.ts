import { NextRequest, NextResponse } from "next/server";
import { getBlockedRanges } from "../../../rentals";

/** Takvim için dolu/kapalı tarih aralıkları. ?listingId=… */
export async function GET(req: NextRequest) {
  const listingId = new URL(req.url).searchParams.get("listingId");
  if (!listingId) return NextResponse.json({ error: "listingId gerekli" }, { status: 400 });
  const ranges = await getBlockedRanges(listingId);
  return NextResponse.json({ ranges });
}
