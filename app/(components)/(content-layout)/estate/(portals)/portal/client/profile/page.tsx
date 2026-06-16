import { validateRequest } from "@/app/auth";
import { getClientFullProfile } from "../../../../actions/client-portal";
import { redirect, notFound } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Profilim - Müşteri Portalı" };

const genderLabel: Record<string, string> = {
  MALE: "Erkek", FEMALE: "Kadın", OTHER: "Diğer",
  male: "Erkek", female: "Kadın",
};

const typeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

export default async function ClientProfilePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client  = await getClientFullProfile(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!client && !isAdmin) return notFound();
  if (!client) return (
    <div className="max-w-xl mx-auto p-8 text-center text-muted-foreground">
      <p className="text-lg font-semibold">Müşteri profili bulunamadı.</p>
      <p className="text-sm mt-1">Bu hesaba bağlı bir müşteri kaydı yok.</p>
    </div>
  );

  const roles = [
    client.isBuyer    && "Alıcı",
    client.isSeller   && "Satıcı",
    client.isTenant   && "Kiracı",
    client.isLandlord && "Kiraya Veren",
  ].filter(Boolean) as string[];

  const dob = client.dob
    ? new Date(client.dob).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Başlık */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-extrabold text-2xl shrink-0">
          {client.firstName[0]}{client.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold truncate">
            {client.title} {client.firstName} {client.lastName}
          </h1>
          <p className="text-muted-foreground text-sm">{client.agencyName}</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {roles.map((r) => (
              <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* İletişim */}
      <Card>
        <CardHeader><CardTitle className="text-base">İletişim Bilgileri</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Mail,   label: "E-posta",  value: client.email },
            { icon: Phone,  label: "Telefon",  value: client.phone },
            { icon: Phone,  label: "WhatsApp", value: client.whatsappNo ?? "—" },
            { icon: MapPin, label: "Adres",    value: client.address },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                <p className="text-sm break-all">{value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Kişisel */}
      <Card>
        <CardHeader><CardTitle className="text-base">Kişisel Bilgiler</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Uyruk",              value: client.nationality },
            { label: "Cinsiyet",           value: genderLabel[client.gender] ?? client.gender },
            { label: "Doğum Tarihi",       value: dob ?? "—" },
            { label: "Meslek",             value: client.occupation ?? "—" },
            { label: "İletişim Tercihi",   value: client.contactMethod },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="text-sm">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Bütçe & Tercihler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Bütçe &amp; Tercihler</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Min Bütçe</p>
              <p className="text-sm font-medium">
                {client.minBudget ? `${client.minBudget.toLocaleString("tr-TR")} ${client.currency}` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Max Bütçe</p>
              <p className="text-sm font-medium">
                {client.maxBudget ? `${client.maxBudget.toLocaleString("tr-TR")} ${client.currency}` : "—"}
              </p>
            </div>
          </div>

          {client.preferredPropertyTypes.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tercih Edilen Mülk Tipleri</p>
              <div className="flex flex-wrap gap-1.5">
                {client.preferredPropertyTypes.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs">{typeLabel[t] ?? t}</Badge>
                ))}
              </div>
            </div>
          )}

          {client.preferredCities.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tercih Edilen Şehirler</p>
              <p className="text-sm">{client.preferredCities.join(", ")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Özet İstatistikler</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "Sözleşme",  value: client._count?.contracts ?? 0 },
              { label: "Ziyaret",   value: client._count?.visits    ?? 0 },
              { label: "İlgi",      value: client._count?.interests ?? 0 },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {client.notes && (
        <Card>
          <CardHeader><CardTitle className="text-base">Notlar</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{client.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
