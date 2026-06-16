import { getAgencyEventById } from "../../../../../../../actions/agency-events";
import { notFound } from "next/navigation";
import { Card, CardContent } from "../../../../../../../components/ui/card";
import EventForm from "../../new/EventForm";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Etkinliği Düzenle - EstatePro" };

export default async function EditEventPage({ params }: { params: Promise<{ agencyId: string; id: string }> }) {
  const { agencyId, id } = await params;
  const ev = await getAgencyEventById(id);
  if (!ev) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <EventForm agencyId={agencyId} editingId={ev.id}
            initialData={{
              title: ev.title, description: ev.description, image: ev.image,
              date: new Date(ev.date).toISOString().split("T")[0],
              startTime: ev.startTime, endTime: ev.endTime, location: ev.location,
            }} />
        </CardContent>
      </Card>
    </div>
  );
}
