import { ShieldCheck } from "lucide-react";
import { getPendingListings } from "../../../actions/moderation";
import { requireRealestateAdmin } from "../../../lib/auth";
import ModerationTable from "./_components/ModerationTable";

export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  await requireRealestateAdmin();

  const pending = await getPendingListings();

  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-600/20">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black tracking-tight">İlan Moderasyonu</h1>
            <p className="text-sm text-slate-500">Onay bekleyen {pending.length} bireysel ilan</p>
          </div>
        </div>

        <div className="mt-5">
          <ModerationTable listings={pending as any[]} />
        </div>
      </div>
    </div>
  );
}
