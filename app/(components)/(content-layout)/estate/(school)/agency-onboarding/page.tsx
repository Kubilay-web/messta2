import { validateRequest } from "@/app/auth";
import AgencyOnboardingForm from "../../components/dashboard/forms/agency/agency-onboarding-form";
import { Card, CardContent } from "../../components/ui/card";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ofis Kaydı - EstatePro",
  description: "Emlak ofisinizi EstatePro sistemine kaydedin ve yönetim paneline erişin.",
};

export default async function AgencyOnboardingPage() {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  // Yalnızca SUPER_ADMIN ofis oluşturabilir
  // if (user.roleGayrimenkul !== "SUPER_ADMIN") {
  //   redirect("/estate/dashboard");
  // }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Ofis Kaydı</h1>
          <p className="mt-2 text-gray-500">
            Birkaç dakika içinde ofisinizi sisteme tanıtın ve yönetim panelinize
            erişin.
          </p>
        </div>
        <Card className="border-t-4 border-blue-600 shadow-lg">
          <CardContent className="p-4">
            <AgencyOnboardingForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
