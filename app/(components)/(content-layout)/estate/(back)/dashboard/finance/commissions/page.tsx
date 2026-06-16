import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getCommissionsByYear } from "../../../../actions/commissions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CommissionsUI from "./CommissionsUI";

export const metadata: Metadata = { title: "Komisyon Yönetimi - EstatePro" };

export default async function CommissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency    = await AgencyUser(user.id);
  const params    = await searchParams;
  const current   = new Date().getFullYear();
  const year      = Number(params?.year) || current;
  const data      = await getCommissionsByYear(agency?.id ?? "", year);

  return (
    <div className="w-full p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Komisyon Yönetimi</h1>
        <p className="text-sm text-black mt-1">{year} yılı danışman komisyon özeti.</p>
      </div>
      <CommissionsUI data={data as any} currentYear={year} minYear={current - 5} maxYear={current} />
    </div>
  );
}
