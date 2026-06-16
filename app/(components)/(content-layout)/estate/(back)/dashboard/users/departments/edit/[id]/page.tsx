import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getAgencyDepartmentById } from "../../../../../../actions/agencyDepartments";
import { getAllAgents } from "../../../../../../actions/agents";
import { Card, CardContent } from "../../../../../../components/ui/card";
import DepartmentForm from "../../../../../../components/dashboard/forms/departments/department-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Departmanı Düzenle - EstatePro" };

export default async function EditDepartmentPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);

  const [dept, agents] = await Promise.all([
    getAgencyDepartmentById(params.id),
    getAllAgents(agency?.id ?? ""),
  ]);

  if (!dept) notFound();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <DepartmentForm
            agencyId={agency?.id ?? ""}
            editingId={params.id}
            initialData={dept as any}
            agents={agents as any[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
