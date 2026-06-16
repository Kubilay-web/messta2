import { ReactNode } from "react";
import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import { getAgencyById } from "../../../../actions/agencies";
import AgencyCustomizeSidebar from "../../../../components/agency/AgencyCustomizeSidebar";
import AgencyCustomizeHeader from "../../../../components/agency/AgencyCustomizeHeader";

export default async function AgencyCustomizeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const userRole = (user as any).roleGayrimenkul as string;
  if (!["SUPER_ADMIN", "ADMIN"].includes(userRole)) redirect("/estate/portal");

  const { agencyId } = await params;
  const agency = await getAgencyById(agencyId);
  if (!agency) redirect("/estate/dashboard");

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
      <AgencyCustomizeSidebar agency={agency as any} agencyId={agencyId} />
      <div className="flex flex-col min-h-screen">
        <AgencyCustomizeHeader user={user as any} agency={agency as any} />
        <div className="flex-1 p-4 sm:p-6 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
