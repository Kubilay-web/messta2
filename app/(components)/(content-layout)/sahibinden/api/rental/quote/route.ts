import { NextRequest, NextResponse } from "next/server";
import { quoteBooking } from "../../../rentals";

/** Tarih aralığı için canlı fiyat teklifi. Body: { listingId, start, end, guests? } */
export async function POST(req: NextRequest) {
  try {
    const { listingId, start, end, guests } = await req.json();
    if (!listingId || !start || !end)
      return NextResponse.json({ error: "Eksik parametre" }, { status: 400 });
    const quote = await quoteBooking(listingId, start, end, Number(guests) || 1);
    return NextResponse.json(quote);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Hata" }, { status: 500 });
  }
}
