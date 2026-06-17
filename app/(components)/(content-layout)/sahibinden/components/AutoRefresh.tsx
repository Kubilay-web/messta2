"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Belirli aralıkla sunucu bileşenini tazeler (mesaj/bildirim için near-realtime).
export default function AutoRefresh({ seconds = 10 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "visible") {
        router.refresh();
      }
    }, Math.max(4, seconds) * 1000);
    return () => clearInterval(t);
  }, [router, seconds]);
  return null;
}
