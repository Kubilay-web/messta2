import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgencyInvoices } from "../../../../actions/invoices2";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import InvoiceTable from "./InvoiceTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Faturalar - EstatePro" };

export default async function InvoicesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const invoices = await getAllAgencyInvoices(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Faturalar"
        linkTitle="Yeni Fatura"
        href="/estate/dashboard/finance/invoices/new"
        data={invoices}
        model="invoice"
        showImport={false}
      />
      <InvoiceTable invoices={invoices as any[]} />
    </div>
  );
}
