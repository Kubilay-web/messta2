"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { propertyTypeLabel } from "../../lib/labels";
import { createCrmClient } from "../../actions/clients";
import type { ConvertLeadInput } from "../../actions/clients";

function genPassword() {
  return "Crm" + Math.random().toString(36).slice(2, 8) + Math.floor(Math.random() * 90 + 10);
}

export function ClientCreateButton({ agencyId }: { agencyId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({
    title: "Bay",
    firstName: "",
    lastName: "",
    gender: "MALE",
    email: "",
    phone: "",
    whatsappNo: "",
    occupation: "",
    NIN: "",
    dob: "",
    nationality: "T.C.",
    address: "",
    contactMethod: "Telefon",
    currency: "TRY",
    minBudget: "",
    maxBudget: "",
    password: genPassword(),
    isBuyer: true,
    isSeller: false,
    isTenant: false,
    isLandlord: false,
    preferredCities: "",
    preferredPropertyTypes: [] as string[],
  });
  const set = (k: string, v: any) => setF((p) => ({ ...p, [k]: v }));
  const togglePref = (t: string) =>
    setF((p) => ({
      ...p,
      preferredPropertyTypes: p.preferredPropertyTypes.includes(t)
        ? p.preferredPropertyTypes.filter((x) => x !== t)
        : [...p.preferredPropertyTypes, t],
    }));

  const submit = async () => {
    if (!f.firstName.trim() || !f.lastName.trim()) return toast.error("Ad ve soyad zorunludur.");
    if (!f.email.trim()) return toast.error("E-posta zorunludur.");
    if (!f.phone.trim()) return toast.error("Telefon zorunludur.");
    if (f.NIN.trim().length !== 11) return toast.error("11 haneli TC Kimlik No giriniz.");
    if (!f.dob) return toast.error("Doğum tarihi zorunludur.");
    if (!f.address.trim()) return toast.error("Adres zorunludur.");
    if (!f.isBuyer && !f.isSeller && !f.isTenant && !f.isLandlord)
      return toast.error("En az bir müşteri rolü seçiniz.");

    setSaving(true);
    const payload: ConvertLeadInput = {
      title: f.title,
      firstName: f.firstName.trim(),
      lastName: f.lastName.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      whatsappNo: f.whatsappNo || undefined,
      gender: f.gender,
      dob: f.dob,
      nationality: f.nationality,
      NIN: f.NIN.trim(),
      contactMethod: f.contactMethod,
      occupation: f.occupation || undefined,
      address: f.address.trim(),
      password: f.password,
      isBuyer: f.isBuyer,
      isSeller: f.isSeller,
      isTenant: f.isTenant,
      isLandlord: f.isLandlord,
      minBudget: f.minBudget ? Number(f.minBudget) : null,
      maxBudget: f.maxBudget ? Number(f.maxBudget) : null,
      currency: f.currency,
      preferredPropertyTypes: f.preferredPropertyTypes,
      preferredCities: f.preferredCities
        ? f.preferredCities.split(",").map((c) => c.trim()).filter(Boolean)
        : [],
    };
    try {
      await createCrmClient(agencyId, payload);
      toast.success("Müşteri oluşturuldu.");
      setOpen(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "İşlem başarısız oldu.");
    } finally {
      setSaving(false);
    }
  };

  const roles: { key: string; label: string }[] = [
    { key: "isBuyer", label: "Alıcı" },
    { key: "isSeller", label: "Satıcı" },
    { key: "isTenant", label: "Kiracı" },
    { key: "isLandlord", label: "Mülk Sahibi" },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Yeni Müşteri
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Müşteri</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <F label="Ünvan">
                <Select value={f.title} onValueChange={(v) => set("title", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["Bay", "Bayan", "Dr.", "Av."].map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}</SelectContent>
                </Select>
              </F>
              <F label="Ad *"><Input value={f.firstName} onChange={(e) => set("firstName", e.target.value)} /></F>
              <F label="Soyad *"><Input value={f.lastName} onChange={(e) => set("lastName", e.target.value)} /></F>
              <F label="Cinsiyet">
                <Select value={f.gender} onValueChange={(v) => set("gender", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Erkek</SelectItem>
                    <SelectItem value="FEMALE">Kadın</SelectItem>
                    <SelectItem value="OTHER">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </F>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <F label="E-posta *"><Input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} /></F>
              <F label="Telefon *"><Input value={f.phone} onChange={(e) => set("phone", e.target.value)} /></F>
              <F label="WhatsApp"><Input value={f.whatsappNo} onChange={(e) => set("whatsappNo", e.target.value)} /></F>
              <F label="Meslek"><Input value={f.occupation} onChange={(e) => set("occupation", e.target.value)} /></F>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <F label="TC Kimlik No *">
                <Input value={f.NIN} onChange={(e) => set("NIN", e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="11 hane" />
              </F>
              <F label="Doğum Tarihi *"><Input type="date" value={f.dob} onChange={(e) => set("dob", e.target.value)} /></F>
              <F label="Uyruk"><Input value={f.nationality} onChange={(e) => set("nationality", e.target.value)} /></F>
            </div>
            <F label="Adres *"><Textarea rows={2} value={f.address} onChange={(e) => set("address", e.target.value)} /></F>
            <div>
              <Label className="text-xs">Roller *</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1.5">
                {roles.map((r) => (
                  <label key={r.key} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={(f as any)[r.key]} onCheckedChange={(c) => set(r.key, !!c)} />
                    {r.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <F label="Min Bütçe"><Input type="number" value={f.minBudget} onChange={(e) => set("minBudget", e.target.value)} /></F>
              <F label="Max Bütçe"><Input type="number" value={f.maxBudget} onChange={(e) => set("maxBudget", e.target.value)} /></F>
              <F label="İletişim Tercihi">
                <Select value={f.contactMethod} onValueChange={(v) => set("contactMethod", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{["Telefon", "E-posta", "WhatsApp", "SMS"].map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}</SelectContent>
                </Select>
              </F>
            </div>
            <F label="Tercih Edilen Şehirler (virgülle)">
              <Input value={f.preferredCities} onChange={(e) => set("preferredCities", e.target.value)} placeholder="İstanbul, Ankara" />
            </F>
            <div>
              <Label className="text-xs">Tercih Edilen Mülk Türleri</Label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1.5">
                {Object.entries(propertyTypeLabel).map(([v, l]) => (
                  <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={f.preferredPropertyTypes.includes(v)} onCheckedChange={() => togglePref(v)} />
                    {l}
                  </label>
                ))}
              </div>
            </div>
            <F label="Geçici Parola *"><Input value={f.password} onChange={(e) => set("password", e.target.value)} /></F>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>İptal</Button>
            <Button onClick={submit} disabled={saving}>{saving ? "Oluşturuluyor..." : "Oluştur"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
