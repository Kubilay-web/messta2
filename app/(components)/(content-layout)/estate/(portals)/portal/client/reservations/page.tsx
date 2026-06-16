import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getClientReservations } from "../../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Rezervasyonlarım - Müşteri Portalı" };

const statusLabel: Record<string, string> = { ACTIVE: "Aktif", CONVERTED: "Sözleşmeye Dönüştü", CANCELLED: "İptal", EXPIRED: "Süresi Doldu", REFUNDED: "Kapora İade" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { ACTIVE: "default", CONVERTED: "secondary", CANCELLED: "destructive", EXPIRED: "secondary", REFUNDED: "outline" };

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

export default async function ClientReservationsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client = await getClientFromUserId(user.id);
  if (!client) redirect("/login");

  const reservations = await getClientReservations(client.id);
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rezervasyonlarım</h1>
          <p className="text-muted-foreground text-sm mt-1">Kapora ile ayırttığınız mülkler.</p>
        </div>
        <Badge variant="secondary" className="text-sm">{reservations.length} kayıt</Badge>
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">Henüz rezervasyonunuz bulunmuyor.</div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>{["Rez. No", "Mülk", "Kapora", "Geçerlilik", "Durum"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-black">{r.reservationNo}</td>
                    <td className="px-4 py-3 text-sm text-black truncate max-w-[180px]">{r.property?.title ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-black">{money(r.depositAmount, r.currency)}</td>
                    <td className="px-4 py-3 text-xs text-black">{fmtDate(r.reservedUntil)}</td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs">{statusLabel[r.status] ?? r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-2">
            {reservations.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{r.reservationNo}</p>
                    <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs shrink-0">{statusLabel[r.status] ?? r.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.property?.title ?? "—"}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Geçerlilik: {fmtDate(r.reservedUntil)}</span>
                    <span className="font-semibold">{money(r.depositAmount, r.currency)}</span>
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
