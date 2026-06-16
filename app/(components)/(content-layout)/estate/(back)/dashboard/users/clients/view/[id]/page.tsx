import { validateRequest } from "@/app/auth";
import { getPropertyClientById } from "../../../../../../actions/clients";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../../../../components/ui/badge";
import { Button } from "../../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import {
  ArrowLeft, Mail, Phone, MapPin, User, Hash,
  FileText, CalendarCheck, DollarSign, Star, Heart, ExternalLink,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Müşteri Detayı - EstatePro" };

const contractTypeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const contractStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline", ACTIVE: "default", COMPLETED: "secondary",
  CANCELLED: "destructive", EXPIRED: "destructive",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const visitStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  SCHEDULED: "outline", COMPLETED: "default", CANCELLED: "destructive", NO_SHOW: "destructive",
};
const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı", CANCELLED: "İptal", NO_SHOW: "Gelmedi",
};
const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const listingStatusLabel: Record<string, string> = {
  ACTIVE: "Aktif", SOLD: "Satıldı", RENTED: "Kiralandı",
  WITHDRAWN: "Çekildi", PENDING: "Beklemede", RESERVED: "Rezerve",
};
const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  HIGH: "default", MEDIUM: "outline", LOW: "secondary",
};
const priorityLabel: Record<string, string> = {
  HIGH: "Yüksek", MEDIUM: "Orta", LOW: "Düşük",
};

function fmt(v: number | null | undefined, cur = "TRY") {
  if (!v) return "—";
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR");
}

export default async function ClientViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getPropertyClientById(params.id);
  if (!client) notFound();

  const fullName   = `${client.title} ${client.firstName} ${client.lastName}`;
  const contracts  = (client as any).contracts  ?? [];
  const visits     = (client as any).visits     ?? [];
  const interests  = (client as any).interests  ?? [];
  const count      = (client as any)._count     ?? {};

  const typeBadges = [
    client.isBuyer    && "Alıcı",
    client.isSeller   && "Satıcı",
    client.isTenant   && "Kiracı",
    client.isLandlord && "Kiraya Veren",
  ].filter(Boolean) as string[];

  const infoCards = [
    { icon: Mail,   label: "E-posta",          value: client.email },
    { icon: Phone,  label: "Telefon",           value: client.phone },
    { icon: Phone,  label: "WhatsApp",          value: client.whatsappNo ?? "—" },
    { icon: User,   label: "Cinsiyet",          value: ({ MALE: "Erkek", FEMALE: "Kadın" } as any)[client.gender] ?? client.gender },
    { icon: Hash,   label: "TC Kimlik",         value: client.NIN },
    { icon: MapPin, label: "Uyruk",             value: client.nationality },
    { icon: MapPin, label: "Adres",             value: client.address },
    { icon: User,   label: "Meslek",            value: client.occupation ?? "—" },
    { icon: User,   label: "İletişim Tercihi",  value: client.contactMethod },
    {
      icon: CalendarCheck,
      label: "Doğum Tarihi",
      value: new Date(client.dob).toLocaleDateString("tr-TR"),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/users/clients">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/users/clients/edit/${client.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* Profil Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Image
              src={client.imageUrl || "/management/images/realestate-logo.svg"}
              alt={fullName}
              width={96} height={96}
              className="w-24 h-24 rounded-full object-cover shrink-0 border-4 border-blue-100"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-black">{fullName}</h1>
              <p className="text-black mt-1">{client.agencyName}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                {typeBadges.map((t) => (
                  <Badge key={t} variant="default" className="text-xs">{t}</Badge>
                ))}
              </div>
              {(client.minBudget || client.maxBudget) && (
                <p className="text-sm text-black mt-2">
                  Bütçe:{" "}
                  <span className="font-semibold">
                    {client.minBudget ? fmt(client.minBudget, client.currency) : "—"}
                    {" → "}
                    {client.maxBudget ? fmt(client.maxBudget, client.currency) : "—"}
                  </span>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Sözleşme",      value: count.contracts ?? 0, icon: FileText,      color: "text-blue-600"   },
          { label: "Mülk Gezisi",   value: count.visits    ?? 0, icon: CalendarCheck, color: "text-amber-600"  },
          { label: "İlgilenilen",   value: count.interests ?? 0, icon: Heart,         color: "text-rose-500"   },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4">
              <Icon className={`w-5 h-5 ${color} mx-auto mb-1`} />
              <p className="text-2xl font-extrabold text-black">{value}</p>
              <p className="text-xs text-black mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {infoCards.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-4 h-4 mb-1.5 text-blue-600" />
              <p className="text-[10px] font-semibold text-black uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tercihler */}
      {(client.preferredPropertyTypes.length > 0 || client.preferredCities.length > 0 || client.notes) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {client.preferredPropertyTypes.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Tercih Edilen Mülk Tipleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {client.preferredPropertyTypes.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs text-black">{t}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {client.preferredCities.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Tercih Edilen Şehirler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {client.preferredCities.map((c) => (
                    <Badge key={c} variant="secondary" className="text-xs text-black">{c}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          {client.notes && (
            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Notlar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-black whitespace-pre-wrap">{client.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Sözleşmeler */}
      {contracts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Sözleşmeler ({contracts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    {["Sözleşme No", "Tip", "Durum", "Mülk", "Danışman", "Komisyon", "Tarih"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contracts.map((c: any) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-black">
                        <Link href={`/estate/dashboard/contracts/view/${c.id}`}
                          className="text-blue-600 hover:underline">
                          {c.contractNo}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-xs text-black">{contractTypeLabel[c.contractType] ?? c.contractType}</td>
                      <td className="px-3 py-2">
                        <Badge variant={contractStatusVariant[c.status] ?? "outline"} className="text-[10px]">
                          {contractStatusLabel[c.status] ?? c.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 text-xs text-black">{c.property?.title ?? "—"}</td>
                      <td className="px-3 py-2 text-xs text-black">{c.agentName}</td>
                      <td className="px-3 py-2 text-xs text-black">
                        {fmt(c.commission ?? c.salePrice ?? c.rentalPrice, c.currency)}
                      </td>
                      <td className="px-3 py-2 text-xs text-black whitespace-nowrap">{fmtDate(c.startDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y divide-gray-100">
              {contracts.map((c: any) => (
                <div key={c.id} className="p-3 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link href={`/estate/dashboard/contracts/view/${c.id}`}
                      className="text-sm font-semibold text-blue-600 hover:underline">
                      {c.contractNo}
                    </Link>
                    <Badge variant={contractStatusVariant[c.status] ?? "outline"} className="text-[10px]">
                      {contractStatusLabel[c.status] ?? c.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-black">{c.property?.title ?? "—"} · {c.agentName}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mülk Gezileri */}
      {visits.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Mülk Gezileri ({visits.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    {["Tarih", "Mülk", "Danışman", "Puan", "Durum"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visits.map((v: any) => (
                    <tr key={v.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 text-xs text-black whitespace-nowrap">{fmtDate(v.scheduledAt)}</td>
                      <td className="px-3 py-2 text-xs text-black">{v.property?.title ?? "—"}</td>
                      <td className="px-3 py-2 text-xs text-black">
                        {v.agent ? `${v.agent.firstName} ${v.agent.lastName}` : "—"}
                      </td>
                      <td className="px-3 py-2 text-xs text-black">
                        {v.rating ? (
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {v.rating}/5
                          </span>
                        ) : "—"}
                      </td>
                      <td className="px-3 py-2">
                        <Badge variant={visitStatusVariant[v.status] ?? "outline"} className="text-[10px]">
                          {visitStatusLabel[v.status] ?? v.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="sm:hidden divide-y divide-gray-100">
              {visits.map((v: any) => (
                <div key={v.id} className="p-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-black">{fmtDate(v.scheduledAt)}</p>
                    <p className="text-xs text-black">{v.property?.title ?? "—"}</p>
                  </div>
                  <Badge variant={visitStatusVariant[v.status] ?? "outline"} className="text-[10px]">
                    {visitStatusLabel[v.status] ?? v.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* İlgilenilen İlanlar */}
      {interests.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" /> İlgilenilen İlanlar ({interests.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {interests.map((item: any) => {
              const l = item.listing;
              return (
                <div key={item.id} className="flex items-start sm:items-center justify-between gap-3 rounded-lg border px-3 py-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-black truncate">{l?.title ?? "—"}</p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                      {l?.listingNo && (
                        <span className="text-[10px] bg-gray-100 text-black px-1.5 py-0.5 rounded">{l.listingNo}</span>
                      )}
                      {l?.listingType && (
                        <span className="text-xs text-black">{listingTypeLabel[l.listingType] ?? l.listingType}</span>
                      )}
                      {l?.askingPrice && (
                        <span className="text-xs font-semibold text-black">{fmt(l.askingPrice, l.currency)}</span>
                      )}
                      {l?.status && (
                        <Badge variant="secondary" className="text-[10px]">
                          {listingStatusLabel[l.status] ?? l.status}
                        </Badge>
                      )}
                      {item.priority && (
                        <Badge variant={priorityVariant[item.priority] ?? "outline"} className="text-[10px]">
                          {priorityLabel[item.priority] ?? item.priority}
                        </Badge>
                      )}
                    </div>
                    {item.notes && <p className="text-xs text-black mt-1 italic">{item.notes}</p>}
                  </div>
                  {l?.id && (
                    <Button asChild size="icon" variant="outline" className="h-7 w-7 shrink-0">
                      <Link href={`/estate/dashboard/listings/view/${l.id}`}>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
