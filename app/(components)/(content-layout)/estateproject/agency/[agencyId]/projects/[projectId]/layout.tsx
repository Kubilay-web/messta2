import { notFound } from "next/navigation";
import { getProject } from "../../../../actions/projects";
import { requireAgencyAccess, getProjectUser, isProjectAdmin } from "../../../../lib/auth";
import { ProjectHeader } from "../../../../components/project-header";
import { ProjectSubnav } from "../../../../components/project-subnav";

export const dynamic = "force-dynamic";

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const [result, user] = await Promise.all([getProject(projectId), getProjectUser()]);
  if (!result || result.project.agencyId !== agencyId) return notFound();

  const p = result.project;
  const project = {
    ...p,
    startDate: p.startDate?.toISOString() ?? null,
    estimatedEndDate: p.estimatedEndDate?.toISOString() ?? null,
    actualEndDate: p.actualEndDate?.toISOString() ?? null,
    deliveryDate: p.deliveryDate?.toISOString() ?? null,
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-4">
      <ProjectHeader agencyId={agencyId} project={project} canManage={isProjectAdmin(user?.role)} />
      <ProjectSubnav agencyId={agencyId} projectId={projectId} />
      {children}
    </div>
  );
}
