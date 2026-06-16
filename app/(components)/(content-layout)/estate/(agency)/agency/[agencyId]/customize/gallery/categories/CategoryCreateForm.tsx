"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGalleryCategory } from "../../../../../../actions/agency-gallery";
import { Button } from "../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function CategoryCreateForm({ agencyId }: { agencyId: string }) {
  const router  = useRouter();
  const [name,    setName]    = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error("Kategori adı zorunludur."); return; }
    setLoading(true);
    try {
      await createGalleryCategory(agencyId, name.trim());
      toast.success("Kategori oluşturuldu.");
      setName("");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Kategori adı (örn. Dış Cephe)"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      <Button type="submit" size="sm" disabled={loading}>
        <Plus className="mr-1 w-4 h-4" />{loading ? "..." : "Ekle"}
      </Button>
    </form>
  );
}
