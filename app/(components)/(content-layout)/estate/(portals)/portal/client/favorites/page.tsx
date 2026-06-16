import { validateRequest } from "@/app/auth";
import { getClientFromUserId } from "../../../../actions/client-portal";
import { getClientInterests } from "../../../../actions/client-interests";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Heart, MapPin, Home, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Favorilerim - Müşteri Portalı" };

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
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

export default async function ClientFavoritesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const interests = await getClientInterests(client.id);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-blue-600 fill-current" />
        <h1 className="text-xl sm:text-2xl font-extrabold text-black">Favorilerim</h1>
        <Badge variant="secondary" className="text-xs text-black">{interests.length}</Badge>
      </div>

      {interests.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Heart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-black">Henüz favori ilanınız yok.</p>
            <p className="text-xs text-gray-400 mt-1">
              İlan detayında "İlgileniyorum" butonuna basarak favorilerinize ekleyebilirsiniz.
            </p>
            <Link
              href="/estate/portal/client/listings"
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              İlanları Keşfet <ArrowRight className="w-4 h-4" />
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {interests.map((it) => {
            const l    = it.listing;
            const p    = l?.property;
            const cover = p?.images?.[0]?.url;
            return (
              <Link key={it.id} href={`/estate/portal/client/listing/${l.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative h-44 sm:h-40 w-full shrink-0 overflow-hidden bg-gray-100">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={l.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Home className="w-10 h-10 text-gray-300" />
                      </div>
                    )}
                    <Badge
                      variant={listingStatusVariant[l.status] ?? "secondary"}
                      className="absolute top-2 right-2 text-[10px]"
                    >
                      {listingStatusLabel[l.status] ?? l.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-black line-clamp-2">{l.title}</p>
                      <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    </div>
                    {p && (
                      <p className="text-xs text-black flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                        {p.neighborhood && `${p.neighborhood}, `}{p.district}, {p.city}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="text-[10px] text-black">
                        {listingTypeLabel[l.listingType] ?? l.listingType}
                      </Badge>
                      {p?.propertyType && (
                        <Badge variant="outline" className="text-[10px] text-black">
                          {propertyTypeLabel[p.propertyType] ?? p.propertyType}
                        </Badge>
                      )}
                      {p?.roomCount && (
                        <Badge variant="outline" className="text-[10px] text-black">{p.roomCount}</Badge>
                      )}
                      {it.priority && (
                        <Badge variant="secondary" className="text-[10px] text-black">{it.priority}</Badge>
                      )}
                    </div>
                    <p className="text-lg font-extrabold text-blue-600">
                      {l.askingPrice.toLocaleString("tr-TR")} {l.currency}
                      {l.monthlyRent && (
                        <span className="text-xs font-normal text-black"> · {l.monthlyRent.toLocaleString("tr-TR")}/ay</span>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
