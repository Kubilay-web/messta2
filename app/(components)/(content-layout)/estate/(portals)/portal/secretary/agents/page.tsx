import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgents } from "../../../../actions/agents";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import SecretaryAgentsTable from "./SecretaryAgentsTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Danışmanlar - Sekreter Portalı" };

export default async function SecretaryAgentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const agents = (await getAllAgents(agency?.id ?? "")) || [];

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Danışmanlar"
        linkTitle="Yeni Danışman"
        href="/estate/portal/secretary/agents/new"
        data={agents}
        model="agent"
        showImport={false}
      />
      <SecretaryAgentsTable agents={agents as any[]} />
    </div>
  );
}
