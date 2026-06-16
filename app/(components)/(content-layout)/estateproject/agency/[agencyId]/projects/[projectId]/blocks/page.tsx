import { getBlocks } from "../../../../../actions/blocks";
import { requireAgencyAccess, getProjectUser, isProjectAdmin } from "../../../../../lib/auth";
import { BlocksGrid } from "../../../../../components/blocks-grid";

export const dynamic = "force-dynamic";

export default async function BlocksPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const [blocks, user] = await Promise.all([getBlocks(projectId), getProjectUser()]);

  const blockData = blocks.map((b) => ({
    id: b.id,
    name: b.name,
    code: b.code,
    floors: b.floors,
    unitsPerFloor: b.unitsPerFloor,
    progress: b.progress,
    description: b.description,
    _count: b._count,
  }));

  return <BlocksGrid agencyId={agencyId} projectId={projectId} blocks={blockData} canManage={isProjectAdmin(user?.role)} />;
}
