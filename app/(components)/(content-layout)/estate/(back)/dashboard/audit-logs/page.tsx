import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAuditLogs, getAuditEntities, AuditActionType } from "../../../actions/audit";
import AuditView from "./AuditView";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Denetim Kayıtları - EstatePro" };

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string; action?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";
  const params   = await searchParams;

  const [logs, entities] = await Promise.all([
    getAuditLogs(agencyId, { entity: params?.entity, action: params?.action as AuditActionType | undefined }),
    getAuditEntities(agencyId),
  ]);

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <div className="border-b border-gray-200 pb-3">
        <h1 className="text-xl sm:text-2xl font-bold text-black">Denetim Kayıtları (Audit Trail)</h1>
        <p className="text-sm text-black mt-1">Kim, ne zaman, neyi değiştirdi — kayıt bazlı geçmiş.</p>
      </div>
      <AuditView logs={logs as any[]} entities={entities} entity={params?.entity} action={params?.action} />
    </div>
  );
}
