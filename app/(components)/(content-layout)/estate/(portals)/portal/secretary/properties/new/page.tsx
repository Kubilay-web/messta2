import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import { AgencyUser } from "../../../../../actions/auth";
import { Card, CardContent } from "../../../../../components/ui/card";
import PropertyForm from "../../../../../components/dashboard/forms/properties/property-form";

export default async function NewPropertyPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <PropertyForm agencyId={agency?.id ?? ""} agencyName={agency?.name ?? ""} />
        </CardContent>
      </Card>
    </div>
  );
}
