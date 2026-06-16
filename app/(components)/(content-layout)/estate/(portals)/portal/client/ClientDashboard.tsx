"use client";

import Link from "next/link";
import {
  Building2, FileText, CalendarCheck, User,
  Phone, Mail, ArrowRight, Star, CheckCircle, Clock,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

/* ── Label maps ─────────────────────────────────────────────────────────── */
const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const contractStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", COMPLETED: "default",
  DRAFT: "outline", CANCELLED: "destructive", EXPIRED: "destructive",
};
const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",     NO_SHOW:   "Gelmedi",
};
const visitStatusColor: Record<string, string> = {
  SCHEDULED:  "bg-blue-50 text-blue-700",
  COMPLETED:  "bg-green-50 text-green-700",
  CANCELLED:  "bg-red-50 text-red-700",
  NO_SHOW:    "bg-gray-50 text-gray-600",
};

type Client = {
  id: string; firstName: string; lastName: string;
  email: string; phone: string; agencyName: string;
};
type Contract = {
  id: string; contractNo: string; contractType: string; status: string;
  startDate: Date | string; endDate?: Date | string | null;
  salePrice?: number | null; rentalPrice?: number | null; currency: string;
  agentName: string; property?: { title: string; city: string } | null;
};
type Visit = {
  id: string; scheduledAt: Date | string; status: string;
  rating?: number | null; feedback?: string | null;
  agent?: { firstName: string; lastName: string; phone?: string | null } | null;
  property?: { title: string; city: string } | null;
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
function fmtMoney(v: number | null | undefined, cur: string) {
  if (!v) return null;
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}

export default function ClientDashboard({ client, contracts, visits }: {
  client: Client; contracts: Contract[]; visits: Visit[];
}) {
  const activeContracts   = contracts.filter((c) => c.status === "ACTIVE");
  const upcomingVisits    = visits.filter((v) => v.status === "SCHEDULED");
  const completedVisits   = visits.filter((v) => v.status === "COMPLETED");

  const greeting = (() => {
    const h = new Date().getHours();
    return h < 12 ? "Günaydın" : h < 18 ? "İyi günler" : "İyi akşamlar";
  })();

  return (
    <div className="space-y-6">

      {/* ── Hoşgeldin Kartı ── */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-lg">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {greeting}, {client.firstName} {client.lastName}!
              </h1>
              <p className="text-blue-100 text-sm mt-0.5">{client.agencyName}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {client.email && (
              <a href={`mailto:${client.email}`} className="flex items-center gap-1.5 text-blue-100 text-xs hover:text-white">
                <Mail className="w-3.5 h-3.5" /> {client.email}
              </a>
            )}
            {client.phone && (
              <a href={`tel:${client.phone}`} className="flex items-center gap-1.5 text-blue-100 text-xs hover:text-white">
                <Phone className="w-3.5 h-3.5" /> {client.phone}
              </a>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Özet KPI ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: FileText,     label: "Toplam Sözleşme",  value: contracts.length,      color: "bg-blue-50 text-blue-600"   },
          { icon: CheckCircle,  label: "Aktif Sözleşme",   value: activeContracts.length, color: "bg-green-50 text-green-600" },
          { icon: CalendarCheck,label: "Planlanan Gezi",   value: upcomingVisits.length,  color: "bg-amber-50 text-amber-600" },
          { icon: Building2,    label: "Tamamlanan Gezi",  value: completedVisits.length, color: "bg-purple-50 text-purple-600"},
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-black">{value}</p>
                <p className="text-[10px] font-medium text-black">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Sözleşmeler & Ziyaretler ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Sözleşmeler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Sözleşmelerim
              </span>
              <Link href="/estate/portal/client/messages"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Mesajlar <ArrowRight className="w-3 h-3" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {contracts.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-black">Henüz sözleşme bulunmuyor.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {contracts.map((c) => (
                  <div key={c.id} className="px-4 py-3 flex items-start justify-between gap-2 hover:bg-gray-50">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black">{c.contractNo}</p>
                      <p className="text-xs text-black truncate">
                        {c.property?.title ?? "—"}{c.property?.city ? ` — ${c.property.city}` : ""}
                      </p>
                      <p className="text-xs text-black mt-0.5">
                        {fmtMoney(c.salePrice, c.currency) ?? fmtMoney(c.rentalPrice, c.currency) ?? "—"}
                      </p>
                      <p className="text-[10px] text-black">Danışman: {c.agentName}</p>
                    </div>
                    <div className="shrink-0 space-y-1 text-right">
                      <Badge variant="outline" className="text-[10px] text-black block w-fit ml-auto">
                        {contractTypeLabel[c.contractType] ?? c.contractType}
                      </Badge>
                      <Badge variant={contractStatusVariant[c.status] ?? "secondary"} className="text-[10px] block w-fit ml-auto">
                        {contractStatusLabel[c.status] ?? c.status}
                      </Badge>
                      <p className="text-[10px] text-black">{fmtDate(c.startDate)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ziyaretler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Mülk Gezilerim
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {visits.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-black">Henüz gezi kaydı bulunmuyor.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {visits.map((v) => (
                  <div key={v.id} className="px-4 py-3 flex items-start justify-between gap-2 hover:bg-gray-50">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-black truncate">
                        {v.property?.title ?? "—"}
                      </p>
                      <p className="text-xs text-black">{v.property?.city ?? ""}</p>
                      <p className="text-xs text-black mt-0.5">
                        Danışman: {v.agent ? `${v.agent.firstName} ${v.agent.lastName}` : "—"}
                      </p>
                      {v.agent?.phone && (
                        <a href={`tel:${v.agent.phone}`} className="text-xs text-blue-600 hover:underline">
                          {v.agent.phone}
                        </a>
                      )}
                      {v.rating && (
                        <p className="text-xs text-amber-500 mt-0.5">
                          {"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right space-y-1">
                      <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${visitStatusColor[v.status] ?? "bg-gray-50 text-black"}`}>
                        {visitStatusLabel[v.status] ?? v.status}
                      </span>
                      <p className="text-[10px] text-black">{fmtDate(v.scheduledAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Geri Bildirim Bekleyen Geziler ── */}
      {completedVisits.filter((v) => !v.feedback && v.rating == null).length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-start gap-3">
            <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-black">Geri bildirim bekleniyor</p>
              <p className="text-xs text-black mt-0.5">
                {completedVisits.filter((v) => !v.feedback && v.rating == null).length} tamamlanmış
                geziyi değerlendirmek için danışmanınıza ulaşın.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
