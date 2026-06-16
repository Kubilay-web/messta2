import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getAllPropertyClients } from "../../../../../../actions/clients";
import { getAllContracts } from "../../../../../../actions/contracts";
import { getAgencyInvoiceById } from "../../../../../../actions/invoices2";
import { Card, CardContent } from "../../../../../../components/ui/card";
import Invoice2Form from "../../../../../../components/dashboard/forms/invoices2/invoice2-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Faturayı Düzenle - EstatePro" };

export default async function EditInvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const invoice = await getAgencyInvoiceById(id);
  if (!invoice) notFound();

  const [clients, contracts] = await Promise.all([
    getAllPropertyClients(agencyId),
    getAllContracts(agencyId),
  ]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <Invoice2Form clients={clients as any[]} contracts={contracts as any[]} agencyId={agencyId} editingId={id} initialData={invoice} />
        </CardContent>
      </Card>
    </div>
  );
}
