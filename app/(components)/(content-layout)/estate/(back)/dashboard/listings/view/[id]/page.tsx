import { validateRequest } from "@/app/auth";
import { getListingById } from "../../../../../actions/listings";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, Tag, MapPin, User, DollarSign,
  CalendarDays, Eye, FileText, Users, Home, BadgeCheck,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlan Detayı - EstatePro" };

const typeLabel:   Record<string, string> = { SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem" };
const statusLabel: Record<string, string> = {
  ACTIVE: "Aktif", PENDING: "Beklemede", RESERVED: "Rezerve",
  SOLD: "Satıldı", RENTED: "Kiralandı", WITHDRAWN: "Geri Çekildi",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", PENDING: "secondary", RESERVED: "outline",
  SOLD: "secondary", RENTED: "secondary", WITHDRAWN: "destructive",
};

export default async function ListingViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const listing = await getListingById(params.id);
  if (!listing) notFound();

  const prop      = (listing as any).property;
  const agent     = (listing as any).agent;
  const count     = (listing as any)._count    ?? {};
  const contracts = (listing as any).contracts ?? [];
  const visits    = (listing as any).visits    ?? [];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/listings">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/listings/edit/${listing.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* Başlık Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-black">{listing.title}</h1>
              <p className="text-black mt-1">{listing.listingNo}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="text-black">
                  {typeLabel[listing.listingType] ?? listing.listingType}
                </Badge>
                <Badge variant={statusVariant[listing.status] ?? "secondary"}>
                  {statusLabel[listing.status] ?? listing.status}
                </Badge>
                {listing.isNegotiable && <Badge variant="secondary" className="text-black">Pazarlıklı</Badge>}
                {listing.isPublic     && <Badge variant="secondary" className="text-black">Herkese Açık</Badge>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-blue-600">
                {listing.askingPrice.toLocaleString("tr-TR")} {listing.currency}
              </p>
              {listing.monthlyRent && (
                <p className="text-sm text-black">Kira: {listing.monthlyRent.toLocaleString("tr-TR")} {listing.currency}/ay</p>
              )}
              {listing.deposit && (
                <p className="text-sm text-black">Depozito: {listing.deposit.toLocaleString("tr-TR")} {listing.currency}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[
          { icon: Home,        label: "Mülk",        value: prop?.title ?? "—" },
          { icon: MapPin,      label: "Şehir",        value: prop?.city  ?? "—" },
          { icon: Tag,         label: "Mülk Tipi",    value: prop?.propertyType ?? "—" },
          { icon: User,        label: "Danışman",      value: listing.agentName },
          { icon: Eye,         label: "Görüntülenme",  value: String(listing.views) },
          { icon: FileText,    label: "Sözleşme",      value: String(count.contracts ?? 0) },
          { icon: Users,       label: "İlgi",          value: String(count.interests ?? 0) },
          { icon: CalendarDays,label: "Son Geçerlilik", value: listing.expiresAt ? new Date(listing.expiresAt).toLocaleDateString("tr-TR") : "—" },
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

      {/* Açıklama & Öne Çıkanlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {listing.description && (
          <Card>
            <CardHeader><CardTitle className="text-sm text-black">Açıklama</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-black whitespace-pre-wrap">{listing.description}</p></CardContent>
          </Card>
        )}
        {listing.highlights?.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-sm text-black">Öne Çıkan Özellikler</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {listing.highlights.map((h: string) => (
                  <Badge key={h} variant="secondary" className="text-xs text-black">{h}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bağlı Sözleşmeler */}
      {contracts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Sözleşmeler ({contracts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Sözleşme No", "Tip", "Durum"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contracts.map((c: any) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-medium text-black">{c.contractNo}</td>
                    <td className="px-3 py-2 text-black">
                      {{ SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış" }[c.contractType as string] ?? c.contractType}
                    </td>
                    <td className="px-3 py-2">
                      <Badge variant={c.status === "ACTIVE" ? "default" : c.status === "CANCELLED" ? "destructive" : "outline"} className="text-xs">
                        {{ DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı", CANCELLED: "İptal", EXPIRED: "Doldu" }[c.status as string] ?? c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Bağlı Ziyaretler */}
      {visits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-600" /> Ziyaretler ({visits.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Tarih", "Durum"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visits.map((v: any) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-black">
                      {new Date(v.scheduledAt).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant={v.status === "COMPLETED" ? "default" : v.status === "CANCELLED" || v.status === "NO_SHOW" ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {{ SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı", CANCELLED: "İptal", NO_SHOW: "Gelmedi" }[v.status as string] ?? v.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Sözleşme",    value: count.contracts ?? 0, icon: FileText },
          { label: "Mülk Gezisi", value: count.visits    ?? 0, icon: CalendarDays },
          { label: "Müşteri İlgisi", value: count.interests ?? 0, icon: Users },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4">
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-black">{value}</p>
              <p className="text-xs text-black mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
