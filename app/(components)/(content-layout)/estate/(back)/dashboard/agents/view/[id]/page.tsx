import { validateRequest } from "@/app/auth";
import { getAgentById } from "../../../../../actions/agents";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase, Building2,
  Hash, Star, FileText, CalendarCheck, Home, User, Globe, ExternalLink,
} from "lucide-react";
import { Metadata } from "next";
import AgentDocsManager from "../../../../../components/dashboard/AgentDocsManager";

export const metadata: Metadata = { title: "Danışman Detayı - EstatePro" };

export default async function AgentViewPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agent = await getAgentById(params.id);
  if (!agent) notFound();

  const fullName = `${agent.title} ${agent.firstName} ${agent.lastName}`;

  const docs       = (agent as any).documents  ?? [];
  const socialLinks = (agent.socialLinks as Record<string, string> | null) ?? {};

  const infoCards = [
    { icon: Mail,         label: "E-posta",       value: agent.email },
    { icon: Phone,        label: "Telefon",        value: agent.phone },
    { icon: Phone,        label: "WhatsApp",       value: agent.whatsappNo ?? "—" },
    { icon: User,         label: "Cinsiyet",       value: ({ MALE: "Erkek", FEMALE: "Kadın", OTHER: "Diğer" } as any)[agent.gender] ?? agent.gender },
    { icon: Briefcase,    label: "Pozisyon",       value: agent.designation },
    { icon: Building2,    label: "Departman",      value: agent.departmentName },
    { icon: Hash,         label: "Çalışan No",     value: agent.employeeId },
    { icon: Star,         label: "Komisyon",       value: `%${agent.commissionRate ?? 2.5}` },
    { icon: FileText,     label: "Lisans / Ruhsat",value: agent.licenseNo ?? "—" },
    { icon: FileText,     label: "Nitelik",        value: agent.qualification },
    { icon: Hash,         label: "TC Kimlik",      value: agent.NIN },
    { icon: Phone,        label: "İletişim Tercihi",value: agent.contactMethod },
    { icon: MapPin,       label: "Uzm. Şehirler",  value: agent.specializationCities.join(", ") || "—" },
    {
      icon: CalendarCheck,
      label: "Doğum Tarihi",
      value: agent.dateOfBirth ? new Date(agent.dateOfBirth).toLocaleDateString("tr-TR") : "—",
    },
    {
      icon: CalendarCheck,
      label: "İşe Başlama",
      value: new Date(agent.dateOfJoining).toLocaleDateString("tr-TR"),
    },
    {
      icon: CalendarCheck,
      label: "Deneyim",
      value: agent.experience ? `${agent.experience} yıl` : "—",
    },
    {
      icon: CalendarCheck,
      label: "Son Giriş",
      value: agent.lastLogin ? new Date(agent.lastLogin).toLocaleString("tr-TR") : "—",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Üst Bar */}
      <div className="flex items-center justify-between gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/estate/dashboard/agents">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Geri
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/estate/dashboard/agents/edit/${agent.id}`}>Düzenle</Link>
        </Button>
      </div>

      {/* Profil Kartı */}
      <Card className="border-t-4 border-blue-600">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <Image
              src={agent.imageUrl || "/management/images/realestate-logo.svg"}
              alt={fullName}
              width={96} height={96}
              className="w-24 h-24 rounded-full object-cover shrink-0 border-4 border-blue-100"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-black">{fullName}</h1>
              <p className="text-black mt-1">{agent.designation} · {agent.departmentName}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                <Badge variant={agent.isActive ? "default" : "secondary"}>
                  {agent.isActive ? "Aktif" : "Pasif"}
                </Badge>
                {agent.specializationTypes.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs text-black">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bilgi Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {infoCards.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="border border-gray-200">
            <CardContent className="p-3 flex flex-col items-center text-center">
              <Icon className="w-5 h-5 mb-1.5 text-blue-600" />
              <p className="text-[10px] font-semibold text-black uppercase tracking-wide mb-1">{label}</p>
              <p className="text-xs text-black break-words w-full">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bio & Beceriler */}
      {(agent.bio || agent.skills) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {agent.bio && (
            <Card>
              <CardHeader><CardTitle className="text-sm text-black">Biyografi</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-black">{agent.bio}</p></CardContent>
            </Card>
          )}
          {agent.skills && (
            <Card>
              <CardHeader><CardTitle className="text-sm text-black">Beceriler</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.split(",").map((s) => (
                    <Badge key={s.trim()} variant="secondary" className="text-xs text-black">
                      {s.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Sosyal Medya */}
      {Object.keys(socialLinks).length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-black flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" /> Sosyal Medya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(socialLinks).map(([key, url]) => url ? (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="capitalize">{key === "website" ? "Web Sitesi" : key}</span>
                </a>
              ) : null)}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Belgeler */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" /> Belgeler ({docs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AgentDocsManager agentId={agent.id} initialDocs={docs} />
        </CardContent>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Toplam İlan",    value: (agent as any)._count?.listings  ?? 0, icon: Home },
          { label: "Sözleşme",       value: (agent as any)._count?.contracts ?? 0, icon: FileText },
          { label: "Mülk Gezisi",    value: (agent as any)._count?.visits    ?? 0, icon: CalendarCheck },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="text-center">
            <CardContent className="p-4">
              <Icon className="w-6 h-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-black">{value}</p>
              <p className="text-xs text-black mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
