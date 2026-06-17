import { PlusCircle } from "lucide-react";
import type { Metadata } from "next";
import ListingFormClient from "../components/ListingFormClient";
import { requireMarketUser } from "../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Ücretsiz İlan Ver — sahibinden" };

export default async function CreateListingPage() {
  const user = await requireMarketUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <PlusCircle className="h-6 w-6 text-amber-500" /> Ücretsiz İlan Ver
        </h1>
        <p className="mt-1 text-sm text-slate-500">Mülkünüzün bilgilerini girin; saniyeler içinde yayına hazır.</p>
      </div>
      <ListingFormClient mode="create" initial={{ ownerName: user.name ?? undefined }} />
    </div>
  );
}
