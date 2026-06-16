import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { getAllListings } from "../../../../../actions/listings";
import { Card, CardContent } from "../../../../../components/ui/card";
import CommLogForm from "../../../../../components/dashboard/forms/communication-logs/comm-log-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni İletişim Kaydı - EstatePro" };

export default async function NewCommLogPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [agents, clients, listings] = await Promise.all([
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
    getAllListings(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <CommLogForm agents={agents as any[]} clients={clients as any[]} listings={listings as any[]} agencyId={agencyId} />
        </CardContent>
      </Card>
    </div>
  );
}
