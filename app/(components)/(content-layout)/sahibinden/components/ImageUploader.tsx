"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, Trash2, Star, Link2, Plus, GripVertical } from "lucide-react";
import { uploadImageToCloudinary, MAX_IMAGE_MB } from "../lib/upload";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const handleFiles = async (files: FileList | File[] | null) => {
    const list = files ? Array.from(files) : [];
    if (!list.length) return;
    setErr(null);
    setBusy(true);
    setProgress({ done: 0, total: list.length });
    const added: string[] = [];
    for (let i = 0; i < list.length; i++) {
      try {
        const url = await uploadImageToCloudinary(list[i]);
        added.push(url);
      } catch (e: any) {
        setErr(e?.message ?? "Bir görsel yüklenemedi.");
      }
      setProgress({ done: i + 1, total: list.length });
    }
    if (added.length) onChange([...value, ...added]);
    setBusy(false);
    setProgress(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) {
      setErr("Lütfen http(s) ile başlayan geçerli bir bağlantı girin.");
      return;
    }
    onChange([...value, url]);
    setUrlInput("");
    setErr(null);
  };

  const removeAt = (i: number) => onChange(value.filter((_, j) => j !== i));
  const makeCover = (i: number) => {
    if (i === 0) return;
    const next = [...value];
    const [item] = next.splice(i, 1);
    next.unshift(item);
    onChange(next);
  };

  const onDrop = (i: number) => {
    if (dragIdx === null || dragIdx === i) return;
    const next = [...value];
    const [item] = next.splice(dragIdx, 1);
    next.splice(i, 0, item);
    onChange(next);
    setDragIdx(null);
  };

  return (
    <div className="space-y-3">
      {/* Bırakma alanı */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => !busy && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition ${
          dragOver ? "border-amber-400 bg-amber-50" : "border-slate-300 bg-slate-50 hover:border-amber-300 hover:bg-amber-50/40"
        }`}
      >
        {busy ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <p className="text-sm font-semibold text-slate-700">
              Yükleniyor{progress ? ` (${progress.done}/${progress.total})` : "…"}
            </p>
          </>
        ) : (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-600">
              <UploadCloud className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-slate-700">Fotoğrafları sürükleyin veya seçmek için tıklayın</p>
            <p className="text-xs text-slate-400">JPG / PNG / WEBP • Her biri en fazla {MAX_IMAGE_MB}MB • İlk görsel kapak olur</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* URL ile ekleme (opsiyonel) */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }}
            placeholder="veya görsel bağlantısı yapıştırın (https://…)"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>
        <button type="button" onClick={addUrl} className="flex h-11 shrink-0 items-center gap-1 rounded-xl bg-slate-800 px-4 text-sm font-semibold text-white">
          <Plus className="h-4 w-4" /> Ekle
        </button>
      </div>

      {err && <p className="text-sm font-medium text-rose-600">{err}</p>}

      {/* Önizleme ızgarası */}
      {value.length > 0 && (
        <>
          <p className="text-xs text-slate-400">{value.length} görsel • Kapak yapmak için yıldıza, sıralamak için sürükleyin.</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {value.map((url, i) => (
              <div
                key={`${url}-${i}`}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(i)}
                className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                  i === 0 ? "border-amber-400" : "border-slate-200"
                } ${dragIdx === i ? "opacity-50" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Görsel ${i + 1}`} className="h-full w-full object-cover" />

                <span className="absolute left-1 top-1 grid h-5 w-5 place-items-center rounded bg-black/40 text-white">
                  <GripVertical className="h-3 w-3" />
                </span>

                {i === 0 ? (
                  <span className="absolute bottom-1 left-1 rounded bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">Kapak</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => makeCover(i)}
                    title="Kapak yap"
                    className="absolute bottom-1 left-1 grid h-6 w-6 place-items-center rounded bg-white/85 text-slate-600 opacity-0 transition hover:text-amber-500 group-hover:opacity-100"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  title="Sil"
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded bg-rose-600/90 text-white opacity-0 transition group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
