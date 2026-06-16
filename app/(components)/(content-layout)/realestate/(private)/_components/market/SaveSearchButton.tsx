"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookmarkPlus, Check } from "lucide-react";
import { saveSearch } from "../../../actions/favorites";

export default function SaveSearchButton({
  filters,
}: {
  filters: {
    listingType?: string;
    propertyType?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    rooms?: string;
    q?: string;
  };
}) {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    const name = prompt("Bu aramaya bir ad verin:", filters.city || filters.q || "Aramam");
    if (!name) return;
    setBusy(true);
    const res = await saveSearch({ name, ...filters });
    setBusy(false);
    if (res?.error) {
      if ((res as any).needAuth) {
        if (confirm("Arama kaydetmek için giriş yapın. Giriş sayfasına gidilsin mi?")) {
          router.push("/estate/login");
        }
      } else {
        alert(res.error);
      }
      return;
    }
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="flex h-10 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium shadow-sm transition hover:bg-slate-50"
    >
      {done ? <Check className="h-4 w-4 text-emerald-600" /> : <BookmarkPlus className="h-4 w-4" />}
      {done ? "Kaydedildi" : "Aramayı kaydet"}
    </button>
  );
}
