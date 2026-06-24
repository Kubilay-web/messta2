"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { buyDopingWithWalletAction } from "../deposit-actions";
import { formatPrice } from "../lib/format";

export interface DopingPackage {
  id: string;
  name: string;
  type: string;
  durationDays: number;
  price: number;
  currency: string;
}

const TYPE_ICON: Record<string, string> = {
  SHOWCASE: "⭐",
  FEATURED: "🔝",
  URGENT: "🔥",
  BUMP: "⬆️",
  BOLD: "🅱️",
};

export default function DopingDialog({
  listingId,
  packages,
}: {
  listingId: string;
  packages: DopingPackage[];
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  function payWithWallet() {
    if (!selected) return;
    setError("");
    start(async () => {
      const res = await buyDopingWithWalletAction(listingId, selected);
      if (res.ok) {
        setDone(true);
        setTimeout(() => {
          setOpen(false);
          setDone(false);
          router.refresh();
        }, 1200);
      } else setError(res.error ?? "İşlem başarısız.");
    });
  }

  async function payWith(provider: "stripe" | "paypal") {
    if (!selected) return;
    setError("");
    start(async () => {
      try {
        const res = await fetch(`/sahibinden/api/doping/${provider}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId, packageId: selected }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Ödeme başlatılamadı.");
          return;
        }
        const url = data.url ?? data.approveUrl;
        if (url) window.location.href = url;
        else setError("Yönlendirme adresi alınamadı.");
      } catch {
        setError("Sunucuya ulaşılamadı.");
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-700 hover:bg-yellow-100"
      >
        ⭐ Öne Çıkar
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Doping & Öne Çıkarma</h3>
              <button onClick={() => setOpen(false)} className="text-gray-600">✕</button>
            </div>

            {done ? (
              <div className="py-8 text-center">
                <p className="text-3xl">✅</p>
                <p className="mt-2 font-semibold text-green-700">İlanınız öne çıkarıldı!</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {packages.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-3 text-left transition ${
                        selected === p.id ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{TYPE_ICON[p.type] ?? "⭐"}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.durationDays} gün</p>
                        </div>
                      </div>
                      <span className="font-bold text-yellow-600">{formatPrice(p.price, p.currency)}</span>
                    </button>
                  ))}
                </div>

                {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => payWith("stripe")}
                    disabled={!selected || pending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#635bff] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                  >
                    💳 Kredi/Banka Kartı (Stripe)
                  </button>
                  <button
                    onClick={() => payWith("paypal")}
                    disabled={!selected || pending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ffc439] py-2.5 text-sm font-bold text-[#003087] hover:opacity-90 disabled:opacity-50"
                  >
                    PayPal ile Öde
                  </button>
                  <button
                    onClick={payWithWallet}
                    disabled={!selected || pending}
                    className="w-full rounded-lg border border-emerald-200 bg-emerald-50 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                  >
                    {pending ? "İşleniyor..." : "👛 Cüzdandan Öde"}
                  </button>
                </div>
                <p className="mt-2 text-center text-[11px] text-gray-600">
                  Stripe & PayPal kartla; cüzdan seçeneği bakiyenizden düşer.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
