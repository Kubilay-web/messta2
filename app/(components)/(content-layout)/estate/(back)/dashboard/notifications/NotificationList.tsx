"use client";

import toast from "react-hot-toast";
import { Check, Trash2, Info, AlertTriangle, CheckCircle2, Bell, ListTodo } from "lucide-react";
import { markNotificationRead, markAllNotificationsRead, deleteNotification } from "../../../actions/notifications";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

const typeMeta: Record<string, { label: string; icon: any; cls: string }> = {
  INFO:     { label: "Bilgi",      icon: Info,         cls: "text-blue-600" },
  WARNING:  { label: "Uyarı",      icon: AlertTriangle, cls: "text-amber-600" },
  SUCCESS:  { label: "Başarı",     icon: CheckCircle2, cls: "text-green-600" },
  REMINDER: { label: "Hatırlatma", icon: Bell,         cls: "text-purple-600" },
  TASK:     { label: "Görev",      icon: ListTodo,     cls: "text-indigo-600" },
};

type Notif = {
  id: string; type: string; title: string; message: string; link?: string | null;
  isRead: boolean; createdAt: Date | string;
  agent?: { firstName: string; lastName: string } | null;
  client?: { firstName: string; lastName: string } | null;
};

export default function NotificationList({ notifications, agencyId }: { notifications: Notif[]; agencyId: string }) {
  const unread = notifications.filter((n) => !n.isRead).length;

  async function read(id: string) {
    try { await markNotificationRead(id); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Hata."); }
  }
  async function readAll() {
    try { await markAllNotificationsRead(agencyId); toast.success("Tümü okundu işaretlendi."); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Hata."); }
  }
  async function remove(id: string) {
    try { await deleteNotification(id); window.location.reload(); }
    catch (e: any) { toast.error(e?.message ?? "Hata."); }
  }

  if (!notifications.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">Bildirim bulunmuyor.</div>;
  }
  const fmt = (d: Date | string) => new Date(d).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" });

  return (
    <div className="space-y-3">
      {unread > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-2">
          <span className="text-sm text-black"><b>{unread}</b> okunmamış bildirim</span>
          <Button size="sm" variant="outline" onClick={readAll}><Check className="w-4 h-4 mr-1" /> Tümünü Okundu İşaretle</Button>
        </div>
      )}

      {notifications.map((n) => {
        const meta = typeMeta[n.type] ?? typeMeta.INFO;
        const Icon = meta.icon;
        const target = n.agent ? `${n.agent.firstName} ${n.agent.lastName}` : n.client ? `${n.client.firstName} ${n.client.lastName}` : null;
        return (
          <div key={n.id} className={`rounded-xl border bg-white shadow-sm p-4 flex gap-3 ${n.isRead ? "border-gray-200" : "border-blue-300 bg-blue-50/40"}`}>
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${meta.cls}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-black">{n.title}</p>
                {!n.isRead && <Badge variant="default" className="text-[10px]">Yeni</Badge>}
                <Badge variant="secondary" className="text-[10px]">{meta.label}</Badge>
              </div>
              <p className="text-sm text-black mt-0.5 break-words">{n.message}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-black">
                <span>{fmt(n.createdAt)}</span>
                {target && <span>• {target}</span>}
                {n.link && <a href={n.link} className="text-blue-600 underline">Bağlantı</a>}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              {!n.isRead && (
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => read(n.id)} title="Okundu işaretle"><Check className="w-3.5 h-3.5" /></Button>
              )}
              <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => remove(n.id)} title="Sil"><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
