"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "../actions";

export default function FavoriteButton({
  listingId,
  initial = false,
  variant = "icon",
}: {
  listingId: string;
  initial?: boolean;
  variant?: "icon" | "button";
}) {
  const [fav, setFav] = useState(initial);
  const [pending, start] = useTransition();
  const router = useRouter();

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    start(async () => {
      const res = await toggleFavorite(listingId);
      if (res.ok && res.data) setFav(res.data.favorited);
      else if (res.error?.includes("giriş")) router.push("/login");
    });
  }

  if (variant === "button") {
    return (
      <button
        onClick={onClick}
        disabled={pending}
        className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
          fav
            ? "border-red-500 bg-red-50 text-red-600"
            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
        }`}
      >
        <Heart filled={fav} />
        {fav ? "Favorilerimde" : "Favorilere Ekle"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={pending}
      aria-label="Favori"
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 transition hover:bg-white ${
        pending ? "opacity-60" : ""
      }`}
    >
      <Heart filled={fav} />
    </button>
  );
}

function Heart({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#ef4444" : "none"}
      stroke={filled ? "#ef4444" : "#6b7280"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
