import { notFound } from "next/navigation";
import { getClient360 } from "../../../../actions/clients";
import { requireAgencyAccess, isCrmAdmin } from "../../../../lib/auth";
import { Client360 } from "../../../../components/client/client-360";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ agencyId: string; clientId: string }>;
}) {
  const { agencyId, clientId } = await params;
  const user = await requireAgencyAccess(agencyId);
  const client = await getClient360(clientId);

  if (!client || client.agencyId !== agencyId) return notFound();

  return <Client360 agencyId={agencyId} client={client} canDelete={isCrmAdmin(user.role)} />;
}
