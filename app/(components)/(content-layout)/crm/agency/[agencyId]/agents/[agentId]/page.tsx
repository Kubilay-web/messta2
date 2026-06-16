import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  Briefcase,
  Building,
  Wallet,
  Trophy,
  Target,
  Coins,
  Home,
  FileText,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { getAgentDetail } from "../../../../actions/agents";
import { requireReportAccess } from "../../../../lib/auth";
import { FunnelChart } from "../../../../components/dashboard/crm-charts";
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
} from "../../../../components/ui";
import {
  formatCompact,
  formatCurrency,
  formatDate,
  leadStatusLabel,
  activityTypeLabel,
  taskPriorityLabel,
  taskPriorityColor,
  propertyTypeLabel,
  timeAgo,
  initials,
} from "../../../../lib/labels";

export const dynamic = "force-dynamic";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ agencyId: string; agentId: string }>;
}) {
  const { agencyId, agentId } = await params;
  await requireReportAccess(agencyId);

  const data = await getAgentDetail(agencyId, agentId);
  if (!data) return notFound();

  const { agent, kpi } = data;

  const kpis = [
    { label: "Açık Hat Değeri", value: formatCompact(kpi.openValue), sub: `${kpi.open} açık fırsat`, icon: Wallet, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/15" },
    { label: "Kazanılan Ciro", value: formatCompact(kpi.wonValue), sub: `${kpi.won} fırsat`, icon: Trophy, color: "text-amber-600 bg-amber-100 dark:bg-amber-500/15" },
    { label: "Dönüşüm", value: `%${kpi.winRate}`, sub: `${kpi.lost} kayıp`, icon: Target, color: "text-sky-600 bg-sky-100 dark:bg-sky-500/15" },
    { label: "Tahmini Komisyon", value: formatCompact(kpi.estimatedCommission), sub: `%${agent.commissionRate} oran`, icon: Coins, color: "text-violet-600 bg-violet-100 dark:bg-violet-500/15" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-[1500px] mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/crm/agency/${agencyId}/agents`}>
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Danışman Detayı</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Profil */}
        <Card className="h-fit">
          <CardContent className="p-5">
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-20 mb-3">
                {agent.imageUrl && <AvatarImage src={agent.imageUrl} alt={agent.name} />}
                <AvatarFallback className="text-xl">{initials(agent.name)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{agent.name}</h2>
              <p className="text-sm text-muted-foreground">{agent.designation}</p>
              <Badge variant={agent.isActive ? "secondary" : "outline"} className="mt-2">
                {agent.isActive ? "Aktif" : "Pasif"}
              </Badge>
            </div>

            <div className="space-y-2.5 mt-5 text-sm">
              <Info icon={Phone} value={<a href={`tel:${agent.phone}`} className="hover:underline">{agent.phone}</a>} />
              <Info icon={Mail} value={<a href={`mailto:${agent.email}`} className="hover:underline truncate">{agent.email}</a>} />
              <Info icon={Building} value={agent.departmentName} />
              <Info icon={Briefcase} value={`Sicil: ${agent.employeeId}`} />
              {agent.experience != null && <Info icon={Clock} value={`${agent.experience} yıl deneyim`} />}
            </div>

            {agent.specializationCities?.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-1.5">Uzmanlık bölgeleri</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specializationCities.map((c) => (
                    <Badge key={c} variant="outline">{c}</Badge>
                  ))}
                </div>
              </div>
            )}
            {agent.specializationTypes?.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1.5">Uzmanlık türleri</p>
                <div className="flex flex-wrap gap-1">
                  {agent.specializationTypes.map((t) => (
                    <Badge key={t} variant="outline">{propertyTypeLabel[t] ?? t}</Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-center">
              <ErpStat icon={Home} label="İlan" value={agent.counts.listings} />
              <ErpStat icon={FileText} label="Sözleşme" value={agent.counts.contracts} />
              <ErpStat icon={CalendarCheck} label="Gezi" value={agent.counts.visits} />
            </div>

            {agent.bio && (
              <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">{agent.bio}</p>
            )}
          </CardContent>
        </Card>

        {/* Sağ kolon */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPI */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((k) => {
              const Icon = k.icon;
              return (
                <Card key={k.label}>
                  <CardContent className="p-4">
                    <div className={`size-9 rounded-lg flex items-center justify-center mb-2 ${k.color}`}>
                      <Icon className="size-4.5" />
                    </div>
                    <p className="text-lg font-bold">{k.value}</p>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="text-[11px] text-muted-foreground/70">{k.sub}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Hat dağılımı + açık görevler */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Açık Hat Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                {data.pipelineBreakdown.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">Açık fırsat yok.</p>
                ) : (
                  <FunnelChart data={data.pipelineBreakdown} />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Açık Görevler ({data.openTasks.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {data.openTasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-8 text-center">Açık görev yok.</p>
                ) : (
                  <div className="space-y-2 max-h-[230px] overflow-y-auto">
                    {data.openTasks.map((t) => {
                      const overdue = t.dueDate && new Date(t.dueDate) < new Date();
                      const inner = (
                        <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${taskPriorityColor[t.priority]}`}>
                            {taskPriorityLabel[t.priority]}
                          </span>
                          <span className="text-sm flex-1 truncate">{t.title}</span>
                          {t.dueDate && (
                            <span className={`text-xs ${overdue ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                              {formatDate(t.dueDate)}
                            </span>
                          )}
                        </div>
                      );
                      return t.leadId ? (
                        <Link key={t.id} href={`/crm/agency/${agencyId}/leads/${t.leadId}`}>{inner}</Link>
                      ) : (
                        <div key={t.id}>{inner}</div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Son fırsatlar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Son Fırsatlar</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {data.recentLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">Fırsat yok.</p>
              ) : (
                <div className="divide-y">
                  {data.recentLeads.map((l) => (
                    <Link
                      key={l.id}
                      href={`/crm/agency/${agencyId}/leads/${l.id}`}
                      className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-muted/40"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{l.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {l.contactName} ·{" "}
                          <span className="inline-flex items-center gap-1">
                            <span className="size-2 rounded-full" style={{ background: l.stageColor }} />
                            {l.stageName}
                          </span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold">{formatCompact(l.value, l.currency)}</p>
                        <Badge
                          variant={l.status === "WON" ? "default" : l.status === "LOST" ? "destructive" : "secondary"}
                          className="text-[10px]"
                        >
                          {leadStatusLabel[l.status]}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Son aktiviteler */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Son Aktiviteler</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentActivities.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">Aktivite yok.</p>
              ) : (
                <div className="space-y-3">
                  {data.recentActivities.map((a) => (
                    <Link key={a.id} href={`/crm/agency/${agencyId}/leads/${a.leadId}`} className="flex gap-3 group">
                      <span className="size-2 rounded-full bg-primary block mt-1.5 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm group-hover:text-primary transition-colors">{a.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          <Badge variant="secondary" className="mr-1.5 text-[10px] px-1.5 py-0">
                            {activityTypeLabel[a.type] ?? a.type}
                          </Badge>
                          {a.leadTitle} · {timeAgo(a.createdAt)}
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
    </div>
  );
}

function Info({ icon: Icon, value }: { icon: any; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-muted-foreground shrink-0" />
      <span className="min-w-0 truncate">{value}</span>
    </div>
  );
}

function ErpStat({ icon: Icon, label, value }: { icon: any; label: string; value: number }) {
  return (
    <div>
      <Icon className="size-4 mx-auto text-muted-foreground mb-1" />
      <p className="text-base font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
