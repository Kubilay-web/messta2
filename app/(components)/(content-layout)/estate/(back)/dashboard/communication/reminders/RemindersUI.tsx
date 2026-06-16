"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Send, Trash2, Loader2, Users, User, Building2, Mail, AtSign } from "lucide-react";
import { createAndSendReminder, deleteReminder, ReminderProps } from "../../../../actions/reminders";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

type Reminder = {
  id: string; subject: string; message: string;
  recipient: string; from: string; name?: string | null;
  email?: string | null; createdAt: Date | string;
};
type Props = {
  agencyId:  string;
  reminders: Reminder[];
  counts:    { clients: number; agents: number; all: number };
};

const recipientOptions = [
  { value: "Clients",    label: "Müşteriler",  icon: Users,     desc: (c: Props["counts"]) => `${c.clients} müşteri`  },
  { value: "Agents",     label: "Danışmanlar", icon: User,      desc: (c: Props["counts"]) => `${c.agents} danışman` },
  { value: "All",        label: "Herkese",     icon: Building2, desc: (c: Props["counts"]) => `${c.all} kişi`        },
];
const fromOptions = [
  { value: "Management", label: "Yönetim"  },
  { value: "Agent",      label: "Danışman" },
  { value: "Client",     label: "Müşteri"  },
];
const recipientLabel: Record<string, string> = {
  Clients: "Müşteriler", Agents: "Danışmanlar", All: "Herkes", Management: "Bireysel",
};
const fromLabel: Record<string, string> = {
  Management: "Yönetim", Agent: "Danışman", Client: "Müşteri",
};

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

// ─── Toplu Gönderim Formu ────────────────────────────────────────────────────
function BulkForm({ agencyId, counts }: { agencyId: string; counts: Props["counts"] }) {
  const [loading,   setLoading]   = useState(false);
  const [recipient, setRecipient] = useState<"Clients" | "Agents" | "All">("Agents");
  const [from,      setFrom]      = useState<ReminderProps["from"]>("Management");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<{ subject: string; message: string }>({ defaultValues: { subject: "", message: "" } });

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const result = await createAndSendReminder({ ...data, recipient, from, agencyId });
      if (result.sent > 0) toast.success(`Gönderildi! ${result.sent} alıcı.`);
      if (result.errors.length > 0) {
        toast.error(result.errors[0] || `${result.errors.length} gönderim başarısız.`);
      } else if (result.sent === 0) {
        toast.error("Gönderilecek geçerli e-posta adresi bulunamadı.");
      }
      reset();
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Gönderilemedi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Alıcı */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-black">Alıcı Grubu</Label>
        <div className="grid grid-cols-3 gap-2">
          {recipientOptions.map(({ value, label, icon: Icon, desc }) => (
            <button key={value} type="button" onClick={() => setRecipient(value as any)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors ${
                recipient === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-black hover:bg-gray-50"
              }`}>
              <Icon className="w-4 h-4" />
              <p className="text-xs font-semibold">{label}</p>
              <p className="text-[10px] opacity-70">{desc(counts)}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Gönderen */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Gönderen</Label>
        <div className="flex gap-2">
          {fromOptions.map(({ value, label }) => (
            <button key={value} type="button" onClick={() => setFrom(value as any)}
              className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                from === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-black hover:bg-gray-50"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Konu */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Konu <span className="text-red-500">*</span></Label>
        <input {...register("subject", { required: true })} placeholder="E-posta konusu"
          className={`w-full rounded-md border px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.subject ? "border-red-400" : "border-gray-300"}`} />
      </div>

      {/* Mesaj */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Mesaj <span className="text-red-500">*</span></Label>
        <textarea {...register("message", { required: true })} rows={5}
          placeholder="Mesajınızı buraya yazın..."
          className={`w-full rounded-md border px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${errors.message ? "border-red-400" : "border-gray-300"}`} />
      </div>

      {/* Özet */}
      <div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-xs text-black">
        <strong>Gönderilecek:</strong>{" "}
        {recipientOptions.find((o) => o.value === recipient)?.desc(counts)} ·{" "}
        <strong>Kimden:</strong> {fromLabel[from]}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Gönderiliyor…</>
          : <><Send className="mr-2 h-4 w-4" /> Gönder</>
        }
      </Button>
    </form>
  );
}

// ─── Bireysel E-posta Formu ──────────────────────────────────────────────────
function IndividualForm({ agencyId }: { agencyId: string }) {
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState<ReminderProps["from"]>("Management");

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<{ name: string; email: string; subject: string; message: string }>({
      defaultValues: { name: "", email: "", subject: "", message: "" },
    });

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const result = await createAndSendReminder({
        subject:   data.subject,
        message:   data.message,
        recipient: "Management",
        from,
        name:      data.name  || undefined,
        email:     data.email,
        agencyId,
      });
      if (result.sent > 0) toast.success(`E-posta gönderildi → ${data.email}`);
      if (result.errors.length > 0) {
        toast.error(result.errors[0] || "Gönderim başarısız.");
      } else if (result.sent === 0) {
        toast.error("Gönderilecek geçerli e-posta adresi bulunamadı.");
      }
      reset();
      window.location.reload();
    } catch (e: any) {
      toast.error(e?.message ?? "Gönderilemedi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Ad & E-posta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-sm font-medium text-black">Ad Soyad</Label>
          <input {...register("name")} placeholder="Ahmet Yılmaz"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none" />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium text-black">E-posta Adresi <span className="text-red-500">*</span></Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input {...register("email", { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Geçersiz e-posta" } })}
              type="email" placeholder="ornek@email.com"
              className={`w-full rounded-md border pl-9 pr-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? "border-red-400" : "border-gray-300"}`} />
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email.message || "Zorunlu alan"}</p>}
        </div>
      </div>

      {/* Gönderen */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Gönderen</Label>
        <div className="flex gap-2">
          {fromOptions.map(({ value, label }) => (
            <button key={value} type="button" onClick={() => setFrom(value as any)}
              className={`px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                from === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-black hover:bg-gray-50"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Konu */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Konu <span className="text-red-500">*</span></Label>
        <input {...register("subject", { required: true })} placeholder="E-posta konusu"
          className={`w-full rounded-md border px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.subject ? "border-red-400" : "border-gray-300"}`} />
      </div>

      {/* Mesaj */}
      <div className="space-y-1">
        <Label className="text-sm font-medium text-black">Mesaj <span className="text-red-500">*</span></Label>
        <textarea {...register("message", { required: true })} rows={5}
          placeholder="Mesajınızı buraya yazın..."
          className={`w-full rounded-md border px-3 py-2 text-sm text-black focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${errors.message ? "border-red-400" : "border-gray-300"}`} />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Gönderiliyor…</>
          : <><Mail className="mr-2 h-4 w-4" /> E-posta Gönder</>
        }
      </Button>
    </form>
  );
}

// ─── Ana Bileşen ─────────────────────────────────────────────────────────────
export default function RemindersUI({ agencyId, reminders: initial, counts }: Props) {
  const [reminders, setReminders] = useState(initial);
  const [tab, setTab] = useState<"bulk" | "individual">("bulk");

  async function handleDelete(id: string) {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
      toast.success("Silindi.");
    } catch (e: any) {
      toast.error(e?.message ?? "Silinemedi.");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ── FORM BÖLÜMÜ ── */}
      <Card className="border-t-4 border-blue-600">
        <CardHeader className="pb-0">
          {/* Tab Seçici */}
          <div className="flex gap-1 border-b border-gray-200 pb-0">
            <button
              onClick={() => setTab("bulk")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === "bulk"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-black hover:text-blue-600"
              }`}
            >
              <Users className="w-4 h-4" /> Toplu Gönderim
            </button>
            <button
              onClick={() => setTab("individual")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === "individual"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-black hover:text-blue-600"
              }`}
            >
              <AtSign className="w-4 h-4" /> Bireysel E-posta
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          {tab === "bulk"
            ? <BulkForm agencyId={agencyId} counts={counts} />
            : <IndividualForm agencyId={agencyId} />
          }
        </CardContent>
      </Card>

      {/* ── GEÇMİŞ ── */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-black">
          Gönderim Geçmişi ({reminders.length})
        </h2>

        {reminders.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-black">
            Henüz gönderim yok.
          </div>
        )}

        {reminders.map((r) => (
          <Card key={r.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <Badge variant="outline" className="text-[10px] text-black">
                      → {recipientLabel[r.recipient] ?? r.recipient}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] text-black">
                      {fromLabel[r.from] ?? r.from}
                    </Badge>
                    {r.name && (
                      <Badge variant="outline" className="text-[10px] text-black">
                        {r.name}
                      </Badge>
                    )}
                    {r.email && (
                      <Badge variant="outline" className="text-[10px] text-black font-mono">
                        {r.email}
                      </Badge>
                    )}
                  </div>
                  <p className="font-semibold text-sm text-black truncate">{r.subject}</p>
                  <p className="text-xs text-black mt-1 line-clamp-2 whitespace-pre-wrap">{r.message}</p>
                  <p className="text-[10px] text-black mt-2">{fmtDate(r.createdAt)}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[92vw] max-w-md bg-white text-black">
                    <AlertDialogHeader>
                      <AlertDialogTitle>"{r.subject}" silinsin mi?</AlertDialogTitle>
                      <AlertDialogDescription>Kayıt silinecek, e-postalar geri alınamaz.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(r.id)}>
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
