"use client";

import { GitCompareArrows } from "lucide-react";
import { useCompare } from "./compare-store";

export default function CompareButton({
  listingId,
  variant = "overlay",
}: {
  listingId: string;
  variant?: "overlay" | "button";
}) {
  const { has, toggle } = useCompare();
  const active = has(listingId);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(listingId);
  };

  if (variant === "button") {
    return (
      <button
        onClick={onClick}
        className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl border font-semibold transition ${
          active ? "border-amber-300 bg-amber-50 text-amber-700" : "border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        <GitCompareArrows className="h-4 w-4" />
        {active ? "Karşılaştırmada" : "Karşılaştır"}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label="Karşılaştır"
      title="Karşılaştırmaya ekle"
      className={`absolute right-2.5 top-12 z-10 grid h-9 w-9 place-items-center rounded-full shadow-md backdrop-blur transition hover:scale-105 ${
        active ? "bg-amber-500 text-white" : "bg-white/90 text-slate-600 hover:bg-white"
      }`}
    >
      <GitCompareArrows className="h-[17px] w-[17px]" />
    </button>
  );
}
