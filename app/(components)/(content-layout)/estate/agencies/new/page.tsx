import { validateRequest } from "@/app/auth";
import { redirect }        from "next/navigation";
import AgencyOnboardingForm from "../../components/dashboard/forms/agency/agency-onboarding-form";
import { Card, CardContent } from "../../components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni Ofis Ekle - EstatePro" };

export default async function NewAgencyPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Yeni Ofis Ekle</h1>
          <p className="mt-2 text-gray-500">
            Emlak ofisini sisteme kaydedin ve yönetim paneline erişin.
          </p>
        </div>
        <Card className="border-t-4 border-blue-600 shadow-lg">
          <CardContent className="p-6">
            <AgencyOnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
