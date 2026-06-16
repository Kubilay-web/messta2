"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { BookmarkPlus } from "lucide-react";
import { createSavedSearch } from "../../actions/saved-searches";

type Filters = {
  listingType?:  string;
  propertyType?: string;
  city?:         string;
  minPrice?:     number;
  maxPrice?:     number;
  q?:            string;
};

export default function SaveSearchButton({
  clientId,
  filters,
}: {
  clientId: string;
  filters: Filters;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    try {
      setLoading(true);
      await createSavedSearch(clientId, { name: name.trim() || "Aramam", ...filters });
      toast.success("Arama kaydedildi. Yeni uygun ilanları takip edebilirsiniz.");
      setOpen(false);
      setName("");
    } catch (e: any) {
      toast.error(e?.message ?? "Kaydedilemedi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-9 inline-flex items-center gap-1.5 rounded-md border border-blue-600 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <BookmarkPlus className="w-4 h-4" /> Aramayı Kaydet
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border bg-white p-3 shadow-lg space-y-2">
          <p className="text-xs text-muted-foreground">Bu aramaya bir isim verin:</p>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Örn. Kadıköy 2+1 kiralık"
            className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={loading}
              className="flex-1 h-9 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Kaydediliyor…" : "Kaydet"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="h-9 rounded-md border px-3 text-sm text-gray-600 hover:bg-gray-50"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
