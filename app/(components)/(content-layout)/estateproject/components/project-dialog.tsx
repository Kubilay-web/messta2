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
import { projectTypeLabel, projectStatusLabel } from "../lib/labels";
import { createProject, updateProject, type ProjectInput } from "../actions/projects";

const empty = {
  name: "",
  code: "",
  type: "RESIDENTIAL",
  status: "PLANNING",
  city: "",
  district: "",
  address: "",
  description: "",
  budget: "",
  currency: "TRY",
  totalLandArea: "",
  totalConstructionArea: "",
  totalBlocks: "",
  totalFloors: "",
  startDate: "",
  estimatedEndDate: "",
  deliveryDate: "",
  managerName: "",
  progress: "0",
};

export function ProjectDialog({
  open,
  onOpenChange,
  agencyId,
  project,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  project?: any | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);
  const isEdit = !!project;

  useEffect(() => {
    if (!open) return;
    if (project) {
      setForm({
        name: project.name ?? "",
        code: project.code ?? "",
        type: project.type ?? "RESIDENTIAL",
        status: project.status ?? "PLANNING",
        city: project.city ?? "",
        district: project.district ?? "",
        address: project.address ?? "",
        description: project.description ?? "",
        budget: project.budget != null ? String(project.budget) : "",
        currency: project.currency ?? "TRY",
        totalLandArea: project.totalLandArea != null ? String(project.totalLandArea) : "",
        totalConstructionArea:
          project.totalConstructionArea != null ? String(project.totalConstructionArea) : "",
        totalBlocks: project.totalBlocks != null ? String(project.totalBlocks) : "",
        totalFloors: project.totalFloors != null ? String(project.totalFloors) : "",
        startDate: project.startDate ? project.startDate.slice(0, 10) : "",
        estimatedEndDate: project.estimatedEndDate ? project.estimatedEndDate.slice(0, 10) : "",
        deliveryDate: project.deliveryDate ? project.deliveryDate.slice(0, 10) : "",
        managerName: project.managerName ?? "",
        progress: project.progress != null ? String(project.progress) : "0",
      });
    } else {
      setForm({ ...empty });
    }
  }, [open, project]);

  const set = (k: keyof typeof empty, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const num = (v: string) => (v === "" ? null : Number(v));

  const submit = async () => {
    if (!form.name.trim()) return toast.error("Proje adı zorunludur.");
    if (!form.city.trim()) return toast.error("Şehir zorunludur.");
    setSaving(true);

    const payload: ProjectInput = {
      agencyId,
      name: form.name.trim(),
      code: form.code || undefined,
      description: form.description || undefined,
      type: form.type as any,
      status: form.status as any,
      city: form.city.trim(),
      district: form.district || undefined,
      address: form.address || undefined,
      budget: num(form.budget),
      currency: form.currency,
      totalLandArea: num(form.totalLandArea),
      totalConstructionArea: num(form.totalConstructionArea),
      totalBlocks: num(form.totalBlocks),
      totalFloors: num(form.totalFloors),
      startDate: form.startDate || null,
      estimatedEndDate: form.estimatedEndDate || null,
      deliveryDate: form.deliveryDate || null,
      managerName: form.managerName || undefined,
      progress: Number(form.progress) || 0,
    };

    try {
      if (isEdit) {
        await updateProject(project.id, payload);
        toast.success("Proje güncellendi.");
      } else {
        await createProject(payload);
        toast.success("Proje oluşturuldu.");
      }
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "İşlem başarısız oldu.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Projeyi Düzenle" : "Yeni Proje"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-3 gap-3">
            <F label="Proje Adı *" className="col-span-2">
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Marina Residence" />
            </F>
            <F label="Proje Kodu">
              <Input value={form.code} onChange={(e) => set("code", e.target.value)} placeholder="MR-2025" />
            </F>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <F label="Tür">
              <Sel value={form.type} onChange={(v) => set("type", v)} options={Object.entries(projectTypeLabel)} />
            </F>
            <F label="Durum">
              <Sel value={form.status} onChange={(v) => set("status", v)} options={Object.entries(projectStatusLabel)} />
            </F>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <F label="Şehir *">
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </F>
            <F label="İlçe">
              <Input value={form.district} onChange={(e) => set("district", e.target.value)} />
            </F>
            <F label="Proje Müdürü">
              <Input value={form.managerName} onChange={(e) => set("managerName", e.target.value)} />
            </F>
          </div>

          <F label="Adres">
            <Input value={form.address} onChange={(e) => set("address", e.target.value)} />
          </F>

          <div className="grid grid-cols-3 gap-3">
            <F label="Bütçe">
              <Input type="number" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
            </F>
            <F label="Para Birimi">
              <Sel
                value={form.currency}
                onChange={(v) => set("currency", v)}
                options={[["TRY", "₺ TRY"], ["USD", "$ USD"], ["EUR", "€ EUR"]]}
              />
            </F>
            <F label="İlerleme (%)">
              <Input type="number" min={0} max={100} value={form.progress} onChange={(e) => set("progress", e.target.value)} />
            </F>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <F label="Arsa (m²)">
              <Input type="number" value={form.totalLandArea} onChange={(e) => set("totalLandArea", e.target.value)} />
            </F>
            <F label="İnşaat (m²)">
              <Input type="number" value={form.totalConstructionArea} onChange={(e) => set("totalConstructionArea", e.target.value)} />
            </F>
            <F label="Blok Sayısı">
              <Input type="number" value={form.totalBlocks} onChange={(e) => set("totalBlocks", e.target.value)} />
            </F>
            <F label="Kat Sayısı">
              <Input type="number" value={form.totalFloors} onChange={(e) => set("totalFloors", e.target.value)} />
            </F>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <F label="Başlangıç">
              <Input type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} />
            </F>
            <F label="Tahmini Bitiş">
              <Input type="date" value={form.estimatedEndDate} onChange={(e) => set("estimatedEndDate", e.target.value)} />
            </F>
            <F label="Teslim">
              <Input type="date" value={form.deliveryDate} onChange={(e) => set("deliveryDate", e.target.value)} />
            </F>
          </div>

          <F label="Açıklama">
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
          </F>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            İptal
          </Button>
          <Button onClick={submit} disabled={saving}>
            {saving ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function F({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function Sel({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(([v, l]) => (
          <SelectItem key={v} value={v}>
            {l}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
