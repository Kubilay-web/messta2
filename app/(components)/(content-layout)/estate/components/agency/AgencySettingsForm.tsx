"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SaveAll, ToggleLeft, ToggleRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import ImageInput from "../FormInputs/ImageInput";
import { updateAgency } from "../../actions/agencies";

type Props = {
  agencyId:     string;
  name:         string;
  logo:         string | null;
  primaryEmail: string | null;
  phone:        string | null;
  address:      string | null;
  city:         string | null;
  taxNumber:    string | null;
  licenseNo:    string | null;
  siteEnabled:  boolean;
};

export default function AgencySettingsForm({
  agencyId, name, logo, primaryEmail, phone,
  address, city, taxNumber, licenseNo, siteEnabled,
}: Props) {
  const router  = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name:         name         ?? "",
    logo:         logo         ?? "",
    primaryEmail: primaryEmail ?? "",
    phone:        phone        ?? "",
    address:      address      ?? "",
    city:         city         ?? "",
    taxNumber:    taxNumber    ?? "",
    licenseNo:    licenseNo    ?? "",
    siteEnabled,
  });

  function set(key: keyof typeof form, value: string | boolean) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAgency(agencyId, form);
      toast.success("Ajans bilgileri kaydedildi!");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {/* Site yayın durumu */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Site Durumu</CardTitle>
            <button
              type="button"
              onClick={() => set("siteEnabled", !form.siteEnabled)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {form.siteEnabled
                ? <><ToggleRight className="w-5 h-5 text-green-500" /> Yayında</>
                : <><ToggleLeft  className="w-5 h-5 text-gray-400"  /> Taslak</>}
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* Temel bilgiler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Temel Bilgiler</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <ImageInput
            title="Ajans Logosu"
            imageUrl={form.logo || "/management/images/realestate-logo.svg"}
            setImageUrl={(url: string) => set("logo", url)}
            size="sm"
          />
          <div className="space-y-1.5">
            <Label>Ajans Adı</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ajans adı" required />
          </div>
          <div className="space-y-1.5">
            <Label>E-posta</Label>
            <Input type="email" value={form.primaryEmail} onChange={(e) => set("primaryEmail", e.target.value)} placeholder="info@ajans.com" />
          </div>
          <div className="space-y-1.5">
            <Label>Telefon</Label>
            <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+90 555 000 00 00" />
          </div>
        </CardContent>
      </Card>

      {/* Adres */}
      <Card>
        <CardHeader><CardTitle className="text-base">Adres</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Şehir</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="İstanbul" />
          </div>
          <div className="space-y-1.5">
            <Label>Açık Adres</Label>
            <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Mahalle, sokak, no" />
          </div>
        </CardContent>
      </Card>

      {/* Yasal bilgiler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Yasal Bilgiler</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Vergi Numarası</Label>
            <Input value={form.taxNumber} onChange={(e) => set("taxNumber", e.target.value)} placeholder="1234567890" />
          </div>
          <div className="space-y-1.5">
            <Label>Ticaret Ruhsat No</Label>
            <Input value={form.licenseNo} onChange={(e) => set("licenseNo", e.target.value)} placeholder="Ruhsat numarası" />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading} className="w-full sm:w-auto">
        <SaveAll className="mr-2 w-4 h-4" />
        {loading ? "Kaydediliyor…" : "Kaydet"}
      </Button>
    </form>
  );
}
