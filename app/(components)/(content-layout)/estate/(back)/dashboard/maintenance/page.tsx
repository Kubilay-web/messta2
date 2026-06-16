import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllMaintenance } from "../../../actions/maintenance";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import MaintenanceTable from "./MaintenanceTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bakım Talepleri - EstatePro" };

export default async function MaintenancePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const requests = await getAllMaintenance(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Bakım / Arıza Talepleri"
        linkTitle="Yeni Talep"
        href="/estate/dashboard/maintenance/new"
        data={requests}
        model="maintenance"
        showImport={false}
      />
      <MaintenanceTable requests={requests as any[]} />
    </div>
  );
}
