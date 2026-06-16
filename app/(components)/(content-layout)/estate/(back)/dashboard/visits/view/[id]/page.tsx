import { validateRequest } from "@/app/auth";
import { getVisitById } from "../../../../../actions/visits";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, MapPin, User, Users, CalendarDays,
  MessageSquare, Star, Building2, FileText,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Gezi Detayı - EstatePro" };

const statusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",     NO_SHOW:   "Gelmedi",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SCHEDULED: "outline",    COMPLETED: "default",
  CANCELLED: "destructive", NO_SHOW:  "destructive",
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleString("tr-TR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default async function VisitViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const visit = await getVisitById(params.id);
  if (!visit) notFound();

  const property = (visit as any).property;
  const listing  = (visit as any).listing;
  const agent    = (visit as any).agent;
  const client   = (visit as any).client;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/visits">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/visits/edit/${visit.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* Başlık Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-black">Mülk Gezisi</h1>
              <p className="text-black mt-1">{fmtDate(visit.scheduledAt)}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={statusVariant[visit.status] ?? "secondary"}>
                  {statusLabel[visit.status] ?? visit.status}
                </Badge>
              </div>
            </div>
            {visit.rating && (
              <div className="text-right">
                <p className="text-xs text-black font-medium mb-1">Müşteri Puanı</p>
                <p className="text-2xl text-amber-500">
                  {"★".repeat(visit.rating)}{"☆".repeat(5 - visit.rating)}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { icon: Building2,    label: "Mülk",          value: property?.title    ?? "—" },
          { icon: MapPin,       label: "Şehir",          value: property?.city     ?? "—" },
          { icon: FileText,     label: "İlan No",        value: listing?.listingNo ?? "—" },
          { icon: CalendarDays, label: "Planlanan",      value: fmtDate(visit.scheduledAt) },
          { icon: CalendarDays, label: "Tamamlandı",     value: fmtDate(visit.completedAt) },
          { icon: User,         label: "Danışman",       value: agent  ? `${agent.firstName} ${agent.lastName}`   : "—" },
          { icon: Users,        label: "Müşteri",        value: client ? `${client.firstName} ${client.lastName}` : "—" },
          { icon: Star,         label: "Puan",           value: visit.rating ? `${visit.rating} / 5` : "—" },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-5 h-5 mb-1.5 text-blue-600" />
              <p className="text-[10px] font-semibold text-black uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danışman & Müşteri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><User className="w-4 h-4" /> Danışman</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-black">
            {agent ? (
              <>
                <p className="font-semibold">{agent.firstName} {agent.lastName}</p>
                {agent.phone && <p>{agent.phone}</p>}
                {agent.email && <p>{agent.email}</p>}
              </>
            ) : <p>—</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><Users className="w-4 h-4" /> Müşteri</CardTitle></CardHeader>
          <CardContent className="space-y-1 text-sm text-black">
            {client ? (
              <>
                <p className="font-semibold">{client.firstName} {client.lastName}</p>
                {client.phone && <p>{client.phone}</p>}
                {client.email && <p>{client.email}</p>}
              </>
            ) : <p>—</p>}
          </CardContent>
        </Card>
      </div>

      {/* Notlar & Geri Bildirim */}
      {(visit.notes || visit.feedback) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visit.notes && (
            <Card>
              <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Notlar</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-black whitespace-pre-wrap">{visit.notes}</p></CardContent>
            </Card>
          )}
          {visit.feedback && (
            <Card>
              <CardHeader><CardTitle className="text-sm text-black flex items-center gap-2"><Star className="w-4 h-4" /> Müşteri Görüşü</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-black whitespace-pre-wrap">{visit.feedback}</p></CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
