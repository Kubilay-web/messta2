import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllPropertyClients } from "../../../../actions/clients";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import ClientTable from "./ClientTable";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
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
      />
      <ClientTable clients={clients as any[]} />
    </div>
  );
}
