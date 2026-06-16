"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Tag } from "lucide-react";
import { Card, CardContent, Badge } from "../components/ui";
import { saleStatusLabel, propertyTypeLabel, formatCurrency, formatDate } from "../lib/labels";
import { updateSaleStatus, cancelSale } from "../actions/sales";
import { SalePaymentsDialog } from "./sale-payments-dialog";

export function SalesTable({
  agencyId,
  sales,
  canSell,
}: {
  agencyId: string;
  sales: any[];
  canSell: boolean;
}) {
  const router = useRouter();
  const [paymentsOpen, setPaymentsOpen] = useState(false);
  const [activeSale, setActiveSale] = useState<any | null>(null);

  return (
    <Card>
      <CardContent className="p-0">
        {sales.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground text-sm">
            <Tag className="size-9 mx-auto mb-2 opacity-40 block" />
            Henüz satış kaydı yok. Daireler sayfasından bir daire seçip &quot;Sat / Rezerve Et&quot; ile satış oluşturun.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Daire</th>
                  <th className="px-4 py-3 font-medium">Müşteri</th>
                  <th className="px-4 py-3 font-medium">Danışman</th>
                  <th className="px-4 py-3 font-medium text-right">Fiyat</th>
                  <th className="px-4 py-3 font-medium">Durum</th>
                  <th className="px-4 py-3 font-medium">Tarih</th>
                  {canSell && <th className="px-4 py-3 font-medium">İşlem</th>}
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b last:border-0 hover:bg-muted/40 cursor-pointer"
                    onClick={() => { setActiveSale(s); setPaymentsOpen(true); }}
                  >
                    <td className="px-4 py-3 font-medium">
                      {s.unit?.unitNo}
                      <span className="text-xs text-muted-foreground ml-1">{propertyTypeLabel[s.unit?.type] ?? ""}</span>
                    </td>
                    <td className="px-4 py-3">{s.clientName ?? "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.agentName ?? "—"}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatCurrency(s.salePrice, s.currency)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={s.status === "COMPLETED" ? "default" : "secondary"}>{saleStatusLabel[s.status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{formatDate(s.saleDate ?? s.createdAt)}</td>
                    {canSell && (
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <select
                            value={s.status}
                            onChange={async (e) => {
                              try {
                                await updateSaleStatus(s.id, e.target.value as any);
                                toast.success("Durum güncellendi.");
                                router.refresh();
                              } catch (err: any) {
                                toast.error(err?.message ?? "Hata");
                              }
                            }}
                            className="h-8 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent px-2 text-xs"
                          >
                            {["RESERVATION", "CONTRACT", "COMPLETED"].map((st) => (
                              <option key={st} value={st}>{saleStatusLabel[st]}</option>
                            ))}
                          </select>
                          <button
                            onClick={async () => {
                              if (!window.confirm("Satış iptal edilsin mi? Daire tekrar müsait olacak.")) return;
                              try { await cancelSale(s.id); toast.success("İptal edildi."); router.refresh(); }
                              catch (err: any) { toast.error(err?.message ?? "Hata"); }
                            }}
                            className="text-muted-foreground hover:text-red-500"
                            aria-label="İptal"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <SalePaymentsDialog open={paymentsOpen} onOpenChange={setPaymentsOpen} sale={activeSale} canManage={canSell} />
    </Card>
  );
}
