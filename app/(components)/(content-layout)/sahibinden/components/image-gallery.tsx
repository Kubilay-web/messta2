"use client";

import { useState } from "react";

export default function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const has = images && images.length > 0;

  return (
    <div>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 sm:aspect-[16/10]"
        onClick={() => has && setLightbox(true)}
      >
        {has ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={images[active]} alt={title} className="h-full w-full cursor-zoom-in object-contain" />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">Görsel yok</div>
        )}
        {has && images.length > 1 && (
          <>
            <NavBtn dir="left" onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }} />
            <NavBtn dir="right" onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }} />
            <span className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {has && images.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === active ? "border-yellow-400" : "border-transparent"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && has && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
        >
          <button className="absolute right-4 top-4 text-3xl text-white" onClick={() => setLightbox(false)}>
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={images[active]} alt={title} className="max-h-full max-w-full object-contain" />
          {images.length > 1 && (
            <>
              <NavBtn dir="left" light onClick={(e) => { e.stopPropagation(); setActive((a) => (a - 1 + images.length) % images.length); }} />
              <NavBtn dir="right" light onClick={(e) => { e.stopPropagation(); setActive((a) => (a + 1) % images.length); }} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function NavBtn({
  dir,
  onClick,
  light,
}: {
  dir: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  light?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === "left" ? "left-2" : "right-2"} flex h-10 w-10 items-center justify-center rounded-full ${
        light ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/80 text-gray-800 hover:bg-white"
      } shadow`}
      aria-label={dir === "left" ? "Önceki" : "Sonraki"}
    >
      {dir === "left" ? "‹" : "›"}
    </button>
  );
}
