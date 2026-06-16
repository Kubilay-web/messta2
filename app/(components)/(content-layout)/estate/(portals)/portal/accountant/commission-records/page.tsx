import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllCommissionRecords } from "../../../../actions/commission-records";
import CommissionRecordTable from "../../../../(back)/dashboard/finance/commission-records/CommissionRecordTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Komisyon Kayıtları - Muhasebe Portalı" };

export default async function AccountantCommissionRecordsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const commissions = await getAllCommissionRecords(agency.id);

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Komisyon Kayıtları</h1>
        <p className="text-sm text-black mt-1">Taraf bazlı komisyon ve tahsilat durumu.</p>
      </div>
      <CommissionRecordTable commissions={commissions as any[]} />
    </div>
  );
}
