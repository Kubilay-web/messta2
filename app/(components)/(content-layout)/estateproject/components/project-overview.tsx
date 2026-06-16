import {
  Layers,
  Building2,
  Wallet,
  MapPin,
  CalendarDays,
  Ruler,
  User2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Progress } from "../components/ui";
import {
  formatCurrency,
  formatCompact,
  formatDate,
  formatArea,
  formatNumber,
} from "../lib/labels";

export function ProjectOverview({ project, stats }: { project: any; stats: any }) {
  const kpis = [
    { label: "Toplam Daire", value: formatNumber(stats.total), icon: Layers, tone: "" },
    { label: "Müsait", value: formatNumber(stats.available), icon: Building2, tone: "text-emerald-600" },
    { label: "Rezerve", value: formatNumber(stats.reserved), icon: Building2, tone: "text-amber-600" },
    { label: "Satıldı", value: formatNumber(stats.sold), icon: Building2, tone: "text-red-600" },
    { label: "Satış Cirosu", value: formatCompact(stats.soldValue, project.currency), icon: Wallet, tone: "text-indigo-600" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <Card key={k.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Icon className="size-3.5" /> {k.label}
                </div>
                <p className={`text-xl font-bold mt-1 ${k.tone}`}>{k.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Proje Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">İnşaat ilerlemesi</span>
                <span className="font-medium">%{project.progress}</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
            {project.description && <p className="text-sm text-muted-foreground pt-1">{project.description}</p>}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2 text-sm">
              <Info icon={MapPin} label="Adres" value={project.address ?? "—"} />
              <Info icon={User2} label="Proje Müdürü" value={project.managerName ?? "—"} />
              <Info icon={Ruler} label="Arsa Alanı" value={formatArea(project.totalLandArea)} />
              <Info icon={Ruler} label="İnşaat Alanı" value={formatArea(project.totalConstructionArea)} />
              <Info icon={Wallet} label="Bütçe" value={formatCurrency(project.budget, project.currency)} />
              <Info icon={Building2} label="Blok / Kat" value={`${project.totalBlocks ?? "—"} / ${project.totalFloors ?? "—"}`} />
              <Info icon={CalendarDays} label="Başlangıç" value={formatDate(project.startDate)} />
              <Info icon={CalendarDays} label="Tahmini Bitiş" value={formatDate(project.estimatedEndDate)} />
              <Info icon={CalendarDays} label="Teslim" value={formatDate(project.deliveryDate)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Satış Özeti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-sm">
            <Row label="Toplam Daire" value={formatNumber(stats.total)} />
            <Row label="Liste Değeri" value={formatCompact(stats.listValue, project.currency)} />
            <Row label="Satış Cirosu" value={formatCompact(stats.soldValue, project.currency)} />
            <Row label="Satılan" value={`${stats.sold} / ${stats.total}`} />
            <div className="pt-1">
              <Progress value={stats.total ? (stats.sold / stats.total) * 100 : 0} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                %{stats.total ? Math.round((stats.sold / stats.total) * 100) : 0} satıldı
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="size-4 text-muted-foreground shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
