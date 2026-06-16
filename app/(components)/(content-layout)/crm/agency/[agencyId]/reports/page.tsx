import Link from "next/link";
import { TrendingUp, Wallet, Clock, Percent, Trophy, Coins } from "lucide-react";
import { getCrmReports } from "../../../actions/reports";
import { requireReportAccess } from "../../../lib/auth";
import { TrendChart } from "../../../components/reports/reports-charts";
import { SourcesChart } from "../../../components/dashboard/crm-charts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui";
import { formatCompact, formatCurrency, initials } from "../../../lib/labels";

export const dynamic = "force-dynamic";

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireReportAccess(agencyId);
  const data = await getCrmReports(agencyId);
  const t = data.totals;

  const kpis = [
    { label: "Toplam Kazanılan Ciro", value: formatCompact(t.totalWonValue), icon: Wallet, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15" },
    { label: "Ortalama Fırsat Değeri", value: formatCompact(t.avgDealSize), icon: TrendingUp, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-500/15" },
    { label: "Ortalama Satış Döngüsü", value: `${t.avgCycle} gün`, icon: Clock, color: "text-sky-600 bg-sky-100 dark:bg-sky-500/15" },
    { label: "Dönüşüm Oranı", value: `%${t.conversionRate}`, icon: Percent, color: "text-amber-600 bg-amber-100 dark:bg-amber-500/15" },
    { label: "Tahmini Komisyon", value: formatCompact(t.totalEstCommission), icon: Coins, color: "text-violet-600 bg-violet-100 dark:bg-violet-500/15" },
    { label: "Gerçekleşen Komisyon", value: formatCompact(t.totalActualCommission), icon: Trophy, color: "text-rose-600 bg-rose-100 dark:bg-rose-500/15" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Raporlar</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Satış performansı, komisyon ve danışman analizi
        </p>
      </div>

      {/* KPI */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="p-4">
                <div className={`size-9 rounded-lg flex items-center justify-center mb-2.5 ${k.color}`}>
                  <Icon className="size-4.5" />
                </div>
                <p className="text-xl font-bold">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grafikler */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Son 6 Ay Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart data={data.trend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Fırsat Kaynakları</CardTitle>
          </CardHeader>
          <CardContent>
            <SourcesChart data={data.sources} />
          </CardContent>
        </Card>
      </div>

      {/* Danışman & komisyon tablosu */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Danışman Performansı & Komisyon</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Danışman</th>
                  <th className="px-4 py-3 font-medium text-center">Atanan</th>
                  <th className="px-4 py-3 font-medium text-center">Açık</th>
                  <th className="px-4 py-3 font-medium text-center">Kazanılan</th>
                  <th className="px-4 py-3 font-medium text-center">Dönüşüm</th>
                  <th className="px-4 py-3 font-medium text-right">Kazanılan Ciro</th>
                  <th className="px-4 py-3 font-medium text-center">Oran</th>
                  <th className="px-4 py-3 font-medium text-right">Tah. Komisyon</th>
                  <th className="px-4 py-3 font-medium text-right">Gerç. Komisyon</th>
                </tr>
              </thead>
              <tbody>
                {data.agentStats.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                      Aktif danışman yok.
                    </td>
                  </tr>
                ) : (
                  data.agentStats.map((a) => (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-muted/40">
                      <td className="px-4 py-3">
                        <Link
                          href={`/crm/agency/${agencyId}/agents/${a.id}`}
                          className="flex items-center gap-2.5 hover:text-primary"
                        >
                          <Avatar className="size-8">
                            {a.imageUrl && <AvatarImage src={a.imageUrl} alt={a.name} />}
                            <AvatarFallback className="text-xs">{initials(a.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{a.name}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">{a.assigned}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{a.openCount}</td>
                      <td className="px-4 py-3 text-center font-medium text-emerald-600">{a.won}</td>
                      <td className="px-4 py-3 text-center">%{a.winRate}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatCompact(a.wonValue)}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">%{a.commissionRate}</td>
                      <td className="px-4 py-3 text-right">{formatCurrency(a.estimatedCommission)}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {a.actualCommission ? formatCurrency(a.actualCommission) : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
