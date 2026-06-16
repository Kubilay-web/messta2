"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Star, FileText, ExternalLink, Image as ImageIcon, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui";
import { timeAgo } from "../lib/labels";
import { addImage, setCoverImage, deleteImage, addDocument, updateDocument, deleteDocument, addUpdate, updateUpdate, deleteUpdate } from "../actions/media";

const docTypeLabel: Record<string, string> = {
  DEED: "Tapu",
  CONTRACT: "Sözleşme",
  INSPECTION: "Ekspertiz",
  FLOOR_PLAN: "Kat Planı",
  PHOTO: "Fotoğraf",
  ENERGY_CERT: "Enerji Belgesi",
  ID_PROOF: "Kimlik",
  POWER_OF_ATTORNEY: "Vekaletname",
  OTHER: "Diğer",
};

export function MediaPanel({
  agencyId,
  projectId,
  images,
  documents,
  updates,
  canManage,
}: {
  agencyId: string;
  projectId: string;
  images: any[];
  documents: any[];
  updates: any[];
  canManage: boolean;
}) {
  const router = useRouter();
  const [imgUrl, setImgUrl] = useState("");
  const [docOpen, setDocOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);
  const [editingUpdate, setEditingUpdate] = useState<any | null>(null);

  const addImg = async () => {
    if (!imgUrl.trim()) return;
    try {
      await addImage({ projectId, url: imgUrl.trim() });
      setImgUrl("");
      toast.success("Görsel eklendi.");
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Görseller + Saha */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><ImageIcon className="size-4 text-muted-foreground" />Görseller / Renderlar</CardTitle>
          </CardHeader>
          <CardContent>
            {canManage && (
              <div className="flex gap-2 mb-3">
                <Input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="Görsel URL'si yapıştır..." onKeyDown={(e) => e.key === "Enter" && addImg()} />
                <Button size="sm" onClick={addImg}><Plus className="size-4" /> Ekle</Button>
              </div>
            )}
            {images.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Görsel yok.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative group rounded-lg overflow-hidden border aspect-video">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.title ?? ""} className="w-full h-full object-cover" />
                    {img.isCover && (
                      <span className="absolute top-1 left-1 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><Star className="size-2.5" />Kapak</span>
                    )}
                    {canManage && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {!img.isCover && (
                          <button onClick={() => setCoverImage(img.id).then(() => router.refresh())} className="text-white text-xs bg-white/20 px-2 py-1 rounded hover:bg-white/30">Kapak Yap</button>
                        )}
                        <button onClick={() => deleteImage(img.id).then(() => router.refresh())} className="text-white bg-red-500/80 p-1.5 rounded hover:bg-red-500"><Trash2 className="size-3.5" /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Saha Güncellemeleri</CardTitle>
            <Button size="sm" variant="outline" onClick={() => { setEditingUpdate(null); setUpdateOpen(true); }}><Plus className="size-4" /> Güncelleme</Button>
          </CardHeader>
          <CardContent>
            {updates.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Saha güncellemesi yok.</p>
            ) : (
              <div className="space-y-3">
                {updates.map((u) => (
                  <div key={u.id} className="flex gap-3 group">
                    <span className="size-2 rounded-full bg-amber-500 block mt-1.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{u.title}</p>
                        {canManage && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => { setEditingUpdate(u); setUpdateOpen(true); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Pencil className="size-3.5" /></button>
                            <button onClick={() => deleteUpdate(u.id).then(() => router.refresh())} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                          </div>
                        )}
                      </div>
                      {u.content && <p className="text-sm text-muted-foreground">{u.content}</p>}
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        {u.progress != null && <Badge variant="secondary" className="mr-1.5 text-[10px]">%{u.progress}</Badge>}
                        {u.createdByName ? `${u.createdByName} · ` : ""}{timeAgo(u.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dökümanlar */}
      <Card className="h-fit">
        <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base flex items-center gap-2"><FileText className="size-4 text-muted-foreground" />Dökümanlar</CardTitle>
          {canManage && <Button size="sm" variant="ghost" onClick={() => { setEditingDoc(null); setDocOpen(true); }}><Plus className="size-4" /></Button>}
        </CardHeader>
        <CardContent className="space-y-2">
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Döküman yok.</p>
          ) : (
            documents.map((d) => (
              <div key={d.id} className="flex items-center gap-2 p-2 rounded-lg border group">
                <FileText className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0 flex-1">
                  <a href={d.url} target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-primary truncate flex items-center gap-1">
                    {d.title} <ExternalLink className="size-3 shrink-0" />
                  </a>
                  <Badge variant="secondary" className="text-[10px] mt-0.5">{docTypeLabel[d.type] ?? d.type}</Badge>
                </div>
                {canManage && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => { setEditingDoc(d); setDocOpen(true); }} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"><Pencil className="size-3.5" /></button>
                    <button onClick={() => deleteDocument(d.id).then(() => router.refresh())} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500"><Trash2 className="size-3.5" /></button>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {canManage && (
        <>
          <AddDocDialog open={docOpen} onOpenChange={setDocOpen} projectId={projectId} doc={editingDoc} />
          <AddUpdateDialog open={updateOpen} onOpenChange={setUpdateOpen} projectId={projectId} update={editingUpdate} />
        </>
      )}
    </div>
  );
}

function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label className="text-xs">{label}</Label>{children}</div>;
}

function AddDocDialog({ open, onOpenChange, projectId, doc }: any) {
  const router = useRouter();
  const isEdit = !!doc;
  const [f, setF] = useState({ title: "", type: "CONTRACT", url: "" });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!open) return;
    setF(doc ? { title: doc.title ?? "", type: doc.type ?? "CONTRACT", url: doc.url ?? "" } : { title: "", type: "CONTRACT", url: "" });
  }, [open, doc]);
  const submit = async () => {
    if (!f.title.trim() || !f.url.trim()) return toast.error("Başlık ve URL zorunludur.");
    setSaving(true);
    try {
      if (isEdit) {
        await updateDocument(doc.id, { title: f.title.trim(), type: f.type as any, url: f.url.trim() });
        toast.success("Döküman güncellendi.");
      } else {
        await addDocument({ projectId, title: f.title.trim(), type: f.type as any, url: f.url.trim() });
        toast.success("Döküman eklendi.");
      }
      onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{isEdit ? "Döküman Düzenle" : "Döküman Ekle"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Başlık *"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Fld>
          <Fld label="Tür">
            <Select value={f.type} onValueChange={(v) => setF({ ...f, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{Object.entries(docTypeLabel).map(([v, l]) => (<SelectItem key={v} value={v}>{l}</SelectItem>))}</SelectContent>
            </Select>
          </Fld>
          <Fld label="URL *"><Input value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} placeholder="https://..." /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{isEdit ? "Güncelle" : "Ekle"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AddUpdateDialog({ open, onOpenChange, projectId, update }: any) {
  const router = useRouter();
  const isEdit = !!update;
  const [f, setF] = useState({ title: "", content: "", progress: "" });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!open) return;
    setF(update ? { title: update.title ?? "", content: update.content ?? "", progress: update.progress != null ? String(update.progress) : "" } : { title: "", content: "", progress: "" });
  }, [open, update]);
  const submit = async () => {
    if (!f.title.trim()) return toast.error("Başlık zorunludur.");
    setSaving(true);
    try {
      if (isEdit) {
        await updateUpdate(update.id, { title: f.title.trim(), content: f.content || undefined, progress: f.progress ? Number(f.progress) : null });
        toast.success("Güncelleme düzenlendi.");
      } else {
        await addUpdate({ projectId, title: f.title.trim(), content: f.content || undefined, progress: f.progress ? Number(f.progress) : null });
        toast.success("Güncelleme eklendi.");
      }
      onOpenChange(false); router.refresh();
    } catch (e: any) { toast.error(e?.message ?? "Hata"); } finally { setSaving(false); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>{isEdit ? "Güncellemeyi Düzenle" : "Saha Güncellemesi"}</DialogTitle></DialogHeader>
        <div className="grid gap-3 py-2">
          <Fld label="Başlık *"><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Kaba inşaat %60 tamamlandı" /></Fld>
          <Fld label="Açıklama"><Textarea rows={3} value={f.content} onChange={(e) => setF({ ...f, content: e.target.value })} /></Fld>
          <Fld label="Proje İlerlemesi (%) — opsiyonel"><Input type="number" min={0} max={100} value={f.progress} onChange={(e) => setF({ ...f, progress: e.target.value })} /></Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{isEdit ? "Güncelle" : "Ekle"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
