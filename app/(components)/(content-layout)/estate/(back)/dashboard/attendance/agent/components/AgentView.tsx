"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";
import { Label } from "../../../../../components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "../../../../../components/ui/select";
import toast from "react-hot-toast";
import { getAgentAttendanceHistory } from "../../../../../actions/agent-attendance";

type Agent = { id: string; firstName: string; lastName: string; employeeId: string; departmentName: string };

type HistoryRecord = {
  id: string; date: Date | string; status: string;
  checkIn?: Date | string | null; checkOut?: Date | string | null; note?: string | null;
};
type HistoryData = {
  agent: Agent & { imageUrl?: string | null };
  records: HistoryRecord[];
  counts: Record<string, number>;
};

const statusLabel: Record<string, string> = {
  PRESENT: "Var", ABSENT: "Yok", LATE: "Geç", ON_LEAVE: "İzinli", REMOTE: "Uzaktan",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PRESENT: "default", ABSENT: "destructive", LATE: "secondary", ON_LEAVE: "outline", REMOTE: "secondary",
};
const statusColor: Record<string, string> = {
  PRESENT: "bg-green-50 text-green-700", ABSENT: "bg-red-50 text-red-700",
  LATE: "bg-amber-50 text-amber-700", ON_LEAVE: "bg-purple-50 text-purple-700",
  REMOTE: "bg-blue-50 text-blue-700",
};

const MONTHS = [
  "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
  "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",
];

function fmtTime(d: any) {
  if (!d) return "—";
  return new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}
function fmtDate(d: any) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric", weekday: "short" });
}

export default function AgentView({ agents }: { agents: Agent[] }) {
  const now   = new Date();
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id ?? "");
  const [selectedMonth,   setSelectedMonth]   = useState(String(now.getMonth() + 1));
  const [selectedYear,    setSelectedYear]    = useState(String(now.getFullYear()));
  const [loading,         setLoading]         = useState(false);
  const [data,            setData]            = useState<HistoryData | null>(null);

  const years = Array.from({ length: 3 }, (_, i) => String(now.getFullYear() - i));

  async function fetch() {
    if (!selectedAgentId) { toast.error("Lütfen bir danışman seçin."); return; }
    setLoading(true);
    try {
      const result = await getAgentAttendanceHistory(
        selectedAgentId,
        parseInt(selectedYear),
        parseInt(selectedMonth),
      );
      if (!result) { toast.error("Danışman bulunamadı."); return; }
      setData(result as any);
    } catch {
      toast.error("Veriler alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  const totalDays = data?.records.length ?? 0;
  const workDays  = (data?.counts.PRESENT ?? 0) + (data?.counts.LATE ?? 0) + (data?.counts.REMOTE ?? 0);

  return (
    <div className="space-y-6">
      {/* Filtreler */}
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">

            <div className="sm:col-span-2 space-y-1">
              <Label className="text-sm font-medium text-black">Danışman</Label>
              <Select value={selectedAgentId} onValueChange={(v) => { setSelectedAgentId(v); setData(null); }}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder="Danışman seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {agents.map((a) => (
                    <SelectItem key={a.id} value={a.id}>
                      {a.firstName} {a.lastName} — {a.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-black">Ay</Label>
              <Select value={selectedMonth} onValueChange={(v) => { setSelectedMonth(v); setData(null); }}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {MONTHS.map((m, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-black">Yıl</Label>
              <Select value={selectedYear} onValueChange={(v) => { setSelectedYear(v); setData(null); }}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {years.map((y) => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={fetch} disabled={loading} className="w-full sm:w-auto">
            {loading
              ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Yükleniyor…</>
              : <><Search className="mr-2 h-4 w-4" /> Getir</>
            }
          </Button>
        </CardContent>
      </Card>

      {/* Sonuç */}
      {data && (
        <>
          {/* Danışman Profil + Özet */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="sm:col-span-1">
              <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                  {data.agent.firstName[0]}{data.agent.lastName[0]}
                </div>
                <div>
                  <p className="font-bold text-black">{data.agent.firstName} {data.agent.lastName}</p>
                  <p className="text-xs text-black">{data.agent.employeeId}</p>
                  <p className="text-xs text-black">{data.agent.departmentName}</p>
                </div>
                <Badge variant="outline" className="text-xs text-black">
                  {MONTHS[parseInt(selectedMonth) - 1]} {selectedYear}
                </Badge>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-black">Aylık Özet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["PRESENT","ABSENT","LATE","ON_LEAVE","REMOTE"].map((s) => (
                    <div key={s} className={`rounded-lg p-2 text-center ${statusColor[s]}`}>
                      <p className="text-xl font-extrabold">{data.counts[s] ?? 0}</p>
                      <p className="text-[10px] font-medium">{statusLabel[s]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-black border-t pt-2">
                  <span>Toplam Kayıt: <strong>{totalDays}</strong></span>
                  <span>Fiili Çalışma: <strong>{workDays} gün</strong></span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detay Tablosu */}
          {data.records.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
              Bu ay için devam kaydı bulunamadı.
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {["Tarih", "Durum", "Giriş", "Çıkış", "Not"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.records.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-black">{fmtDate(r.date)}</td>
                        <td className="px-4 py-3">
                          <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-xs">
                            {statusLabel[r.status] ?? r.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-black">{fmtTime(r.checkIn)}</td>
                        <td className="px-4 py-3 text-sm text-black">{fmtTime(r.checkOut)}</td>
                        <td className="px-4 py-3 text-xs text-black max-w-[200px] truncate">{r.note ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="sm:hidden space-y-2">
                {data.records.map((r) => (
                  <div key={r.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-black">{fmtDate(r.date)}</p>
                      <Badge variant={statusVariant[r.status] ?? "secondary"} className="text-[10px]">
                        {statusLabel[r.status] ?? r.status}
                      </Badge>
                    </div>
                    {(r.checkIn || r.checkOut || r.note) && (
                      <div className="px-4 pb-3 space-y-0.5">
                        {r.checkIn  && <p className="text-xs text-black">Giriş: {fmtTime(r.checkIn)}</p>}
                        {r.checkOut && <p className="text-xs text-black">Çıkış: {fmtTime(r.checkOut)}</p>}
                        {r.note     && <p className="text-xs text-black">Not: {r.note}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
