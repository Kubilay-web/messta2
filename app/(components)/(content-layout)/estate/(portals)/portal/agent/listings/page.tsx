import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentListings } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Eye, Home, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İlanlarım - Danışman Portalı" };

const listingTypeLabel: Record<string, string> = {
  SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Kiralık",
};
const listingStatusLabel: Record<string, string> = {
  ACTIVE: "Aktif", SOLD: "Satıldı", RENTED: "Kiralandı",
  WITHDRAWN: "Geri Çekildi", PENDING: "Beklemede", RESERVED: "Rezerve",
};
const listingStatusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  ACTIVE: "default", SOLD: "destructive", RENTED: "secondary",
  WITHDRAWN: "outline", PENDING: "outline", RESERVED: "outline",
};
const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

export default async function AgentListingsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const listings = agent ? await getAgentListings(agent.id) : [];

  const fmtDate = (d: Date | string | null) =>
    d ? new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) : "—";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">İlanlarım</h1>
          <p className="text-muted-foreground text-sm mt-1">Sorumlu olduğunuz tüm mülk ilanları.</p>
        </div>
        <Badge variant="secondary" className="text-sm">{listings.length} ilan</Badge>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">
          Henüz atanmış ilan bulunmuyor.
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["İlan", "Mülk", "Tip", "Durum", "Fiyat", "Görüntülenme", "Yayın", "İşlem"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-black text-sm truncate max-w-[160px]">{l.title}</p>
                      <p className="text-xs text-black">{l.listingNo}</p>
                    </td>
                    <td className="px-4 py-3">
                      {l.property ? (
                        <div>
                          <p className="text-sm text-black truncate max-w-[130px]">{l.property.title}</p>
                          <p className="text-xs text-black">{l.property.city}</p>
                        </div>
                      ) : <span className="text-black">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs text-black">
                        {listingTypeLabel[l.listingType] ?? l.listingType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={listingStatusVariant[l.status] ?? "outline"} className="text-xs">
                        {listingStatusLabel[l.status] ?? l.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-black whitespace-nowrap">
                      {l.listingType === "RENT" && l.monthlyRent
                        ? `${l.monthlyRent.toLocaleString("tr-TR")} ${l.currency}/ay`
                        : l.askingPrice
                          ? `${l.askingPrice.toLocaleString("tr-TR")} ${l.currency}`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="flex items-center gap-1 text-xs text-black">
                        <Eye className="w-3.5 h-3.5" />{l.views}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(l.publishedAt)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs text-black">
                        {l.property ? propertyTypeLabel[l.property.propertyType] ?? l.property.propertyType : "—"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-2">
            {listings.map((l) => (
              <Card key={l.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.listingNo}</p>
                    </div>
                    <Badge variant={listingStatusVariant[l.status] ?? "outline"} className="text-xs shrink-0">
                      {listingStatusLabel[l.status] ?? l.status}
                    </Badge>
                  </div>
                  {l.property && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Home className="w-3.5 h-3.5" />
                      {l.property.title} · {l.property.city}
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline">{listingTypeLabel[l.listingType] ?? l.listingType}</Badge>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" />{l.views} görüntülenme
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
