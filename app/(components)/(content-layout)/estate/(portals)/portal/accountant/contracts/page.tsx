import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import db from "@/app/lib/db";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";

export const metadata: Metadata = { title: "Sözleşmeler - Muhasebe Portalı" };

const typeLabel: Record<string, string> = {
  SALE: "Satış", RENTAL: "Kiralama", PRE_SALE: "Ön Satış",
};
const statusLabel: Record<string, string> = {
  DRAFT: "Taslak", ACTIVE: "Aktif", COMPLETED: "Tamamlandı",
  CANCELLED: "İptal", EXPIRED: "Süresi Doldu",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  DRAFT: "outline", ACTIVE: "default", COMPLETED: "secondary",
  CANCELLED: "destructive", EXPIRED: "destructive",
};

function fmt(v: number | null | undefined, cur = "TRY") {
  if (!v) return "—";
  return `${v.toLocaleString("tr-TR")} ${cur}`;
}
function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function AccountantContractsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const contracts = await db.propertyContract.findMany({
    where:   { agencyId: agency.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, contractNo: true, contractType: true, status: true,
      startDate: true, endDate: true, salePrice: true, rentalPrice: true,
      commission: true, deposit: true, currency: true,
      agentName: true, clientName: true,
      property: { select: { title: true, city: true } },
      _count: { select: { payments: true } },
    },
  });

  const totalSale       = contracts.filter((c) => c.contractType === "SALE"    && c.status === "COMPLETED").reduce((s, c) => s + (c.salePrice    ?? 0), 0);
  const totalRental     = contracts.filter((c) => c.contractType === "RENTAL"  && c.status === "COMPLETED").reduce((s, c) => s + (c.rentalPrice  ?? 0), 0);
  const totalCommission = contracts.filter((c) => c.status === "COMPLETED").reduce((s, c) => s + (c.commission ?? 0), 0);
  const currency        = contracts[0]?.currency ?? "TRY";

  return (
    <div className="w-full p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Sözleşmeler</h1>
        <p className="text-sm text-black mt-1">Tüm sözleşmeler ve finansal özet.</p>
      </div>

      {/* Finansal Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Toplam Sözleşme",    value: String(contracts.length) },
          { label: "Satış Cirosu",        value: fmt(totalSale,       currency) },
          { label: "Kira Cirosu",         value: fmt(totalRental,     currency) },
          { label: "Toplam Komisyon",     value: fmt(totalCommission, currency) },
        ].map(({ label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-4 text-center">
              <p className="text-xl font-extrabold text-black">{value}</p>
              <p className="text-xs text-black mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tablo */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black">
            Sözleşme Listesi
            <Badge variant="secondary" className="ml-2 text-xs">{contracts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  {["Sözleşme No", "Tip / Durum", "Mülk", "Danışman", "Müşteri", "Tutar", "Komisyon", "Tarih", "Ödeme"].map((h) => (
                    <th key={h} className="px-3 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contracts.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-8 text-center text-sm text-black">Kayıt bulunmuyor.</td></tr>
                ) : contracts.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 font-semibold text-black text-xs">{c.contractNo}</td>
                    <td className="px-3 py-3 space-y-0.5">
                      <Badge variant="outline" className="text-[10px] block w-fit">{typeLabel[c.contractType] ?? c.contractType}</Badge>
                      <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px] block w-fit">{statusLabel[c.status] ?? c.status}</Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-black">
                      <p className="truncate max-w-[120px]">{c.property?.title ?? "—"}</p>
                      <p className="text-[10px] text-gray-500">{c.property?.city ?? ""}</p>
                    </td>
                    <td className="px-3 py-3 text-xs text-black">{c.agentName}</td>
                    <td className="px-3 py-3 text-xs text-black">{c.clientName}</td>
                    <td className="px-3 py-3 text-xs text-black whitespace-nowrap">
                      {fmt(c.salePrice ?? c.rentalPrice, c.currency)}
                    </td>
                    <td className="px-3 py-3 text-xs text-black whitespace-nowrap">
                      {fmt(c.commission, c.currency)}
                    </td>
                    <td className="px-3 py-3 text-xs text-black whitespace-nowrap">{fmtDate(c.startDate)}</td>
                    <td className="px-3 py-3 text-xs text-black text-center">{c._count.payments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden divide-y divide-gray-100">
            {contracts.map((c) => (
              <div key={c.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-black">{c.contractNo}</p>
                    <p className="text-xs text-black">{c.property?.title ?? "—"}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="outline" className="text-[10px]">{typeLabel[c.contractType] ?? c.contractType}</Badge>
                    <Badge variant={statusVariant[c.status] ?? "secondary"} className="text-[10px]">{statusLabel[c.status] ?? c.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-black">
                  <span>{c.agentName} · {c.clientName}</span>
                  <span className="font-semibold">{fmt(c.salePrice ?? c.rentalPrice, c.currency)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
