import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getVisitById } from "../../../../../actions/visits";
import { getAgencyProperties, getAllListings } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { Card, CardContent } from "../../../../../components/ui/card";
import VisitForm from "../../../../../components/dashboard/forms/visits/visit-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Geziyi Düzenle - EstatePro" };

export default async function EditVisitPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [visit, properties, listings, agents, clients] = await Promise.all([
    getVisitById(params.id),
    getAgencyProperties(agencyId),
    getAllListings(agencyId),
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
  ]);

  if (!visit) notFound();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <VisitForm
            properties={properties as any[]}
            listings={listings   as any[]}
            agents={agents       as any[]}
            clients={clients     as any[]}
            editingId={params.id}
            initialData={visit   as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
