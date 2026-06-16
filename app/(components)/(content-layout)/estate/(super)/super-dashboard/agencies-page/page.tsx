import { getAllAgencies } from "../../../actions/agencies";
import AgencyTable from "../../../components/super-admin-dasboard/agency-table";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ofisler - Süper Panel" };

export default async function AgenciesPage() {
  const agencies = await getAllAgencies();

  return <AgencyTable agencies={agencies as any[]} />;
}
