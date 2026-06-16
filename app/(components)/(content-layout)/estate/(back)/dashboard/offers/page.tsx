import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllOffers } from "../../../actions/offers";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import OfferTable from "./OfferTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Teklifler - EstatePro" };

export default async function OffersPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const offers = await getAllOffers(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Teklifler"
        linkTitle="Yeni Teklif"
        href="/estate/dashboard/offers/new"
        data={offers}
        model="offer"
        showImport={false}
      />
      <OfferTable offers={offers as any[]} />
    </div>
  );
}
