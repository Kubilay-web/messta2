import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllProperties } from "../../../actions/properties";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import PropertyTable from "./PropertyTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Mülkler - EstatePro" };

export default async function PropertiesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency     = await AgencyUser(user.id);
  const properties = await getAllProperties(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Mülkler"
        linkTitle="Yeni Mülk"
        href="/estate/dashboard/properties/new"
        data={properties}
        model="property"
      />
      <PropertyTable properties={properties as any[]} />
    </div>
  );
}
