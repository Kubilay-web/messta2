import { validateRequest } from "@/app/auth";
import { getPropertyById } from "../../../../../../actions/properties";
import { notFound } from "next/navigation";
import { Badge } from "../../../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { MapPin, Ruler, BedDouble, Phone, User } from "lucide-react";

const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

const statusLabel: Record<string, string> = {
  AVAILABLE: "Müsait", SOLD: "Satıldı", RENTED: "Kiralandı",
  UNDER_CONTRACT: "Sözleşmede", UNDER_MAINTENANCE: "Bakımda",
};

export default async function PropertyViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  const { user } = await validateRequest();
  if (!user) return null;

  const property = await getPropertyById(id);
  if (!property) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4" />
            {property.address}, {property.district} / {property.city}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{propertyTypeLabel[property.propertyType] ?? property.propertyType}</Badge>
          <Badge>{statusLabel[property.status] ?? property.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Fiyat</p>
            <p className="text-xl font-bold">
              {property.price ? `${property.price.toLocaleString("tr-TR")} ${property.currency}` : "—"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Ruler className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Alan</p>
              <p className="font-semibold">
                {property.grossArea ? `${property.grossArea} m² brüt` : "—"}
                {property.netArea ? ` / ${property.netArea} m² net` : ""}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BedDouble className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Oda</p>
              <p className="font-semibold">{property.roomCount ?? "—"}</p>
              {property.bathroomCount && (
                <p className="text-xs text-muted-foreground">{property.bathroomCount} banyo</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Özellikler</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {property.hasElevator  && <Badge variant="secondary">Asansör</Badge>}
            {property.hasParking   && <Badge variant="secondary">Otopark</Badge>}
            {property.isFurnished  && <Badge variant="secondary">Eşyalı</Badge>}
            {property.hasGarden    && <Badge variant="secondary">Bahçe</Badge>}
            {property.hasPool      && <Badge variant="secondary">Havuz</Badge>}
            {property.hasBalcony   && <Badge variant="secondary">Balkon</Badge>}
            {property.isFeatured   && <Badge>Öne Çıkan</Badge>}
          </div>
          {property.heatingType && (
            <p className="text-sm mt-3 text-muted-foreground">Isıtma: {property.heatingType}</p>
          )}
          {property.buildingAge != null && (
            <p className="text-sm text-muted-foreground">Bina yaşı: {property.buildingAge} yıl</p>
          )}
          {property.floorNo != null && (
            <p className="text-sm text-muted-foreground">
              {property.floorNo}. kat / {property.totalFloors ?? "?"} toplam kat
            </p>
          )}
        </CardContent>
      </Card>

      {(property.ownerName || property.ownerPhone) && (
        <Card>
          <CardHeader><CardTitle className="text-base">Mal Sahibi</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {property.ownerName && (
              <p className="flex items-center gap-2 text-sm"><User className="w-4 h-4" />{property.ownerName}</p>
            )}
            {property.ownerPhone && (
              <p className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4" />{property.ownerPhone}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle className="text-base">İstatistikler</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "İlan",      value: property._count?.listings  ?? 0 },
              { label: "Ziyaret",   value: property._count?.visits    ?? 0 },
              { label: "Sözleşme",  value: property._count?.contracts ?? 0 },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {property.description && (
        <Card>
          <CardHeader><CardTitle className="text-base">Açıklama</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{property.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
