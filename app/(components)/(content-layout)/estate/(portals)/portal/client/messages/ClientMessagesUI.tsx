"use client";

import { useState } from "react";
import { Mail, Bell, Building2, Users, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

const fromLabel: Record<string, string> = {
  Management: "Yönetim", Agent: "Danışman", Client: "Müşteri",
};
const recipientLabel: Record<string, string> = {
  Clients: "Müşteriler", All: "Herkes", Agents: "Danışmanlar", Management: "Yönetim",
};
const fromIcon: Record<string, any> = {
  Management: Building2, Agent: Users, Client: MessageSquare,
};

type Message = {
  id: string; subject: string; message: string;
  from: string; recipient: string; createdAt: Date | string;
};

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function fmtRelative(d: Date | string) {
  const diff = Date.now() - new Date(d).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 60)  return `${mins} dakika önce`;
  if (hours < 24)  return `${hours} saat önce`;
  if (days  < 7)   return `${days} gün önce`;
  return fmtDate(d);
}

export default function ClientMessagesUI({ messages }: { messages: Message[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (messages.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
            <Mail className="w-7 h-7 text-blue-500" />
          </div>
          <p className="text-sm text-black font-medium">Henüz mesaj bulunmuyor.</p>
          <p className="text-xs text-black">Ajansınızdan gelen bildirimler burada görünecek.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {/* Özet banner */}
      <div className="flex items-center gap-3 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
        <Bell className="w-4 h-4 text-blue-600 shrink-0" />
        <p className="text-sm text-black">
          <strong>{messages.length}</strong> mesaj bulunuyor.
        </p>
      </div>

      {/* Mesaj Listesi */}
      {messages.map((msg) => {
        const isOpen   = expanded === msg.id;
        const Icon     = fromIcon[msg.from] ?? Mail;

        return (
          <Card
            key={msg.id}
            className={`border border-gray-200 cursor-pointer transition-all hover:border-blue-300 ${isOpen ? "shadow-md" : ""}`}
            onClick={() => setExpanded(isOpen ? null : msg.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* İkon */}
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>

                {/* İçerik */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-black leading-snug">{msg.subject}</p>
                    <span className="text-[10px] text-black shrink-0 whitespace-nowrap">
                      {fmtRelative(msg.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px] text-black">
                      {fromLabel[msg.from] ?? msg.from}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] text-black">
                      → {recipientLabel[msg.recipient] ?? msg.recipient}
                    </Badge>
                  </div>

                  {/* Mesaj Önizleme */}
                  {!isOpen && (
                    <p className="text-xs text-black mt-2 line-clamp-2">{msg.message}</p>
                  )}

                  {/* Açık Mesaj */}
                  {isOpen && (
                    <div className="mt-3 space-y-2">
                      <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
                        <p className="text-sm text-black whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                      <p className="text-[10px] text-black">{fmtDate(msg.createdAt)}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
