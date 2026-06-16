"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Eye, MapPin, Home } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../components/ui/dialog";

type PropertyItem = {
  id: string;
  title: string;
  city: string;
  district: string;
  propertyType: string;
  status: string;
  price?: number | null;
  currency: string;
  grossArea?: number | null;
  netArea?: number | null;
  roomCount?: string | null;
  hasElevator: boolean;
  hasParking: boolean;
  isFurnished: boolean;
  ownerName?: string | null;
  ownerPhone?: string | null;
  agencyName: string;
  createdAt: Date | string;
  _count?: { listings: number; visits: number; contracts: number };
};

const typeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

const statusLabel: Record<string, string> = {
  AVAILABLE: "Müsait", SOLD: "Satıldı", RENTED: "Kiralandı",
  UNDER_CONTRACT: "Sözleşmede", UNDER_MAINTENANCE: "Bakımda",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: "default",
  SOLD: "destructive",
  RENTED: "secondary",
  UNDER_CONTRACT: "outline",
  UNDER_MAINTENANCE: "outline",
};

function PropertyDetail({ p }: { p: PropertyItem }) {
  const features = [
    p.hasElevator && "Asansör",
    p.hasParking  && "Otopark",
    p.isFurnished && "Eşyalı",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-4">
      <div>
        <p className="font-bold text-black">{p.title}</p>
        <p className="text-xs text-black flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />{p.district} / {p.city}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {[
          { label: "Tip",    value: typeLabel[p.propertyType] ?? p.propertyType },
          { label: "Durum",  value: statusLabel[p.status] ?? p.status },
          { label: "Fiyat",  value: p.price ? `${p.price.toLocaleString("tr-TR")} ${p.currency}` : "—" },
          { label: "Alan",   value: p.grossArea ? `${p.grossArea} m²` : "—" },
          { label: "Oda",    value: p.roomCount ?? "—" },
          { label: "Ofis",   value: p.agencyName },
          { label: "Mal Sahibi", value: p.ownerName ?? "—" },
          { label: "Tel",    value: p.ownerPhone ?? "—" },
          { label: "Kayıt",  value: new Date(p.createdAt).toLocaleDateString("tr-TR") },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold text-black uppercase tracking-wide">{label}</p>
            <p className="text-sm text-black truncate">{value}</p>
          </div>
        ))}
      </div>

      {features.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <Badge key={f} variant="secondary" className="text-xs text-black">{f}</Badge>
          ))}
        </div>
      )}

      {p._count && (
        <div className="grid grid-cols-3 gap-2 border-t pt-3">
          {[
            { label: "İlan",      value: p._count.listings },
            { label: "Ziyaret",   value: p._count.visits },
            { label: "Sözleşme",  value: p._count.contracts },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-black">{value}</p>
              <p className="text-[10px] text-black">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1 border-t">
        <Button asChild size="sm" className="flex-1 text-xs">
          <Link href={`/estate/portal/secretary/properties/view/${p.id}`}>
            Detay
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
          <Link href={`/estate/dashboard/properties/edit/${p.id}`}>
            Düzenle
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function SecretaryPropertiesTable({ properties }: { properties: PropertyItem[] }) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return properties;
    return properties.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      (typeLabel[p.propertyType] ?? p.propertyType).toLowerCase().includes(q)
    );
  }, [properties, search]);

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Mülk adı, şehir veya tip ara…"
          className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
          {search ? "Sonuç bulunamadı." : "Henüz mülk kaydı yok."}
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Mülk", "Konum", "Tip", "Durum", "Fiyat", "Alan", "Kayıt", "İşlem"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <Home className="w-4 h-4 text-blue-700" />
                        </div>
                        <p className="font-semibold text-black truncate max-w-[160px]">{p.title}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-black">{p.district} / {p.city}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs text-black">
                        {typeLabel[p.propertyType] ?? p.propertyType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[p.status] ?? "outline"} className="text-xs">
                        {statusLabel[p.status] ?? p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                      {p.price ? `${p.price.toLocaleString("tr-TR")} ${p.currency}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-black">
                      {p.grossArea ? `${p.grossArea} m²` : "—"}
                      {p.roomCount && <span className="ml-1 text-muted-foreground">/ {p.roomCount}</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(p.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Dialog open={openId === p.id} onOpenChange={(v) => setOpenId(v ? p.id : null)}>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                          <DialogHeader>
                            <DialogTitle className="text-black">Mülk Detayı</DialogTitle>
                          </DialogHeader>
                          <PropertyDetail p={p} />
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-2">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black truncate">{p.title}</p>
                    <p className="text-xs text-black">{p.district} / {p.city}</p>
                    <p className="text-xs text-black">
                      {p.price ? `${p.price.toLocaleString("tr-TR")} ${p.currency}` : "—"}
                    </p>
                  </div>
                  <Dialog open={openId === p.id} onOpenChange={(v) => setOpenId(v ? p.id : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                      <DialogHeader>
                        <DialogTitle className="text-black">Mülk Detayı</DialogTitle>
                      </DialogHeader>
                      <PropertyDetail p={p} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="px-4 pb-2 flex gap-1.5">
                  <Badge variant="outline" className="text-[10px] text-black">
                    {typeLabel[p.propertyType] ?? p.propertyType}
                  </Badge>
                  <Badge variant={statusVariant[p.status] ?? "outline"} className="text-[10px]">
                    {statusLabel[p.status] ?? p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-black text-right">{filtered.length} / {properties.length} mülk</p>
        </>
      )}
    </div>
  );
}
