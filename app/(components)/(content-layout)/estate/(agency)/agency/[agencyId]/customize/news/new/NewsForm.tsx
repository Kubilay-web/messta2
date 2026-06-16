"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAgencyNews } from "../../../../../../actions/agency-news";
import { Button } from "../../../../../../components/ui/button";
import { ArrowLeft, SaveAll } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsForm({ agencyId, initialData, editingId }: {
  agencyId:     string;
  initialData?: { title: string; content: string; image: string };
  editingId?:   string;
}) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [title,   setTitle]   = useState(initialData?.title   ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [image,   setImage]   = useState(initialData?.image   ?? "");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) { toast.error("Başlık ve içerik zorunludur."); return; }
    setLoading(true);
    try {
      if (editingId) {
        const { updateAgencyNews } = await import("../../../../../../actions/agency-news");
        await updateAgencyNews(editingId, { title, content, image });
        toast.success("Haber güncellendi.");
      } else {
        await createAgencyNews({ agencyId, title, content, image });
        toast.success("Haber oluşturuldu.");
      }
      router.push(`/estate/agency/${agencyId}/customize/news`);
    } catch (err: any) {
      toast.error(err?.message ?? "İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h2 className="text-xl font-bold">{editingId ? "Haberi Düzenle" : "Yeni Haber"}</h2>

      <div className="space-y-1">
        <label className="text-sm font-medium">Başlık *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={inputCls} placeholder="Haber başlığı" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Görsel URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className={inputCls} placeholder="https://..." />
        {image && <img src={image} alt="" className="mt-2 h-24 w-auto rounded-md border object-cover" />}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">İçerik *</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} required className={`${inputCls} resize-none`} placeholder="Haber içeriği..." />
      </div>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-1.5 w-4 h-4" /> Geri
        </Button>
        <Button type="submit" disabled={loading}>
          <SaveAll className="mr-1.5 w-4 h-4" />
          {loading ? "Kaydediliyor..." : editingId ? "Güncelle" : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}
