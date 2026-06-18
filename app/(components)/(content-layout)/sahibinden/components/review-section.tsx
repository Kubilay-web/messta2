"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { submitReview } from "../actions";

interface ReviewDTO {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  authorName: string;
  authorAvatar: string | null;
}

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ color: n <= Math.round(value) ? "#f59e0b" : "#d1d5db" }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewSection({
  targetUserId,
  storeId,
  reviews,
  avg,
  count,
  canReview,
  isLoggedIn,
}: {
  targetUserId: string;
  storeId?: string;
  reviews: ReviewDTO[];
  avg: number;
  count: number;
  canReview: boolean;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setError("");
    start(async () => {
      const res = await submitReview({ targetUserId, storeId, rating, comment });
      if (res.ok) {
        setDone(true);
        router.refresh();
      } else setError(res.error ?? "Hata.");
    });
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-lg font-bold text-gray-800">Değerlendirmeler</h2>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Stars value={avg} />
          <span className="font-semibold text-gray-700">{avg.toFixed(1)}</span>
          <span>({count})</span>
        </div>
      </div>

      {canReview && !done && (
        <form onSubmit={submit} className="mb-5 rounded-lg bg-gray-50 p-3">
          <p className="mb-1 text-sm font-medium text-gray-600">Puan ver</p>
          <div className="mb-2 flex gap-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                style={{ color: n <= (hover || rating) ? "#f59e0b" : "#d1d5db" }}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Deneyiminizi paylaşın (opsiyonel)"
            className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {pending ? "Gönderiliyor..." : "Değerlendir"}
          </button>
        </form>
      )}
      {done && <p className="mb-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Değerlendirmeniz kaydedildi.</p>}

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-600">Henüz değerlendirme yok.</p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((r) => (
            <li key={r.id} className="border-b border-gray-50 pb-3">
              <div className="flex items-center gap-2">
                {r.authorAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.authorAvatar} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                    {r.authorName[0]?.toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-semibold text-gray-800">{r.authorName}</span>
                <Stars value={r.rating} size={13} />
              </div>
              {r.comment && <p className="mt-1 pl-9 text-sm text-gray-600">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
