"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { bulkCreateListings } from "../actions";

const SAMPLE = `title,price,type,city,district,rooms,m2,description
Deniz Manzaralı 3+1 Daire,4250000,SALE,İstanbul,Kadıköy,3+1,140,Ferah ve aydınlık
Merkezi 2+1 Kiralık,18500,RENT,İstanbul,Şişli,2+1,90,Eşyalı`;

export default function BulkUpload() {
  const router = useRouter();
  const [csv, setCsv] = useState("");
  const [result, setResult] = useState<{ created: number; errors: string[] } | null>(null);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function submit() {
    setError("");
    setResult(null);
    if (!csv.trim()) {
      setError("CSV içeriği boş.");
      return;
    }
    start(async () => {
      const res = await bulkCreateListings(csv);
      if (res.ok && res.data) {
        setResult(res.data);
        router.refresh();
      } else setError(res.error ?? "Hata.");
    });
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-800">Toplu İlan Yükleme (CSV)</h1>
      <p className="mb-4 text-sm text-gray-600">
        Her satır bir ilan. Başlık satırı:{" "}
        <code className="rounded bg-gray-100 px-1 text-xs">title,price,type,city,district,rooms,m2,description</code>{" "}
        — <code className="rounded bg-gray-100 px-1 text-xs">type</code>: SALE veya RENT.
      </p>

      <textarea
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        rows={10}
        placeholder={SAMPLE}
        className="w-full rounded-xl border border-gray-200 p-3 font-mono text-xs outline-none focus:border-yellow-400"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={submit} disabled={pending} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {pending ? "Yükleniyor..." : "İlanları Oluştur"}
        </button>
        <button onClick={() => setCsv(SAMPLE)} className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Örnek Doldur
        </button>
      </div>

      {error && <p className="mt-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
      {result && (
        <div className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          ✓ {result.created} ilan oluşturuldu.
          {result.errors.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-red-600">
              {result.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
