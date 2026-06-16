import { validateRequest } from "@/app/auth";
import { getPropertyById } from "../../../../../actions/properties";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, MapPin, Building2, Ruler, Home,
  FileText, CalendarCheck, Tag, User, Phone, Hash,
  ExternalLink,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Mülk Detayı - EstatePro" };

const typeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa", OFFICE: "Ofis",
  SHOP: "Dükkan", LAND: "Arsa", WAREHOUSE: "Depo", BUILDING: "Bina",
};
const statusLabel: Record<string, string> = {
  AVAILABLE: "Müsait", SOLD: "Satıldı", RENTED: "Kiralandı",
  UNDER_CONTRACT: "Sözleşmede", UNDER_MAINTENANCE: "Bakımda",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: "default", SOLD: "secondary", RENTED: "secondary",
  UNDER_CONTRACT: "outline", UNDER_MAINTENANCE: "destructive",
};
const contractTypeLabel: Record<string, string> = { SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış" };
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı", CANCELLED: "İptal", EXPIRED: "Doldu",
};
const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı", CANCELLED: "İptal", NO_SHOW: "Gelmedi",
};

export default async function PropertyViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const property = await getPropertyById(params.id);
  if (!property) notFound();

  const count     = (property as any)._count     ?? {};
  const images    = (property as any).images    ?? [];
  const documents = (property as any).documents ?? [];
  const contracts = (property as any).contracts ?? [];
  const visits    = (property as any).visits    ?? [];
  const listings  = (property as any).listings  ?? [];

  const features = [
    { label: "Asansör",    active: property.hasElevator },
    { label: "Otopark",    active: property.hasParking  },
    { label: "Eşyalı",    active: property.isFurnished  },
    { label: "Bahçe",     active: property.hasGarden    },
    { label: "Havuz",     active: property.hasPool      },
    { label: "Balkon",    active: property.hasBalcony   },
    { label: "Öne Çıkan", active: property.isFeatured   },
  ].filter((f) => f.active);

  const infoItems = [
    { icon: MapPin,       label: "Şehir / İlçe",  value: `${property.city}, ${property.district}` },
    ...(property.neighborhood ? [{ icon: MapPin, label: "Mahalle",     value: property.neighborhood }] : []),
    ...(property.zipCode      ? [{ icon: Hash,   label: "Posta Kodu", value: property.zipCode }]      : []),
    { icon: Building2,    label: "Mülk Tipi",    value: typeLabel[property.propertyType] ?? property.propertyType },
    { icon: Ruler,        label: "Brüt Alan",    value: property.grossArea ? `${property.grossArea} m²` : "—" },
    { icon: Ruler,        label: "Net Alan",     value: property.netArea   ? `${property.netArea} m²`   : "—" },
    { icon: Home,         label: "Kat / Toplam", value: property.floorNo != null ? `${property.floorNo} / ${property.totalFloors ?? "?"}` : "—" },
    { icon: Hash,         label: "Banyo",        value: property.bathroomCount != null ? String(property.bathroomCount) : "—" },
    { icon: Tag,          label: "Bina Yaşı",   value: property.buildingAge != null ? `${property.buildingAge} yıl` : "—" },
    { icon: Tag,          label: "Isıtma",       value: property.heatingType ?? "—" },
    { icon: User,         label: "Mülk Sahibi",  value: property.ownerName  ?? "—" },
    { icon: Phone,        label: "Sahip Tel",    value: property.ownerPhone ?? "—" },
    { icon: FileText,     label: "Sözleşme",     value: String(count.contracts ?? 0) },
    { icon: CalendarCheck,label: "Gezi",         value: String(count.visits    ?? 0) },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 space-y-5">

      {/* ── Üst Bar ── */}
      <div className="flex items-center justify-between gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/properties">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/properties/edit/${property.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* ── Başlık Kartı ── */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-black leading-tight">{property.title}</h1>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <Badge variant="outline" className="text-black">{typeLabel[property.propertyType] ?? property.propertyType}</Badge>
                <Badge variant={statusVariant[property.status] ?? "secondary"}>{statusLabel[property.status] ?? property.status}</Badge>
                {property.roomCount && <Badge variant="secondary" className="text-black">{property.roomCount}</Badge>}
                {features.map((f) => (
                  <Badge key={f.label} variant="secondary" className="text-xs text-black">{f.label}</Badge>
                ))}
              </div>
            </div>
            {property.price && (
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                {property.price.toLocaleString("tr-TR")} {property.currency}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Bilgi Kartları ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {infoItems.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 text-blue-600" />
              <p className="text-[9px] sm:text-[10px] font-semibold text-black uppercase tracking-wide mb-0.5">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── İstatistikler ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "İlan",        value: count.listings  ?? 0, icon: Tag,          color: "text-blue-600"  },
          { label: "Sözleşme",    value: count.contracts ?? 0, icon: FileText,     color: "text-purple-600"},
          { label: "Mülk Gezisi", value: count.visits    ?? 0, icon: CalendarCheck,color: "text-amber-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-3 sm:p-4">
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color} mx-auto mb-1`} />
              <p className="text-xl sm:text-2xl font-extrabold text-black">{value}</p>
              <p className="text-[10px] sm:text-xs text-black mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Açıklama / Notlar ── */}
      {(property.description || property.notes) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {property.description && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-black">Açıklama</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-black whitespace-pre-wrap">{property.description}</p></CardContent>
            </Card>
          )}
          {property.notes && (
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm text-black">Dahili Notlar</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-black whitespace-pre-wrap">{property.notes}</p></CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Fotoğraflar ── */}
      {images.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Fotoğraflar ({images.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {[...images]
                .sort((a: any, b: any) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0) || a.order - b.order)
                .map((img: any) => (
                  <a
                    key={img.id}
                    href={img.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-100"
                  >
                    <img src={img.url} alt={img.title ?? ""} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                    {img.isCover && (
                      <span className="absolute top-1 left-1 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Kapak</span>
                    )}
                  </a>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Belgeler ── */}
      {documents.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Belgeler ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {documents.map((doc: any) => (
              <div key={doc.id} className="flex items-start sm:items-center justify-between gap-3 rounded-lg border px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-black truncate">{doc.title}</p>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] bg-gray-100 text-black px-1.5 py-0.5 rounded">{doc.type}</span>
                    {doc.size && <span className="text-xs text-black">{(doc.size / 1024).toFixed(1)} KB</span>}
                    <span className="text-xs text-black">{new Date(doc.uploadedAt).toLocaleDateString("tr-TR")}</span>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">Görüntüle</span>
                  </a>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── Bağlı İlanlar ── */}
      {listings.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Bağlı İlanlar ({listings.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {listings.map((l: any) => (
              <div key={l.id} className="flex items-start sm:items-center justify-between gap-2 rounded-lg border px-3 py-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-black truncate">{l.title}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <Badge variant="outline" className="text-[10px] text-black">
                      {{ SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem" }[l.listingType as string] ?? l.listingType}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {{ ACTIVE: "Aktif", SOLD: "Satıldı", RENTED: "Kiralandı", PENDING: "Beklemede", RESERVED: "Rezerve", WITHDRAWN: "Çekildi" }[l.status as string] ?? l.status}
                    </Badge>
                    {l.askingPrice && (
                      <span className="text-xs font-semibold text-black">{l.askingPrice.toLocaleString("tr-TR")}</span>
                    )}
                  </div>
                </div>
                <Button asChild size="icon" variant="outline" className="h-7 w-7 shrink-0">
                  <Link href={`/estate/dashboard/listings/view/${l.id}`}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── Sözleşmeler ── */}
      {contracts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" /> Sözleşmeler ({contracts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop tablo */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    {["Sözleşme No", "Tip", "Durum", "Danışman", "Müşteri"].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-black uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contracts.map((c: any) => (
                    <tr key={c.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-black">{c.contractNo}</td>
                      <td className="px-3 py-2 text-black">{contractTypeLabel[c.contractType] ?? c.contractType}</td>
                      <td className="px-3 py-2">
                        <Badge variant={c.status === "ACTIVE" ? "default" : c.status === "CANCELLED" ? "destructive" : "outline"} className="text-xs">
                          {contractStatusLabel[c.status] ?? c.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2 text-xs text-black">{c.agentName}</td>
                      <td className="px-3 py-2 text-xs text-black">{c.clientName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobil kartlar */}
            <div className="sm:hidden space-y-2">
              {contracts.map((c: any) => (
                <div key={c.id} className="rounded-lg border border-gray-200 px-3 py-2.5 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-black">{c.contractNo}</p>
                    <Badge variant={c.status === "ACTIVE" ? "default" : c.status === "CANCELLED" ? "destructive" : "outline"} className="text-[10px]">
                      {contractStatusLabel[c.status] ?? c.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs text-black">
                    <span>{contractTypeLabel[c.contractType] ?? c.contractType}</span>
                    <span>·</span>
                    <span>{c.agentName}</span>
                    <span>·</span>
                    <span>{c.clientName}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Ziyaretler ── */}
      {visits.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Ziyaretler ({visits.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop tablo */}
            <div className="hidden sm:block overflow-x-auto">
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
                      <td className="px-3 py-2 text-black">{new Date(v.scheduledAt).toLocaleDateString("tr-TR")}</td>
                      <td className="px-3 py-2">
                        <Badge variant={v.status === "COMPLETED" ? "default" : v.status === "CANCELLED" || v.status === "NO_SHOW" ? "destructive" : "outline"} className="text-xs">
                          {visitStatusLabel[v.status] ?? v.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobil kartlar */}
            <div className="sm:hidden space-y-2">
              {visits.map((v: any) => (
                <div key={v.id} className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2.5">
                  <p className="text-sm text-black">{new Date(v.scheduledAt).toLocaleDateString("tr-TR")}</p>
                  <Badge variant={v.status === "COMPLETED" ? "default" : v.status === "CANCELLED" || v.status === "NO_SHOW" ? "destructive" : "outline"} className="text-[10px]">
                    {visitStatusLabel[v.status] ?? v.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
