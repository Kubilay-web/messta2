import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Metadata } from "next";
import ListingFormClient from "../../../../components/ListingFormClient";
import { getMyListing } from "../../../../actions/my-listings";
import { requireMarketUser } from "../../../../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "İlanı Düzenle — sahibinden" };

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireMarketUser();
  const { id } = await params;
  const listing = await getMyListing(id);
  if (!listing) notFound();

  const p = listing.property;
  const initial = {
    title: listing.title,
    description: listing.description ?? undefined,
    listingType: listing.listingType,
    propertyType: p?.propertyType ?? "APARTMENT",
    askingPrice: listing.askingPrice,
    monthlyRent: listing.monthlyRent,
    deposit: listing.deposit,
    currency: listing.currency ?? "TRY",
    isNegotiable: listing.isNegotiable,
    videoUrl: listing.videoUrl ?? undefined,
    virtualTourUrl: listing.virtualTourUrl ?? undefined,
    city: p?.city ?? "",
    district: p?.district ?? "",
    neighborhood: p?.neighborhood ?? undefined,
    address: p?.address ?? "",
    latitude: p?.latitude,
    longitude: p?.longitude,
    roomCount: p?.roomCount ?? undefined,
    bathroomCount: p?.bathroomCount,
    grossArea: p?.grossArea,
    netArea: p?.netArea,
    floorNo: p?.floorNo,
    totalFloors: p?.totalFloors,
    buildingAge: p?.buildingAge,
    heatingType: p?.heatingType ?? undefined,
    hasElevator: p?.hasElevator,
    hasParking: p?.hasParking,
    isFurnished: p?.isFurnished,
    hasGarden: p?.hasGarden,
    hasPool: p?.hasPool,
    hasBalcony: p?.hasBalcony,
    ownerName: p?.ownerName ?? undefined,
    ownerPhone: p?.ownerPhone ?? undefined,
    subType: p?.subType ?? undefined,
    dues: p?.dues,
    facing: p?.facing ?? [],
    deedStatus: p?.deedStatus ?? undefined,
    buildStatus: p?.buildStatus ?? undefined,
    structureType: p?.structureType ?? undefined,
    usageStatus: p?.usageStatus ?? undefined,
    furnishStatus: p?.furnishStatus ?? undefined,
    inSite: p?.inSite,
    siteName: p?.siteName ?? undefined,
    creditEligible: p?.creditEligible,
    swappable: p?.swappable,
    accessible: p?.accessible,
    features: p?.features ?? [],
    zoningStatus: p?.zoningStatus ?? undefined,
    blockNo: p?.blockNo ?? undefined,
    parcelNo: p?.parcelNo ?? undefined,
    kaks: p?.kaks ?? undefined,
    gabari: p?.gabari ?? undefined,
    facadeCount: p?.facadeCount,
    images: (p?.images ?? []).map((im) => im.url),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <Pencil className="h-6 w-6 text-amber-500" /> İlanı Düzenle
        </h1>
        <p className="mt-1 text-sm text-slate-500">Bilgileri güncelleyin ve kaydedin.</p>
      </div>
      <ListingFormClient mode="edit" listingId={id} initial={initial as any} />
    </div>
  );
}
