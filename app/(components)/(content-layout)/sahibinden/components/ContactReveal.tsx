"use client";

import { useState } from "react";
import { Phone, Eye } from "lucide-react";

// Telefonu spam'e karşı tıklayınca açığa çıkarır.
export default function ContactReveal({ phone, name }: { phone?: string | null; name?: string | null }) {
  const [shown, setShown] = useState(false);

  if (!phone) return null;
  const masked = phone.replace(/\d(?=\d{2})/g, "•");

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-xs font-medium text-slate-500">{name || "İlan sahibi"}</p>
      {shown ? (
        <a href={`tel:${phone}`} className="mt-1 flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <Phone className="h-5 w-5 text-emerald-500" /> {phone}
        </a>
      ) : (
        <button onClick={() => setShown(true)} className="mt-1 flex w-full items-center justify-between gap-2 text-lg font-extrabold text-slate-900">
          <span className="flex items-center gap-2"><Phone className="h-5 w-5 text-emerald-500" /> {masked}</span>
          <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600"><Eye className="h-3.5 w-3.5" /> Göster</span>
        </button>
      )}
    </div>
  );
}
