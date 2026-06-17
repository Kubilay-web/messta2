import Link from "next/link";
import { Bookmark, LogIn } from "lucide-react";
import type { Metadata } from "next";
import SavedSearchRow from "../components/SavedSearchRow";
import { getMySavedSearches } from "../actions/searches";
import { getMarketUser } from "../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Kayıtlı Aramalarım — sahibinden" };

export default async function SavedSearchesPage() {
  const user = await getMarketUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <Bookmark className="mx-auto mb-3 h-12 w-12 text-slate-300" />
        <h1 className="text-xl font-bold text-slate-800">Kayıtlı Aramalarım</h1>
        <p className="mt-1 text-sm text-slate-500">Aramalarınızı kaydetmek ve görmek için giriş yapın.</p>
        <Link href="/estate/login" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
          <LogIn className="h-4 w-4" /> Giriş Yap
        </Link>
      </div>
    );
  }

  const searches = await getMySavedSearches();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <Bookmark className="h-6 w-6 text-amber-500" /> Kayıtlı Aramalarım
      </h1>
      <p className="mt-0.5 text-sm text-slate-500">{searches.length} kayıtlı arama</p>

      {searches.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Bookmark className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Henüz kayıtlı aramanız yok</p>
          <p className="mt-1 text-sm text-slate-500">İlanlar sayfasında filtreleyip "Aramayı kaydet" diyerek ekleyebilirsiniz.</p>
          <Link href="/sahibinden/ilanlar" className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white">İlanlara git</Link>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {searches.map((s: any) => <SavedSearchRow key={s.id} s={s} />)}
        </div>
      )}
    </div>
  );
}
