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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui";
import { propertyTypeLabel } from "../lib/labels";
import { createUnit, updateUnit, type UnitInput } from "../actions/units";

const empty = {
  unitNo: "",
  type: "APARTMENT",
  blockId: "",
  floor: "",
  roomCount: "",
  grossArea: "",
  netArea: "",
  balconyArea: "",
  facing: "",
  listPrice: "",
  currency: "TRY",
  description: "",
};

export function UnitDialog({
  open,
  onOpenChange,
  agencyId,
  projectId,
  blocks,
  unit,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  projectId: string;
  blocks: { id: string; name: string }[];
  unit?: any | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const isEdit = !!unit;

  useEffect(() => {
    if (!open) return;
    if (unit) {
      setForm({
        unitNo: unit.unitNo ?? "",
        type: unit.type ?? "APARTMENT",
        blockId: unit.blockId ?? "",
        floor: unit.floor != null ? String(unit.floor) : "",
        roomCount: unit.roomCount ?? "",
        grossArea: unit.grossArea != null ? String(unit.grossArea) : "",
        netArea: unit.netArea != null ? String(unit.netArea) : "",
        balconyArea: unit.balconyArea != null ? String(unit.balconyArea) : "",
        facing: unit.facing ?? "",
        listPrice: unit.listPrice != null ? String(unit.listPrice) : "",
        currency: unit.currency ?? "TRY",
        description: unit.description ?? "",
      });
    } else {
      setForm({ ...empty });
    }
  }, [open, unit]);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const num = (v: string) => (v === "" ? null : Number(v));

  const submit = async () => {
    if (!form.unitNo.trim()) return toast.error("Daire no zorunludur.");
    setSaving(true);
    const payload: UnitInput = {
      agencyId,
      projectId,
      blockId: form.blockId || null,
      unitNo: form.unitNo.trim(),
      type: form.type as any,
      floor: num(form.floor),
      roomCount: form.roomCount || undefined,
      grossArea: num(form.grossArea),
      netArea: num(form.netArea),
      balconyArea: num(form.balconyArea),
      facing: form.facing || undefined,
      listPrice: num(form.listPrice),
      currency: form.currency,
      description: form.description || undefined,
    };
    try {
      if (isEdit) {
        await updateUnit(unit.id, payload);
        toast.success("Daire güncellendi.");
      } else {
        await createUnit(payload);
        toast.success("Daire eklendi.");
      }
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  const NONE = "__none__";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Daireyi Düzenle" : "Yeni Daire"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-3 gap-3">
            <F label="Daire No *">
              <Input value={form.unitNo} onChange={(e) => set("unitNo", e.target.value)} placeholder="A-12" />
            </F>
            <F label="Tür">
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(propertyTypeLabel).map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
            <F label="Blok">
              <Select value={form.blockId || NONE} onValueChange={(v) => set("blockId", v === NONE ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Bloksuz" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Bloksuz</SelectItem>
                  {blocks.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <F label="Kat">
              <Input type="number" value={form.floor} onChange={(e) => set("floor", e.target.value)} />
            </F>
            <F label="Oda">
              <Input value={form.roomCount} onChange={(e) => set("roomCount", e.target.value)} placeholder="3+1" />
            </F>
            <F label="Cephe">
              <Input value={form.facing} onChange={(e) => set("facing", e.target.value)} placeholder="Güney" />
            </F>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <F label="Brüt (m²)">
              <Input type="number" value={form.grossArea} onChange={(e) => set("grossArea", e.target.value)} />
            </F>
            <F label="Net (m²)">
              <Input type="number" value={form.netArea} onChange={(e) => set("netArea", e.target.value)} />
            </F>
            <F label="Balkon (m²)">
              <Input type="number" value={form.balconyArea} onChange={(e) => set("balconyArea", e.target.value)} />
            </F>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <F label="Liste Fiyatı">
              <Input type="number" value={form.listPrice} onChange={(e) => set("listPrice", e.target.value)} />
            </F>
            <F label="Para Birimi">
              <Select value={form.currency} onValueChange={(v) => set("currency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[["TRY", "₺ TRY"], ["USD", "$ USD"], ["EUR", "€ EUR"]].map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
          </div>

          <F label="Açıklama">
            <Input value={form.description} onChange={(e) => set("description", e.target.value)} />
          </F>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "..." : isEdit ? "Güncelle" : "Ekle"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
