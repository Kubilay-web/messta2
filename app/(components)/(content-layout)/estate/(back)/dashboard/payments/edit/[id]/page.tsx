import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getContractPaymentById, getAgencyContracts } from "../../../../../actions/contract-payments";
import { Card, CardContent } from "../../../../../components/ui/card";
import PaymentForm from "../../../../../components/dashboard/forms/payments/payment-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Ödemeyi Düzenle - EstatePro" };

export default async function EditPaymentPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);

  const [payment, contracts] = await Promise.all([
    getContractPaymentById(params.id),
    getAgencyContracts(agency?.id ?? ""),
  ]);

  if (!payment) notFound();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <PaymentForm
            contracts={contracts as any[]}
            editingId={params.id}
            initialData={payment as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
