import Link from "next/link";
import { getCrmAttention } from "../../../actions/attention";
import { requireAgencyAccess } from "../../../lib/auth";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "../../../components/ui";
import { formatCurrency, timeAgo } from "../../../lib/labels";
import { AlertTriangle, Clock, CalendarClock, Flame } from "lucide-react";

export const dynamic = "force-dynamic";

const priorityLabel: Record<string, string> = { LOW: "Düşük", MEDIUM: "Orta", HIGH: "Yüksek", URGENT: "Acil" };
const priorityColor: Record<string, string> = { LOW: "#64748b", MEDIUM: "#0891b2", HIGH: "#d97706", URGENT: "#dc2626" };

function fmtDate(d: Date | string | null) {
  return d ? new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }) : "—";
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${color}1a`, color }}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-none">{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AttentionPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const data = await getCrmAttention(agencyId);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dikkat Gerektirenler</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Çürüyen fırsatlar, geciken görevler ve günün takipleri.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Flame}        label="Çürük fırsat"     value={data.counts.rotten}       color="#dc2626" />
        <StatCard icon={AlertTriangle} label="Bayat fırsat"     value={data.counts.stale}        color="#d97706" />
        <StatCard icon={Clock}        label="Geciken görev"     value={data.counts.overdueTasks} color="#dc2626" />
        <StatCard icon={CalendarClock} label="Bugünkü görev"    value={data.counts.todayTasks}   color="#2563eb" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Çürük fırsatlar */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Flame className="w-4 h-4 text-red-600" /> Çürük Fırsatlar</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.rotten.length === 0 ? (
              <p className="text-sm text-muted-foreground">Çürük fırsat yok 👍</p>
            ) : data.rotten.map((l) => (
              <Link key={l.id} href={`/crm/agency/${agencyId}/leads/${l.id}`} className="flex items-center justify-between gap-2 rounded-lg border p-3 hover:bg-muted/50">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{l.contactName} · {l.stage?.name}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}>{l.idleDays} gün</Badge>
                  {l.value ? <p className="text-xs text-muted-foreground mt-1">{formatCurrency(l.value, l.currency)}</p> : null}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Bayat fırsatlar */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-600" /> Uzun Süre Aktivitesiz</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.stale.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bayat fırsat yok 👍</p>
            ) : data.stale.map((l) => (
              <Link key={l.id} href={`/crm/agency/${agencyId}/leads/${l.id}`} className="flex items-center justify-between gap-2 rounded-lg border p-3 hover:bg-muted/50">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{l.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{l.contactName} · {timeAgo(l.lastActivityAt)}</p>
                </div>
                <Badge style={{ backgroundColor: "#fef3c7", color: "#d97706" }}>{l.idleDays} gün</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Geciken görevler */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4 text-red-600" /> Geciken Görevler</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.overdueTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Geciken görev yok 👍</p>
            ) : data.overdueTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.agentName ?? "—"}</p>
                </div>
                <div className="text-right shrink-0">
                  <Badge style={{ backgroundColor: `${priorityColor[t.priority]}1a`, color: priorityColor[t.priority] }}>{priorityLabel[t.priority] ?? t.priority}</Badge>
                  <p className="text-xs text-red-600 mt-1">{fmtDate(t.dueDate)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Bugünkü görevler */}
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><CalendarClock className="w-4 h-4 text-blue-600" /> Bugünkü Görevler</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {data.todayTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bugün görev yok.</p>
            ) : data.todayTasks.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-2 rounded-lg border p-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{t.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{t.agentName ?? "—"}</p>
                </div>
                <Badge style={{ backgroundColor: `${priorityColor[t.priority]}1a`, color: priorityColor[t.priority] }}>{priorityLabel[t.priority] ?? t.priority}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
