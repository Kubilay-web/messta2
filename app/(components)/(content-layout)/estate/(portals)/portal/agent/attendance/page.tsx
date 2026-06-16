import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentAttendanceSelf } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { CalendarCheck, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Devam Takibi - Danışman Portalı" };

const statusLabel: Record<string, string> = {
  PRESENT:   "Mevcut",
  ABSENT:    "Yok",
  LATE:      "Geç Geldi",
  ON_LEAVE:  "İzinli",
  REMOTE:    "Uzaktan",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PRESENT:  "default",
  ABSENT:   "destructive",
  LATE:     "outline",
  ON_LEAVE: "secondary",
  REMOTE:   "secondary",
};
const statusColor: Record<string, string> = {
  PRESENT:  "bg-green-50 text-green-700",
  ABSENT:   "bg-red-50 text-red-700",
  LATE:     "bg-amber-50 text-amber-700",
  ON_LEAVE: "bg-blue-50 text-blue-700",
  REMOTE:   "bg-purple-50 text-purple-700",
};

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}
function fmtTime(d: Date | string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default async function AgentAttendancePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const records = agent ? await getAgentAttendanceSelf(agent.id) : [];

  const counts = records.reduce(
    (acc, r) => {
      acc[r.status] = (acc[r.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const kpis = [
    { label: "Mevcut",   value: counts["PRESENT"]  ?? 0, color: "text-green-600"  },
    { label: "Yok",      value: counts["ABSENT"]   ?? 0, color: "text-red-600"    },
    { label: "Geç",      value: counts["LATE"]     ?? 0, color: "text-amber-600"  },
    { label: "İzinli",   value: counts["ON_LEAVE"] ?? 0, color: "text-blue-600"   },
    { label: "Uzaktan",  value: counts["REMOTE"]   ?? 0, color: "text-purple-600" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Devam Takibi</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Son 30 günlük devam kayıtlarınız.
        </p>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {kpis.map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-3 text-center">
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kayıt Listesi */}
      {records.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">
          Son 30 gün içinde devam kaydı bulunmuyor.
        </div>
      ) : (
        <div className="space-y-2">
          {records.map((r) => (
            <Card key={r.id} className="overflow-hidden">
              <CardContent className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${statusColor[r.status] ?? "bg-gray-50 text-gray-700"}`}>
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{fmtDate(r.date)}</p>
                    {r.note && (
                      <p className="text-xs text-muted-foreground italic">{r.note}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pl-12 sm:pl-0">
                  <Badge variant={statusVariant[r.status] ?? "outline"} className="text-xs">
                    {statusLabel[r.status] ?? r.status}
                  </Badge>
                  {(r.checkIn || r.checkOut) && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" />
                      {fmtTime(r.checkIn)} – {fmtTime(r.checkOut)}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-right">{records.length} kayıt</p>
    </div>
  );
}
