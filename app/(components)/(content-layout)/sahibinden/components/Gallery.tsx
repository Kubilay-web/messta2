"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Building2, Expand } from "lucide-react";
import { cldThumb } from "../lib/cld";

export default function Gallery({ images, title }: { images: { url: string }[]; title: string }) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const count = images.length;

  const go = useCallback(
    (d: number) => setIdx((i) => (count ? (i + d + count) % count : 0)),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, go]);

  if (!count) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
        <Building2 className="h-16 w-16" />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="relative aspect-[16/10] w-full bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cldThumb(images[idx].url, 1100, 700)} alt={`${title} - ${idx + 1}`} className="h-full w-full object-cover" />

          <button
            onClick={() => setOpen(true)}
            aria-label="Büyüt"
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/60"
          >
            <Expand className="h-5 w-5" />
          </button>

          {count > 1 && (
            <>
              <button onClick={() => go(-1)} aria-label="Önceki" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={() => go(1)} aria-label="Sonraki" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-slate-800 shadow-lg transition hover:bg-white">
                <ChevronRight className="h-6 w-6" />
              </button>
              <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                {idx + 1} / {count}
              </span>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === idx ? "border-amber-500" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cldThumb(im.url, 200, 150)} alt={`thumb ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(false)}>
          <button onClick={() => setOpen(false)} aria-label="Kapat" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[idx].url} alt={title} className="max-h-[88vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
          {count > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Önceki" className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Sonraki" className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
