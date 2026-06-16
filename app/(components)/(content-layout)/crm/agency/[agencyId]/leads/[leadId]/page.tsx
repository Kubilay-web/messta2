import { notFound } from "next/navigation";
import { getLead, getLeadFormOptions } from "../../../../actions/leads";
import { getMatchingListings } from "../../../../actions/matching";
import { requireAgencyAccess, getScopedAgentId } from "../../../../lib/auth";
import { LeadDetail } from "../../../../components/lead/lead-detail";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ agencyId: string; leadId: string }>;
}) {
  const { agencyId, leadId } = await params;
  await requireAgencyAccess(agencyId);

  const [lead, options, matches] = await Promise.all([
    getLead(leadId),
    getLeadFormOptions(agencyId),
    getMatchingListings(leadId),
  ]);

  if (!lead || lead.agencyId !== agencyId) return notFound();

  // AGENT yalnızca kendine atanan fırsatı açabilir
  const scopedAgentId = await getScopedAgentId();
  if (scopedAgentId && lead.agentId !== scopedAgentId) return notFound();

  // Düzenleme formunun beklediği alanlar string (date) olmalı
  const serialized = {
    ...lead,
    expectedCloseDate: lead.expectedCloseDate ? lead.expectedCloseDate.toISOString() : null,
    lastActivityAt: lead.lastActivityAt.toISOString(),
  };

  return <LeadDetail agencyId={agencyId} lead={serialized} options={options} matches={matches} />;
}
