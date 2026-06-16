import Link from "next/link";
import { Plus, Home } from "lucide-react";
import { getMyListings } from "../../../actions/my-listings";
import MyListingsTable from "./_components/MyListingsTable";
import { requireRealestateUser } from "../../../lib/auth";

export const dynamic = "force-dynamic";

export default async function MyPropertiesPage() {
  await requireRealestateUser();
  const listings = await getMyListings();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
              <Home className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-black tracking-tight">İlanlarım</h1>
              <p className="text-sm text-slate-500">{listings.length} ilan</p>
            </div>
          </div>
          <Link
            href="/realestate/user/properties/create-property"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" /> Yeni İlan Ver
          </Link>
        </div>

        <MyListingsTable listings={listings as any[]} />
      </div>
    </div>
  );
}
