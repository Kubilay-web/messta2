"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const KEY = "sh_compare";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export default function CompareButton({ listingId }: { listingId: string }) {
  const [ids, setIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIds(read());
  }, []);

  const inList = ids.includes(listingId);

  function toggle() {
    let next = read();
    if (next.includes(listingId)) next = next.filter((x) => x !== listingId);
    else next = [...next, listingId].slice(-4); // en fazla 4
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
  }

  function goCompare() {
    const list = read();
    if (list.length < 2) return;
    router.push(`/sahibinden/karsilastir?ids=${list.join(",")}`);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
          inList ? "border-yellow-400 bg-yellow-50 text-yellow-700" : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
        }`}
      >
        {inList ? "✓ Karşılaştırmada" : "⚖️ Karşılaştır"}
      </button>
      {ids.length >= 2 && (
        <button
          onClick={goCompare}
          className="rounded-lg bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-900"
        >
          Karşılaştır ({ids.length})
        </button>
      )}
    </div>
  );
}
