"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { sendMessage, reportListing } from "../actions";

export default function ContactSeller({
  listingId,
  phone,
  showPhone,
  contactName,
  isOwner,
  isLoggedIn,
}: {
  listingId: string;
  phone: string | null;
  showPhone: boolean;
  contactName: string | null;
  isOwner: boolean;
  isLoggedIn: boolean;
}) {
  const [revealed, setRevealed] = useState(false);
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();
  const [reportOpen, setReportOpen] = useState(false);
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    start(async () => {
      const res = await sendMessage(listingId, msg);
      if (res.ok) {
        setSent(true);
        setMsg("");
      } else setError(res.error ?? "Bir hata oluştu.");
    });
  }

  return (
    <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <p className="text-sm text-gray-500">İlan Sahibi</p>
        <p className="font-semibold text-gray-800">{contactName || "Üye"}</p>
      </div>

      {showPhone && phone && (
        <button
          onClick={() => setRevealed(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {revealed ? phone : "Cep Telefonunu Göster"}
        </button>
      )}

      {!isOwner && (
        <form onSubmit={submit} className="space-y-2">
          {sent ? (
            <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              Mesajınız ilan sahibine iletildi.
            </p>
          ) : (
            <>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={3}
                placeholder="İlan sahibine mesaj yaz..."
                required
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {pending ? "Gönderiliyor..." : "Mesaj Gönder"}
              </button>
            </>
          )}
        </form>
      )}

      <button
        onClick={() => (isLoggedIn ? setReportOpen(true) : router.push("/login"))}
        className="w-full text-center text-xs text-gray-600 hover:text-red-500"
      >
        İlanı şikayet et
      </button>

      {reportOpen && (
        <ReportBox listingId={listingId} onClose={() => setReportOpen(false)} />
      )}
    </div>
  );
}

function ReportBox({ listingId, onClose }: { listingId: string; onClose: () => void }) {
  const [reason, setReason] = useState("Yanıltıcı içerik");
  const [desc, setDesc] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  function submit() {
    start(async () => {
      await reportListing(listingId, reason, desc);
      setDone(true);
      setTimeout(onClose, 1200);
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-sm rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-3 font-bold text-gray-800">İlanı Şikayet Et</h3>
        {done ? (
          <p className="text-sm text-green-700">Şikayetiniz alındı.</p>
        ) : (
          <>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mb-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
            >
              {["Yanıltıcı içerik", "Dolandırıcılık", "Yasaklı ürün", "Mükerrer ilan", "Diğer"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="Açıklama (opsiyonel)"
              className="mb-3 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 rounded-lg border border-gray-200 py-2 text-sm">
                Vazgeç
              </button>
              <button
                onClick={submit}
                disabled={pending}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-semibold text-white"
              >
                Gönder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
