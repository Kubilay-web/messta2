import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAllListings } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { getOfferById } from "../../../../../actions/offers";
import { Card, CardContent } from "../../../../../components/ui/card";
import OfferForm from "../../../../../components/dashboard/forms/offers/offer-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Teklifi Düzenle - EstatePro" };

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const offer = await getOfferById(id);
  if (!offer) notFound();

  const [listings, agents, clients] = await Promise.all([
    getAllListings(agencyId),
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <OfferForm
            listings={listings as any[]}
            agents={agents     as any[]}
            clients={clients   as any[]}
            agencyId={agencyId}
            editingId={id}
            initialData={offer}
          />
        </CardContent>
      </Card>
    </div>
  );
}
