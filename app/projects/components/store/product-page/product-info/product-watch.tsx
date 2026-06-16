"use client";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ProductWatch({ productId }: { productId: string }) {
  const [watcherCount, setWatcherCount] = useState<number>(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`wss:noon-rare-homburg.glitch.me/${productId}`);
    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (productId === data.productId) {
        setWatcherCount(data.count);
      }
    };

    ws.onopen = () => {};

    ws.onerror = (error) => {
      setSocket(null);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [productId]);
  if (watcherCount > 0) {
    return (
      <div className="mb-2 text-sm">
        <p className="flex items-center gap-x-1">
          <Eye className="w-4 text-main-secondary" />
          <span>
            {watcherCount} {watcherCount > 1 ? "people are" : "person is"}
            &nbsp;watching this product
          </span>
        </p>
      </div>
    );
  }
}
