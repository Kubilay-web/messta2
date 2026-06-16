"use client";

import { useState } from "react";
import { Loader2, Users } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Label } from "../../../../../components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "../../../../../components/ui/select";
import toast from "react-hot-toast";
import {
  getAgentAttendanceByDepartment,
  bulkMarkAttendance,
  AttendanceStatusGayrimenkul,
} from "../../../../../actions/agent-attendance";
import AgentAttendanceTable from "./AgentAttendanceTable";

type Department = { id: string; name: string; _count: { agents: number } };

type AttendanceRow = {
  agent: { id: string; firstName: string; lastName: string; employeeId: string; imageUrl?: string | null };
  attendance: {
    id: string; status: string; checkIn?: Date | null; checkOut?: Date | null; note?: string | null;
  } | null;
};

export default function AgentAttendanceListing({
  departments,
}: {
  departments: Department[];
}) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDeptId, setSelectedDeptId] = useState(departments[0]?.id ?? "");
  const [selectedDate,   setSelectedDate]   = useState(today);
  const [loading,        setLoading]        = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [rows,           setRows]           = useState<AttendanceRow[]>([]);
  const [fetched,        setFetched]        = useState(false);

  // Local override map: agentId → status (before save)
  const [overrides, setOverrides] = useState<Record<string, AttendanceStatusGayrimenkul>>({});

  const selectedDept = departments.find((d) => d.id === selectedDeptId);

  async function fetchAttendance() {
    if (!selectedDeptId) { toast.error("Lütfen bir departman seçin."); return; }
    setLoading(true);
    setOverrides({});
    try {
      const data = await getAgentAttendanceByDepartment(selectedDeptId, selectedDate);
      setRows(data as any);
      setFetched(true);
    } catch {
      toast.error("Devam verileri alınamadı.");
    } finally {
      setLoading(false);
    }
  }

  async function saveAll() {
    if (!Object.keys(overrides).length) { toast("Değişiklik yok."); return; }
    setSaving(true);
    try {
      const records = Object.entries(overrides).map(([agentId, status]) => ({ agentId, status }));
      await bulkMarkAttendance(records, selectedDate);
      toast.success("Devam kaydedildi!");
      // Yenile
      const data = await getAgentAttendanceByDepartment(selectedDeptId, selectedDate);
      setRows(data as any);
      setOverrides({});
    } catch {
      toast.error("Kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  function setStatus(agentId: string, status: AttendanceStatusGayrimenkul) {
    setOverrides((prev) => ({ ...prev, [agentId]: status }));
  }

  function markAll(status: AttendanceStatusGayrimenkul) {
    const map: Record<string, AttendanceStatusGayrimenkul> = {};
    rows.forEach((r) => { map[r.agent.id] = status; });
    setOverrides(map);
  }

  const changesCount = Object.keys(overrides).length;

  return (
    <div className="space-y-6">
      {/* Filtreler */}
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Departman */}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-black">Departman</Label>
              <Select value={selectedDeptId} onValueChange={(v) => { setSelectedDeptId(v); setFetched(false); setRows([]); }}>
                <SelectTrigger className="bg-white text-black">
                  <SelectValue placeholder="Departman seçin" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.name} ({d._count.agents} danışman)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tarih */}
            <div className="space-y-1">
              <Label htmlFor="att-date" className="text-sm font-medium text-black">Tarih</Label>
              <input
                id="att-date"
                type="date"
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setFetched(false); setRows([]); }}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Getir Butonu */}
            <div className="flex items-end">
              <Button onClick={fetchAttendance} disabled={loading} className="w-full">
                {loading ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Yükleniyor…</> : <><Users className="mr-2 h-4 w-4" /> Listele</>}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tablo */}
      {fetched && (
        rows.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
            Bu departmanda danışman bulunamadı.
          </div>
        ) : (
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              {/* Başlık + Toplu İşlemler */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-black">
                    {selectedDept?.name} — {new Date(selectedDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                  </h3>
                  <p className="text-xs text-black">{rows.length} danışman</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="text-xs text-black" onClick={() => markAll("PRESENT")}>Tümü Var</Button>
                  <Button size="sm" variant="outline" className="text-xs text-black" onClick={() => markAll("ABSENT")}>Tümü Yok</Button>
                  <Button size="sm" variant="outline" className="text-xs text-black" onClick={() => markAll("REMOTE")}>Tümü Uzaktan</Button>
                  {changesCount > 0 && (
                    <Button size="sm" onClick={saveAll} disabled={saving}>
                      {saving ? <Loader2 className="animate-spin mr-1 h-3 w-3" /> : null}
                      Kaydet ({changesCount})
                    </Button>
                  )}
                </div>
              </div>

              <AgentAttendanceTable rows={rows} overrides={overrides} onStatusChange={setStatus} />
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
