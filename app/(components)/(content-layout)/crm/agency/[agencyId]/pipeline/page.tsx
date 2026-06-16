import { getPipelines } from "../../../actions/pipelines";
import { getLeadsByPipeline, getLeadFormOptions } from "../../../actions/leads";
import { requireAgencyAccess } from "../../../lib/auth";
import { PipelineView } from "../../../components/pipeline/pipeline-view";
import type { KanbanLead } from "../../../components/pipeline/types";

export const dynamic = "force-dynamic";

export default async function PipelinePage({
  params,
  searchParams,
}: {
  params: Promise<{ agencyId: string }>;
  searchParams: Promise<{ pipeline?: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const { pipeline: pipelineParam } = await searchParams;

  const pipelines = await getPipelines(agencyId);

  if (pipelines.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Henüz satış hattı yok. Lütfen sayfayı yenileyin.
      </div>
    );
  }

  const active =
    pipelines.find((p) => p.id === pipelineParam) ??
    pipelines.find((p) => p.isDefault) ??
    pipelines[0];

  const [rawLeads, options] = await Promise.all([
    getLeadsByPipeline(active.id),
    getLeadFormOptions(agencyId),
  ]);

  const leads: KanbanLead[] = rawLeads.map((l) => ({
    id: l.id,
    title: l.title,
    contactName: l.contactName,
    contactPhone: l.contactPhone,
    contactEmail: l.contactEmail,
    company: l.company,
    source: l.source,
    status: l.status,
    temperature: l.temperature,
    value: l.value,
    currency: l.currency,
    city: l.city,
    district: l.district,
    listingType: l.listingType,
    propertyType: l.propertyType,
    roomCount: l.roomCount,
    tags: l.tags,
    agentId: l.agentId,
    agentName: l.agentName,
    clientId: l.clientId,
    listingId: l.listingId,
    expectedCloseDate: l.expectedCloseDate ? l.expectedCloseDate.toISOString() : null,
    lastActivityAt: l.lastActivityAt.toISOString(),
    stageId: l.stageId,
    position: l.position,
    _count: l._count,
  }));

  const stages = active.stages.map((s) => ({
    id: s.id,
    name: s.name,
    color: s.color,
    probability: s.probability,
    isWon: s.isWon,
    isLost: s.isLost,
  }));

  return (
    <PipelineView
      agencyId={agencyId}
      pipelines={pipelines.map((p) => ({
        id: p.id,
        name: p.name,
        color: p.color,
        leadCount: p._count.leads,
      }))}
      activePipelineId={active.id}
      stages={stages}
      leads={leads}
      options={options}
    />
  );
}
