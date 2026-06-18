import { redirect, notFound } from "next/navigation";
import { validateRequest } from "@/app/auth";
import { getCategoryTree, getListingById, getUserStore } from "../../../data";
import ListingForm from "../../../components/listing-form";

export const dynamic = "force-dynamic";

export default async function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect(`/login?redirect=/sahibinden/ilan/${id}/duzenle`);

  const [listing, categories, store] = await Promise.all([
    getListingById(id),
    getCategoryTree(),
    getUserStore(user.id),
  ]);
  if (!listing) notFound();
  if (listing.userId !== user.id) redirect(`/sahibinden/ilan/${id}`);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-5 text-2xl font-bold text-gray-800">İlanı Düzenle</h1>
      <ListingForm
        categories={categories}
        userStore={store ? { id: store.id, name: store.name } : null}
        defaultContact={{ name: listing.contactName ?? "", phone: listing.contactPhone ?? "" }}
        initial={{
          id: listing.id,
          storeId: listing.storeId,
          title: listing.title,
          description: listing.description,
          price: listing.price,
          currency: listing.currency,
          type: listing.type,
          categoryId: listing.categoryId,
          city: listing.city,
          district: listing.district,
          neighborhood: listing.neighborhood,
          latitude: listing.latitude,
          longitude: listing.longitude,
          images: listing.images,
          floorPlans: listing.floorPlans,
          videoUrl: listing.videoUrl,
          tourImageUrl: listing.tourImageUrl,
          attributes: listing.attributes,
          contactName: listing.contactName,
          contactPhone: listing.contactPhone,
          showPhone: listing.showPhone,
          isUrgent: listing.isUrgent,
        }}
      />
    </div>
  );
}
