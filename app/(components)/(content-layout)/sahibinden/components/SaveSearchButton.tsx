"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Check } from "lucide-react";
import { saveSearch, type SavedSearchInput } from "../actions/searches";

export default function SaveSearchButton({ filters }: { filters: SavedSearchInput }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (busy || saved) return;
    const name = prompt("Bu aramaya bir ad verin:", filters.city ? `${filters.city} ilanları` : "Aramam");
    if (name == null) return;
    setBusy(true);
    const res = await saveSearch({ ...filters, name });
    setBusy(false);
    if ((res as any)?.error) {
      if ((res as any).needAuth) {
        if (confirm("Arama kaydetmek için giriş yapın. Giriş sayfasına gidilsin mi?")) router.push("/estate/login");
      } else {
        alert((res as any).error);
      }
      return;
    }
    setSaved(true);
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className={`flex h-10 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold shadow-sm transition ${
        saved ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
      {saved ? "Kaydedildi" : "Aramayı kaydet"}
    </button>
  );
}
