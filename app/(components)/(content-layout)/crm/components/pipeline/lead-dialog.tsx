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
} from "../../components/ui";
import {
  leadSourceLabel,
  temperatureLabel,
  listingTypeLabel,
  propertyTypeLabel,
} from "../../lib/labels";
import { createLead, updateLead, type LeadInput } from "../../actions/leads";
import type { FormOptions, KanbanLead } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agencyId: string;
  pipelineId: string;
  defaultStageId?: string;
  options: FormOptions;
  lead?: KanbanLead | null; // düzenleme için
};

const empty = {
  title: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  company: "",
  source: "OTHER",
  temperature: "WARM",
  value: "",
  currency: "TRY",
  budgetMin: "",
  budgetMax: "",
  listingType: "",
  propertyType: "",
  city: "",
  district: "",
  roomCount: "",
  requirements: "",
  expectedCloseDate: "",
  agentId: "",
  listingId: "",
  clientId: "",
  tags: "",
};

export function LeadDialog({
  open,
  onOpenChange,
  agencyId,
  pipelineId,
  defaultStageId,
  options,
  lead,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const isEdit = !!lead;

  useEffect(() => {
    if (!open) return;
    if (lead) {
      setForm({
        title: lead.title ?? "",
        contactName: lead.contactName ?? "",
        contactPhone: lead.contactPhone ?? "",
        contactEmail: lead.contactEmail ?? "",
        company: lead.company ?? "",
        source: lead.source ?? "OTHER",
        temperature: lead.temperature ?? "WARM",
        value: lead.value != null ? String(lead.value) : "",
        currency: lead.currency ?? "TRY",
        budgetMin: "",
        budgetMax: "",
        listingType: lead.listingType ?? "",
        propertyType: lead.propertyType ?? "",
        city: lead.city ?? "",
        district: lead.district ?? "",
        roomCount: lead.roomCount ?? "",
        requirements: "",
        expectedCloseDate: lead.expectedCloseDate ? lead.expectedCloseDate.slice(0, 10) : "",
        agentId: lead.agentId ?? "",
        listingId: lead.listingId ?? "",
        clientId: lead.clientId ?? "",
        tags: lead.tags?.join(", ") ?? "",
      });
    } else {
      setForm({ ...empty });
    }
  }, [open, lead]);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.contactName.trim()) {
      toast.error("Başlık ve kişi adı zorunludur.");
      return;
    }
    setSaving(true);

    const payload: LeadInput = {
      agencyId,
      pipelineId,
      stageId: defaultStageId,
      title: form.title.trim(),
      contactName: form.contactName.trim(),
      contactPhone: form.contactPhone || undefined,
      contactEmail: form.contactEmail || undefined,
      company: form.company || undefined,
      source: form.source as any,
      temperature: form.temperature as any,
      value: form.value ? Number(form.value) : null,
      currency: form.currency,
      listingType: (form.listingType || null) as any,
      propertyType: (form.propertyType || null) as any,
      city: form.city || undefined,
      district: form.district || undefined,
      roomCount: form.roomCount || undefined,
      requirements: form.requirements || undefined,
      expectedCloseDate: form.expectedCloseDate || null,
      agentId: form.agentId || null,
      listingId: form.listingId || null,
      clientId: form.clientId || null,
      tags: form.tags
        ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      if (isEdit && lead) {
        await updateLead(lead.id, payload);
        toast.success("Fırsat güncellendi.");
      } else {
        await createLead(payload);
        toast.success("Fırsat oluşturuldu.");
      }
      onOpenChange(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "İşlem başarısız oldu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Fırsatı Düzenle" : "Yeni Fırsat"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Field label="Başlık *">
            <Input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Örn. Kadıköy 3+1 arayan müşteri"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Kişi Adı *">
              <Input value={form.contactName} onChange={(e) => set("contactName", e.target.value)} />
            </Field>
            <Field label="Telefon">
              <Input value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
            </Field>
            <Field label="E-posta">
              <Input value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
            </Field>
            <Field label="Şirket">
              <Input value={form.company} onChange={(e) => set("company", e.target.value)} />
            </Field>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="Kaynak">
              <Selector
                value={form.source}
                onChange={(v) => set("source", v)}
                options={Object.entries(leadSourceLabel)}
              />
            </Field>
            <Field label="Sıcaklık">
              <Selector
                value={form.temperature}
                onChange={(v) => set("temperature", v)}
                options={Object.entries(temperatureLabel)}
              />
            </Field>
            <Field label="Danışman">
              <Selector
                value={form.agentId}
                onChange={(v) => set("agentId", v)}
                placeholder="Atanmadı"
                allowEmpty
                options={options.agents.map((a) => [a.id, `${a.firstName} ${a.lastName}`])}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="Değer">
              <Input
                type="number"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder="0"
              />
            </Field>
            <Field label="Para Birimi">
              <Selector
                value={form.currency}
                onChange={(v) => set("currency", v)}
                options={[["TRY", "₺ TRY"], ["USD", "$ USD"], ["EUR", "€ EUR"]]}
              />
            </Field>
            <Field label="Tahmini Kapanış">
              <Input
                type="date"
                value={form.expectedCloseDate}
                onChange={(e) => set("expectedCloseDate", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="İlan Türü">
              <Selector
                value={form.listingType}
                onChange={(v) => set("listingType", v)}
                placeholder="Seçiniz"
                allowEmpty
                options={Object.entries(listingTypeLabel)}
              />
            </Field>
            <Field label="Mülk Türü">
              <Selector
                value={form.propertyType}
                onChange={(v) => set("propertyType", v)}
                placeholder="Seçiniz"
                allowEmpty
                options={Object.entries(propertyTypeLabel)}
              />
            </Field>
            <Field label="Oda Sayısı">
              <Input
                value={form.roomCount}
                onChange={(e) => set("roomCount", e.target.value)}
                placeholder="3+1"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Şehir">
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="İlçe">
              <Input value={form.district} onChange={(e) => set("district", e.target.value)} />
            </Field>
          </div>

          <Field label="İlgilenilen İlan">
            <Selector
              value={form.listingId}
              onChange={(v) => set("listingId", v)}
              placeholder="İlan seçiniz (opsiyonel)"
              allowEmpty
              options={options.listings.map((l) => [l.id, `${l.listingNo} — ${l.title}`])}
            />
          </Field>

          <Field label="Mevcut Müşteri">
            <Selector
              value={form.clientId}
              onChange={(v) => set("clientId", v)}
              placeholder="Müşteri seçiniz (opsiyonel)"
              allowEmpty
              options={options.clients.map((c) => [c.id, `${c.firstName} ${c.lastName} — ${c.phone}`])}
            />
          </Field>

          <Field label="Talep / Notlar">
            <Textarea
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              rows={3}
              placeholder="Müşteri talebi, bütçe, beklentiler..."
            />
          </Field>

          <Field label="Etiketler (virgülle ayırın)">
            <Input
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="acil, vip, kredi uygun"
            />
          </Field>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            İptal
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

const NONE = "__none__";

function Selector({
  value,
  onChange,
  options,
  placeholder,
  allowEmpty,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  placeholder?: string;
  allowEmpty?: boolean;
}) {
  return (
    <Select
      value={value === "" ? (allowEmpty ? NONE : value) : value}
      onValueChange={(v) => onChange(v === NONE ? "" : v)}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder ?? "Seçiniz"} />
      </SelectTrigger>
      <SelectContent>
        {allowEmpty && <SelectItem value={NONE}>{placeholder ?? "—"}</SelectItem>}
        {options.map(([val, label]) => (
          <SelectItem key={val} value={val}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
