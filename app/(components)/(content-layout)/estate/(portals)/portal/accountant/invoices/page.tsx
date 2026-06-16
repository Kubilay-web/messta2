import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgencyInvoices } from "../../../../actions/invoices2";
import InvoiceTable from "../../../../(back)/dashboard/finance/invoices/InvoiceTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Faturalar - Muhasebe Portalı" };

export default async function AccountantInvoicesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const invoices = await getAllAgencyInvoices(agency.id);

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Faturalar</h1>
        <p className="text-sm text-black mt-1">Komisyon, kira ve hizmet faturaları.</p>
      </div>
      <InvoiceTable invoices={invoices as any[]} />
    </div>
  );
}
