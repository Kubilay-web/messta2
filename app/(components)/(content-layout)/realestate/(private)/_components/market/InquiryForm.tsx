"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "../../../actions/marketplace";

// Ziyaretçi talep formu → estate CRM Lead'ine yazar.
export default function InquiryForm({
  listingId,
  listingType,
}: {
  listingId: string;
  listingType: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", offer: "" });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setError(null);
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Lütfen ad ve telefon giriniz.");
      return;
    }
    setSaving(true);
    const res = await submitInquiry({
      listingId,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      message: form.message || undefined,
      offerAmount: form.offer ? Number(form.offer) : null,
    });
    setSaving(false);
    if (res?.error) setError(res.error);
    else setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-emerald-600" />
        <p className="font-semibold text-emerald-800">Talebiniz iletildi!</p>
        <p className="mt-1 text-sm text-emerald-700">
          İlgili emlak danışmanı en kısa sürede sizinle iletişime geçecek.
        </p>
      </div>
    );
  }

  const inputCls =
    "h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-blue-500 focus:outline-none";
  const isRent = listingType === "RENT" || listingType === "SHORT_RENT";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 font-bold text-slate-900">İletişime geç / Teklif ver</h3>
      <div className="space-y-2.5">
        <input
          className={inputCls}
          placeholder="Adınız Soyadınız *"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <input
            className={inputCls}
            placeholder="Telefon *"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <input
            className={inputCls}
            placeholder="E-posta"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <input
          type="number"
          className={inputCls}
          placeholder={isRent ? "Önerdiğiniz kira (opsiyonel)" : "Teklifiniz (opsiyonel)"}
          value={form.offer}
          onChange={(e) => set("offer", e.target.value)}
        />
        <textarea
          className={`${inputCls} h-auto min-h-[80px] py-2`}
          placeholder="Mesajınız (örn. ne zaman gezebilirim?)"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={submit}
          disabled={saving}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:opacity-95 disabled:opacity-60"
        >
          <Send className="w-4 h-4" /> {saving ? "Gönderiliyor…" : "Talebi Gönder"}
        </button>
        <p className="text-center text-[11px] text-gray-400">
          Bilgileriniz ilgili emlak ofisinin CRM sistemine iletilir.
        </p>
      </div>
    </div>
  );
}
