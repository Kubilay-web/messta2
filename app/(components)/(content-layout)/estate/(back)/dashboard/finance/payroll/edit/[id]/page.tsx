import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getAllAgents } from "../../../../../../actions/agents";
import { getPayrollById } from "../../../../../../actions/payrolls";
import { Card, CardContent } from "../../../../../../components/ui/card";
import PayrollForm from "../../../../../../components/dashboard/forms/payrolls/payroll-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bordroyu Düzenle - EstatePro" };

export default async function EditPayrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const payroll = await getPayrollById(id);
  if (!payroll) notFound();

  const agents = await getAllAgents(agencyId);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <PayrollForm agents={agents as any[]} agencyId={agencyId} editingId={id} initialData={payroll} />
        </CardContent>
      </Card>
    </div>
  );
}
