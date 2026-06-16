import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllAgents } from "../../../actions/agents";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import AgentTable from "./AgentTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Danışmanlar - EstatePro" };

export default async function AgentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const agents = await getAllAgents(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Danışmanlar"
        linkTitle="Yeni Danışman"
        href="/estate/dashboard/agents/new"
        data={agents}
        model="agent"
      />
      <AgentTable agents={agents as any[]} />
    </div>
  );
}
