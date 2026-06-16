"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, Phone, Mail, MessageSquare, Users as UsersIcon, FileText } from "lucide-react";
import { deleteCommLog } from "../../../../actions/communication-logs";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

const channelLabel: Record<string, string> = { CALL: "Telefon", EMAIL: "E-posta", SMS: "SMS", WHATSAPP: "WhatsApp", MEETING: "Görüşme", NOTE: "Not" };
const channelIcon: Record<string, any> = { CALL: Phone, EMAIL: Mail, SMS: MessageSquare, WHATSAPP: MessageSquare, MEETING: UsersIcon, NOTE: FileText };
const dirLabel: Record<string, string> = { INBOUND: "Gelen", OUTBOUND: "Giden" };

type Log = {
  id: string; channel: string; direction: string; subject?: string | null;
  content?: string | null; occurredAt: Date | string; outcome?: string | null;
  client?: { firstName: string; lastName: string } | null;
  agent?: { firstName: string; lastName: string } | null;
};

function LogActions({ log }: { log: Log }) {
  async function handleDelete() {
    try { await deleteCommLog(log.id); toast.success("Kayıt silindi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Silinemedi."); }
  }
  return (
    <div className="flex items-center gap-1.5">
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/dashboard/communication/logs/edit/${log.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5" /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
          <AlertDialogHeader>
            <AlertDialogTitle>Kayıt silinsin mi?</AlertDialogTitle>
            <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete}>Sil</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function CommLogTable({ logs }: { logs: Log[] }) {
  if (!logs.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Henüz iletişim kaydı bulunmuyor.</div>;
  }
  const fmt = (d: Date | string) => new Date(d).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });

  return (
    <>
      <div className="hidden sm:block w-full overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["Kanal", "Yön", "Konu", "Müşteri", "Danışman", "Tarih", "İşlemler"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {logs.map((l) => {
              const Icon = channelIcon[l.channel] ?? FileText;
              return (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-1.5 text-sm text-black"><Icon className="w-4 h-4" />{channelLabel[l.channel] ?? l.channel}</span></td>
                  <td className="px-4 py-3"><Badge variant={l.direction === "INBOUND" ? "secondary" : "outline"} className="text-xs">{dirLabel[l.direction] ?? l.direction}</Badge></td>
                  <td className="px-4 py-3 text-sm text-black truncate max-w-[200px]">{l.subject ?? l.content ?? "—"}</td>
                  <td className="px-4 py-3 text-sm text-black">{l.client ? `${l.client.firstName} ${l.client.lastName}` : "—"}</td>
                  <td className="px-4 py-3 text-sm text-black">{l.agent ? `${l.agent.firstName} ${l.agent.lastName}` : "—"}</td>
                  <td className="px-4 py-3 text-xs text-black">{fmt(l.occurredAt)}</td>
                  <td className="px-4 py-3"><LogActions log={l} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {logs.map((l) => {
          const Icon = channelIcon[l.channel] ?? FileText;
          return (
            <div key={l.id} className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-semibold text-black"><Icon className="w-4 h-4" />{channelLabel[l.channel] ?? l.channel}</span>
                <Badge variant={l.direction === "INBOUND" ? "secondary" : "outline"} className="text-[10px]">{dirLabel[l.direction] ?? l.direction}</Badge>
              </div>
              <div className="px-4 py-2 space-y-1">
                {[
                  { label: "Konu", value: l.subject ?? l.content ?? "—" },
                  { label: "Müşteri", value: l.client ? `${l.client.firstName} ${l.client.lastName}` : "—" },
                  { label: "Tarih", value: fmt(l.occurredAt) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 text-xs">
                    <span className="text-black font-medium shrink-0">{label}</span>
                    <span className="text-black truncate max-w-[200px]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end px-4 py-2.5 bg-gray-50 border-t border-gray-100"><LogActions log={l} /></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
