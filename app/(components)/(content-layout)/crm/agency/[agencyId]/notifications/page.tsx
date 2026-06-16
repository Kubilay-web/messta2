import { BellRing } from "lucide-react";
import { getSavedSearchMatches } from "../../../actions/notifications";
import { requireAgencyAccess } from "../../../lib/auth";
import { SavedSearchMatches } from "../../../components/notifications/saved-search-matches";
import { Card, CardContent } from "../../../components/ui";

export const dynamic = "force-dynamic";

export default async function NotificationsPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);

  const matches = await getSavedSearchMatches(agencyId);
  const totalNew = matches.reduce((acc, m) => acc + m.count, 0);

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Eşleşme Uyarıları</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Müşterilerin kayıtlı aramalarına uyan {totalNew} yeni ilan
        </p>
      </div>

      {matches.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <BellRing className="size-10 mx-auto mb-3 opacity-40" />
            <p>Yeni eşleşme yok.</p>
            <p className="text-xs mt-1">
              Müşterilerin kayıtlı aramalarına uygun yeni ilan eklendiğinde burada görünür.
            </p>
          </CardContent>
        </Card>
      ) : (
        <SavedSearchMatches agencyId={agencyId} matches={matches} />
      )}
    </div>
  );
}
