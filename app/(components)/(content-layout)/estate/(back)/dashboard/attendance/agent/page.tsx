import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getBriefAgents } from "../../../../actions/agent-attendance";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AgentView from "./components/AgentView";

export const metadata: Metadata = { title: "Danışman Devam Görüntüsü - EstatePro" };

export default async function AgentAttendancePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const agents = await getBriefAgents(agency?.id ?? "");

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Danışman Devam Görüntüsü</h1>
        <p className="text-sm text-black mt-1">
          Danışman ve ay seçerek aylık devam geçmişini görüntüleyin.
        </p>
      </div>
      <AgentView agents={agents} />
    </div>
  );
}
