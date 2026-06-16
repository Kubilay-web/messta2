import { notFound } from "next/navigation";
import ListingForm from "../../_components/ListingForm";
import { getMyListing } from "../../../../../actions/my-listings";
import { requireRealestateUser } from "../../../../../lib/auth";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRealestateUser();
  const { id } = await params;
  const l = await getMyListing(id);
  if (!l) return notFound();

  const p = l.property;
  const initial = {
    title: l.title,
    description: l.description ?? "",
    listingType: l.listingType,
    propertyType: p?.propertyType ?? "APARTMENT",
    askingPrice: l.askingPrice,
    monthlyRent: l.monthlyRent,
    deposit: l.deposit,
    currency: l.currency ?? "TRY",
    isNegotiable: l.isNegotiable,
    city: p?.city ?? "",
    district: p?.district ?? "",
    neighborhood: p?.neighborhood ?? "",
    address: p?.address ?? "",
    roomCount: p?.roomCount ?? "",
    bathroomCount: p?.bathroomCount,
    grossArea: p?.grossArea,
    netArea: p?.netArea,
    floorNo: p?.floorNo,
    totalFloors: p?.totalFloors,
    buildingAge: p?.buildingAge,
    heatingType: p?.heatingType ?? "",
    videoUrl: l.videoUrl ?? "",
    virtualTourUrl: l.virtualTourUrl ?? "",
    hasElevator: p?.hasElevator,
    hasParking: p?.hasParking,
    isFurnished: p?.isFurnished,
    hasGarden: p?.hasGarden,
    hasPool: p?.hasPool,
    hasBalcony: p?.hasBalcony,
    ownerName: p?.ownerName ?? "",
    ownerPhone: p?.ownerPhone ?? "",
    images: p?.images?.map((i) => i.url) ?? [],
  };

  return (
    <div className="w-full px-3 sm:px-6 py-5">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-5 text-2xl font-black tracking-tight">İlanı Düzenle</h1>
        <ListingForm mode="edit" listingId={l.id} initial={initial as any} />
      </div>
    </div>
  );
}
