import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getListingById, getAgencyProperties } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { Card, CardContent } from "../../../../../components/ui/card";
import ListingForm from "../../../../../components/dashboard/forms/listings/listing-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlanı Düzenle - EstatePro" };

export default async function EditListingPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [listing, properties, agents] = await Promise.all([
    getListingById(params.id),
    getAgencyProperties(agencyId),
    getAllAgents(agencyId),
  ]);

  if (!listing) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ListingForm
            agencyId={agencyId}
            agentName={listing.agentName}
            listingNo={listing.listingNo}
            properties={properties as any[]}
            agents={agents as any[]}
            editingId={params.id}
            initialData={listing as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
