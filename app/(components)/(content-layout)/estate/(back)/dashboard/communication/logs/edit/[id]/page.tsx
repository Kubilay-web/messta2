import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getAllAgents } from "../../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../../actions/clients";
import { getAllListings } from "../../../../../../actions/listings";
import { getCommLogById } from "../../../../../../actions/communication-logs";
import { Card, CardContent } from "../../../../../../components/ui/card";
import CommLogForm from "../../../../../../components/dashboard/forms/communication-logs/comm-log-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Kaydı Düzenle - EstatePro" };

export default async function EditCommLogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const log = await getCommLogById(id);
  if (!log) notFound();

  const [agents, clients, listings] = await Promise.all([
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
    getAllListings(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <CommLogForm agents={agents as any[]} clients={clients as any[]} listings={listings as any[]} agencyId={agencyId} editingId={id} initialData={log} />
        </CardContent>
      </Card>
    </div>
  );
}
