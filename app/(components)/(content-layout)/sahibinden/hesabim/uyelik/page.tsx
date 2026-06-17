import Link from "next/link";
import { Crown, ArrowLeft, Coins } from "lucide-react";
import type { Metadata } from "next";
import MembershipClient from "../../components/MembershipClient";
import { getMyMembership, getMyCreditHistory } from "../../actions/membership";
import { requireMarketUser } from "../../lib/auth";
import { timeAgo } from "../../lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Üyelik & Kontör — sahibinden" };

const reasonLabel: Record<string, string> = {
  PURCHASE: "Satın alma", MEMBERSHIP_GRANT: "Üyelik kontörü", DOPING: "Doping harcaması", REFUND: "İade",
};

export default async function MembershipPage() {
  await requireMarketUser();
  const [membership, history] = await Promise.all([getMyMembership(), getMyCreditHistory(20)]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <Link href="/sahibinden/hesabim" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-amber-600">
        <ArrowLeft className="h-4 w-4" /> Hesabıma dön
      </Link>

      <div className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
          <Crown className="h-6 w-6 text-amber-500" /> Üyelik & Kontör
        </h1>
        <p className="mt-1 text-sm text-slate-500">Üyeliğinizi yükseltin, kontör kazanın ve ilanlarınızı kontörle öne çıkarın.</p>
      </div>

      <MembershipClient current={membership as any} />

      {/* Kontör geçmişi */}
      {history.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Coins className="h-5 w-5 text-amber-500" /> Kontör Hareketleri
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {history.map((t: any, i: number) => (
              <div key={t.id} className={`flex items-center justify-between gap-3 px-4 py-3 text-sm ${i % 2 ? "bg-slate-50/60" : ""}`}>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800">{reasonLabel[t.reason] ?? t.reason}</p>
                  {t.note && <p className="line-clamp-1 text-xs text-slate-500">{t.note}</p>}
                  <p className="text-[11px] text-slate-400">{timeAgo(t.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${t.delta < 0 ? "text-rose-600" : "text-emerald-600"}`}>{t.delta > 0 ? "+" : ""}{t.delta}</p>
                  <p className="text-[11px] text-slate-400">bakiye: {t.balanceAfter}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
