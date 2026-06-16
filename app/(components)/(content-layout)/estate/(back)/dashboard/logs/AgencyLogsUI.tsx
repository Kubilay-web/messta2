"use client";

import { useState, useMemo } from "react";
import { Activity, User, Monitor, Wifi, Search, Trash2 } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import { clearAgencyLogs } from "../../../actions/agency-logs";
import toast from "react-hot-toast";

type AgencyLog = {
  id: string; name: string; activity: string; time: string;
  ipAddress?: string | null; device?: string | null;
  createdAt: Date | string;
};

function fmtDay(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function groupByDate(logs: AgencyLog[]) {
  const map: Record<string, AgencyLog[]> = {};
  logs.forEach((l) => {
    const key = new Date(l.createdAt).toDateString();
    if (!map[key]) map[key] = [];
    map[key].push(l);
  });
  return Object.entries(map).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );
}

function activityColor(activity: string): string {
  const a = activity.toLowerCase();
  if (a.includes("giriş") || a.includes("login"))   return "bg-green-100 text-green-700";
  if (a.includes("çıkış") || a.includes("logout"))  return "bg-red-100 text-red-700";
  if (a.includes("sil")   || a.includes("delete"))  return "bg-red-100 text-red-700";
  if (a.includes("güncelle") || a.includes("update"))return "bg-amber-100 text-amber-700";
  if (a.includes("ekle") || a.includes("oluştur") || a.includes("create") || a.includes("add"))
    return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
}

export default function AgencyLogsUI({
  logs: initial, agencyId,
}: {
  logs: AgencyLog[]; agencyId: string;
}) {
  const [logs,   setLogs]   = useState(initial);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return logs;
    return logs.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.activity.toLowerCase().includes(q) ||
        (l.device    ?? "").toLowerCase().includes(q) ||
        (l.ipAddress ?? "").toLowerCase().includes(q)
    );
  }, [logs, search]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  async function handleClear() {
    try {
      await clearAgencyLogs(agencyId);
      setLogs([]);
      toast.success("Tüm loglar temizlendi.");
    } catch {
      toast.error("Temizlenemedi.");
    }
  }

  return (
    <div className="space-y-4">
      {/* Araç Çubuğu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ad, aktivite, cihaz ara…"
            className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-black">{filtered.length} kayıt</span>
          {logs.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="mr-1.5 w-3.5 h-3.5" /> Tümünü Temizle
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
                <AlertDialogHeader>
                  <AlertDialogTitle>Tüm loglar silinsin mi?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu işlem geri alınamaz. Tüm aktivite kayıtları kalıcı olarak silinecek.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleClear}
                  >
                    Temizle
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Log Listesi */}
      {logs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Activity className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-black">Henüz aktivite logu bulunmuyor.</p>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-black">
            Arama sonucu bulunamadı.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-5">
          {grouped.map(([dateKey, dayLogs]) => (
            <div key={dateKey}>
              {/* Gün Başlığı */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-semibold text-black px-2 py-0.5 rounded-full bg-gray-100 whitespace-nowrap">
                  {fmtDay(dayLogs[0].createdAt)} · {dayLogs.length} kayıt
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Gün Logları */}
              <div className="space-y-2">
                {dayLogs.map((log) => (
                  <Card key={log.id} className="border border-gray-200 hover:border-blue-200 transition-colors">
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <User className="w-4 h-4" />
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <p className="font-semibold text-sm text-black">{log.name}</p>
                            <span className="text-xs text-black shrink-0">{log.time}</span>
                          </div>

                          {/* Aktivite Badge */}
                          <div className="mt-1.5">
                            <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${activityColor(log.activity)}`}>
                              {log.activity}
                            </span>
                          </div>

                          {/* Cihaz & IP */}
                          {(log.device || log.ipAddress) && (
                            <div className="flex flex-wrap gap-3 mt-2">
                              {log.device && (
                                <span className="flex items-center gap-1 text-xs text-black">
                                  <Monitor className="w-3 h-3" /> {log.device}
                                </span>
                              )}
                              {log.ipAddress && (
                                <span className="flex items-center gap-1 text-xs text-black">
                                  <Wifi className="w-3 h-3" /> {log.ipAddress}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
