"use client";

import { useEffect } from "react";
import { pushRecent } from "./compare-store";

// İlan detayında görüntülenince "son görüntülenenler"e ekler.
export default function RecentTracker({ id }: { id: string }) {
  useEffect(() => {
    pushRecent(id);
  }, [id]);
  return null;
}
