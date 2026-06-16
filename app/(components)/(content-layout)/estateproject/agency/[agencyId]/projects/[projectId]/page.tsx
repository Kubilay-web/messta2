import { notFound } from "next/navigation";
import { getProject } from "../../../../actions/projects";
import { requireAgencyAccess } from "../../../../lib/auth";
import { ProjectOverview } from "../../../../components/project-overview";

export const dynamic = "force-dynamic";

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const result = await getProject(projectId);
  if (!result || result.project.agencyId !== agencyId) return notFound();

  const p = result.project;
  const project = {
    ...p,
    startDate: p.startDate?.toISOString() ?? null,
    estimatedEndDate: p.estimatedEndDate?.toISOString() ?? null,
    deliveryDate: p.deliveryDate?.toISOString() ?? null,
  };

  return <ProjectOverview project={project} stats={result.stats} />;
}
