import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentContracts } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Building2, User, Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sözleşmelerim - Danışman Portalı" };

const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kira", PRE_SALE: "Ön Satış",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const contractStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline", ACTIVE: "default", COMPLETED: "secondary",
  CANCELLED: "destructive", EXPIRED: "outline",
};

export default async function AgentContractsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const contracts = agent ? await getAgentContracts(agent.id) : [];

  const fmtDate = (d: Date | string | null) =>
    d ? new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) : "—";

  const totalCommission = contracts
    .filter((c) => c.commission != null)
    .reduce((sum, c) => sum + (c.commission ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Sözleşmelerim</h1>
          <p className="text-muted-foreground text-sm mt-1">Sorumlu olduğunuz tüm sözleşmeler.</p>
        </div>
        {totalCommission > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Toplam Komisyon</p>
            <p className="text-xl font-extrabold">{totalCommission.toLocaleString("tr-TR")} TRY</p>
          </div>
        )}
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">
          Henüz sözleşme kaydı bulunmuyor.
        </div>
      ) : (
        <div className="space-y-3">
          {contracts.map((c) => (
            <Card key={c.id} className="overflow-hidden">
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {contractTypeLabel[c.contractType] ?? c.contractType}
                    </Badge>
                    <Badge variant={contractStatusVariant[c.status] ?? "outline"} className="text-xs">
                      {contractStatusLabel[c.status] ?? c.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{c.contractNo}</span>
                </div>

                {c.property && (
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{c.property.title}</p>
                      <p className="text-xs text-muted-foreground">{c.property.city}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span>{c.clientName}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Başlangıç: {fmtDate(c.startDate)}
                  </span>
                  {c.endDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Bitiş: {fmtDate(c.endDate)}
                    </span>
                  )}
                  {c.commission != null && (
                    <span className="font-semibold text-foreground">
                      Komisyon: {c.commission.toLocaleString("tr-TR")} {c.currency}
                    </span>
                  )}
                  {c.salePrice != null && (
                    <span>Satış: {c.salePrice.toLocaleString("tr-TR")} {c.currency}</span>
                  )}
                  {c.rentalPrice != null && (
                    <span>Kira: {c.rentalPrice.toLocaleString("tr-TR")} {c.currency}/ay</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground text-right">{contracts.length} sözleşme</p>
    </div>
  );
}
