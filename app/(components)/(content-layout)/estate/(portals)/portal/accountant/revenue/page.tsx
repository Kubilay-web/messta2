import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getRevenueOverview } from "../../../../actions/revenue";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import RevenueUI from "../../../../(back)/dashboard/finance/revenue/RevenueUI";

export const metadata: Metadata = { title: "Gelir Takibi - Muhasebe Portalı" };

export default async function AccountantRevenuePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency  = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const params  = await searchParams;
  const current = new Date().getFullYear();
  const year    = Number(params?.year) || current;
  const data    = await getRevenueOverview(agency.id, year);

  return (
    <div className="w-full p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Gelir Takibi</h1>
        <p className="text-sm text-black mt-1">{year} yılı sözleşme ödeme gelirleri.</p>
      </div>
      <RevenueUI data={data as any} year={year} minYear={current - 5} maxYear={current} />
    </div>
  );
}
