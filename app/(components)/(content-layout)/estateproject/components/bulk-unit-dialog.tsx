"use client";

import { useState } from "react";
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
import { bulkCreateUnits } from "../actions/units";

export function BulkUnitDialog({
  open,
  onOpenChange,
  agencyId,
  projectId,
  blocks,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  projectId: string;
  blocks: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    blockId: "",
    type: "APARTMENT",
    prefix: "",
    fromFloor: "1",
    toFloor: "5",
    unitsPerFloor: "4",
    roomCount: "",
    grossArea: "",
    listPrice: "",
    currency: "TRY",
  });
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  const preview = (() => {
    const from = Number(f.fromFloor),
      to = Number(f.toFloor),
      per = Number(f.unitsPerFloor);
    if (!from || !to || !per || to < from) return 0;
    return (to - from + 1) * per;
  })();

  const submit = async () => {
    setSaving(true);
    try {
      const res = await bulkCreateUnits({
        agencyId,
        projectId,
        blockId: f.blockId || null,
        type: f.type as any,
        prefix: f.prefix || undefined,
        fromFloor: Number(f.fromFloor),
        toFloor: Number(f.toFloor),
        unitsPerFloor: Number(f.unitsPerFloor),
        roomCount: f.roomCount || undefined,
        grossArea: f.grossArea ? Number(f.grossArea) : null,
        listPrice: f.listPrice ? Number(f.listPrice) : null,
        currency: f.currency,
      });
      toast.success(`${res.created} daire oluşturuldu.`);
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Toplu Daire Oluştur</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <p className="text-xs text-muted-foreground">
            Kat aralığı ve kat başına daire sayısına göre otomatik daire üretir. Numaralandırma:{" "}
            <code>{f.prefix ? `${f.prefix}-` : ""}KAT+SIRA</code> (örn. {f.prefix ? `${f.prefix}-` : ""}101).
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Fld label="Blok">
              <Select value={f.blockId || NONE} onValueChange={(v) => set("blockId", v === NONE ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Bloksuz" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Bloksuz</SelectItem>
                  {blocks.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Fld>
            <Fld label="Tür">
              <Select value={f.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(propertyTypeLabel).map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Fld>
            <Fld label="Ön Ek">
              <Input value={f.prefix} onChange={(e) => set("prefix", e.target.value)} placeholder="A" />
            </Fld>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Fld label="Başlangıç Kat">
              <Input type="number" value={f.fromFloor} onChange={(e) => set("fromFloor", e.target.value)} />
            </Fld>
            <Fld label="Bitiş Kat">
              <Input type="number" value={f.toFloor} onChange={(e) => set("toFloor", e.target.value)} />
            </Fld>
            <Fld label="Kat Başına">
              <Input type="number" value={f.unitsPerFloor} onChange={(e) => set("unitsPerFloor", e.target.value)} />
            </Fld>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Fld label="Oda (ops.)">
              <Input value={f.roomCount} onChange={(e) => set("roomCount", e.target.value)} placeholder="2+1" />
            </Fld>
            <Fld label="Brüt m² (ops.)">
              <Input type="number" value={f.grossArea} onChange={(e) => set("grossArea", e.target.value)} />
            </Fld>
            <Fld label="Fiyat (ops.)">
              <Input type="number" value={f.listPrice} onChange={(e) => set("listPrice", e.target.value)} />
            </Fld>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm">
            Oluşturulacak daire sayısı: <span className="font-bold">{preview}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving || preview < 1}>
            {saving ? "Oluşturuluyor..." : `${preview} Daire Oluştur`}
          </Button>
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
