import Link from "next/link";
import { validateRequest } from "@/app/auth";
import { getSavedSearches } from "../../data";
import SavedSearchRow from "../../components/saved-search-row";

export const dynamic = "force-dynamic";

export default async function AramalarimPage() {
  const { user } = await validateRequest();
  if (!user) return null;
  const searches = await getSavedSearches(user.id);

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-800">Kayıtlı Aramalarım ({searches.length})</h1>
      <p className="mb-4 text-sm text-gray-500">
        Aramanıza uygun yeni bir ilan eklendiğinde bildirim ve e-posta ile haber veririz.
      </p>
      {searches.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
          <p>Henüz kayıtlı aramanız yok.</p>
          <Link href="/sahibinden/ara" className="mt-3 inline-block font-semibold text-yellow-600 hover:underline">
            Arama yapıp kaydedin →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {searches.map((s) => (
            <SavedSearchRow key={s.id} search={s} />
          ))}
        </div>
      )}
    </div>
  );
}
