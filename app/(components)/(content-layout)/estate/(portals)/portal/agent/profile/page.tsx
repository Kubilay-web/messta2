import { validateRequest } from "@/app/auth";
import { getAgentFullProfile } from "../../../../actions/agent-portal";
import { notFound, redirect } from "next/navigation";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Mail, Phone, Briefcase, MapPin, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Profilim - Danışman Portalı" };

const genderLabel: Record<string, string> = {
  MALE: "Erkek", FEMALE: "Kadın", OTHER: "Diğer",
};
const typeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

export default async function AgentProfilePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent   = await getAgentFullProfile(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!agent && !isAdmin) return notFound();
  if (!agent) return (
    <div className="max-w-xl mx-auto p-8 text-center text-muted-foreground">
      <p className="text-lg font-semibold">Danışman profili bulunamadı.</p>
      <p className="text-sm mt-1">Bu hesaba bağlı bir danışman kaydı yok.</p>
    </div>
  );

  const dob = agent.dateOfBirth
    ? new Date(agent.dateOfBirth).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : null;

  const joinDate = new Date(agent.dateOfJoining).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Başlık */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-2xl shrink-0">
          {agent.firstName[0]}{agent.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold truncate">
            {agent.title} {agent.firstName} {agent.lastName}
          </h1>
          <p className="text-muted-foreground text-sm">{agent.designation} · {agent.departmentName}</p>
          <p className="text-muted-foreground text-xs">{agent.agencyName}</p>
          <Badge variant={agent.isActive ? "default" : "secondary"} className="text-xs mt-1">
            {agent.isActive ? "Aktif" : "Pasif"}
          </Badge>
        </div>
      </div>

      {/* İletişim */}
      <Card>
        <CardHeader><CardTitle className="text-base">İletişim</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Mail,  label: "E-posta",  value: agent.email },
            { icon: Phone, label: "Telefon",  value: agent.phone },
            { icon: Phone, label: "WhatsApp", value: agent.whatsappNo ?? "—" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                <p className="text-sm">{value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mesleki Bilgiler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Mesleki Bilgiler</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Çalışan No",     value: agent.employeeId },
            { label: "İşe Başlama",    value: joinDate },
            { label: "Deneyim",        value: agent.experience ? `${agent.experience} yıl` : "—" },
            { label: "Komisyon Oranı", value: agent.commissionRate != null ? `%${agent.commissionRate}` : "—" },
            { label: "Ruhsat No",      value: agent.licenseNo ?? "—" },
            { label: "Nitelik",        value: agent.qualification },
            { label: "Cinsiyet",       value: genderLabel[agent.gender] ?? agent.gender },
            { label: "Doğum Tarihi",   value: dob ?? "—" },
            { label: "İletişim Tercihi", value: agent.contactMethod },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="text-sm">{value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Uzmanlık */}
      {(agent.specializationTypes.length > 0 || agent.specializationCities.length > 0) && (
        <Card>
          <CardHeader><CardTitle className="text-base">Uzmanlık Alanları</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {agent.specializationTypes.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Mülk Tipleri</p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.specializationTypes.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">{typeLabel[t] ?? t}</Badge>
                  ))}
                </div>
              </div>
            )}
            {agent.specializationCities.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Şehirler</p>
                <p className="text-sm">{agent.specializationCities.join(", ")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* İstatistikler */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Performans Özeti
        </CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "İlan",      value: agent._count?.listings  ?? 0 },
              { label: "Sözleşme",  value: agent._count?.contracts ?? 0 },
              { label: "Ziyaret",   value: agent._count?.visits    ?? 0 },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {agent.bio && (
        <Card>
          <CardHeader><CardTitle className="text-base">Hakkımda</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{agent.bio}</p>
          </CardContent>
        </Card>
      )}

      {agent.skills && (
        <Card>
          <CardHeader><CardTitle className="text-base">Beceriler</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agent.skills.split(",").map((s) => (
                <Badge key={s.trim()} variant="secondary" className="text-xs">{s.trim()}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
