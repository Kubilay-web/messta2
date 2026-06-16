"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Pencil, Trash2, LogIn, LogOut, RefreshCw, Activity } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

const actionMeta: Record<string, { label: string; icon: any; cls: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  CREATE:        { label: "Oluşturma",   icon: Plus,      cls: "text-green-600",  variant: "default" },
  UPDATE:        { label: "Güncelleme",  icon: Pencil,    cls: "text-blue-600",   variant: "secondary" },
  DELETE:        { label: "Silme",       icon: Trash2,    cls: "text-red-600",    variant: "destructive" },
  STATUS_CHANGE: { label: "Durum Değ.",  icon: RefreshCw, cls: "text-amber-600",  variant: "outline" },
  LOGIN:         { label: "Giriş",       icon: LogIn,     cls: "text-teal-600",   variant: "outline" },
  LOGOUT:        { label: "Çıkış",       icon: LogOut,    cls: "text-gray-600",   variant: "outline" },
  OTHER:         { label: "Diğer",       icon: Activity,  cls: "text-gray-600",   variant: "secondary" },
};

const entityLabel: Record<string, string> = {
  PropertyOffer: "Teklif", PropertyReservation: "Rezervasyon", AgencyInvoice: "Fatura",
  AgencyExpense: "Gider", AgentPayroll: "Bordro", MaintenanceRequest: "Bakım Talebi",
  CommunicationLog: "İletişim", AgencyNotification: "Bildirim",
};

type Log = {
  id: string; action: string; entity: string; entityId?: string | null;
  summary: string; userName?: string | null; userRole?: string | null; createdAt: Date | string;
};

export default function AuditView({
  logs, entities, entity, action,
}: { logs: Log[]; entities: string[]; entity?: string; action?: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  function setParam(key: string, val: string) {
    const params = new URLSearchParams(sp.toString());
    if (val) params.set(key, val); else params.delete(key);
    router.push(`/estate/dashboard/audit-logs?${params.toString()}`);
  }

  const selectCls = "rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none";
  const fmt = (d: Date | string) => new Date(d).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });

  return (
    <div className="space-y-4">
      {/* Filtreler */}
      <div className="flex flex-col sm:flex-row gap-2">
        <select className={selectCls} value={entity ?? ""} onChange={(e) => setParam("entity", e.target.value)}>
          <option value="">Tüm modüller</option>
          {entities.map((e) => (<option key={e} value={e}>{entityLabel[e] ?? e}</option>))}
        </select>
        <select className={selectCls} value={action ?? ""} onChange={(e) => setParam("action", e.target.value)}>
          <option value="">Tüm işlemler</option>
          {Object.entries(actionMeta).map(([k, v]) => (<option key={k} value={k}>{v.label}</option>))}
        </select>
      </div>

      {!logs.length ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Kayıt bulunmuyor.</div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["İşlem", "Modül", "Özet", "Kullanıcı", "Rol", "Zaman"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((l) => {
                  const m = actionMeta[l.action] ?? actionMeta.OTHER;
                  const Icon = m.icon;
                  return (
                    <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3"><Badge variant={m.variant} className="text-xs inline-flex items-center gap-1"><Icon className="w-3 h-3" />{m.label}</Badge></td>
                      <td className="px-4 py-3 text-sm text-black">{entityLabel[l.entity] ?? l.entity}</td>
                      <td className="px-4 py-3 text-sm text-black">{l.summary}</td>
                      <td className="px-4 py-3 text-sm text-black">{l.userName ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-black">{l.userRole ?? "—"}</td>
                      <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmt(l.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-3">
            {logs.map((l) => {
              const m = actionMeta[l.action] ?? actionMeta.OTHER;
              const Icon = m.icon;
              return (
                <div key={l.id} className="rounded-xl border border-gray-200 bg-white shadow-sm p-3">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge variant={m.variant} className="text-[10px] inline-flex items-center gap-1"><Icon className="w-3 h-3" />{m.label}</Badge>
                    <span className="text-[10px] text-black">{fmt(l.createdAt)}</span>
                  </div>
                  <p className="text-sm text-black">{l.summary}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-black">
                    <span>{entityLabel[l.entity] ?? l.entity}</span>
                    {l.userName && <span>• {l.userName}</span>}
                    {l.userRole && <span>({l.userRole})</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
