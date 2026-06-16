import Link from "next/link";
import {
  TrendingUp,
  Users2,
  Trophy,
  Wallet,
  Target,
  AlertTriangle,
  ArrowRight,
  Activity as ActivityIcon,
} from "lucide-react";
import { getCrmDashboard, getRecentActivities } from "../../actions/dashboard";
import { requireAgencyAccess } from "../../lib/auth";
import { FunnelChart, SourcesChart } from "../../components/dashboard/crm-charts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "../../components/ui";
import { formatCompact, activityTypeLabel, timeAgo, initials } from "../../lib/labels";

export const dynamic = "force-dynamic";

export default async function CrmDashboardPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const [data, activities] = await Promise.all([
    getCrmDashboard(agencyId),
    getRecentActivities(agencyId, 12),
  ]);

  const { kpi } = data;

  const kpis = [
    {
      label: "Toplam Fırsat",
      value: kpi.totalLeads.toLocaleString("tr-TR"),
      sub: `${kpi.openLeads} açık`,
      icon: Users2,
      color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-500/15",
    },
    {
      label: "Açık Hat Değeri",
      value: formatCompact(kpi.openValue),
      sub: "potansiyel ciro",
      icon: Wallet,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15",
    },
    {
      label: "Bu Ay Kazanılan",
      value: formatCompact(kpi.wonValueThisMonth),
      sub: `${kpi.wonThisMonth} fırsat`,
      icon: Trophy,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-500/15",
    },
    {
      label: "Dönüşüm Oranı",
      value: `%${kpi.conversionRate}`,
      sub: `${kpi.wonLeads} kazanıldı / ${kpi.lostLeads} kayıp`,
      icon: Target,
      color: "text-sky-600 bg-sky-100 dark:bg-sky-500/15",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      {/* Başlık */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gösterge Paneli</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Satış hattınızın ve ekip performansının genel görünümü
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/crm/agency/${agencyId}/tasks`}>
              <AlertTriangle className="size-4" />
              {kpi.overdueTasks > 0 ? `${kpi.overdueTasks} geciken görev` : "Görevler"}
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/crm/agency/${agencyId}/pipeline`}>
              Satış Hattı <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI kartları */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{k.label}</p>
                    <p className="text-2xl font-bold mt-1.5">{k.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{k.sub}</p>
                  </div>
                  <div className={`size-10 rounded-lg flex items-center justify-center ${k.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Grafikler */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="size-4 text-muted-foreground" />
              Satış Hunisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FunnelChart data={data.funnel} />
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

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Danışman performansı */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Danışman Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            {data.agentStats.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Henüz danışman ataması yok.
              </p>
            ) : (
              <div className="space-y-1">
                <div className="grid grid-cols-12 px-2 pb-2 text-xs font-medium text-muted-foreground border-b">
                  <span className="col-span-5">Danışman</span>
                  <span className="col-span-2 text-center">Atanan</span>
                  <span className="col-span-2 text-center">Kazanılan</span>
                  <span className="col-span-3 text-right">Ciro</span>
                </div>
                {data.agentStats.map((a) => (
                  <div
                    key={a.id}
                    className="grid grid-cols-12 items-center px-2 py-2.5 rounded-lg hover:bg-muted/60 transition-colors"
                  >
                    <div className="col-span-5 flex items-center gap-2.5 min-w-0">
                      <Avatar className="size-8">
                        {a.imageUrl && <AvatarImage src={a.imageUrl} alt={a.name} />}
                        <AvatarFallback className="text-xs">{initials(a.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{a.name}</p>
                        <p className="text-xs text-muted-foreground">%{a.winRate} dönüşüm</p>
                      </div>
                    </div>
                    <span className="col-span-2 text-center text-sm">{a.assigned}</span>
                    <span className="col-span-2 text-center text-sm font-medium text-emerald-600">
                      {a.won}
                    </span>
                    <span className="col-span-3 text-right text-sm font-semibold">
                      {formatCompact(a.wonValue)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Son aktiviteler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ActivityIcon className="size-4 text-muted-foreground" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Aktivite yok.</p>
            ) : (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {activities.map((act) => (
                  <Link
                    key={act.id}
                    href={`/crm/agency/${agencyId}/leads/${act.leadId}`}
                    className="flex gap-3 group"
                  >
                    <div className="mt-0.5">
                      <span className="size-2 rounded-full bg-primary block mt-1.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug group-hover:text-primary transition-colors">
                        {act.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        <Badge variant="secondary" className="mr-1.5 text-[10px] px-1.5 py-0">
                          {activityTypeLabel[act.type] ?? act.type}
                        </Badge>
                        {act.lead?.contactName} · {timeAgo(act.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
