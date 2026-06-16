import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { getCrmAgents } from "../../../actions/agents";
import { requireReportAccess } from "../../../lib/auth";
import {
  Card,
  CardContent,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
} from "../../../components/ui";
import { formatCompact, formatCurrency, initials } from "../../../lib/labels";

export const dynamic = "force-dynamic";

export default async function AgentsPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireReportAccess(agencyId);
  const agents = await getCrmAgents(agencyId);

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1500px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Danışmanlar</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {agents.filter((a) => a.isActive).length} aktif danışman
        </p>
      </div>

      {agents.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            Bu ofiste danışman bulunmuyor.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <Card key={a.id} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    {a.imageUrl && <AvatarImage src={a.imageUrl} alt={a.name} />}
                    <AvatarFallback>{initials(a.name)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.designation || a.departmentName}
                    </p>
                  </div>
                  {a.isActive ? (
                    <Badge variant="secondary" className="gap-1 shrink-0">
                      <CheckCircle2 className="size-3" /> Aktif
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1 shrink-0 text-muted-foreground">
                      <XCircle className="size-3" /> Pasif
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                  <Stat label="Atanan" value={a.assigned} />
                  <Stat label="Kazanılan" value={a.won} accent="text-emerald-600" />
                  <Stat label="Dönüşüm" value={`%${a.winRate}`} />
                </div>

                <div className="mt-3 pt-3 border-t space-y-1.5 text-sm">
                  <Row label="Kazanılan ciro" value={formatCompact(a.wonValue)} />
                  <Row
                    label={`Komisyon (%${a.commissionRate})`}
                    value={formatCurrency(a.estimatedCommission)}
                  />
                  <Row label="Açık görev" value={String(a.openTasks)} />
                </div>

                <Button asChild variant="ghost" size="sm" className="w-full mt-3">
                  <Link href={`/crm/agency/${agencyId}/agents/${a.id}`}>
                    Detay <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: string }) {
  return (
    <div className="rounded-lg bg-muted/50 py-2">
      <p className={`text-lg font-bold ${accent ?? ""}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
