"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../lib/format";
import {
  releaseDepositAction,
  refundDepositAction,
  openDepositDisputeAction,
} from "../deposit-actions";

export interface DepositVM {
  id: string;
  listingId: string;
  listingTitle: string;
  amount: number;
  currency: string;
  status: string;
  side: "buyer" | "seller";
  otherName: string;
  disputeReason: string | null;
  createdAt: string;
}

const STATUS: Record<string, { label: string; cls: string }> = {
  PENDING: { label: "Ödeme bekliyor", cls: "bg-gray-100 text-gray-600" },
  HELD: { label: "Emanette", cls: "bg-blue-100 text-blue-700" },
  RELEASED: { label: "Satıcıya aktarıldı", cls: "bg-emerald-100 text-emerald-700" },
  REFUNDED: { label: "İade edildi", cls: "bg-amber-100 text-amber-700" },
  DISPUTED: { label: "Anlaşmazlık", cls: "bg-red-100 text-red-700" },
  CANCELLED: { label: "İptal", cls: "bg-gray-100 text-gray-500" },
};

export default function DepositsClient({ deposits }: { deposits: DepositVM[] }) {
  const [tab, setTab] = useState<"buyer" | "seller">("buyer");
  const list = deposits.filter((d) => d.side === tab);

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <TabBtn active={tab === "buyer"} onClick={() => setTab("buyer")}>
          Verdiğim Kaporalar
        </TabBtn>
        <TabBtn active={tab === "seller"} onClick={() => setTab("seller")}>
          Aldığım Kaporalar
        </TabBtn>
      </div>
      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          Bu kategoride kapora yok.
        </p>
      ) : (
        <div className="space-y-3">
          {list.map((d) => (
            <DepositCard key={d.id} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
        active ? "bg-yellow-400 text-gray-900" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function DepositCard({ d }: { d: DepositVM }) {
  const [pending, start] = useTransition();
  const [err, setErr] = useState("");
  const [disputeOpen, setDisputeOpen] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();
  const st = STATUS[d.status] ?? { label: d.status, cls: "bg-gray-100 text-gray-600" };

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setErr("");
    start(async () => {
      const r = await fn();
      if (r.ok) router.refresh();
      else setErr(r.error ?? "İşlem başarısız.");
    });
  }

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-gray-800">{d.listingTitle}</p>
          <p className="text-xs text-gray-500">
            {d.side === "buyer" ? "Satıcı" : "Alıcı"}: {d.otherName}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800">{formatPrice(d.amount, d.currency)}</p>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>
            {st.label}
          </span>
        </div>
      </div>

      {d.status === "DISPUTED" && d.disputeReason && (
        <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs text-red-700">Anlaşmazlık: {d.disputeReason}</p>
      )}

      {(d.status === "HELD" || d.status === "DISPUTED") && (
        <div className="mt-3 flex flex-wrap gap-2">
          {/* Alıcı kaporayı serbest bırakabilir → satıcıya */}
          {d.side === "buyer" && (
            <button
              onClick={() => run(() => releaseDepositAction(d.id))}
              disabled={pending}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              Satıcıya Serbest Bırak
            </button>
          )}
          {/* Satıcı kaporayı iade edebilir → alıcıya */}
          {d.side === "seller" && (
            <button
              onClick={() => run(() => refundDepositAction(d.id))}
              disabled={pending}
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-50"
            >
              Alıcıya İade Et
            </button>
          )}
          {/* Anlaşmazlık yalnızca emanetteyken açılır */}
          {d.status === "HELD" && (
            <button
              onClick={() => setDisputeOpen((v) => !v)}
              disabled={pending}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Anlaşmazlık Aç
            </button>
          )}
        </div>
      )}

      {disputeOpen && (
        <div className="mt-2">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Sorunu kısaca açıklayın (yetkili inceleyip karar verecek)"
            className="w-full rounded-lg border border-gray-200 p-2 text-sm"
            rows={2}
          />
          <button
            onClick={() => run(() => openDepositDisputeAction(d.id, reason))}
            disabled={pending || !reason.trim()}
            className="mt-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            Anlaşmazlığı Gönder
          </button>
        </div>
      )}

      {err && <p className="mt-2 text-xs text-red-500">{err}</p>}
    </div>
  );
}
