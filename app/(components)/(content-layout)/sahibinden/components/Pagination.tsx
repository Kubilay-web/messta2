import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  pages,
  hrefFor,
}: {
  page: number;
  pages: number;
  hrefFor: (p: number) => string;
}) {
  if (pages <= 1) return null;
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (n) => Math.abs(n - page) <= 2 || n === 1 || n === pages,
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
      {page > 1 && (
        <Link href={hrefFor(page - 1)} className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-slate-50">
          <ChevronLeft className="h-4 w-4" /> Önceki
        </Link>
      )}
      {nums.map((n, i, a) => (
        <span key={n} className="flex items-center">
          {i > 0 && a[i - 1] !== n - 1 && <span className="px-1 text-slate-400">…</span>}
          <Link
            href={hrefFor(n)}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold shadow-sm ${
              n === page ? "border-amber-500 bg-amber-500 text-white" : "border-slate-200 bg-white hover:bg-slate-50"
            }`}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pages && (
        <Link href={hrefFor(page + 1)} className="flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-slate-50">
          Sonraki <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
