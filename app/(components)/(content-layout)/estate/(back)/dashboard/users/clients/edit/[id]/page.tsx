import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../../actions/auth";
import { getPropertyClientById } from "../../../../../../actions/clients";
import { Card, CardContent } from "../../../../../../components/ui/card";
import ClientForm from "../../../../../../components/dashboard/forms/users/client-form";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Müşteriyi Düzenle - EstatePro",
};

export default async function EditClientPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const [agency, client] = await Promise.all([
    AgencyUser(user.id),
    getPropertyClientById(params.id),
  ]);

  if (!client) notFound();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ClientForm
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
            editingId={params.id}
            initialData={client as any}
          />
        </CardContent>
      </Card>
    </div>
  );
}
