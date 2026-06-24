import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getAvailableSlots } from "../../../appointments";

export const dynamic = "force-dynamic";

// İlan sahibinin tanımladığı müsaitliğe göre boş randevu slotlarını döndürür.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const listingId = searchParams.get("listingId");
  if (!listingId) return NextResponse.json({ error: "param" }, { status: 400 });

  const listing = await prisma.shListing.findUnique({
    where: { id: listingId },
    select: { userId: true },
  });
  if (!listing) return NextResponse.json({ error: "notfound" }, { status: 404 });

  const result = await getAvailableSlots(listing.userId);
  return NextResponse.json(result);
}
