"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send, CheckCircle2 } from "lucide-react";
import { createAgencyContactMessage } from "../../actions/website-messages";

export default function ListingLeadForm({
  agencyId,
  listingTitle,
  listingType,
}: {
  agencyId: string;
  listingTitle: string;
  listingType: string;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: `"${listingTitle}" ilanı hakkında bilgi almak istiyorum.`,
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim()) {
      toast.error("Ad ve telefon alanları zorunludur.");
      return;
    }
    try {
      setLoading(true);
      await createAgencyContactMessage({
        agencyId,
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        subject: `İlan talebi: ${listingTitle}`,
        message: form.message,
        interest: listingType,
      });
      setDone(true);
      toast.success("Talebiniz alındı! En kısa sürede sizinle iletişime geçilecek.");
    } catch (err: any) {
      toast.error(err?.message ?? "Gönderilemedi, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border bg-green-50 p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
        <p className="font-semibold text-green-800">Talebiniz alındı</p>
        <p className="text-sm text-green-700 mt-1">Danışmanımız en kısa sürede sizinle iletişime geçecek.</p>
      </div>
    );
  }

  const inputCls =
    "w-full h-10 rounded-md border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none";

  return (
    <form onSubmit={submit} className="rounded-2xl border bg-white p-5 space-y-3">
      <h3 className="font-bold text-lg">İlgileniyorum</h3>
      <p className="text-sm text-muted-foreground -mt-1">Bilgilerinizi bırakın, sizi arayalım.</p>
      <input className={inputCls} placeholder="Ad Soyad *" value={form.fullName} onChange={set("fullName")} />
      <input className={inputCls} placeholder="Telefon *" value={form.phone} onChange={set("phone")} />
      <input className={inputCls} type="email" placeholder="E-posta" value={form.email} onChange={set("email")} />
      <textarea
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        rows={3}
        placeholder="Mesajınız"
        value={form.message}
        onChange={set("message")}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        <Send className="w-4 h-4" /> {loading ? "Gönderiliyor…" : "Talep Gönder"}
      </button>
    </form>
  );
}
