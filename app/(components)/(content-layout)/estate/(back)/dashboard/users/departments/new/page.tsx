import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAllAgents } from "../../../../../actions/agents";
import { Card, CardContent } from "../../../../../components/ui/card";
import DepartmentForm from "../../../../../components/dashboard/forms/departments/department-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni Departman - EstatePro" };

export default async function NewDepartmentPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const agents = await getAllAgents(agency?.id ?? "");

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <DepartmentForm
            agencyId={agency?.id ?? ""}
            agents={agents as any[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
