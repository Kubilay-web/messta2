import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllPayrolls } from "../../../../actions/payrolls";
import PayrollTable from "../../../../(back)/dashboard/finance/payroll/PayrollTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bordro - Muhasebe Portalı" };

export default async function AccountantPayrollPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const payrolls = await getAllPayrolls(agency.id);

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Bordro / Maaş</h1>
        <p className="text-sm text-black mt-1">Danışman maaş ve prim bordroları.</p>
      </div>
      <PayrollTable payrolls={payrolls as any[]} />
    </div>
  );
}
