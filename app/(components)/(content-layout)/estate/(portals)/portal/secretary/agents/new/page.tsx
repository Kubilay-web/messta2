import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAgencyDepartments, getAvailableUsersForAgent } from "../../../../../actions/agents";
import AssignAgentForm from "../../../../../components/dashboard/forms/agents/assign-agent-form";
import { redirect } from "next/navigation";
import { Card, CardContent } from "../../../../../components/ui/card";

export default async function NewAgentPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);

  const [users, departments] = await Promise.all([
    getAvailableUsersForAgent(),
    getAgencyDepartments(agency?.id ?? ""),
  ]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <Card className="border-t-4 border-indigo-600 shadow">
        <CardContent className="p-6">
          <AssignAgentForm
            users={users as any[]}
            departments={departments}
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}
