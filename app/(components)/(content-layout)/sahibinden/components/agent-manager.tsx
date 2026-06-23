"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { upsertAgent, deleteAgent, type AgentInput } from "../actions";

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

export default function AgentManager({ agents }: { agents: any[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<AgentInput | null>(null);
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  async function uploadPhoto(file?: File) {
    if (!file || !CLOUD || !PRESET) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (json.secure_url) setEditing((p) => ({ ...(p ?? { name: "" }), photo: json.secure_url }));
    } finally {
      setUploading(false);
    }
  }

  function save() {
    if (!editing?.name?.trim()) {
      setError("Ad zorunludur.");
      return;
    }
    setError("");
    start(async () => {
      const res = await upsertAgent(editing);
      if (res.ok) {
        setEditing(null);
        router.refresh();
      } else setError(res.error ?? "Hata.");
    });
  }

  function remove(id: string) {
    start(async () => {
      const res = await deleteAgent(id);
      if (res.ok) router.refresh();
    });
  }

  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-yellow-400";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Danışmanlar ({agents.length})</h1>
        <button
          onClick={() => setEditing({ name: "" })}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Danışman Ekle
        </button>
      </div>

      {editing && (
        <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 sm:col-span-2">
              <span className="relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                {editing.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={editing.photo} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-gray-600">{uploading ? "..." : "Foto"}</span>
                )}
                <input type="file" accept="image/*" hidden onChange={(e) => uploadPhoto(e.target.files?.[0])} />
              </span>
              <span className="text-xs text-gray-600">Fotoğraf yüklemek için tıklayın</span>
            </label>
            <input placeholder="Ad Soyad" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inp} />
            <input placeholder="Ünvan (örn. Gayrimenkul Danışmanı)" value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inp} />
            <input placeholder="Telefon" value={editing.phone ?? ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className={inp} />
            <input placeholder="E-posta" value={editing.email ?? ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className={inp} />
            <textarea placeholder="Kısa biyografi" value={editing.bio ?? ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} className={`${inp} sm:col-span-2`} rows={2} />
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="mt-3 flex gap-2">
            <button onClick={save} disabled={pending || uploading} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
              {pending ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button onClick={() => setEditing(null)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm">Vazgeç</button>
          </div>
        </div>
      )}

      {agents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-600">Henüz danışman yok.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {agents.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
                {a.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.photo} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">{a.name}</p>
                <p className="truncate text-xs text-gray-600">{a.title || "Danışman"}{a.phone ? ` · ${a.phone}` : ""}</p>
              </div>
              <button onClick={() => setEditing(a)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">Düzenle</button>
              <button onClick={() => remove(a.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Sil</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
