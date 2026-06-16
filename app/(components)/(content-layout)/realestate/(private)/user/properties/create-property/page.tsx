import Link from "next/link";
import db from "@/app/lib/db";
import ListingForm from "../_components/ListingForm";
import { getMyListings, getMyPublisherAgency } from "../../../../actions/my-listings";
import { requireRealestateUser } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export default async function CreatePropertyPage() {
  const user = await requireRealestateUser();

  const [subscription, myListings, myAgency] = await Promise.all([
    db.subscriptionEstate.findFirst({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
    }),
    getMyListings(),
    getMyPublisherAgency(),
  ]);

  const count = myListings.length;
  const limit = (subscription?.plan as any)?.propertiesCount ?? 3;
  const blocked = count >= limit;

  return (
    <div className="w-full px-3 sm:px-6 py-5">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5">
          <h1 className="text-2xl font-black tracking-tight">Yeni İlan Ver</h1>
          <p className="mt-1 text-sm text-slate-500">
            İlanınız onaylandıktan sonra pazar yerinde yayınlanır; gelen talepler size iletilir.
          </p>
        </div>

        {blocked ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="font-medium text-amber-800">
              İlan sınırına ulaştınız ({limit}). Daha fazla ilan için aboneliğinizi yükseltin.
            </p>
            <Link
              href="/realestate/user/subscriptions"
              className="mt-3 inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Abonelikler
            </Link>
          </div>
        ) : (
          <ListingForm mode="create" myAgency={myAgency} />
        )}
      </div>
    </div>
  );
}
