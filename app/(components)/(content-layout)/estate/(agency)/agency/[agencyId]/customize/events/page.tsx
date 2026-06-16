import { getAllAgencyEvents, deleteAgencyEvent } from "../../../../../actions/agency-events";
import { getAgencyById } from "../../../../../actions/agencies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, CalendarCheck, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Etkinlikler - EstatePro" };

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function EventsPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const agency = await getAgencyById(agencyId);
  if (!agency) return notFound();

  const events = await getAllAgencyEvents(agencyId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Etkinlikler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Web sitesi etkinlik içerikleri.</p>
        </div>
        <Button asChild size="sm">
          <Link href={`/estate/agency/${agencyId}/customize/events/new`}>
            <Plus className="mr-1.5 w-4 h-4" /> Yeni Etkinlik
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
          <CalendarCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Henüz etkinlik eklenmemiş.</p>
          <Button asChild size="sm" className="mt-3">
            <Link href={`/estate/agency/${agencyId}/customize/events/new`}>İlk Etkinliği Ekle</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((ev) => (
            <Card key={ev.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {ev.image && (
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold line-clamp-1">{ev.title}</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5" />{fmtDate(ev.date)}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{ev.startTime} – {ev.endTime}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{ev.location}</p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs flex-1">
                    <Link href={`/estate/agency/${agencyId}/customize/events/edit/${ev.id}`}>
                      <Pencil className="w-3 h-3 mr-1" /> Düzenle
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="h-7 text-xs"><Trash2 className="w-3 h-3" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[92vw] max-w-md bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Etkinlik silinsin mi?</AlertDialogTitle>
                        <AlertDialogDescription>"{ev.title}" kalıcı olarak silinecek.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={async () => { "use server"; await deleteAgencyEvent(ev.id); }}
                        >Sil</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
