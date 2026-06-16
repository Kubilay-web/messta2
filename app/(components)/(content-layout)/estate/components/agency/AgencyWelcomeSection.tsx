"use client";

import Link from "next/link";
import { Eye, Edit, Check, Clock } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const sectionTypeLabel: Record<string, string> = {
  LOGO_NAVIGATION:     "Logo & Navigasyon",
  HERO:                "Hero Bölümü",
  ABOUT:               "Hakkımızda",
  FEATURED_PROPERTIES: "Öne Çıkan Mülkler",
  SERVICES:            "Hizmetler",
  TESTIMONIALS:        "Referanslar",
  TEAM:                "Ekip",
  CONTACT:             "İletişim",
  FOOTER:              "Alt Bilgi",
};

const sectionEditPath: Record<string, string> = {
  LOGO_NAVIGATION:     "logo",
  HERO:                "hero-section",
  ABOUT:               "about-section",
  FEATURED_PROPERTIES: "featured-properties",
  SERVICES:            "services",
  TESTIMONIALS:        "testimonials",
  TEAM:                "team",
  CONTACT:             "contact-section",
  FOOTER:              "footer",
};

type Agency = {
  id: string;
  name: string;
  slug: string;
  siteEnabled: boolean;
  siteCompletion: number;
};

type Section = {
  id: string;
  type: string;
  title: string;
  isComplete: boolean;
  isActive: boolean;
  order: number;
};

type Activity = {
  id: string;
  activity: string;
  description: string;
  time: string;
  type: string;
  createdAt: Date | string;
};

function timeAgo(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60)   return `${minutes}d önce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24)     return `${hours}s önce`;
  return `${Math.floor(hours / 24)}g önce`;
}

export default function AgencyWelcomeSection({
  agency,
  activities,
  incompleteSections,
  allSections,
}: {
  agency: Agency | null;
  activities: Activity[];
  incompleteSections: Section[];
  allSections: Section[];
}) {
  const pct       = agency?.siteCompletion ?? 0;
  const completed = allSections.filter((s) => s.isComplete).length;
  const agencyId  = agency?.id ?? "";

  return (
    <div className="flex flex-1 flex-col p-4 sm:p-6 space-y-6">
      {/* Başlık */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          {agency?.name ?? "Ofis"} — Web Sitesi Yönetimi
        </h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/estate/agency/${agency?.slug}`} target="_blank">
              <Eye className="mr-2 h-4 w-4" /> Siteyi Görüntüle
            </Link>
          </Button>
          <Badge variant={agency?.siteEnabled ? "default" : "secondary"}>
            {agency?.siteEnabled ? "Yayında" : "Taslak"}
          </Badge>
        </div>
      </div>

      {/* İlerleme */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Site Tamamlanma Durumu</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{completed} / {allSections.length} bölüm tamamlandı</span>
            <span className="font-bold">%{pct}</span>
          </div>
          <Progress value={pct} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Eksik Bölümler */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" /> Tamamlanmamış Bölümler
            </CardTitle>
          </CardHeader>
          <CardContent>
            {incompleteSections.length === 0 ? (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" /> Tüm bölümler tamamlandı!
              </div>
            ) : (
              <div className="space-y-2">
                {incompleteSections.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{sectionTypeLabel[s.type] ?? s.type}</p>
                      <p className="text-xs text-muted-foreground">{s.title}</p>
                    </div>
                    <Button asChild size="sm" variant="outline" className="text-xs">
                      <Link href={`/estate/agency/${agencyId}/customize/${sectionEditPath[s.type] ?? s.type.toLowerCase()}`}>
                        <Edit className="mr-1 w-3.5 h-3.5" /> Düzenle
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Son Aktiviteler */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground">Henüz aktivite yok.</p>
            ) : (
              <div className="space-y-3">
                {activities.map((a) => (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{a.activity}</p>
                      <p className="text-xs text-muted-foreground truncate">{a.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {timeAgo(a.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tüm Bölümler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tüm Bölümler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allSections.map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${s.isComplete ? "bg-green-500" : "bg-orange-400"}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{sectionTypeLabel[s.type] ?? s.type}</p>
                    <p className="text-xs text-muted-foreground">{s.isComplete ? "Tamamlandı" : "Bekliyor"}</p>
                  </div>
                </div>
                <Button asChild size="icon" variant="ghost" className="h-7 w-7 shrink-0">
                  <Link href={`/estate/agency/${agencyId}/customize/${sectionEditPath[s.type] ?? s.type.toLowerCase()}`}>
                    <Edit className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
