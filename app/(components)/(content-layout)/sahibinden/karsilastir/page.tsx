import { Suspense } from "react";
import { GitCompareArrows } from "lucide-react";
import type { Metadata } from "next";
import CompareClient from "../components/CompareClient";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "İlan Karşılaştır — sahibinden" };

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <GitCompareArrows className="h-6 w-6 text-amber-500" /> İlan Karşılaştır
      </h1>
      <p className="mt-0.5 text-sm text-slate-500">Seçtiğiniz ilanları yan yana inceleyin.</p>

      <div className="mt-5">
        <Suspense fallback={<div className="py-20 text-center text-sm text-slate-400">Yükleniyor…</div>}>
          <CompareClient />
        </Suspense>
      </div>
    </div>
  );
}
