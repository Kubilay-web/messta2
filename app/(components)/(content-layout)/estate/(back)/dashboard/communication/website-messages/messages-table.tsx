"use client";

import { useState, useMemo } from "react";
import { Eye, Search, Trash2, Phone, Mail, MessageSquare } from "lucide-react";
import { deleteAgencyContactMessage } from "../../../../actions/website-messages";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "../../../../components/ui/pagination";
import toast from "react-hot-toast";

type Message = {
  id: string; fullName: string; email: string; phone: string;
  message: string; subject: string;
  companyName?: string | null; interest?: string | null;
  createdAt: Date | string; updatedAt: Date | string;
};

const PER_PAGE = 10;

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "numeric", month: "short", year: "numeric",
  });
}
function fmtFull(d: Date | string) {
  return new Date(d).toLocaleString("tr-TR", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function MessageDetail({ msg }: { msg: Message }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[90px_1fr] gap-x-3 gap-y-2 text-sm">
        {[
          { label: "Ad Soyad",   value: msg.fullName },
          { label: "E-posta",    value: msg.email    },
          { label: "Telefon",    value: msg.phone    },
          ...(msg.companyName ? [{ label: "Şirket",    value: msg.companyName }] : []),
          ...(msg.interest    ? [{ label: "İlgi Alanı",value: msg.interest    }] : []),
          { label: "Konu",       value: msg.subject  },
          { label: "Tarih",      value: fmtFull(msg.createdAt) },
        ].map(({ label, value }) => (
          <>
            <span key={label + "l"} className="font-semibold text-black">{label}:</span>
            <span key={label + "v"} className="text-black break-words">{value}</span>
          </>
        ))}
      </div>
      <div>
        <p className="text-sm font-semibold text-black mb-1.5">Mesaj:</p>
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-sm text-black whitespace-pre-wrap">
          {msg.message}
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <Button asChild size="sm" variant="outline" className="text-xs">
          <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
            <Mail className="mr-1.5 w-3.5 h-3.5" /> E-posta Yanıtla
          </a>
        </Button>
        {msg.phone && (
          <Button asChild size="sm" variant="outline" className="text-xs">
            <a href={`tel:${msg.phone}`}>
              <Phone className="mr-1.5 w-3.5 h-3.5" /> Ara
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AgencyMessagesTable({ messages: initial }: { messages: Message[] }) {
  const [messages,  setMessages]  = useState(initial);
  const [search,    setSearch]    = useState("");
  const [page,      setPage]      = useState(1);
  const [openId,    setOpenId]    = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return messages;
    return messages.filter((m) =>
      m.fullName.toLowerCase().includes(q)                  ||
      m.email.toLowerCase().includes(q)                     ||
      m.subject.toLowerCase().includes(q)                   ||
      m.message.toLowerCase().includes(q)                   ||
      (m.companyName ?? "").toLowerCase().includes(q)       ||
      (m.interest    ?? "").toLowerCase().includes(q)
    );
  }, [messages, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageItems  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  async function handleDelete(id: string) {
    try {
      await deleteAgencyContactMessage(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mesaj silindi.");
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  function paginationItems() {
    if (totalPages <= 1) return null;
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink onClick={() => setPage(i)} isActive={page === i} className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (Math.abs(i - page) === 2) {
        items.push(<PaginationItem key={`e${i}`}><PaginationEllipsis /></PaginationItem>);
      }
    }
    return items;
  }

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <CardTitle className="text-base text-black flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            İletişim Mesajları
            <Badge variant="secondary" className="text-xs text-black">{messages.length}</Badge>
          </CardTitle>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Ad, e-posta veya konu ara…"
            className="w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-sm text-black border-t border-dashed border-gray-300">
            Henüz mesaj bulunmuyor.
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    {["Ad Soyad", "E-posta", "Telefon", "Konu", "Tarih", "İşlemler"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-sm text-black">
                        Sonuç bulunamadı.
                      </td>
                    </tr>
                  ) : pageItems.map((msg) => (
                    <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-black">{msg.fullName}</td>
                      <td className="px-4 py-3 text-black">{msg.email}</td>
                      <td className="px-4 py-3 text-black">{msg.phone || "—"}</td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="text-black truncate">{msg.subject}</p>
                        {msg.companyName && <p className="text-xs text-black truncate">{msg.companyName}</p>}
                      </td>
                      <td className="px-4 py-3 text-black whitespace-nowrap">{fmtDate(msg.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Dialog open={openId === msg.id} onOpenChange={(o) => setOpenId(o ? msg.id : null)}>
                            <DialogTrigger asChild>
                              <Button size="icon" variant="outline" className="h-8 w-8">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg bg-white text-black">
                              <DialogHeader>
                                <DialogTitle className="text-black">Mesaj Detayı</DialogTitle>
                              </DialogHeader>
                              <MessageDetail msg={msg} />
                            </DialogContent>
                          </Dialog>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="destructive" className="h-8 w-8">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Mesaj silinsin mi?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  <strong>{msg.fullName}</strong>'den gelen bu mesaj kalıcı olarak silinecek.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>İptal</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(msg.id)}>
                                  Sil
                                </AlertDialogAction>
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
            <div className="sm:hidden divide-y divide-gray-100">
              {pageItems.length === 0 ? (
                <p className="p-6 text-center text-sm text-black">Sonuç bulunamadı.</p>
              ) : pageItems.map((msg) => (
                <div key={msg.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-black truncate">{msg.fullName}</p>
                      <p className="text-xs text-black truncate">{msg.email}</p>
                      <p className="text-xs text-black mt-0.5 truncate">{msg.subject}</p>
                    </div>
                    <p className="text-[10px] text-black shrink-0">{fmtDate(msg.createdAt)}</p>
                  </div>
                  <p className="text-xs text-black line-clamp-2">{msg.message}</p>
                  <div className="flex gap-1.5 pt-1">
                    <Dialog open={openId === msg.id} onOpenChange={(o) => setOpenId(o ? msg.id : null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="h-7 text-xs text-black">
                          <Eye className="mr-1 w-3 h-3" /> Görüntüle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[95vw] max-w-lg bg-white text-black">
                        <DialogHeader>
                          <DialogTitle className="text-black">Mesaj Detayı</DialogTitle>
                        </DialogHeader>
                        <MessageDetail msg={msg} />
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="h-7 text-xs">
                          <Trash2 className="mr-1 w-3 h-3" /> Sil
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Mesaj silinsin mi?</AlertDialogTitle>
                          <AlertDialogDescription>Bu işlem geri alınamaz.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(msg.id)}>
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>

      {totalPages > 1 && (
        <CardFooter className="flex justify-center border-t pt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                />
              </PaginationItem>
              {paginationItems()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      )}
    </Card>
  );
}
