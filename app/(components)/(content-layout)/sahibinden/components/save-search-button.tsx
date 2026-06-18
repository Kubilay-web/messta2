"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { saveSearchAndNotify } from "../actions";

export default function SaveSearchButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  function buildQuery() {
    const categorySlug = pathname.startsWith("/sahibinden/kategori/")
      ? pathname.split("/").pop()
      : undefined;
    const q: Record<string, unknown> = {};
    if (categorySlug) q.categorySlug = categorySlug;
    for (const k of ["q", "type", "city", "minPrice", "maxPrice"]) {
      const v = sp.get(k);
      if (v) q[k] = k.includes("Price") ? Number(v) : v;
    }
    return q;
  }

  function save() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const q = buildQuery();
    const defaultName =
      (q.q as string) ||
      (q.categorySlug as string) ||
      (q.city as string) ||
      "Aramam";
    const name = typeof window !== "undefined" ? window.prompt("Arama adı:", defaultName) : defaultName;
    if (!name) return;
    start(async () => {
      const res = await saveSearchAndNotify(name, q);
      if (res.ok) {
        setDone(true);
        setTimeout(() => setDone(false), 2500);
      }
    });
  }

  return (
    <button
      onClick={save}
      disabled={pending}
      className="flex items-center gap-1.5 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2 text-sm font-semibold text-yellow-700 hover:bg-yellow-100"
    >
      {done ? "✓ Kaydedildi" : "🔔 Aramayı Kaydet"}
    </button>
  );
}
