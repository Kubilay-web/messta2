import { getDocuments, getImages, getUpdates } from "../../../../../actions/media";
import { requireAgencyAccess, getProjectUser, isProjectAdmin } from "../../../../../lib/auth";
import { MediaPanel } from "../../../../../components/media-panel";

export const dynamic = "force-dynamic";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const [images, documents, updates, user] = await Promise.all([
    getImages(projectId),
    getDocuments(projectId),
    getUpdates(projectId),
    getProjectUser(),
  ]);

  return (
    <MediaPanel
      agencyId={agencyId}
      projectId={projectId}
      images={images}
      documents={documents}
      updates={updates}
      canManage={isProjectAdmin(user?.role)}
    />
  );
}
