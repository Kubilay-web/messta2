import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAgencyAnalytics } from "../../../actions/analytics";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AnalyticsDashboard from "./AnalyticsDashboard";

export const metadata: Metadata = { title: "Analitik & Raporlar - EstatePro" };

export default async function AnalyticsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency    = await AgencyUser(user.id);
  const agencyId  = agency?.id ?? "";

  const analytics = await getAgencyAnalytics(agencyId);

  return (
    <div className="w-full p-2 sm:p-4 space-y-6">
      <div className="border-b border-gray-200 pb-3">
        <h1 className="text-xl sm:text-2xl font-bold text-black">Analitik & Raporlar</h1>
        <p className="text-sm text-black mt-1">Ajans performans özeti</p>
      </div>
      <AnalyticsDashboard data={analytics} />
    </div>
  );
}
