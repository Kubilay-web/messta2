import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllPropertyClients } from "../../../../actions/clients";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import SecretaryClientsTable from "./SecretaryClientsTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Müşteriler - Sekreter Portalı" };

export default async function SecretaryClientsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency  = await AgencyUser(user.id);
  const clients = await getAllPropertyClients(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Müşteriler"
        linkTitle="Yeni Müşteri"
        href="/estate/dashboard/users/clients/new"
        data={clients}
        model="client"
        showImport={false}
      />
      <SecretaryClientsTable clients={clients as any[]} />
    </div>
  );
}
