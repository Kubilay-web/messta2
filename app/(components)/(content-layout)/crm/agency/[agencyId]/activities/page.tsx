import { CalendarClock } from "lucide-react";
import { getUpcomingActivities } from "../../../actions/activities";
import { requireAgencyAccess } from "../../../lib/auth";
import { Card, CardContent } from "../../../components/ui";
import { AgendaItem } from "../../../components/activities/agenda-item";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const activities = await getUpcomingActivities(agencyId, 50);

  const now = new Date();
  const overdue = activities.filter((a) => a.dueAt && new Date(a.dueAt) < now);
  const upcoming = activities.filter((a) => a.dueAt && new Date(a.dueAt) >= now);

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1100px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ajanda</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Planlanmış çağrı, toplantı ve hatırlatmalar
        </p>
      </div>

      {activities.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center text-muted-foreground">
            <CalendarClock className="size-10 mx-auto mb-3 opacity-40" />
            Planlanmış aktivite bulunmuyor.
          </CardContent>
        </Card>
      ) : (
        <>
          {overdue.length > 0 && (
            <Section title="Gecikenler" agencyId={agencyId} items={overdue} overdue />
          )}
          {upcoming.length > 0 && (
            <Section title="Yaklaşanlar" agencyId={agencyId} items={upcoming} />
          )}
        </>
      )}
    </div>
  );
}

function Section({
  title,
  items,
  agencyId,
  overdue,
}: {
  title: string;
  items: any[];
  agencyId: string;
  overdue?: boolean;
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground px-1">{title}</h2>
      <Card>
        <CardContent className="p-0 divide-y">
          {items.map((a) => (
            <AgendaItem key={a.id} agencyId={agencyId} item={a} overdue={overdue} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
