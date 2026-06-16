import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgentLeaves, getPendingLeaveCount } from "../../../../actions/agent-leaves";
import { getAllAgents } from "../../../../actions/agents";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import LeavesUI from "./LeavesUI";

export const metadata: Metadata = { title: "İzin Yönetimi - EstatePro" };

export default async function LeavesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency  = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [leaves, agents, pendingCount] = await Promise.all([
    getAllAgentLeaves(agencyId),
    getAllAgents(agencyId),
    getPendingLeaveCount(agencyId),
  ]);

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">İzin Yönetimi</h1>
          <p className="text-sm text-black mt-1">
            Danışman izin taleplerini görüntüleyin, onaylayın veya yeni talep oluşturun.
          </p>
        </div>
        {pendingCount > 0 && (
          <span className="shrink-0 rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5">
            {pendingCount} bekliyor
          </span>
        )}
      </div>
      <LeavesUI
        leaves={leaves as any[]}
        agents={agents as any[]}
        currentUserId={user.id}
      />
    </div>
  );
}
