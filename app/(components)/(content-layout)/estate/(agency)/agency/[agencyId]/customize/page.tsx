import { getAgencyById } from "../../../../actions/agencies";
import { getAllAgencySections, getAgencyRecentActivities } from "../../../../actions/agency-site";
import AgencyWelcomeSection from "../../../../components/agency/AgencyWelcomeSection";
import { notFound } from "next/navigation";

export default async function AgencyCustomizePage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  const agency = await getAgencyById(agencyId);
  if (!agency) return notFound();

  const [activities, allSections] = await Promise.all([
    getAgencyRecentActivities(agencyId),
    getAllAgencySections(agencyId),
  ]);

  const incompleteSections = allSections
    .filter((s) => s.isComplete === false)
    .slice(0, 4);

  return (
    <AgencyWelcomeSection
      agency={agency as any}
      activities={activities as any[]}
      incompleteSections={incompleteSections as any[]}
      allSections={allSections as any[]}
    />
  );
}
