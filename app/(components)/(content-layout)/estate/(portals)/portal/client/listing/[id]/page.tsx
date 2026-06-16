import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getListingDetailForClient } from "../../../../../actions/client-portal";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, MapPin, Home, Building2, CalendarCheck,
  FileText, Phone, Mail, Layers,
  Thermometer, Car, Trees, Waves, Wind,
} from "lucide-react";
import { Metadata } from "next";
import InterestToggleButton from "../../../../../components/portal/InterestToggleButton";
import MortgageCalculator from "../../../../../components/public/MortgageCalculator";

export const metadata: Metadata = { title: "İlan Detayı - Müşteri Portalı" };

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem",
};
const listingStatusLabel: Record<string, string> = {
  ACTIVE: "Aktif", PENDING: "Beklemede", RESERVED: "Rezerve",
  SOLD: "Satıldı", RENTED: "Kiralandı", WITHDRAWN: "Geri Çekildi",
};
const listingStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", PENDING: "secondary", RESERVED: "outline",
  SOLD: "secondary", RENTED: "secondary", WITHDRAWN: "destructive",
};
const contractStatusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const contractStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", COMPLETED: "default", DRAFT: "outline",
  CANCELLED: "destructive", EXPIRED: "destructive",
};
const visitStatusLabel: Record<string, string> = {
  SCHEDULED: "Planlandı", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", NO_SHOW: "Gelmedi",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ClientListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const data = await getListingDetailForClient(id, client.id);
  if (!data) notFound();

  const { listing, property, agent, myVisits, myContracts, myInterest } = data;

  const features = [
    property?.hasElevator && { icon: Layers,     label: "Asansör"   },
    property?.hasParking  && { icon: Car,        label: "Otopark"   },
    property?.isFurnished && { icon: Home,       label: "Mobilyalı" },
    property?.hasGarden   && { icon: Trees,      label: "Bahçe"     },
    property?.hasPool     && { icon: Waves,      label: "Havuz"     },
    property?.hasBalcony  && { icon: Wind,       label: "Balkon"    },
  ].filter(Boolean) as { icon: any; label: string }[];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/portal/client">
            <ArrowLeft className="mr-1 h-4 w-4" /> Geri
          </Link>
        </Button>
        <InterestToggleButton
          clientId={client.id}
          listingId={listing.id}
          initialInterest={!!myInterest}
        />
      </div>

      {/* Başlık Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold text-black">{listing.title}</h1>
              <p className="text-sm text-black mt-1">{listing.listingNo}</p>
              {property && (
                <p className="text-sm text-black flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  {property.address}, {property.neighborhood && `${property.neighborhood}, `}
                  {property.district}, {property.city}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="text-xs text-black">
                  {listingTypeLabel[listing.listingType] ?? listing.listingType}
                </Badge>
                <Badge variant={listingStatusVariant[listing.status] ?? "secondary"} className="text-xs">
                  {listingStatusLabel[listing.status] ?? listing.status}
                </Badge>
                {listing.isNegotiable && (
                  <Badge variant="secondary" className="text-xs text-black">Pazarlıklı</Badge>
                )}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                {listing.askingPrice.toLocaleString("tr-TR")} {listing.currency}
              </p>
              {listing.monthlyRent && (
                <p className="text-sm text-black">Kira: {listing.monthlyRent.toLocaleString("tr-TR")} {listing.currency}/ay</p>
              )}
              {listing.deposit && (
                <p className="text-xs text-black">Depozito: {listing.deposit.toLocaleString("tr-TR")}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mülk Özellikleri */}
      {property && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { icon: Building2,  label: "Tür",         value: propertyTypeLabel[property.propertyType] ?? property.propertyType },
            { icon: Home,       label: "Oda",         value: property.roomCount ?? "—" },
            { icon: Layers,     label: "Brüt m²",     value: property.grossArea ? `${property.grossArea} m²` : "—" },
            { icon: Layers,     label: "Net m²",      value: property.netArea   ? `${property.netArea} m²`   : "—" },
            { icon: Building2,  label: "Kat",         value: property.floorNo != null ? `${property.floorNo}/${property.totalFloors ?? "?"}` : "—" },
            { icon: Home,       label: "Banyo",       value: property.bathroomCount ?? "—" },
            { icon: Building2,  label: "Bina Yaşı",   value: property.buildingAge != null ? `${property.buildingAge} yıl` : "—" },
            { icon: Thermometer,label: "Isıtma",      value: property.heatingType ?? "—" },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="border border-gray-200">
              <CardContent className="p-3 flex flex-col items-center text-center">
                <Icon className="w-4 h-4 mb-1 text-blue-600" />
                <p className="text-[10px] font-semibold text-black uppercase tracking-wide">{label}</p>
                <p className="text-xs font-bold text-black mt-0.5">{String(value)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Özellikler */}
      {features.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Özellikler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {features.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-100 px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-medium text-black">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Açıklama & Öne Çıkanlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(listing.description || property?.description) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-black">Açıklama</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-black whitespace-pre-wrap leading-relaxed">
                {listing.description || property?.description}
              </p>
            </CardContent>
          </Card>
        )}
        {listing.highlights && listing.highlights.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-black">Öne Çıkanlar</CardTitle>
            </CardHeader>
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

      {/* Sorumlu Danışman */}
      {agent && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Sorumlu Danışman</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 shrink-0">
              {agent.firstName[0]}{agent.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-black">{agent.firstName} {agent.lastName}</p>
              <div className="flex flex-wrap gap-3 mt-1">
                {agent.phone && (
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Phone className="w-3 h-3" /> {agent.phone}
                  </a>
                )}
                {agent.email && (
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <Mail className="w-3 h-3" /> {agent.email}
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gezilerim */}
      {myVisits.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-amber-600" /> Gezilerim ({myVisits.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {myVisits.map((v) => (
              <div key={v.id} className="flex items-start justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-black">{fmtDate(v.scheduledAt)}</p>
                  {v.rating && (
                    <p className="text-xs text-amber-500">{"★".repeat(v.rating)}{"☆".repeat(5 - v.rating)}</p>
                  )}
                  {v.feedback && (
                    <p className="text-xs text-black mt-0.5 italic">"{v.feedback}"</p>
                  )}
                </div>
                <Badge
                  variant={v.status === "COMPLETED" ? "default" : v.status === "CANCELLED" ? "destructive" : "outline"}
                  className="text-[10px] shrink-0"
                >
                  {visitStatusLabel[v.status] ?? v.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sözleşmelerim */}
      {myContracts.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" /> Bu İlana Ait Sözleşmelerim
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {myContracts.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-black">{c.contractNo}</p>
                  <p className="text-xs text-black">{fmtDate(c.startDate)}</p>
                </div>
                <Badge variant={contractStatusVariant[c.status] ?? "secondary"} className="text-xs shrink-0">
                  {contractStatusLabel[c.status] ?? c.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Kredi Hesaplayıcı (satılık) */}
      {listing.listingType === "SALE" && (
        <MortgageCalculator price={listing.askingPrice} currency={listing.currency} />
      )}
    </div>
  );
}
