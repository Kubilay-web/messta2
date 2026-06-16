import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllVisits } from "../../../actions/visits";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import VisitTable from "./VisitTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Mülk Gezileri - EstatePro" };

export default async function VisitsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const visits = await getAllVisits(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Mülk Gezileri"
        linkTitle="Yeni Gezi"
        href="/estate/dashboard/visits/new"
        data={visits}
        model="visit"
        showImport={false}
      />
      <VisitTable visits={visits as any[]} />
    </div>
  );
}
