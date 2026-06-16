import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAvailableUsersForAgent, getAgencyDepartments } from "../../../../actions/agents";
import { Card, CardContent } from "../../../../components/ui/card";
import AssignAgentForm from "../../../../components/dashboard/forms/agents/assign-agent-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Danışman Ata - EstatePro" };

export default async function NewAgentPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);

  const [users, departments] = await Promise.all([
    getAvailableUsersForAgent(),
    getAgencyDepartments(agency?.id ?? ""),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <AssignAgentForm
            users={users as any[]}
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
            departments={departments}
          />
        </CardContent>
      </Card>
    </div>
  );
}
