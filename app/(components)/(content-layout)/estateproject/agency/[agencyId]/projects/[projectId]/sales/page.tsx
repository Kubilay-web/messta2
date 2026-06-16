import { getProjectSales } from "../../../../../actions/sales";
import { requireAgencyAccess, getProjectUser, canManageSales } from "../../../../../lib/auth";
import { SalesTable } from "../../../../../components/sales-table";

export const dynamic = "force-dynamic";

export default async function SalesPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const [rawSales, user] = await Promise.all([getProjectSales(projectId), getProjectUser()]);

  const sales = rawSales.map((s) => ({
    id: s.id,
    status: s.status,
    salePrice: s.salePrice,
    currency: s.currency,
    clientName: s.clientName,
    agentName: s.agentName,
    saleDate: s.saleDate?.toISOString() ?? null,
    createdAt: s.createdAt.toISOString(),
    unit: s.unit,
  }));

  return <SalesTable agencyId={agencyId} sales={sales} canSell={canManageSales(user?.role)} />;
}
