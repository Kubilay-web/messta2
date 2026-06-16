import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAgentById, getAgencyDepartments } from "../../../../../actions/agents";
import { Card, CardContent } from "../../../../../components/ui/card";
import AgentForm from "../../../../../components/dashboard/forms/agents/agent-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Danışmanı Düzenle - EstatePro" };

export default async function EditAgentPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const [agent, departments] = await Promise.all([
    getAgentById(params.id),
    getAgencyDepartments(agency?.id ?? ""),
  ]);

  if (!agent) notFound();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <AgentForm
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
            departments={departments}
            editingId={params.id}
            initialData={agent as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
