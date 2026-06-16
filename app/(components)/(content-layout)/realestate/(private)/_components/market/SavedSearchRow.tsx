"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteSavedSearch } from "../../../actions/favorites";

export default function SavedSearchRow({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const remove = async () => {
    if (!confirm("Bu kayıtlı arama silinsin mi?")) return;
    setBusy(true);
    await deleteSavedSearch(id);
    setBusy(false);
    router.refresh();
  };

  return (
    <button
      onClick={remove}
      disabled={busy}
      aria-label="Sil"
      className="rounded-lg border p-1.5 text-gray-400 hover:border-red-200 hover:text-red-600 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
