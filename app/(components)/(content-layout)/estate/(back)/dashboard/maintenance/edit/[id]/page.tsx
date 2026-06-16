import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAgencyProperties } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { getMaintenanceById } from "../../../../../actions/maintenance";
import { Card, CardContent } from "../../../../../components/ui/card";
import MaintenanceForm from "../../../../../components/dashboard/forms/maintenance/maintenance-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Talebi Düzenle - EstatePro" };

export default async function EditMaintenancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const req = await getMaintenanceById(id);
  if (!req) notFound();

  const [properties, agents, clients] = await Promise.all([
    getAgencyProperties(agencyId),
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <MaintenanceForm properties={properties as any[]} agents={agents as any[]} clients={clients as any[]} agencyId={agencyId} editingId={id} initialData={req} />
        </CardContent>
      </Card>
    </div>
  );
}
