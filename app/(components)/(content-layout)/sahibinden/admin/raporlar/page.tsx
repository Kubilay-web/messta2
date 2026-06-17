import Link from "next/link";
import { Flag, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import ReportRow from "../../components/ReportRow";
import { getReports } from "../../actions/reports";
import { requireMarketAdmin } from "../../lib/auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Şikayet Yönetimi — sahibinden" };

type SP = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

export default async function ReportsAdminPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireMarketAdmin();
  const sp = await searchParams;
  const status = first(sp.status);
  const reports = await getReports(status);

  const tabs = [
    { key: "OPEN", label: "Açık" },
    { key: undefined as string | undefined, label: "Tümü" },
    { key: "REVIEWED", label: "İncelendi" },
    { key: "DISMISSED", label: "Reddedildi" },
  ];
  const tabHref = (k?: string) => `/sahibinden/admin/raporlar${k ? `?status=${k}` : ""}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <h1 className="flex items-center gap-2 text-2xl font-black tracking-tight sm:text-3xl">
        <Flag className="h-6 w-6 text-rose-500" /> Şikayet Yönetimi
      </h1>
      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-500" /> Yalnızca yöneticiler görür.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const active = (t.key ?? "") === (status ?? "");
          return (
            <Link
              key={t.label}
              href={tabHref(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active ? "border-rose-500 bg-rose-500 text-white shadow" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      {reports.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
          <Flag className="mx-auto mb-3 h-12 w-12 text-slate-300" />
          <p className="font-semibold text-slate-700">Bu kategoride şikayet yok</p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {reports.map((r: any) => <ReportRow key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
