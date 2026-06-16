"use client";

import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { AttendanceStatusGayrimenkul } from "../../../../../actions/agent-attendance";

const statusLabel: Record<string, string> = {
  PRESENT:  "Var",
  ABSENT:   "Yok",
  LATE:     "Geç",
  ON_LEAVE: "İzinli",
  REMOTE:   "Uzaktan",
};
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PRESENT:  "default",
  ABSENT:   "destructive",
  LATE:     "secondary",
  ON_LEAVE: "outline",
  REMOTE:   "secondary",
};
const statusColor: Record<string, string> = {
  PRESENT:  "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  ABSENT:   "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  LATE:     "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  ON_LEAVE: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  REMOTE:   "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
};

const STATUSES: AttendanceStatusGayrimenkul[] = ["PRESENT", "ABSENT", "LATE", "ON_LEAVE", "REMOTE"];

type AttendanceRow = {
  agent: { id: string; firstName: string; lastName: string; employeeId: string };
  attendance: { status: string; checkIn?: any; checkOut?: any; note?: string | null } | null;
};

type Props = {
  rows:           AttendanceRow[];
  overrides:      Record<string, AttendanceStatusGayrimenkul>;
  onStatusChange: (agentId: string, status: AttendanceStatusGayrimenkul) => void;
};

function fmtTime(d: any) {
  if (!d) return null;
  return new Date(d).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
}

export default function AgentAttendanceTable({ rows, overrides, onStatusChange }: Props) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">Danışman</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">Mevcut Durum</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">Giriş / Çıkış</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">Not</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">Durum Seç</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, i) => {
              const current = overrides[row.agent.id] ?? row.attendance?.status ?? null;
              const changed = !!overrides[row.agent.id];
              return (
                <tr key={row.agent.id} className={`transition-colors ${changed ? "bg-yellow-50" : "hover:bg-gray-50"}`}>
                  <td className="px-4 py-3 text-black text-xs">{i + 1}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-black">{row.agent.firstName} {row.agent.lastName}</p>
                    <p className="text-xs text-black">{row.agent.employeeId}</p>
                  </td>
                  <td className="px-4 py-3">
                    {current ? (
                      <Badge variant={statusVariant[current] ?? "secondary"} className="text-xs">
                        {statusLabel[current] ?? current}
                      </Badge>
                    ) : (
                      <span className="text-xs text-black">İşaretlenmedi</span>
                    )}
                    {changed && <p className="text-[10px] text-amber-600 mt-0.5">Değişti *</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-black">
                    {row.attendance?.checkIn  && <p>Giriş:  {fmtTime(row.attendance.checkIn)}</p>}
                    {row.attendance?.checkOut && <p>Çıkış: {fmtTime(row.attendance.checkOut)}</p>}
                    {!row.attendance?.checkIn && !row.attendance?.checkOut && <span>—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-black max-w-[120px] truncate">
                    {row.attendance?.note ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => onStatusChange(row.agent.id, s)}
                          className={`px-2 py-0.5 text-[11px] font-medium rounded border transition-colors ${
                            current === s ? statusColor[s] + " ring-1 ring-offset-1 ring-current" : "bg-white text-black border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {statusLabel[s]}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden space-y-3">
        {rows.map((row) => {
          const current = overrides[row.agent.id] ?? row.attendance?.status ?? null;
          const changed = !!overrides[row.agent.id];
          return (
            <div key={row.agent.id} className={`rounded-xl border overflow-hidden ${changed ? "border-amber-300 bg-yellow-50" : "border-gray-200 bg-white"}`}>
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-black">{row.agent.firstName} {row.agent.lastName}</p>
                  <p className="text-xs text-black">{row.agent.employeeId}</p>
                </div>
                <div className="text-right">
                  {current ? (
                    <Badge variant={statusVariant[current] ?? "secondary"} className="text-[10px]">
                      {statusLabel[current] ?? current}
                    </Badge>
                  ) : (
                    <span className="text-[10px] text-black">İşaretlenmedi</span>
                  )}
                  {changed && <p className="text-[10px] text-amber-600">Değişti *</p>}
                </div>
              </div>
              {row.attendance?.note && (
                <div className="px-4 pb-1 text-xs text-black">Not: {row.attendance.note}</div>
              )}
              <div className="px-4 py-3 flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(row.agent.id, s)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                      current === s ? statusColor[s] : "bg-white text-black border-gray-200"
                    }`}
                  >
                    {statusLabel[s]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
