import { validateRequest } from "@/app/auth";
import { getClientFromUserId } from "../../../../actions/client-portal";
import { getClientSavedSearches } from "../../../../actions/saved-searches";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Bookmark, BellRing, ArrowRight } from "lucide-react";
import SavedSearchCard from "../../../../components/portal/SavedSearchCard";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Kayıtlı Aramalar - Müşteri Portalı" };

export default async function ClientSavedSearchesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const searches = await getClientSavedSearches(client.id, client.agencyId ?? "");
  const totalFresh = searches.reduce((a, s) => a + s.fresh, 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Bookmark className="w-5 h-5 text-blue-600" />
        <h1 className="text-xl sm:text-2xl font-extrabold text-black">Kayıtlı Aramalar</h1>
        <Badge variant="secondary" className="text-xs text-black">{searches.length}</Badge>
      </div>

      {totalFresh > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <BellRing className="w-4 h-4" />
          Kayıtlı aramalarınıza uygun <strong>{totalFresh}</strong> yeni ilan var!
        </div>
      )}

      {searches.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Bookmark className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-black">Henüz kayıtlı aramanız yok.</p>
            <p className="text-xs text-gray-400 mt-1">
              İlanlar sayfasında filtreleyip "Aramayı Kaydet" ile buraya ekleyebilirsiniz.
            </p>
            <Link
              href="/estate/portal/client/listings"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              İlanları Keşfet <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {searches.map((s) => (
            <SavedSearchCard key={s.id} search={s as any} />
          ))}
        </div>
      )}
    </div>
  );
}
