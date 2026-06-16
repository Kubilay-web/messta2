import { notFound } from "next/navigation";
import { getProject } from "../../../../../actions/projects";
import { getBlocks } from "../../../../../actions/blocks";
import { getUnitsByProject } from "../../../../../actions/units";
import { getSaleOptions } from "../../../../../actions/sales";
import { requireAgencyAccess, getProjectUser, isProjectAdmin, canManageSales } from "../../../../../lib/auth";
import { UnitsBoard } from "../../../../../components/units-board";

export const dynamic = "force-dynamic";

export default async function UnitsPage({
  params,
}: {
  params: Promise<{ agencyId: string; projectId: string }>;
}) {
  const { agencyId, projectId } = await params;
  await requireAgencyAccess(agencyId);

  const result = await getProject(projectId);
  if (!result || result.project.agencyId !== agencyId) return notFound();

  const [rawUnits, blocks, saleOptions, user] = await Promise.all([
    getUnitsByProject(projectId),
    getBlocks(projectId),
    getSaleOptions(agencyId),
    getProjectUser(),
  ]);

  const units = rawUnits.map((u) => ({
    id: u.id,
    unitNo: u.unitNo,
    type: u.type,
    status: u.status,
    floor: u.floor,
    roomCount: u.roomCount,
    grossArea: u.grossArea,
    netArea: u.netArea,
    balconyArea: u.balconyArea,
    facing: u.facing,
    listPrice: u.listPrice,
    currency: u.currency,
    description: u.description,
    blockId: u.blockId,
    block: u.block,
    sale: u.sales[0]
      ? {
          id: u.sales[0].id,
          status: u.sales[0].status,
          salePrice: u.sales[0].salePrice,
          currency: u.sales[0].currency,
          downPayment: u.sales[0].downPayment,
          clientName: u.sales[0].clientName,
          agentName: u.sales[0].agentName,
        }
      : null,
  }));

  const blockOptions = blocks.map((b) => ({ id: b.id, name: b.name }));

  return (
    <UnitsBoard
      agencyId={agencyId}
      projectId={projectId}
      units={units}
      blocks={blockOptions}
      saleOptions={saleOptions}
      canManage={isProjectAdmin(user?.role)}
      canSell={canManageSales(user?.role)}
    />
  );
}
