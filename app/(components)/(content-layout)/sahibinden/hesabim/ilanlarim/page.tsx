import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getUserListings, getDopingPackages } from "../../data";
import MyListingRow from "../../components/my-listing-row";

export const dynamic = "force-dynamic";

export default async function IlanlarimPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const [listings, dopingPackages] = await Promise.all([
    getUserListings(user.id),
    getDopingPackages(),
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">İlanlarım ({listings.length})</h1>
        <Link
          href="/sahibinden/ilan-ver"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Yeni İlan
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          Henüz ilanınız yok.
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <MyListingRow key={l.id} listing={l} dopingPackages={dopingPackages} />
          ))}
        </div>
      )}
    </div>
  );
}
