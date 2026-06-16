import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getClientOffers } from "../../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Tekliflerim - Müşteri Portalı" };

const typeLabel: Record<string, string> = { SALE: "Satılık", RENT: "Kiralık", SHORT_RENT: "Kısa Dönem" };
const statusLabel: Record<string, string> = { PENDING: "Beklemede", COUNTERED: "Karşı Teklif", ACCEPTED: "Kabul Edildi", REJECTED: "Reddedildi", WITHDRAWN: "Geri Çekildi", EXPIRED: "Süresi Doldu" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { PENDING: "outline", COUNTERED: "secondary", ACCEPTED: "default", REJECTED: "destructive", WITHDRAWN: "destructive", EXPIRED: "secondary" };

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

export default async function ClientOffersPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const offers = await getClientOffers(client.id);
  const fmtDate = (d: Date | string | null) => (d ? new Date(d).toLocaleDateString("tr-TR") : "—");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tekliflerim</h1>
          <p className="text-muted-foreground text-sm mt-1">Verdiğiniz tekliflerin güncel durumu.</p>
        </div>
        <Badge variant="secondary" className="text-sm">{offers.length} teklif</Badge>
      </div>

      {offers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">Henüz teklif vermediniz.</div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>{["Teklif No", "İlan", "Tür", "Teklifim", "Karşı Teklif", "Geçerlilik", "Durum"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offers.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-black">{o.offerNo}</td>
                    <td className="px-4 py-3 text-sm text-black truncate max-w-[160px]">{o.listing?.title ?? o.property?.title ?? "—"}</td>
                    <td className="px-4 py-3 text-sm text-black">{typeLabel[o.offerType] ?? o.offerType}</td>
                    <td className="px-4 py-3 font-semibold text-black">{money(o.amount, o.currency)}</td>
                    <td className="px-4 py-3 text-sm text-black">{money(o.counterAmount, o.currency)}</td>
                    <td className="px-4 py-3 text-xs text-black">{fmtDate(o.validUntil)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[o.status] ?? "secondary"} className="text-xs">{statusLabel[o.status] ?? o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-2">
            {offers.map((o) => (
              <Card key={o.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{o.offerNo}</p>
                    <Badge variant={statusVariant[o.status] ?? "secondary"} className="text-xs shrink-0">{statusLabel[o.status] ?? o.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{o.listing?.title ?? o.property?.title ?? "—"}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant="outline">{typeLabel[o.offerType] ?? o.offerType}</Badge>
                    <span className="font-semibold">{money(o.amount, o.currency)}</span>
                  </div>
                  {o.counterAmount != null && <p className="text-xs text-muted-foreground">Karşı teklif: {money(o.counterAmount, o.currency)}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
