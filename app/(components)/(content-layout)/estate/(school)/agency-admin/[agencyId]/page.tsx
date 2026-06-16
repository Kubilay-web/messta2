import { validateRequest } from "@/app/auth";
import { getAgencyById } from "../../../actions/agencies";
import { getAvailableUsers } from "../../../actions/agency-users";
import AssignAgencyAdminForm from "../../../components/dashboard/forms/agency/assign-agency-admin-form";
import { Card, CardContent } from "../../../components/ui/card";
import { redirect, notFound } from "next/navigation";

export default async function AgencyAdminPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const { agencyId } = await params;
  const [agency, users] = await Promise.all([
    getAgencyById(agencyId),
    getAvailableUsers(),
  ]);
  if (!agency) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-6">
          <AssignAgencyAdminForm
            users={users as any[]}
            agencyId={agency.id}
            agencyName={agency.name}
          />
        </CardContent>
      </Card>
    </div>
  );
}
