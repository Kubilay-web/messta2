import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllReservations } from "../../../actions/reservations";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import ReservationTable from "./ReservationTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Rezervasyonlar - EstatePro" };

export default async function ReservationsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency       = await AgencyUser(user.id);
  const reservations = await getAllReservations(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Rezervasyonlar"
        linkTitle="Yeni Rezervasyon"
        href="/estate/dashboard/reservations/new"
        data={reservations}
        model="reservation"
        showImport={false}
      />
      <ReservationTable reservations={reservations as any[]} />
    </div>
  );
}
