"use client";

// İlan karşılaştırma & son görüntülenenler — localStorage tabanlı küçük store.
import { useEffect, useState, useCallback } from "react";

const COMPARE_KEY = "shb_compare";
const RECENT_KEY = "shb_recent";
const MAX_COMPARE = 4;
const MAX_RECENT = 12;
const EVT = "shb_compare_change";

function read(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(key: string, ids: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(EVT));
  } catch {
    /* ignore */
  }
}

export function getCompareIds() {
  return read(COMPARE_KEY);
}

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  const sync = useCallback(() => setIds(read(COMPARE_KEY)), []);

  useEffect(() => {
    sync();
    const h = () => sync();
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, [sync]);

  const toggle = useCallback((id: string) => {
    const cur = read(COMPARE_KEY);
    let next: string[];
    if (cur.includes(id)) next = cur.filter((x) => x !== id);
    else next = [...cur, id].slice(-MAX_COMPARE);
    write(COMPARE_KEY, next);
  }, []);

  const remove = useCallback((id: string) => {
    write(COMPARE_KEY, read(COMPARE_KEY).filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => write(COMPARE_KEY, []), []);

  return { ids, has: (id: string) => ids.includes(id), toggle, remove, clear, max: MAX_COMPARE };
}

/** Son görüntülenen ilanı kaydeder (ilan detayında çağrılır). */
export function pushRecent(id: string) {
  const cur = read(RECENT_KEY).filter((x) => x !== id);
  write(RECENT_KEY, [id, ...cur].slice(0, MAX_RECENT));
}

export function getRecentIds() {
  return read(RECENT_KEY);
}
