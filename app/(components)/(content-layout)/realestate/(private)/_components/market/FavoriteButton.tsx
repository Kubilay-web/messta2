"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleFavorite } from "../../../actions/favorites";

export default function FavoriteButton({
  listingId,
  initial = false,
  variant = "overlay",
}: {
  listingId: string;
  initial?: boolean;
  variant?: "overlay" | "button";
}) {
  const router = useRouter();
  const [fav, setFav] = useState(initial);
  const [busy, setBusy] = useState(false);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    const prev = fav;
    setFav(!prev); // iyimser
    const res = await toggleFavorite(listingId);
    setBusy(false);
    if (res?.error) {
      setFav(prev);
      if (res.needAuth) {
        if (confirm("Favorilere eklemek için giriş yapın. Giriş sayfasına gidilsin mi?")) {
          router.push("/estate/login");
        }
      } else {
        alert(res.error);
      }
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={onClick}
        disabled={busy}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl border font-semibold transition ${
          fav ? "border-rose-200 bg-rose-50 text-rose-600" : "border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-red-600 text-red-600" : ""}`} />
        {fav ? "Favorilerde" : "Favorilere ekle"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={busy}
      aria-label="Favori"
      className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
    >
      <Heart className={`h-4 w-4 ${fav ? "fill-red-600 text-red-600" : "text-gray-600"}`} />
    </button>
  );
}
