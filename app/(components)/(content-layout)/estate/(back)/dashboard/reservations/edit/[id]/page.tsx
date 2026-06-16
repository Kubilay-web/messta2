import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAllListings } from "../../../../../actions/listings";
import { getAllAgents } from "../../../../../actions/agents";
import { getAllPropertyClients } from "../../../../../actions/clients";
import { getReservationById } from "../../../../../actions/reservations";
import { Card, CardContent } from "../../../../../components/ui/card";
import ReservationForm from "../../../../../components/dashboard/forms/reservations/reservation-form";
import { redirect, notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Rezervasyonu Düzenle - EstatePro" };

export default async function EditReservationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const reservation = await getReservationById(id);
  if (!reservation) notFound();

  const [listings, agents, clients] = await Promise.all([
    getAllListings(agencyId),
    getAllAgents(agencyId),
    getAllPropertyClients(agencyId),
  ]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ReservationForm listings={listings as any[]} agents={agents as any[]} clients={clients as any[]} agencyId={agencyId} editingId={id} initialData={reservation} />
        </CardContent>
      </Card>
    </div>
  );
}
