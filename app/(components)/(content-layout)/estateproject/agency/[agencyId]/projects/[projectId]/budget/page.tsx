import { notFound } from "next/navigation";
import { getProject } from "../../../../../actions/projects";
import { getExpenses, getExpenseSummary, getContractors } from "../../../../../actions/finance";
import { requireAgencyAccess, getProjectUser, isProjectAdmin } from "../../../../../lib/auth";
import { FinancePanel } from "../../../../../components/finance-panel";

export const dynamic = "force-dynamic";

export default async function BudgetPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const result = await getProject(projectId);
  if (!result || result.project.agencyId !== agencyId) return notFound();

  const [expenses, summary, contractors, user] = await Promise.all([
    getExpenses(projectId),
    getExpenseSummary(projectId),
    getContractors(projectId),
    getProjectUser(),
  ]);

  return (
    <FinancePanel
      agencyId={agencyId}
      projectId={projectId}
      budget={result.project.budget}
      currency={result.project.currency}
      summary={summary}
      expenses={expenses}
      contractors={contractors}
      canManage={isProjectAdmin(user?.role)}
    />
  );
}
