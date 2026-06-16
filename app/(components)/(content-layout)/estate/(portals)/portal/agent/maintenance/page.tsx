import { validateRequest } from "@/app/auth";
import { getAgentFromUserId, getAgentMaintenance } from "../../../../actions/agent-portal";
import { redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bakım Taleplerim - Danışman Portalı" };

const priorityLabel: Record<string, string> = { LOW: "Düşük", MEDIUM: "Orta", HIGH: "Yüksek", URGENT: "Acil" };
const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { LOW: "outline", MEDIUM: "secondary", HIGH: "default", URGENT: "destructive" };
const statusLabel: Record<string, string> = { OPEN: "Açık", IN_PROGRESS: "İşlemde", RESOLVED: "Çözüldü", CANCELLED: "İptal" };
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = { OPEN: "outline", IN_PROGRESS: "secondary", RESOLVED: "default", CANCELLED: "destructive" };

function money(v?: number | null, c = "TRY") {
  if (v === null || v === undefined) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(v);
}

export default async function AgentMaintenancePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) redirect("/login");

  const reqs = agent ? await getAgentMaintenance(agent.id) : [];
  const fmtDate = (d: Date | string) => new Date(d).toLocaleDateString("tr-TR");

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bakım Taleplerim</h1>
          <p className="text-muted-foreground text-sm mt-1">Size atanan bakım / arıza talepleri.</p>
        </div>
        <Badge variant="secondary" className="text-sm">{reqs.length} talep</Badge>
      </div>

      {reqs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-sm text-muted-foreground">Size atanmış bakım talebi bulunmuyor.</div>
      ) : (
        <>
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>{["Talep No", "Başlık", "Mülk", "Öncelik", "Durum", "Maliyet", "Tarih"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reqs.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-black">{r.requestNo}</td>
                    <td className="px-4 py-3 text-sm text-black truncate max-w-[150px]">{r.title}</td>
                    <td className="px-4 py-3 text-sm text-black">{r.property?.title ?? "—"}</td>
                    <td className="px-4 py-3"><Badge variant={priorityVariant[r.priority] ?? "secondary"} className="text-xs">{priorityLabel[r.priority] ?? r.priority}</Badge></td>
                    <td className="px-4 py-3"><Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs">{statusLabel[r.status] ?? r.status}</Badge></td>
                    <td className="px-4 py-3 text-sm text-black">{money(r.cost, r.currency)}</td>
                    <td className="px-4 py-3 text-xs text-black">{fmtDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden space-y-2">
            {reqs.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{r.requestNo}</p>
                    <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs shrink-0">{statusLabel[r.status] ?? r.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{r.title} · {r.property?.title ?? "—"}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge variant={priorityVariant[r.priority] ?? "secondary"}>{priorityLabel[r.priority] ?? r.priority}</Badge>
                    <span className="font-semibold">{money(r.cost, r.currency)}</span>
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
