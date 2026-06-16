"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
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
  Checkbox,
} from "../../components/ui";
import { propertyTypeLabel } from "../../lib/labels";
import { updateCrmClient, deleteCrmClient } from "../../actions/clients";

export function ClientActions({
  agencyId,
  client,
  canDelete,
}: {
  agencyId: string;
  client: any;
  canDelete: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    notes: client.notes ?? "",
    minBudget: client.minBudget != null ? String(client.minBudget) : "",
    maxBudget: client.maxBudget != null ? String(client.maxBudget) : "",
    currency: client.currency ?? "TRY",
    preferredCities: (client.preferredCities ?? []).join(", "),
    preferredPropertyTypes: (client.preferredPropertyTypes ?? []) as string[],
    isBuyer: !!client.isBuyer,
    isSeller: !!client.isSeller,
    isTenant: !!client.isTenant,
    isLandlord: !!client.isLandlord,
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const togglePref = (t: string) =>
    setForm((f) => ({
      ...f,
      preferredPropertyTypes: f.preferredPropertyTypes.includes(t)
        ? f.preferredPropertyTypes.filter((x) => x !== t)
        : [...f.preferredPropertyTypes, t],
    }));

  const save = async () => {
    setSaving(true);
    try {
      await updateCrmClient(client.id, {
        notes: form.notes,
        minBudget: form.minBudget ? Number(form.minBudget) : null,
        maxBudget: form.maxBudget ? Number(form.maxBudget) : null,
        currency: form.currency,
        preferredCities: form.preferredCities
          ? String(form.preferredCities).split(",").map((c: string) => c.trim()).filter(Boolean)
          : [],
        preferredPropertyTypes: form.preferredPropertyTypes,
        isBuyer: form.isBuyer,
        isSeller: form.isSeller,
        isTenant: form.isTenant,
        isLandlord: form.isLandlord,
      });
      toast.success("Müşteri güncellendi.");
      setOpen(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Bu müşteri ve hesabı silinsin mi? Bu işlem geri alınamaz.")) return;
    try {
      await deleteCrmClient(client.id);
      toast.success("Müşteri silindi.");
      router.push(`/crm/agency/${agencyId}/clients`);
    } catch (e: any) {
      toast.error(e?.message ?? "Hata");
    }
  };

  const roles: { key: string; label: string }[] = [
    { key: "isBuyer", label: "Alıcı" },
    { key: "isSeller", label: "Satıcı" },
    { key: "isTenant", label: "Kiracı" },
    { key: "isLandlord", label: "Mülk Sahibi" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Pencil className="size-4" /> Düzenle
      </Button>
      {canDelete && (
        <Button variant="outline" size="sm" onClick={remove}>
          <Trash2 className="size-4 text-red-500" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Müşteri Tercihleri</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div>
              <Label className="text-xs">Roller</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1.5">
                {roles.map((r) => (
                  <label key={r.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={(form as any)[r.key]} onCheckedChange={(c) => set(r.key, !!c)} />
                    {r.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Min Bütçe</Label>
                <Input type="number" value={form.minBudget} onChange={(e) => set("minBudget", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Max Bütçe</Label>
                <Input type="number" value={form.maxBudget} onChange={(e) => set("maxBudget", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Para Birimi</Label>
                <Input value={form.currency} onChange={(e) => set("currency", e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Tercih Edilen Şehirler (virgülle)</Label>
              <Input value={form.preferredCities} onChange={(e) => set("preferredCities", e.target.value)} placeholder="İstanbul, Ankara" />
            </div>
            <div>
              <Label className="text-xs">Tercih Edilen Mülk Türleri</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1.5">
                {Object.entries(propertyTypeLabel).map(([v, l]) => (
                  <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={form.preferredPropertyTypes.includes(v)} onCheckedChange={() => togglePref(v)} />
                    {l}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Notlar</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>İptal</Button>
            <Button onClick={save} disabled={saving}>{saving ? "Kaydediliyor..." : "Kaydet"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
