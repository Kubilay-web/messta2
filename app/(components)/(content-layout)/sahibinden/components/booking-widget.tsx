"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { bookWithWallet } from "../booking-actions";

interface Quote {
  ok: boolean;
  error?: string;
  nights: number;
  pricePerUnit: number;
  subtotal: number;
  discount: number;
  cleaningFee: number;
  serviceFee: number;
  deposit: number;
  total: number;
  currency: string;
}

function fmt(n: number, c: string) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: c }).format(n);
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookingWidget({
  listingId,
  dailyPrice,
  weeklyPrice,
  currency,
  minNights,
  maxGuests,
  instantBook,
  isLoggedIn,
  isOwner,
  walletBalance,
  paypalEnabled,
}: {
  listingId: string;
  dailyPrice: number;
  weeklyPrice?: number | null;
  currency: string;
  minNights?: number | null;
  maxGuests?: number | null;
  instantBook: boolean;
  isLoggedIn: boolean;
  isOwner: boolean;
  walletBalance: number;
  paypalEnabled: boolean;
}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [phone, setPhone] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [pending, startT] = useTransition();
  const router = useRouter();

  const fetchQuote = useCallback(async () => {
    if (!start || !end) {
      setQuote(null);
      return;
    }
    setLoadingQuote(true);
    try {
      const res = await fetch("/sahibinden/api/rental/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, start, end, guests }),
      });
      setQuote(await res.json());
    } catch {
      setQuote(null);
    } finally {
      setLoadingQuote(false);
    }
  }, [listingId, start, end, guests]);

  useEffect(() => {
    const t = setTimeout(fetchQuote, 250);
    return () => clearTimeout(t);
  }, [fetchQuote]);

  const canPay = quote?.ok && !isOwner && isLoggedIn;
  const body = () => ({ listingId, start, end, guests, note, phone });

  async function viaProvider(provider: "stripe" | "paypal") {
    setErr("");
    setBusy(provider);
    try {
      const res = await fetch(`/sahibinden/api/rental/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body()),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Başlatılamadı");
      window.location.href = data.url;
    } catch (e: any) {
      setErr(e?.message ?? "Hata");
      setBusy(null);
    }
  }

  function viaWallet() {
    setErr("");
    startT(async () => {
      const res = await bookWithWallet(body());
      if (res.ok) router.push("/sahibinden/hesabim/rezervasyonlarim?ok=1");
      else setErr(res.error ?? "Hata");
    });
  }

  const canWallet = quote?.ok && walletBalance >= (quote?.total ?? 0);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-baseline gap-1">
        <span className="text-2xl font-extrabold text-gray-900">{fmt(dailyPrice, currency)}</span>
        <span className="text-sm text-gray-500">/ gece</span>
        {weeklyPrice ? (
          <span className="ml-auto rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
            Haftalık {fmt(weeklyPrice, currency)}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Giriş</span>
          <input
            type="date"
            min={todayStr()}
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-gray-500">Çıkış</span>
          <input
            type="date"
            min={start || todayStr()}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </label>
      </div>

      <label className="mt-2 block">
        <span className="text-xs font-medium text-gray-500">Misafir</span>
        <input
          type="number"
          min={1}
          max={maxGuests ?? undefined}
          value={guests}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
          className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2 text-sm outline-none focus:border-yellow-400"
        />
      </label>

      {minNights ? <p className="mt-1 text-xs text-gray-400">En az {minNights} gece</p> : null}

      {/* Fiyat dökümü */}
      {loadingQuote && <p className="mt-3 text-sm text-gray-400">Fiyat hesaplanıyor…</p>}
      {quote && !quote.ok && quote.error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{quote.error}</p>
      )}
      {quote?.ok && (
        <div className="mt-3 space-y-1.5 border-t border-gray-100 pt-3 text-sm">
          <Row
            label={`${fmt(quote.pricePerUnit, currency)} × ${quote.nights} gece`}
            value={fmt(quote.subtotal + quote.discount, currency)}
          />
          {quote.discount > 0 && <Row label="İndirim" value={`−${fmt(quote.discount, currency)}`} green />}
          {quote.cleaningFee > 0 && <Row label="Temizlik ücreti" value={fmt(quote.cleaningFee, currency)} />}
          {quote.serviceFee > 0 && <Row label="Hizmet bedeli" value={fmt(quote.serviceFee, currency)} />}
          {quote.deposit > 0 && (
            <Row label="Güvenlik depozitosu (iade edilebilir)" value={fmt(quote.deposit, currency)} muted />
          )}
          <div className="flex justify-between border-t border-gray-100 pt-2 font-bold text-gray-900">
            <span>Toplam</span>
            <span>{fmt(quote.total, currency)}</span>
          </div>
        </div>
      )}

      {err && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{err}</p>}

      {/* İletişim (opsiyonel) */}
      {quote?.ok && (
        <div className="mt-3 space-y-2">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon (opsiyonel)"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ev sahibine not (opsiyonel)"
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
        </div>
      )}

      {/* Aksiyonlar */}
      <div className="mt-4 space-y-2">
        {isOwner ? (
          <p className="rounded-lg bg-gray-50 px-3 py-2 text-center text-sm text-gray-500">
            Bu sizin ilanınız.
          </p>
        ) : !isLoggedIn ? (
          <a
            href="/login"
            className="block w-full rounded-xl bg-yellow-400 py-2.5 text-center text-sm font-bold text-gray-900 hover:bg-yellow-500"
          >
            Rezervasyon için giriş yapın
          </a>
        ) : (
          <>
            <button
              disabled={!canPay || busy === "stripe"}
              onClick={() => viaProvider("stripe")}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {busy === "stripe"
                ? "Yönlendiriliyor…"
                : instantBook
                  ? "💳 Hemen Kirala"
                  : "💳 Kart ile rezervasyon yap"}
            </button>
            <div className="flex gap-2">
              {paypalEnabled && (
                <button
                  disabled={!canPay || busy === "paypal"}
                  onClick={() => viaProvider("paypal")}
                  className="flex-1 rounded-xl bg-[#ffc439] py-2.5 text-sm font-bold text-[#003087] hover:opacity-90 disabled:opacity-50"
                >
                  PayPal
                </button>
              )}
              <button
                disabled={!canPay || pending || !canWallet}
                onClick={viaWallet}
                title={canWallet ? "" : "Yetersiz bakiye"}
                className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {pending ? "…" : "Cüzdan"}
              </button>
            </div>
            <p className="text-center text-[11px] text-gray-400">
              {instantBook ? "Anında onaylanır." : "Önce ev sahibi onaylar, onaylanmazsa iade edilir."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, green, muted }: { label: string; value: string; green?: boolean; muted?: boolean }) {
  return (
    <div className={`flex justify-between ${muted ? "text-gray-400" : "text-gray-600"}`}>
      <span>{label}</span>
      <span className={green ? "text-green-600" : ""}>{value}</span>
    </div>
  );
}
