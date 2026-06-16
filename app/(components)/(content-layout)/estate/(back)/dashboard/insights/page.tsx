import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAdvancedAnalytics } from "../../../actions/insights";
import InsightsDashboard from "./InsightsDashboard";
import DateRangeFilter from "./DateRangeFilter";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Gelişmiş Analitik - EstatePro" };

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const params = await searchParams;
  const data   = await getAdvancedAnalytics(agency?.id ?? "", { from: params?.from, to: params?.to });

  const periodText = params?.from || params?.to
    ? `${params?.from ?? "…"} — ${params?.to ?? "bugün"} dönemi`
    : "Tüm zamanlar";

  return (
    <div className="w-full p-2 sm:p-4 space-y-6">
      <div className="border-b border-gray-200 pb-3">
        <h1 className="text-xl sm:text-2xl font-bold text-black">Gelişmiş Analitik</h1>
        <p className="text-sm text-black mt-1">{periodText} • teklif dönüşümü, komisyon tahsilatı, gider dağılımı ve operasyon metrikleri.</p>
      </div>
      <DateRangeFilter from={params?.from} to={params?.to} />
      <InsightsDashboard data={data} />
    </div>
  );
}
