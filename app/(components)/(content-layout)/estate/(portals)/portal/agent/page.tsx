import { validateRequest } from "@/app/auth";
import {
  getAgentFromUserId,
  getAgentVisits,
  getAgentListings,
  getAgentContracts,
} from "../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Calendar, Home, ScrollText, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Danışman Portalı - EstatePro" };

const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",     NO_SHOW:   "Gelmedi",
};
const visitStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SCHEDULED: "default", COMPLETED: "secondary",
  CANCELLED: "destructive", NO_SHOW: "outline",
};
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};

export default async function AgentPortalPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const [visits, listings, contracts] = agent
    ? await Promise.all([
        getAgentVisits(agent.id),
        getAgentListings(agent.id),
        getAgentContracts(agent.id),
      ])
    : [[], [], []];

  const upcomingVisits = visits.filter((v) => v.status === "SCHEDULED").slice(0, 5);
  const activeListings = listings.filter((l) => l.status === "ACTIVE");
  const activeContracts = contracts.filter((c) => c.status === "ACTIVE");

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      {/* Karşılama */}
      <div>
        <h1 className="text-2xl font-bold">
          Hoş geldin, {agent?.firstName ?? ""} {agent?.lastName ?? ""}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {agent?.designation ?? role} · {agent?.departmentName ?? ""}
        </p>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Toplam İlan",     value: listings.length,          icon: Home,       color: "text-blue-600"   },
          { label: "Aktif İlan",      value: activeListings.length,    icon: TrendingUp, color: "text-green-600"  },
          { label: "Ziyaret",         value: visits.length,            icon: Calendar,   color: "text-orange-600" },
          { label: "Aktif Sözleşme",  value: activeContracts.length,   icon: ScrollText, color: "text-purple-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <Icon className={`w-6 h-6 shrink-0 ${color}`} />
              <div>
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yaklaşan Ziyaretler */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Yaklaşan Ziyaretler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingVisits.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Planlanmış ziyaret yok.</p>
            ) : (
              <div className="space-y-2">
                {upcomingVisits.map((v) => (
                  <div key={v.id} className="flex items-start justify-between gap-2 rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{v.property?.title ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">{v.property?.city}</p>
                      {v.client && (
                        <p className="text-xs text-muted-foreground">
                          {v.client.firstName} {v.client.lastName}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant={visitStatusVariant[v.status] ?? "outline"} className="text-xs mb-1">
                        {visitStatusLabel[v.status] ?? v.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{fmtDate(v.scheduledAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aktif Sözleşmeler */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ScrollText className="w-4 h-4" /> Aktif Sözleşmeler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeContracts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">Aktif sözleşme yok.</p>
            ) : (
              <div className="space-y-2">
                {activeContracts.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-start justify-between gap-2 rounded-lg border p-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{c.property?.title ?? "—"}</p>
                      <p className="text-xs text-muted-foreground">{c.clientName}</p>
                      <p className="text-xs text-muted-foreground">{c.contractNo}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge variant="secondary" className="text-xs mb-1">
                        {contractTypeLabel[c.contractType] ?? c.contractType}
                      </Badge>
                      {c.commission && (
                        <p className="text-xs font-semibold">
                          {c.commission.toLocaleString("tr-TR")} {c.currency}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
