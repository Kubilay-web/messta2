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
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui";
import { saleStatusLabel } from "../lib/labels";
import { createSale } from "../actions/sales";

type Options = {
  clients: { id: string; firstName: string; lastName: string; phone: string }[];
  agents: { id: string; firstName: string; lastName: string }[];
};

export function SaleDialog({
  open,
  onOpenChange,
  agencyId,
  projectId,
  unit,
  options,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  projectId: string;
  unit: any | null;
  options: Options;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    status: "RESERVATION",
    salePrice: "",
    currency: "TRY",
    downPayment: "",
    commission: "",
    clientId: "",
    agentId: "",
    saleDate: "",
    notes: "",
  });
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (open && unit) {
      setF((p) => ({
        ...p,
        status: "RESERVATION",
        salePrice: unit.listPrice != null ? String(unit.listPrice) : "",
        currency: unit.currency ?? "TRY",
        downPayment: "",
        commission: "",
        clientId: "",
        agentId: "",
        saleDate: "",
        notes: "",
      }));
    }
  }, [open, unit]);

  const NONE = "__none__";

  const submit = async () => {
    if (!f.salePrice || Number(f.salePrice) <= 0) return toast.error("Satış fiyatı giriniz.");
    setSaving(true);
    try {
      await createSale({
        agencyId,
        projectId,
        unitId: unit.id,
        status: f.status as any,
        salePrice: Number(f.salePrice),
        currency: f.currency,
        downPayment: f.downPayment ? Number(f.downPayment) : null,
        commission: f.commission ? Number(f.commission) : null,
        clientId: f.clientId || null,
        agentId: f.agentId || null,
        saleDate: f.saleDate || null,
        notes: f.notes || undefined,
      });
      toast.success("Satış kaydı oluşturuldu.");
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  if (!unit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Satış / Rezervasyon — {unit.unitNo}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid grid-cols-2 gap-3">
            <Fld label="İşlem Türü">
              <Select value={f.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["RESERVATION", "CONTRACT", "COMPLETED"].map((s) => (
                    <SelectItem key={s} value={s}>{saleStatusLabel[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Fld>
            <Fld label="Satış Fiyatı *">
              <Input type="number" value={f.salePrice} onChange={(e) => set("salePrice", e.target.value)} />
            </Fld>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Fld label="Para Birimi">
              <Select value={f.currency} onValueChange={(v) => set("currency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[["TRY", "₺ TRY"], ["USD", "$ USD"], ["EUR", "€ EUR"]].map(([v, l]) => (
                    <SelectItem key={v} value={v}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Fld>
            <Fld label="Peşinat">
              <Input type="number" value={f.downPayment} onChange={(e) => set("downPayment", e.target.value)} />
            </Fld>
            <Fld label="Komisyon">
              <Input type="number" value={f.commission} onChange={(e) => set("commission", e.target.value)} />
            </Fld>
          </div>

          <Fld label="Müşteri (alıcı)">
            <Select value={f.clientId || NONE} onValueChange={(v) => set("clientId", v === NONE ? "" : v)}>
              <SelectTrigger><SelectValue placeholder="Müşteri seçiniz" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={NONE}>—</SelectItem>
                {options.clients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} — {c.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Fld>

          <div className="grid grid-cols-2 gap-3">
            <Fld label="Danışman">
              <Select value={f.agentId || NONE} onValueChange={(v) => set("agentId", v === NONE ? "" : v)}>
                <SelectTrigger><SelectValue placeholder="Danışman seçiniz" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>—</SelectItem>
                  {options.agents.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.firstName} {a.lastName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Fld>
            <Fld label="İşlem Tarihi">
              <Input type="date" value={f.saleDate} onChange={(e) => set("saleDate", e.target.value)} />
            </Fld>
          </div>

          <Fld label="Notlar">
            <Textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={2} />
          </Fld>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>İptal</Button>
          <Button onClick={submit} disabled={saving}>{saving ? "..." : "Kaydet"}</Button>
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
