import { getPipelines } from "../../../../actions/pipelines";
import { requireCrmAdmin } from "../../../../lib/auth";
import { PipelinesManager } from "../../../../components/settings/pipelines-manager";

export const dynamic = "force-dynamic";

export default async function PipelineSettingsPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireCrmAdmin(agencyId);
  const pipelines = await getPipelines(agencyId);

  const data = pipelines.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    color: p.color,
    isDefault: p.isDefault,
    stages: p.stages.map((s) => ({
      id: s.id,
      name: s.name,
      color: s.color,
      probability: s.probability,
      isWon: s.isWon,
      isLost: s.isLost,
    })),
    _count: p._count,
  }));

  return (
    <div className="p-4 sm:p-6 max-w-[1400px] mx-auto">
      <PipelinesManager agencyId={agencyId} pipelines={data} />
    </div>
  );
}
