import Link from "next/link";
import { getCrmClients, deleteCrmClient } from "../../../actions/clients";
import { requireAgencyAccess, isCrmAdmin } from "../../../lib/auth";
import { ClientsFilter } from "../../../components/client/clients-filter";
import { ClientCreateButton } from "../../../components/client/client-create-button";
import { RowDelete } from "../../../components/row-delete";
import { Card, CardContent, Avatar, AvatarFallback, AvatarImage } from "../../../components/ui";
import { formatCompact, initials } from "../../../lib/labels";

export const dynamic = "force-dynamic";

const roleBadges = (c: any) => {
  const r: { label: string; cls: string }[] = [];
  if (c.isBuyer) r.push({ label: "Alıcı", cls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-400" });
  if (c.isSeller) r.push({ label: "Satıcı", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400" });
  if (c.isTenant) r.push({ label: "Kiracı", cls: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400" });
  if (c.isLandlord) r.push({ label: "Mülk Sahibi", cls: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400" });
  return r;
};

export default async function ClientsPage({
  params,
  searchParams,
}: {
  params: Promise<{ agencyId: string }>;
  searchParams: Promise<{ q?: string; role?: string }>;
}) {
  const { agencyId } = await params;
  const user = await requireAgencyAccess(agencyId);
  const { q, role } = await searchParams;
  const canDelete = isCrmAdmin(user.role);

  const clients = await getCrmClients(agencyId, { q, role: role as any });

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1500px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Müşteriler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{clients.length} müşteri</p>
        </div>
        <ClientCreateButton agencyId={agencyId} />
      </div>

      <ClientsFilter agencyId={agencyId} role={role} q={q} />

      {clients.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            Müşteri bulunamadı.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => {
            const name = `${c.firstName} ${c.lastName}`;
            return (
              <Link key={c.id} href={`/crm/agency/${agencyId}/clients/${c.id}`}>
                <Card className="hover:border-primary/40 transition-colors h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-11">
                        {c.imageUrl && <AvatarImage src={c.imageUrl} alt={name} />}
                        <AvatarFallback>{initials(name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate">{name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.phone}</p>
                      </div>
                      {canDelete && (
                        <RowDelete
                          action={deleteCrmClient}
                          id={c.id}
                          message="Bu müşteri ve hesabı silinsin mi?"
                        />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {roleBadges(c).map((b) => (
                        <span key={b.label} className={`text-[10px] px-1.5 py-0.5 rounded-full ${b.cls}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>

                    {(c.minBudget || c.maxBudget) && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Bütçe: {formatCompact(c.minBudget, c.currency)} –{" "}
                        {formatCompact(c.maxBudget, c.currency)}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <span>{c._count.crmLeads} fırsat</span>
                      <span>{c._count.contracts} sözleşme</span>
                      <span>{c._count.visits} gezi</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
