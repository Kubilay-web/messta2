"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Eye, Phone, Mail, Briefcase } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../components/ui/dialog";

type AgentItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  designation: string;
  departmentName: string;
  licenseNo?: string | null;
  commissionRate?: number | null;
  experience?: number | null;
  isActive: boolean;
  agencyName: string;
  createdAt: Date | string;
  _count?: { listings: number; contracts: number; visits: number };
};

function AgentDetail({ a }: { a: AgentItem }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
          {a.firstName[0]}{a.lastName[0]}
        </div>
        <div>
          <p className="font-bold text-black">{a.firstName} {a.lastName}</p>
          <p className="text-xs text-black">{a.designation} · {a.departmentName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {[
          { label: "E-posta",    value: a.email },
          { label: "Telefon",    value: a.phone },
          { label: "Çalışan No", value: a.employeeId },
          { label: "Ruhsat",     value: a.licenseNo ?? "—" },
          { label: "Komisyon",   value: a.commissionRate != null ? `%${a.commissionRate}` : "—" },
          { label: "Deneyim",    value: a.experience != null ? `${a.experience} yıl` : "—" },
          { label: "Ofis",       value: a.agencyName },
          { label: "Kayıt",      value: new Date(a.createdAt).toLocaleDateString("tr-TR") },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold text-black uppercase tracking-wide">{label}</p>
            <p className="text-sm text-black truncate">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Badge variant={a.isActive ? "default" : "secondary"} className="text-xs">
          {a.isActive ? "Aktif" : "Pasif"}
        </Badge>
      </div>

      {a._count && (
        <div className="grid grid-cols-3 gap-2 border-t pt-3">
          {[
            { label: "İlan",      value: a._count.listings },
            { label: "Sözleşme",  value: a._count.contracts },
            { label: "Ziyaret",   value: a._count.visits },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-black">{value}</p>
              <p className="text-[10px] text-black">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 pt-1 border-t">
        <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
          <a href={`mailto:${a.email}`}>
            <Mail className="mr-1 w-3.5 h-3.5" /> E-posta
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
          <a href={`tel:${a.phone}`}>
            <Phone className="mr-1 w-3.5 h-3.5" /> Ara
          </a>
        </Button>
        <Button asChild size="sm" className="flex-1 text-xs">
          <Link href={`/estate/dashboard/agents/edit/${a.id}`}>
            Düzenle
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function SecretaryAgentsTable({ agents }: { agents: AgentItem[] }) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return agents;
    return agents.filter((a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      a.designation.toLowerCase().includes(q) ||
      a.departmentName.toLowerCase().includes(q) ||
      a.employeeId.toLowerCase().includes(q)
    );
  }, [agents, search]);

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ad, e-posta, ünvan veya departman ara…"
          className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
          {search ? "Sonuç bulunamadı." : "Henüz danışman kaydı yok."}
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Danışman", "İletişim", "Ünvan / Departman", "Komisyon", "İlan", "Kayıt", "Durum", "İşlem"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                          {a.firstName[0]}{a.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-black truncate">{a.firstName} {a.lastName}</p>
                          <p className="text-xs text-black">{a.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{a.email}</p>
                      <p className="text-xs text-black">{a.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{a.designation}</p>
                      <p className="text-xs text-black">{a.departmentName}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-black">
                      {a.commissionRate != null ? `%${a.commissionRate}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="text-xs text-black">
                        {a._count?.listings ?? 0}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(a.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={a.isActive ? "default" : "secondary"} className="text-xs">
                        {a.isActive ? "Aktif" : "Pasif"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Dialog open={openId === a.id} onOpenChange={(v) => setOpenId(v ? a.id : null)}>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                          <DialogHeader>
                            <DialogTitle className="text-black">Danışman Detayı</DialogTitle>
                          </DialogHeader>
                          <AgentDetail a={a} />
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="sm:hidden space-y-2">
            {filtered.map((a) => (
              <div key={a.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                    {a.firstName[0]}{a.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black truncate">{a.firstName} {a.lastName}</p>
                    <p className="text-xs text-black truncate">{a.email}</p>
                    <p className="text-xs text-black">{a.designation}</p>
                  </div>
                  <Dialog open={openId === a.id} onOpenChange={(v) => setOpenId(v ? a.id : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                      <DialogHeader>
                        <DialogTitle className="text-black">Danışman Detayı</DialogTitle>
                      </DialogHeader>
                      <AgentDetail a={a} />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="px-4 pb-2">
                  <Badge variant={a.isActive ? "default" : "secondary"} className="text-[10px]">
                    {a.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                  {a.commissionRate != null && (
                    <span className="ml-2 text-[10px] text-black">Komisyon: %{a.commissionRate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-black text-right">{filtered.length} / {agents.length} danışman</p>
        </>
      )}
    </div>
  );
}
