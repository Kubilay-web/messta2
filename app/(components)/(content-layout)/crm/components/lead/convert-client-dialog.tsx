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
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui";
import { convertLeadToClient, type ConvertLeadInput } from "../../actions/clients";

function splitName(full: string): { first: string; last: string } {
  const parts = (full ?? "").trim().split(/\s+/);
  if (parts.length <= 1) return { first: parts[0] ?? "", last: "" };
  return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
}

export function ConvertClientDialog({
  open,
  onOpenChange,
  agencyId,
  lead,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  agencyId: string;
  lead: any;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const buildInitial = (): ConvertLeadInput => {
    const { first, last } = splitName(lead.contactName);
    const isRent = lead.listingType === "RENT" || lead.listingType === "SHORT_RENT";
    return {
      title: "Bay",
      firstName: first,
      lastName: last,
      email: lead.contactEmail ?? "",
      phone: lead.contactPhone ?? "",
      whatsappNo: lead.contactPhone ?? "",
      gender: "MALE",
      dob: "",
      nationality: "T.C.",
      NIN: "",
      contactMethod: "Telefon",
      occupation: "",
      address: [lead.district, lead.city].filter(Boolean).join(", "),
      isBuyer: !isRent,
      isSeller: false,
      isTenant: isRent,
      isLandlord: false,
      minBudget: lead.budgetMin ?? null,
      maxBudget: lead.budgetMax ?? lead.value ?? null,
      currency: lead.currency ?? "TRY",
      preferredPropertyTypes: lead.propertyType ? [lead.propertyType] : [],
      preferredCities: lead.city ? [lead.city] : [],
      notes: lead.requirements ?? "",
    };
  };

  const [form, setForm] = useState<ConvertLeadInput>(buildInitial);

  useEffect(() => {
    if (open) setForm(buildInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const set = <K extends keyof ConvertLeadInput>(k: K, v: ConvertLeadInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.firstName.trim() || !form.lastName.trim())
      return toast.error("Ad ve soyad zorunludur.");
    if (!form.email.trim()) return toast.error("E-posta zorunludur.");
    if (!form.phone.trim()) return toast.error("Telefon zorunludur.");
    if (!form.NIN.trim() || form.NIN.trim().length !== 11)
      return toast.error("11 haneli TC Kimlik No giriniz.");
    if (!form.dob) return toast.error("Doğum tarihi zorunludur.");
    if (!form.address.trim()) return toast.error("Adres zorunludur.");
    if (!form.isBuyer && !form.isSeller && !form.isTenant && !form.isLandlord)
      return toast.error("En az bir müşteri rolü seçiniz.");

    setSaving(true);
    try {
      await convertLeadToClient(lead.id, form);
      toast.success("Müşteri oluşturuldu ve fırsata bağlandı.");
      onOpenChange(false);
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Dönüştürme başarısız oldu.");
    } finally {
      setSaving(false);
    }
  };

  const roles: { key: keyof ConvertLeadInput; label: string }[] = [
    { key: "isBuyer", label: "Alıcı" },
    { key: "isSeller", label: "Satıcı" },
    { key: "isTenant", label: "Kiracı" },
    { key: "isLandlord", label: "Mülk Sahibi" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Müşteriye Dönüştür</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <F label="Ünvan">
              <Select value={form.title} onValueChange={(v) => set("title", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Bay", "Bayan", "Dr.", "Av."].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
            <F label="Ad *" className="col-span-1">
              <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
            </F>
            <F label="Soyad *">
              <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
            </F>
            <F label="Cinsiyet">
              <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
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
            <F label="E-posta *">
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            </F>
            <F label="Telefon *">
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </F>
            <F label="WhatsApp">
              <Input value={form.whatsappNo} onChange={(e) => set("whatsappNo", e.target.value)} />
            </F>
            <F label="Meslek">
              <Input value={form.occupation} onChange={(e) => set("occupation", e.target.value)} />
            </F>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <F label="TC Kimlik No *">
              <Input
                value={form.NIN}
                onChange={(e) => set("NIN", e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder="11 hane"
              />
            </F>
            <F label="Doğum Tarihi *">
              <Input type="date" value={form.dob} onChange={(e) => set("dob", e.target.value)} />
            </F>
            <F label="Uyruk">
              <Input value={form.nationality} onChange={(e) => set("nationality", e.target.value)} />
            </F>
          </div>

          <F label="Adres *">
            <Textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} />
          </F>

          <div>
            <Label className="text-xs">Müşteri Rolleri *</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {roles.map((r) => (
                <label key={r.key} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={form[r.key] as boolean}
                    onCheckedChange={(c) => set(r.key, !!c as any)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <F label="Min Bütçe">
              <Input
                type="number"
                value={form.minBudget ?? ""}
                onChange={(e) => set("minBudget", e.target.value ? Number(e.target.value) : null)}
              />
            </F>
            <F label="Max Bütçe">
              <Input
                type="number"
                value={form.maxBudget ?? ""}
                onChange={(e) => set("maxBudget", e.target.value ? Number(e.target.value) : null)}
              />
            </F>
            <F label="İletişim Tercihi">
              <Select value={form.contactMethod} onValueChange={(v) => set("contactMethod", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Telefon", "E-posta", "WhatsApp", "SMS"].map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
          </div>

          <p className="text-xs text-muted-foreground rounded-md bg-muted/50 px-3 py-2">
            Bu kişi sisteme kayıtlı mevcut kullanıcı olarak <b>e-posta ile</b> eşleştirilir;
            yeni hesap/parola oluşturulmaz. Ofisinize gayrimenkul rolü <b>müşteri (CLIENT)</b> olarak atanır
            ve kişi kendi hesabıyla giriş yapar. E-postanın, kişinin <b>kayıt e-postasıyla</b> aynı olması gerekir.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            İptal
          </Button>
          <Button onClick={submit} disabled={saving}>
            {saving ? "Oluşturuluyor..." : "Müşteri Oluştur"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function F({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
