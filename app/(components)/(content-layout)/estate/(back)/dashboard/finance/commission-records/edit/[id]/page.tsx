import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getAllContracts } from "../../../../../../actions/contracts";
import { getAllAgents } from "../../../../../../actions/agents";
import { getCommissionById } from "../../../../../../actions/commission-records";
import { Card, CardContent } from "../../../../../../components/ui/card";
import CommissionForm from "../../../../../../components/dashboard/forms/commission-records/commission-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Komisyonu Düzenle - EstatePro" };

export default async function EditCommissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const commission = await getCommissionById(id);
  if (!commission) notFound();

  const [contracts, agents] = await Promise.all([
    getAllContracts(agencyId),
    getAllAgents(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <CommissionForm contracts={contracts as any[]} agents={agents as any[]} agencyId={agencyId} editingId={id} initialData={commission} />
        </CardContent>
      </Card>
    </div>
  );
}
