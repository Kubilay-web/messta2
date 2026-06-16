import { Building2, Home, Wallet, CheckCircle2, Layers3, Clock } from "lucide-react";
import { getPortfolioDashboard, getProjects } from "../../actions/projects";
import { requireAgencyAccess } from "../../lib/auth";
import { UnitStatusChart } from "../../components/portfolio-charts";
import { ProjectCard } from "../../components/project-card";
import { NewProjectButton } from "../../components/new-project-button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui";
import { formatCompact, projectStatusLabel } from "../../lib/labels";

export const dynamic = "force-dynamic";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);

  const [dash, projects] = await Promise.all([
    getPortfolioDashboard(agencyId),
    getProjects(agencyId),
  ]);

  const kpis = [
    { label: "Proje", value: dash.totalProjects, sub: `${dash.activeProjects} aktif`, icon: Building2, color: "text-amber-600 bg-amber-100 dark:bg-amber-500/15" },
    { label: "Toplam Daire", value: dash.totalUnits, sub: `${dash.availableUnits} müsait`, icon: Layers3, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-500/15" },
    { label: "Satılan Daire", value: dash.soldUnits, sub: `${dash.reservedUnits} rezerve`, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15" },
    { label: "Satış Cirosu", value: formatCompact(dash.salesRevenue), sub: `${dash.salesCount} satış`, icon: Wallet, color: "text-rose-600 bg-rose-100 dark:bg-rose-500/15" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Portföy</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Geliştirme projeleri, daire stoğu ve satış genel görünümü
          </p>
        </div>
        <NewProjectButton agencyId={agencyId} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
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

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Daire Stok Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <UnitStatusChart data={dash.unitBreakdown} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Proje Durumları</CardTitle>
          </CardHeader>
          <CardContent>
            {dash.statusBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground py-12 text-center">Henüz proje yok.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {dash.statusBreakdown.map((s) => (
                  <div
                    key={s.status}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <span className="text-sm flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      {projectStatusLabel[s.status] ?? s.status}
                    </span>
                    <span className="text-lg font-bold">{s.count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Projeler</h2>
        </div>
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Home className="size-10 mx-auto mb-3 opacity-40" />
              <p>Henüz proje yok. İlk projenizi oluşturun.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} agencyId={agencyId} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
