import { getAllLeads, getLeadFormOptions } from "../../../actions/leads";
import { getPipelines } from "../../../actions/pipelines";
import { requireAgencyAccess } from "../../../lib/auth";
import { LeadsFilter } from "../../../components/lead/leads-filter";
import { NewLeadButton } from "../../../components/lead/new-lead-button";
import { LeadsTable } from "../../../components/lead/leads-table";

export const dynamic = "force-dynamic";

export default async function LeadsListPage({
  params,
  searchParams,
}: {
  params: Promise<{ agencyId: string }>;
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);
  const { status, q } = await searchParams;

  const [leads, pipelines, options] = await Promise.all([
    getAllLeads(agencyId, { status: status as any, q }),
    getPipelines(agencyId),
    getLeadFormOptions(agencyId),
  ]);

  const defaultPipelineId =
    (pipelines.find((p) => p.isDefault) ?? pipelines[0])?.id ?? "";

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-[1500px] mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fırsatlar</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{leads.length} kayıt</p>
        </div>
        <NewLeadButton agencyId={agencyId} pipelineId={defaultPipelineId} options={options} />
      </div>

      <LeadsFilter agencyId={agencyId} status={status} q={q} />

      <LeadsTable
        agencyId={agencyId}
        leads={leads as any[]}
        agents={options.agents as any[]}
        pipelines={pipelines as any[]}
      />
    </div>
  );
}
