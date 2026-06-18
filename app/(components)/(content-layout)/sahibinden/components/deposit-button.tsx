"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DepositButton({
  listingId,
  isOwner,
  isLoggedIn,
  suggested,
}: {
  listingId: string;
  isOwner: boolean;
  isLoggedIn: boolean;
  suggested: number;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(String(Math.round(suggested)));
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();

  if (isOwner) return null;

  function pay() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setError("");
    start(async () => {
      try {
        const res = await fetch("/sahibinden/api/deposit/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listingId, amount: Number(amount) }),
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error ?? "İşlem başlatılamadı.");
        if (data.url) window.location.href = data.url;
      } catch {
        setError("Sunucuya ulaşılamadı.");
      }
    });
  }

  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-lg">🛡️</span>
        <h3 className="text-sm font-bold text-blue-800">Güvenli Kapora</h3>
      </div>
      <p className="mb-2 text-xs text-blue-700">
        Kaporanız güvenli şekilde emanete alınır; anlaşma sağlanınca satıcıya aktarılır.
      </p>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Kapora Öde
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-blue-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
            <span className="text-sm font-semibold text-blue-700">₺</span>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={pay}
            disabled={pending || !(Number(amount) > 0)}
            className="w-full rounded-lg bg-[#635bff] py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Yönlendiriliyor..." : "Stripe ile Güvenli Öde"}
          </button>
        </div>
      )}
    </div>
  );
}
