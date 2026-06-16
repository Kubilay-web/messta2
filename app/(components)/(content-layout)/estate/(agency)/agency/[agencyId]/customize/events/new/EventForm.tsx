"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAgencyEvent } from "../../../../../../actions/agency-events";
import { Button } from "../../../../../../components/ui/button";
import { ArrowLeft, SaveAll } from "lucide-react";
import toast from "react-hot-toast";

type D = { title: string; description: string; image: string; date: string; startTime: string; endTime: string; location: string };

export default function EventForm({ agencyId, initialData, editingId }: { agencyId: string; initialData?: D; editingId?: string }) {
  const router = useRouter();
  const [loading, setLoading]         = useState(false);
  const [title, setTitle]             = useState(initialData?.title       ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [image, setImage]             = useState(initialData?.image       ?? "");
  const [date, setDate]               = useState(initialData?.date        ?? "");
  const [startTime, setStartTime]     = useState(initialData?.startTime   ?? "");
  const [endTime, setEndTime]         = useState(initialData?.endTime     ?? "");
  const [location, setLocation]       = useState(initialData?.location    ?? "");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime || !location.trim()) {
      toast.error("Zorunlu alanları doldurun."); return;
    }
    setLoading(true);
    try {
      const payload = { agencyId, title, description, image, date, startTime, endTime, location };
      if (editingId) {
        const { updateAgencyEvent } = await import("../../../../../../actions/agency-events");
        await updateAgencyEvent(editingId, payload);
        toast.success("Etkinlik güncellendi.");
      } else {
        await createAgencyEvent(payload);
        toast.success("Etkinlik oluşturuldu.");
      }
      router.push(`/estate/agency/${agencyId}/customize/events`);
    } catch (err: any) {
      toast.error(err?.message ?? "İşlem başarısız.");
    } finally {
      setLoading(false);
    }
  }

  const c = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <h2 className="text-xl font-bold">{editingId ? "Etkinliği Düzenle" : "Yeni Etkinlik"}</h2>

      <div className="space-y-1"><label className="text-sm font-medium">Başlık *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required className={c} placeholder="Etkinlik adı" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1"><label className="text-sm font-medium">Tarih *</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={c} />
        </div>
        <div className="space-y-1"><label className="text-sm font-medium">Başlangıç *</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className={c} />
        </div>
        <div className="space-y-1"><label className="text-sm font-medium">Bitiş *</label>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className={c} />
        </div>
      </div>

      <div className="space-y-1"><label className="text-sm font-medium">Konum *</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} required className={c} placeholder="Adres veya online" />
      </div>

      <div className="space-y-1"><label className="text-sm font-medium">Görsel URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} className={c} placeholder="https://..." />
        {image && <img src={image} alt="" className="mt-2 h-24 w-auto rounded-md border object-cover" />}
      </div>

      <div className="space-y-1"><label className="text-sm font-medium">Açıklama</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={`${c} resize-none`} placeholder="Etkinlik açıklaması..." />
      </div>

      <div className="flex justify-between gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}><ArrowLeft className="mr-1.5 w-4 h-4" /> Geri</Button>
        <Button type="submit" disabled={loading}><SaveAll className="mr-1.5 w-4 h-4" />{loading ? "Kaydediliyor..." : editingId ? "Güncelle" : "Kaydet"}</Button>
      </div>
    </form>
  );
}
