import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { buildListingIcal } from "../../../../rentals";

// Read-only iCal feed: /sahibinden/api/rental/ical/{listingId}?token=...
// Google Calendar / Airbnb / Booking gibi takvimlerce abone olunabilir.
export async function GET(req: NextRequest, { params }: { params: Promise<{ listingId: string }> }) {
  const { listingId } = await params;
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return new NextResponse("token gerekli", { status: 401 });

  const listing = await prisma.shListing.findUnique({ where: { id: listingId }, select: { icalToken: true } });
  if (!listing || listing.icalToken !== token) return new NextResponse("geçersiz token", { status: 403 });

  const ics = await buildListingIcal(listingId);
  if (ics == null) return new NextResponse("bulunamadı", { status: 404 });

  return new NextResponse(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="listing-${listingId}.ics"`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
