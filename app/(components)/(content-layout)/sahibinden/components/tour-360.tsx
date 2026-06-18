"use client";

import { useEffect, useRef, useState } from "react";

// Pannellum'u CDN'den yükleyip 360° equirectangular panorama gösterir.
const PANNELLUM_CSS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
const PANNELLUM_JS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";

function loadOnce(src: string, isCss: boolean): Promise<void> {
  return new Promise((resolve) => {
    if (isCss) {
      if (document.querySelector(`link[href="${src}"]`)) return resolve();
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = src;
      link.onload = () => resolve();
      document.head.appendChild(link);
    } else {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve();
      document.body.appendChild(s);
    }
  });
}

export default function Tour360({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open || !ref.current) return;
    let viewer: any;
    (async () => {
      await loadOnce(PANNELLUM_CSS, true);
      await loadOnce(PANNELLUM_JS, false);
      const pannellum = (window as any).pannellum;
      if (pannellum && ref.current) {
        ref.current.innerHTML = "";
        viewer = pannellum.viewer(ref.current, {
          type: "equirectangular",
          panorama: image,
          autoLoad: true,
          showControls: true,
        });
      }
    })();
    return () => {
      try {
        viewer?.destroy?.();
      } catch {
        /* yok say */
      }
    };
  }, [open, image]);

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="relative block w-full overflow-hidden rounded-xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="360 tur" className="h-56 w-full object-cover sm:h-72" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800">
              🌐 360° Sanal Turu Başlat
            </span>
          </span>
        </button>
      ) : (
        <div ref={ref} style={{ height: 380, width: "100%", borderRadius: 12, overflow: "hidden" }} />
      )}
    </div>
  );
}
