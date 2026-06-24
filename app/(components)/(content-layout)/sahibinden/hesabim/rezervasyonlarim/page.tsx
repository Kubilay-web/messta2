import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { confirmStripeSession } from "../../lib/stripe-fulfill";
import BookingsClient, { type BookingVM } from "../../components/bookings-client";
import AvailabilityManager, {
  type RentListingVM,
  type BlockVM,
  type BookedVM,
} from "../../components/availability-manager";

export const dynamic = "force-dynamic";

function toVM(b: any, side: "renter" | "owner", userId: string): BookingVM {
  const other = side === "renter" ? b.owner : b.renter;
  const alreadyReviewed = side === "renter" ? b.renterReviewed : b.ownerReviewed;
  return {
    id: b.id,
    listingId: b.listingId,
    listingTitle: b.listing?.title ?? "İlan",
    listingImage: b.listing?.images?.[0] ?? null,
    otherName: other?.displayName || other?.name || other?.username || "Üye",
    startDate: b.startDate.toISOString(),
    endDate: b.endDate.toISOString(),
    nights: b.nights,
    guests: b.guests,
    totalAmount: b.totalAmount,
    deposit: b.deposit,
    currency: b.currency,
    status: b.status,
    note: b.note ?? null,
    contactPhone: b.contactPhone ?? null,
    proposedStart: b.proposedStartDate ? b.proposedStartDate.toISOString() : null,
    proposedEnd: b.proposedEndDate ? b.proposedEndDate.toISOString() : null,
    proposedTotal: b.proposedTotalAmount ?? null,
    proposedByMe: b.proposedById === userId,
    canReview: b.status === "COMPLETED" && !alreadyReviewed,
    // Giriş talimatları yalnızca kiracıya ve onaylı rezervasyonda gösterilir.
    checkInInstructions:
      side === "renter" && b.status === "CONFIRMED" ? b.listing?.checkInInstructions ?? null : null,
  };
}

export default async function RezervasyonlarimPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; ok?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) return null;

  // Kart dönüşünde rezervasyon ödemesini webhook'tan bağımsız tamamla.
  const { session_id } = await searchParams;
  if (session_id) await confirmStripeSession(session_id);

  const sel = {
    listing: { select: { title: true, images: true, checkInInstructions: true } },
    renter: { select: { displayName: true, name: true, username: true } },
    owner: { select: { displayName: true, name: true, username: true } },
  };

  const [renterBookings, ownerBookings, rentListings, rentBlocks] = await Promise.all([
    prisma.shRentalBooking.findMany({
      where: { renterId: user.id },
      include: sel,
      orderBy: { createdAt: "desc" },
    }),
    prisma.shRentalBooking.findMany({
      where: { ownerId: user.id },
      include: sel,
      orderBy: { createdAt: "desc" },
    }),
    prisma.shListing.findMany({
      where: { userId: user.id, rentable: true },
      select: { id: true, title: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.shRentalBlock.findMany({
      where: { listing: { userId: user.id }, endDate: { gte: new Date() } },
      orderBy: { startDate: "asc" },
    }),
  ]);

  const asRenter = renterBookings.map((b) => toVM(b, "renter", user.id));
  const asOwner = ownerBookings.map((b) => toVM(b, "owner", user.id));

  const rentListingVM: RentListingVM[] = rentListings.map((l) => ({ id: l.id, title: l.title }));
  const blockVM: BlockVM[] = rentBlocks.map((b) => ({
    id: b.id,
    listingId: b.listingId,
    start: b.startDate.toISOString().slice(0, 10),
    end: b.endDate.toISOString().slice(0, 10),
    reason: b.reason,
  }));
  const bookedVM: BookedVM[] = ownerBookings
    .filter((b) => ["AWAITING_APPROVAL", "CONFIRMED"].includes(b.status) && b.endDate >= new Date())
    .map((b) => ({
      listingId: b.listingId,
      start: b.startDate.toISOString().slice(0, 10),
      end: b.endDate.toISOString().slice(0, 10),
      status: b.status,
    }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Rezervasyonlarım</h1>
      <BookingsClient asRenter={asRenter} asOwner={asOwner} />
      {rentListingVM.length > 0 && (
        <div className="mt-6">
          <AvailabilityManager listings={rentListingVM} blocks={blockVM} booked={bookedVM} />
        </div>
      )}
    </div>
  );
}
