"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
} from "../components/ui";
import { createBlock, updateBlock } from "../actions/blocks";

export function BlockDialog({
  open,
  onOpenChange,
  agencyId,
  projectId,
  block,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  projectId: string;
  block?: any | null;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEdit = !!block;
  const [f, setF] = useState({ name: "", code: "", floors: "", unitsPerFloor: "", progress: "0", description: "" });
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (!open) return;
    if (block) {
      setF({
        name: block.name ?? "",
        code: block.code ?? "",
        floors: block.floors != null ? String(block.floors) : "",
        unitsPerFloor: block.unitsPerFloor != null ? String(block.unitsPerFloor) : "",
        progress: block.progress != null ? String(block.progress) : "0",
        description: block.description ?? "",
      });
    } else {
      setF({ name: "", code: "", floors: "", unitsPerFloor: "", progress: "0", description: "" });
    }
  }, [open, block]);

  const submit = async () => {
    if (!f.name.trim()) return toast.error("Blok adı zorunludur.");
    setSaving(true);
    try {
      if (isEdit) {
        await updateBlock(block.id, agencyId, {
          name: f.name.trim(),
          code: f.code || undefined,
          floors: f.floors ? Number(f.floors) : null,
          unitsPerFloor: f.unitsPerFloor ? Number(f.unitsPerFloor) : null,
          progress: Number(f.progress) || 0,
          description: f.description || undefined,
        });
        toast.success("Blok güncellendi.");
      } else {
        await createBlock({
          agencyId,
          projectId,
          name: f.name.trim(),
          code: f.code || undefined,
          floors: f.floors ? Number(f.floors) : null,
          unitsPerFloor: f.unitsPerFloor ? Number(f.unitsPerFloor) : null,
          description: f.description || undefined,
        });
        toast.success("Blok eklendi.");
      }
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Bloğu Düzenle" : "Yeni Blok"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <Fld label="Blok Adı *">
              <Input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="A Blok" />
            </Fld>
            <Fld label="Kod">
              <Input value={f.code} onChange={(e) => set("code", e.target.value)} />
            </Fld>
            <Fld label="Kat Sayısı">
              <Input type="number" value={f.floors} onChange={(e) => set("floors", e.target.value)} />
            </Fld>
            <Fld label="Kat Başına Daire">
              <Input type="number" value={f.unitsPerFloor} onChange={(e) => set("unitsPerFloor", e.target.value)} />
            </Fld>
          </div>
          {isEdit && (
            <Fld label="İlerleme (%)">
              <Input type="number" min={0} max={100} value={f.progress} onChange={(e) => set("progress", e.target.value)} />
            </Fld>
          )}
          <Fld label="Açıklama">
            <Input value={f.description} onChange={(e) => set("description", e.target.value)} />
          </Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "..." : isEdit ? "Güncelle" : "Ekle"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Fld({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
