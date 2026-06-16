import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../actions/auth";
import { getAgencyAnalytics } from "../../actions/analytics";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { WelcomeBanner } from "../../components/dashboard/welcome-message";
import DashboardDetails from "../../components/dashboard/dashboard-details";

export const metadata: Metadata = { title: "Dashboard - EstatePro" };

export default async function DashboardPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency    = await AgencyUser(user.id);
  const analytics = await getAgencyAnalytics(agency?.id ?? "");

  const roleLabel: Record<string, string> = {
    SUPER_ADMIN: "Süper Admin", ADMIN:      "Yönetici",
    AGENT:       "Danışman",    CLIENT:     "Müşteri",
    SECRETARY:   "Sekreter",    ACCOUNTANT: "Muhasebeci",
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-8">
      <WelcomeBanner
        userName={user.username ?? user.email ?? "Kullanıcı"}
        agencyName={agency?.name ?? ""}
        userRole={roleLabel[(user as any).roleGayrimenkul ?? ""] ?? "Kullanıcı"}
      />
      <DashboardDetails analytics={analytics as any} agencySlug={agency?.slug ?? ""} />
    </div>
  );
}
