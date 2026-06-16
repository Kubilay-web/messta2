import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAvailableUsersForClient } from "../../../../../actions/clients";
import { Card, CardContent } from "../../../../../components/ui/card";
import AssignClientForm from "../../../../../components/dashboard/forms/users/assign-client-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Müşteri Ata - EstatePro",
};

export default async function NewClientPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const [agency, users] = await Promise.all([
    AgencyUser(user.id),
    getAvailableUsersForClient(),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <AssignClientForm
            users={users as any[]}
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}
