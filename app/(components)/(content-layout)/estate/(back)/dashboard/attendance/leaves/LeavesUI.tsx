"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Trash2, Plus, X } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import {
  createAgentLeave, updateLeaveStatus, deleteAgentLeave,
  CreateLeaveProps, LeaveTypeGayrimenkul,
} from "../../../../actions/agent-leaves";

const typeLabel: Record<string, string> = {
  SICK: "Hastalık", CASUAL: "Mazeret", VACATION: "Yıllık İzin", OTHER: "Diğer",
};
const statusLabel: Record<string, string> = {
  PENDING: "Beklemede", APPROVED: "Onaylandı", REJECTED: "Reddedildi", CANCELLED: "İptal",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline", APPROVED: "default", REJECTED: "destructive", CANCELLED: "secondary",
};

type Agent = { id: string; firstName: string; lastName: string; departmentName: string };
type Leave = {
  id: string; startDate: Date | string; endDate: Date | string;
  type: string; reason: string; status: string;
  approvedBy?: string | null; approvedAt?: Date | string | null;
  agent: Agent | null;
};

type Props = {
  leaves:        Leave[];
  agents:        Agent[];
  currentUserId: string;
};

function fmtDate(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("tr-TR");
}

function dayCount(start: any, end: any) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24)) + 1;
}

export default function LeavesUI({ leaves: initialLeaves, agents, currentUserId }: Props) {
  const router                    = useRouter();
  const [pending, startTransition] = useTransition();
  const [leaves, setLeaves]       = useState<Leave[]>(initialLeaves);
  const [showForm, setShowForm]   = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [form, setForm] = useState<CreateLeaveProps & { agentId: string }>({
    agentId:   agents[0]?.id ?? "",
    startDate: new Date().toISOString().split("T")[0],
    endDate:   new Date().toISOString().split("T")[0],
    type:      "VACATION",
    reason:    "",
  });

  function setF(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.reason.trim()) { toast.error("Lütfen bir neden girin."); return; }
    startTransition(async () => {
      try {
        const saved = await createAgentLeave(form);
        const agent = agents.find((a) => a.id === form.agentId) ?? null;
        setLeaves((p) => [{ ...saved, agent } as any, ...p]);
        setShowForm(false);
        setForm((p) => ({ ...p, reason: "" }));
        toast.success("İzin talebi oluşturuldu.");
      } catch (e: any) {
        toast.error(e?.message ?? "Oluşturulamadı.");
      }
    });
  }

  function handleStatus(id: string, status: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      try {
        await updateLeaveStatus(id, status, currentUserId);
        setLeaves((p) => p.map((l) => l.id === id ? { ...l, status } : l));
        toast.success(status === "APPROVED" ? "Onaylandı." : "Reddedildi.");
      } catch {
        toast.error("Güncellenemedi.");
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteAgentLeave(id);
        setLeaves((p) => p.filter((l) => l.id !== id));
        toast.success("Silindi.");
      } catch {
        toast.error("Silinemedi.");
      }
    });
  }

  const filtered = statusFilter === "ALL" ? leaves : leaves.filter((l) => l.status === statusFilter);

  return (
    <div className="space-y-5">

      {/* Özet kartlar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {["PENDING","APPROVED","REJECTED","CANCELLED"].map((s) => {
          const count = leaves.filter((l) => l.status === s).length;
          return (
            <Card
              key={s}
              className={`cursor-pointer border-2 transition-colors ${statusFilter === s ? "border-blue-500 bg-blue-50" : "border-transparent"}`}
              onClick={() => setStatusFilter(statusFilter === s ? "ALL" : s)}
            >
              <CardContent className="p-3 text-center">
                <p className="text-2xl font-extrabold text-black">{count}</p>
                <p className="text-xs text-black mt-0.5">{statusLabel[s]}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Yeni talep butonu */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-black">
          {filtered.length} kayıt
          {statusFilter !== "ALL" && ` · ${statusLabel[statusFilter]}`}
        </p>
        <Button size="sm" onClick={() => setShowForm((p) => !p)}>
          {showForm ? <><X className="mr-1.5 w-3.5 h-3.5" /> İptal</> : <><Plus className="mr-1.5 w-3.5 h-3.5" /> Yeni Talep</>}
        </Button>
      </div>

      {/* Yeni talep formu */}
      {showForm && (
        <Card className="border-t-4 border-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black">Yeni İzin Talebi</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-black">Danışman</Label>
                  <select
                    value={form.agentId}
                    onChange={(e) => setF("agentId", e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>{a.firstName} {a.lastName} — {a.departmentName}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-black">İzin Tipi</Label>
                  <select
                    value={form.type}
                    onChange={(e) => setF("type", e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {Object.entries(typeLabel).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs text-black">Başlangıç</Label>
                  <Input type="date" value={form.startDate} onChange={(e) => setF("startDate", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-black">Bitiş</Label>
                  <Input type="date" value={form.endDate} min={form.startDate} onChange={(e) => setF("endDate", e.target.value)} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-black">Neden</Label>
                <Input
                  value={form.reason}
                  onChange={(e) => setF("reason", e.target.value)}
                  placeholder="İzin nedeni..."
                  required
                />
              </div>
              <Button type="submit" disabled={pending} size="sm">
                {pending ? "Kaydediliyor…" : "Talep Oluştur"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
          Kayıt bulunamadı.
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Danışman", "İzin Tipi", "Süre", "Neden", "Durum", "Onaylayan", "İşlemler"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-black">{l.agent ? `${l.agent.firstName} ${l.agent.lastName}` : "—"}</p>
                      <p className="text-xs text-black">{l.agent?.departmentName ?? ""}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-black">{typeLabel[l.type] ?? l.type}</td>
                    <td className="px-4 py-3 text-xs text-black">
                      <p>{fmtDate(l.startDate)} – {fmtDate(l.endDate)}</p>
                      <p className="font-medium">{dayCount(l.startDate, l.endDate)} gün</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-black max-w-[180px] truncate">{l.reason}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusVariant[l.status] ?? "secondary"} className="text-xs">
                        {statusLabel[l.status] ?? l.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-black">
                      {l.approvedBy ? <>{l.approvedBy}<br /><span className="text-[10px]">{fmtDate(l.approvedAt)}</span></> : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {l.status === "PENDING" && (
                          <>
                            <Button size="icon" variant="outline" className="h-7 w-7 text-green-600 border-green-200 hover:bg-green-50" title="Onayla" disabled={pending} onClick={() => handleStatus(l.id, "APPROVED")}>
                              <CheckCircle className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-7 w-7 text-red-600 border-red-200 hover:bg-red-50" title="Reddet" disabled={pending} onClick={() => handleStatus(l.id, "REJECTED")}>
                              <XCircle className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive" className="h-7 w-7">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
                            <AlertDialogHeader>
                              <AlertDialogTitle>İzin kaydı silinsin mi?</AlertDialogTitle>
                              <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(l.id)}>Sil</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-3">
            {filtered.map((l) => (
              <div key={l.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-black truncate">
                      {l.agent ? `${l.agent.firstName} ${l.agent.lastName}` : "—"}
                    </p>
                    <p className="text-xs text-black">{l.agent?.departmentName}</p>
                  </div>
                  <Badge variant={statusVariant[l.status] ?? "secondary"} className="text-[10px] shrink-0">
                    {statusLabel[l.status] ?? l.status}
                  </Badge>
                </div>
                <div className="px-4 py-2 space-y-1">
                  {[
                    { label: "Tip",   value: typeLabel[l.type] ?? l.type },
                    { label: "Süre",  value: `${fmtDate(l.startDate)} – ${fmtDate(l.endDate)} (${dayCount(l.startDate, l.endDate)} gün)` },
                    { label: "Neden", value: l.reason },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-2 text-xs">
                      <span className="text-black font-medium shrink-0">{label}</span>
                      <span className="text-black truncate max-w-[200px]">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-1.5 px-4 py-2.5 bg-gray-50 border-t border-gray-100">
                  {l.status === "PENDING" && (
                    <>
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200 h-8 text-xs" disabled={pending} onClick={() => handleStatus(l.id, "APPROVED")}>
                        <CheckCircle className="mr-1 w-3.5 h-3.5" /> Onayla
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 h-8 text-xs" disabled={pending} onClick={() => handleStatus(l.id, "REJECTED")}>
                        <XCircle className="mr-1 w-3.5 h-3.5" /> Reddet
                      </Button>
                    </>
                  )}
                  <Button size="icon" variant="destructive" className="h-8 w-8" disabled={pending} onClick={() => handleDelete(l.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
