import { getPhases, getMilestones, getProjectTasks } from "../../../../../actions/construction";
import { requireAgencyAccess, getProjectUser, isProjectAdmin } from "../../../../../lib/auth";
import { ConstructionPanel } from "../../../../../components/construction-panel";

export const dynamic = "force-dynamic";

export default async function ConstructionPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const [phases, milestones, tasks, user] = await Promise.all([
    getPhases(projectId),
    getMilestones(projectId),
    getProjectTasks(projectId),
    getProjectUser(),
  ]);

  return (
    <ConstructionPanel
      agencyId={agencyId}
      projectId={projectId}
      phases={phases}
      tasks={tasks}
      milestones={milestones}
      canManage={isProjectAdmin(user?.role)}
    />
  );
}
