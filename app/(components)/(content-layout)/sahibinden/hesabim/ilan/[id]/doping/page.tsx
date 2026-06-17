import Link from "next/link";
import { notFound } from "next/navigation";
import { Rocket, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import DopingClient from "../../../../components/DopingClient";
import { getMyListing } from "../../../../actions/my-listings";
import { getMyCreditBalance } from "../../../../actions/membership";
import { requireMarketUser } from "../../../../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "İlanı Öne Çıkar (Doping) — sahibinden" };

export default async function DopingPage({ params }: { params: Promise<{ id: string }> }) {
  await requireMarketUser();
  const { id } = await params;
  const [listing, credits] = await Promise.all([getMyListing(id), getMyCreditBalance()]);
  if (!listing) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <Link href="/sahibinden/hesabim" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-amber-600">
        <ArrowLeft className="h-4 w-4" /> İlanlarıma dön
      </Link>

      <div className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <Rocket className="h-6 w-6 text-amber-500" /> İlanı Öne Çıkar
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{listing.title}</span> ilanını vitrine taşıyın, çok daha fazla kişiye ulaşın.
        </p>
      </div>

      <DopingClient listingId={id} listingTitle={listing.title} credits={credits} />
    </div>
  );
}
