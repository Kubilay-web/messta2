"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Eye, Phone, Mail, User } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../components/ui/dialog";

type Client = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  occupation?: string | null;
  isBuyer: boolean;
  isSeller: boolean;
  isTenant: boolean;
  isLandlord: boolean;
  gender: string;
  address: string;
  agencyName: string;
  createdAt: Date | string;
  _count?: { contracts: number; visits: number; interests: number };
};

const genderLabel: Record<string, string> = { male: "Erkek", female: "Kadın", OTHER: "Diğer" };

function ClientDetail({ client }: { client: Client }) {
  const roles = [
    client.isBuyer    && "Alıcı",
    client.isSeller   && "Satıcı",
    client.isTenant   && "Kiracı",
    client.isLandlord && "Kiraya Veren",
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
          {client.firstName[0]}{client.lastName[0]}
        </div>
        <div>
          <p className="font-bold text-black">{client.firstName} {client.lastName}</p>
          <p className="text-xs text-black">{client.agencyName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {[
          { label: "E-posta",   value: client.email },
          { label: "Telefon",   value: client.phone },
          { label: "Uyruk",     value: client.nationality },
          { label: "Meslek",    value: client.occupation ?? "—" },
          { label: "Cinsiyet",  value: genderLabel[client.gender] ?? client.gender },
          { label: "Adres",     value: client.address },
          { label: "Kayıt",     value: new Date(client.createdAt).toLocaleDateString("tr-TR") },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold text-black uppercase tracking-wide">{label}</p>
            <p className="text-sm text-black truncate">{value}</p>
          </div>
        ))}
      </div>

      {roles.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {roles.map((r) => (
            <Badge key={r} variant="secondary" className="text-xs text-black">{r}</Badge>
          ))}
        </div>
      )}

      {client._count && (
        <div className="grid grid-cols-3 gap-2 border-t pt-3">
          {[
            { label: "Sözleşme", value: client._count.contracts },
            { label: "Ziyaret",  value: client._count.visits },
            { label: "İlgi",     value: client._count.interests },
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
          <a href={`mailto:${client.email}`}>
            <Mail className="mr-1 w-3.5 h-3.5" /> E-posta
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
          <a href={`tel:${client.phone}`}>
            <Phone className="mr-1 w-3.5 h-3.5" /> Ara
          </a>
        </Button>
        <Button asChild size="sm" className="flex-1 text-xs">
          <Link href={`/estate/dashboard/users/clients/edit/${client.id}`}>
            Düzenle
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function SecretaryClientsTable({ clients }: { clients: Client[] }) {
  const [search,  setSearch]  = useState("");
  const [openId,  setOpenId]  = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return clients;
    return clients.filter((c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.nationality.toLowerCase().includes(q)
    );
  }, [clients, search]);

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  const roles = (c: Client) =>
    [c.isBuyer && "Alıcı", c.isSeller && "Satıcı", c.isTenant && "Kiracı", c.isLandlord && "K.Veren"]
      .filter(Boolean).join(" · ");

  return (
    <div className="space-y-3">
      {/* Arama */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ad, e-posta, telefon veya uyruk ara…"
          className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-300 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
          {search ? "Sonuç bulunamadı." : "Henüz müşteri kaydı yok."}
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Müşteri", "İletişim", "Rol", "Sözleşme", "Kayıt", "İşlem"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                          {c.firstName[0]}{c.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-black truncate">{c.firstName} {c.lastName}</p>
                          <p className="text-xs text-black">{c.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-black">{c.email}</p>
                      <p className="text-xs text-black">{c.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-black">{roles(c) || "—"}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="secondary" className="text-xs text-black">
                        {c._count?.contracts ?? 0}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-black whitespace-nowrap">{fmtDate(c.createdAt)}</td>
                    <td className="px-4 py-3">
                      <Dialog open={openId === c.id} onOpenChange={(v) => setOpenId(v ? c.id : null)}>
                        <DialogTrigger asChild>
                          <Button size="icon" variant="outline" className="h-8 w-8">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                          <DialogHeader>
                            <DialogTitle className="text-black">Müşteri Detayı</DialogTitle>
                          </DialogHeader>
                          <ClientDetail client={c} />
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
            {filtered.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
                    {c.firstName[0]}{c.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black truncate">{c.firstName} {c.lastName}</p>
                    <p className="text-xs text-black truncate">{c.email}</p>
                    <p className="text-xs text-black">{c.phone}</p>
                  </div>
                  <Dialog open={openId === c.id} onOpenChange={(v) => setOpenId(v ? c.id : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 shrink-0">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-sm bg-white text-black">
                      <DialogHeader>
                        <DialogTitle className="text-black">Müşteri Detayı</DialogTitle>
                      </DialogHeader>
                      <ClientDetail client={c} />
                    </DialogContent>
                  </Dialog>
                </div>
                {roles(c) && (
                  <div className="px-4 pb-2">
                    <p className="text-[10px] text-black">{roles(c)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-black text-right">{filtered.length} / {clients.length} müşteri</p>
        </>
      )}
    </div>
  );
}
