import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAvailableUsers } from "../../../../actions/agency-users";
import { Card, CardContent } from "../../../../components/ui/card";
import AgencyStaffForm from "../../../../components/dashboard/forms/users/agency-staff-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Kullanıcı Rol Ata - EstatePro" };

export default async function NewUserPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency           = await AgencyUser(user.id);
  const availableUsers   = await getAvailableUsers();

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <AgencyStaffForm
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
            availableUsers={availableUsers as any[]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
