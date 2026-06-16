import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllListings } from "../../../actions/listings";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import ListingTable from "./ListingTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlanlar - EstatePro" };

export default async function ListingsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const listings = await getAllListings(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="İlanlar"
        linkTitle="Yeni İlan"
        href="/estate/dashboard/listings/new"
        data={listings}
        model="listing"
      />
      <ListingTable listings={listings as any[]} />
    </div>
  );
}
