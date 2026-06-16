import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllPayrolls } from "../../../../actions/payrolls";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import PayrollTable from "./PayrollTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bordro - EstatePro" };

export default async function PayrollPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const payrolls = await getAllPayrolls(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Bordro / Maaş"
        linkTitle="Yeni Bordro"
        href="/estate/dashboard/finance/payroll/new"
        data={payrolls}
        model="payroll"
        showImport={false}
      />
      <PayrollTable payrolls={payrolls as any[]} />
    </div>
  );
}
