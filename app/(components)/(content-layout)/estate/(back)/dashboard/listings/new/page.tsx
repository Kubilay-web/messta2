import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import {
  getAgencyProperties,
  generateListingNo,
} from "../../../../actions/listings";
import { getAllAgents } from "../../../../actions/agents";
import { Card, CardContent } from "../../../../components/ui/card";
import ListingForm from "../../../../components/dashboard/forms/listings/listing-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni İlan - EstatePro" };

export default async function NewListingPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [properties, agents, listingNo] = await Promise.all([
    getAgencyProperties(agencyId),
    getAllAgents(agencyId),
    generateListingNo(agencyId),
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ListingForm
            agencyId={agencyId}
            agentName={user.username ?? ""}
            listingNo={listingNo}
            properties={properties as any[]}
            agents={agents as any[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
