import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllCommissionRecords } from "../../../../actions/commission-records";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import CommissionRecordTable from "./CommissionRecordTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Komisyon Kayıtları - EstatePro" };

export default async function CommissionRecordsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency      = await AgencyUser(user.id);
  const commissions = await getAllCommissionRecords(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Komisyon Kayıtları"
        linkTitle="Yeni Komisyon"
        href="/estate/dashboard/finance/commission-records/new"
        data={commissions}
        model="commission"
        showImport={false}
      />
      <CommissionRecordTable commissions={commissions as any[]} />
    </div>
  );
}
