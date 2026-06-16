import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllContractPayments } from "../../../actions/contract-payments";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import PaymentTable from "./PaymentTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ödeme Planları - EstatePro" };

export default async function PaymentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const payments = await getAllContractPayments(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Ödeme Planları"
        linkTitle="Yeni Ödeme"
        href="/estate/dashboard/payments/new"
        data={payments}
        model="payment"
        showImport={false}
      />
      <PaymentTable payments={payments as any[]} />
    </div>
  );
}
