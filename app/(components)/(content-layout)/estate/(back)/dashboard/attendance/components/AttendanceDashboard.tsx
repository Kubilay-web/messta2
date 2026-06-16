"use client";

import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import {
  Users, CheckCircle, XCircle, Clock,
  Wifi, CalendarDays, Building2, ArrowRight, FileText, AlertCircle,
} from "lucide-react";

const statusLabel: Record<string, string> = {
  PRESENT: "Var", ABSENT: "Yok", LATE: "Geç", ON_LEAVE: "İzinli", REMOTE: "Uzaktan",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PRESENT: "default", ABSENT: "destructive", LATE: "secondary", ON_LEAVE: "outline", REMOTE: "secondary",
};
const statusBg: Record<string, string> = {
  PRESENT: "bg-green-50 border-green-200 text-green-700",
  ABSENT:  "bg-red-50 border-red-200 text-red-700",
  LATE:    "bg-amber-50 border-amber-200 text-amber-700",
  ON_LEAVE:"bg-purple-50 border-purple-200 text-purple-700",
  REMOTE:  "bg-blue-50 border-blue-200 text-blue-700",
};

type Overview = {
  agentCount: number;
  marked:     number;
  unmarked:   number;
  counts:     Record<string, number>;
  deptSummary: { id: string; name: string; total: number; present: number; absent: number; noMark: number }[];
  recent: { agent: { id: string; firstName: string; lastName: string; departmentName: string }; status: string; checkIn?: Date | string | null }[];
  date: Date | string;
};

function fmtTime(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

function pct(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

export default function AttendanceDashboard({ data, pendingLeaves = 0 }: { data: Overview; pendingLeaves?: number }) {
  const { agentCount, marked, unmarked, counts, deptSummary, recent } = data;
  const presentTotal = (counts.PRESENT ?? 0) + (counts.LATE ?? 0) + (counts.REMOTE ?? 0);

  return (
    <div className="space-y-6">

      {/* ── KPI Kartları ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { icon: Users,        label: "Toplam Danışman", value: agentCount,               bg: "bg-blue-50 text-blue-600"    },
          { icon: CheckCircle,  label: "İşaretlendi",     value: marked,                   bg: "bg-green-50 text-green-600"  },
          { icon: Clock,        label: "İşaretlenmedi",   value: unmarked,                 bg: "bg-gray-50 text-gray-600"    },
          { icon: CheckCircle,  label: "Var",              value: counts.PRESENT ?? 0,     bg: "bg-green-50 text-green-600"  },
          { icon: XCircle,      label: "Yok",              value: counts.ABSENT  ?? 0,     bg: "bg-red-50 text-red-600"      },
          { icon: Clock,        label: "Geç",              value: counts.LATE    ?? 0,     bg: "bg-amber-50 text-amber-600"  },
          { icon: Wifi,         label: "Uzaktan",          value: counts.REMOTE  ?? 0,     bg: "bg-blue-50 text-blue-600"    },
          { icon: AlertCircle,  label: "Bekl. İzin",       value: pendingLeaves,           bg: "bg-purple-50 text-purple-600", href: "/estate/dashboard/attendance/leaves" },
        ].map(({ icon: Icon, label, value, bg, href }) => (
          href ? (
            <Link key={label} href={href}>
              <Card className={`border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer ${pendingLeaves > 0 ? "border-amber-300" : ""}`}>
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className={`p-2 rounded-lg mb-1.5 ${bg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-extrabold text-black">{value}</p>
                  <p className="text-[10px] font-medium text-black mt-0.5 leading-tight">{label}</p>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card key={label} className="border border-gray-200">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <div className={`p-2 rounded-lg mb-1.5 ${bg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xl font-extrabold text-black">{value}</p>
                <p className="text-[10px] font-medium text-black mt-0.5 leading-tight">{label}</p>
              </CardContent>
            </Card>
          )
        ))}
      </div>

      {/* ── Durum Dağılımı ── */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center justify-between">
            <span>Bugün Durum Dağılımı</span>
            <span className="text-xs font-normal text-black">
              {marked}/{agentCount} işaretlendi (%{pct(marked, agentCount)})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Genel ilerleme çubuğu */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden flex">
            {["PRESENT","LATE","REMOTE","ABSENT","ON_LEAVE"].map((s) => {
              const w = pct(counts[s] ?? 0, agentCount);
              if (!w) return null;
              const colorMap: Record<string, string> = {
                PRESENT: "bg-green-500", LATE: "bg-amber-400",
                REMOTE: "bg-blue-400", ABSENT: "bg-red-500", ON_LEAVE: "bg-purple-400",
              };
              return <div key={s} className={`${colorMap[s]} h-3`} style={{ width: `${w}%` }} title={`${statusLabel[s]}: ${counts[s]}`} />;
            })}
          </div>
          {/* Detay etiketleri */}
          <div className="flex flex-wrap gap-2">
            {["PRESENT","ABSENT","LATE","ON_LEAVE","REMOTE"].map((s) => (
              <div key={s} className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${statusBg[s]}`}>
                <span>{statusLabel[s]}</span>
                <span className="font-extrabold">{counts[s] ?? 0}</span>
              </div>
            ))}
            {unmarked > 0 && (
              <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium bg-gray-50 text-black">
                <span>İşaretlenmedi</span>
                <span className="font-extrabold">{unmarked}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Departman Bazlı & Son Girişler ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Departman Özeti */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center justify-between">
              <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-600" /> Departman Özeti</span>
              <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                <Link href="/estate/dashboard/attendance/by-department">
                  İşaretle <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {deptSummary.length === 0 && (
              <p className="text-xs text-black">Departman bulunamadı.</p>
            )}
            {deptSummary.map((d) => {
              const attendedPct = pct(d.present, d.total);
              return (
                <div key={d.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-black truncate max-w-[160px]">{d.name}</span>
                    <span className="text-black shrink-0">
                      {d.present}/{d.total}
                      {d.noMark > 0 && <span className="text-black ml-1">({d.noMark} bekliyor)</span>}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden flex">
                    <div className="bg-green-500 h-1.5" style={{ width: `${attendedPct}%` }} />
                    <div className="bg-red-400 h-1.5" style={{ width: `${pct(d.absent, d.total)}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Son Girişler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center justify-between">
              <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-amber-600" /> Son Girişler</span>
              <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                <Link href="/estate/dashboard/attendance/agent">
                  Geçmiş <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recent.length === 0 && (
              <p className="text-xs text-black">Bugün henüz giriş kaydı yok.</p>
            )}
            {recent.map((r, i) => (
              <div key={i} className="flex items-center justify-between gap-2 py-1.5 border-b last:border-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-black truncate">
                    {r.agent.firstName} {r.agent.lastName}
                  </p>
                  <p className="text-[10px] text-black">{r.agent.departmentName}</p>
                </div>
                <div className="shrink-0 text-right space-y-0.5">
                  <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-[10px]">
                    {statusLabel[r.status] ?? r.status}
                  </Badge>
                  <p className="text-[10px] text-black">{fmtTime(r.checkIn)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Hızlı Erişim ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { href: "/estate/dashboard/attendance/by-department", icon: Building2, label: "Departmana Göre İşaretle", desc: "Toplu devam işaretleme" },
          { href: "/estate/dashboard/attendance/agent",         icon: Users,     label: "Danışman Devam Görüntüsü", desc: "Aylık devam geçmişi"    },
          { href: "/estate/dashboard/attendance/leaves",        icon: FileText,  label: "İzin Yönetimi",             desc: "Talep onaylama ve takip"  },
        ].map(({ href, icon: Icon, label, desc }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-black truncate">{label}</p>
              <p className="text-xs text-black">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-black shrink-0 ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
}
