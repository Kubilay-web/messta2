"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createGalleryImage } from "../../../../../../actions/agency-gallery";
import { Button } from "../../../../../../components/ui/button";
import { ArrowLeft, SaveAll } from "lucide-react";
import toast from "react-hot-toast";

type Category = { id: string; name: string };

export default function GalleryImageForm({ agencyId, categories }: { agencyId: string; categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading]         = useState(false);
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage]             = useState("");
  const [date, setDate]               = useState("");
  const [categoryId, setCategoryId]   = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !image.trim()) { toast.error("Başlık ve görsel URL zorunludur."); return; }
    setLoading(true);
    try {
      await createGalleryImage({ agencyId, title, description, image, date: date || undefined, categoryId: categoryId || undefined });
      toast.success("Görsel eklendi.");
      router.push(`/estate/agency/${agencyId}/customize/gallery`);
    } catch (err: any) {
      toast.error(err?.message ?? "Eklenemedi.");
    } finally {
      setLoading(false);
    }
  }

  const c = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Görsel Ekle</h2>

      <div className="space-y-1"><label className="text-sm font-medium">Başlık *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={c} placeholder="Görsel başlığı" />
      </div>

      <div className="space-y-1"><label className="text-sm font-medium">Görsel URL *</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} required className={c} placeholder="https://..." />
        {image && <img src={image} alt="" className="mt-2 h-28 w-auto rounded-md border object-cover" />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1"><label className="text-sm font-medium">Tarih</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={c} placeholder="2024-06" />
        </div>
        <div className="space-y-1"><label className="text-sm font-medium">Kategori</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={c}>
            <option value="">— Seçin —</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1"><label className="text-sm font-medium">Açıklama</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={`${c} resize-none`} placeholder="Kısa açıklama..." />
      </div>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-1.5 w-4 h-4" /> Geri</Button>
        <Button type="submit" disabled={loading}><SaveAll className="mr-1.5 w-4 h-4" />{loading ? "Ekleniyor..." : "Ekle"}</Button>
      </div>
    </form>
  );
}
