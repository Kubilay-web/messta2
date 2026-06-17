import { ShieldCheck, Inbox } from "lucide-react";
import type { Metadata } from "next";
import ModerationRow from "../../components/ModerationRow";
import { getPendingListings } from "../../actions/moderation";
import { requireMarketAdmin } from "../../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "İlan Moderasyonu — sahibinden" };

export default async function ModerationPage() {
  await requireMarketAdmin();
  const pending = await getPendingListings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <ShieldCheck className="h-6 w-6 text-emerald-500" /> İlan Moderasyonu
      </h1>
      <p className="mt-0.5 text-sm text-slate-500">
        Onay bekleyen <b className="text-slate-900">{pending.length}</b> bireysel ilan. Onaylanınca eşleşen kayıtlı aramalara e-posta gider.
      </p>

      {pending.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Inbox className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Onay bekleyen ilan yok 🎉</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {pending.map((l: any) => <ModerationRow key={l.id} l={l} />)}
        </div>
      )}
    </div>
  );
}
