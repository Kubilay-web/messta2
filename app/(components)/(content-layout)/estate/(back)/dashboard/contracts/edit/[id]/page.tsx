import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import {
  getContractById,
} from "../../../../../actions/contracts";
import { getAgencyProperties, getAllListings } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { Card, CardContent } from "../../../../../components/ui/card";
import ContractForm from "../../../../../components/dashboard/forms/contracts/contract-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sözleşmeyi Düzenle - EstatePro" };

export default async function EditContractPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [contract, properties, listings, agents, clients] = await Promise.all([
    getContractById(params.id),
    getAgencyProperties(agencyId),
    getAllListings(agencyId),
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
  ]);

  if (!contract) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ContractForm
            agencyId={agencyId}
            contractNo={contract.contractNo}
            properties={properties as any[]}
            listings={listings as any[]}
            agents={agents as any[]}
            clients={clients as any[]}
            editingId={params.id}
            initialData={contract as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
