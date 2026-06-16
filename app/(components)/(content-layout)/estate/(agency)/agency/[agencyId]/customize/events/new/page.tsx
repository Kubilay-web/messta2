import { Metadata } from "next";
import { Card, CardContent } from "../../../../../../components/ui/card";
import EventForm from "./EventForm";

export const metadata: Metadata = { title: "Yeni Etkinlik - EstatePro" };

export default async function NewEventPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6"><EventForm agencyId={agencyId} /></CardContent>
      </Card>
    </div>
  );
}
