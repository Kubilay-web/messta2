import { getAllAgencies }       from "../../actions/agencies";
import { getAllAgencyContacts } from "../../actions/contact";
import { Metadata }            from "next";
import {
  Building2, Users, MessageSquare, Globe,
  TrendingUp, CheckCircle, Clock, MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge }   from "../../components/ui/badge";
import { Button }  from "../../components/ui/button";
import Link        from "next/link";

export const metadata: Metadata = { title: "Süper Panel - EstatePro" };

export default async function SuperDashboardPage() {
  const [agencies, contacts] = await Promise.all([
    getAllAgencies(),
    getAllAgencyContacts(),
  ]);

  const activeAgencies = agencies.filter((a) => a.siteEnabled);
  const pendingContacts = contacts.slice(0, 5);
  const recentAgencies  = agencies.slice(0, 5);

  const fmtDate = (d: Date | string) =>
    new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold">Süper Yönetici Paneli</h1>
        <p className="text-muted-foreground text-sm mt-1">
          EstatePro sistemindeki tüm ofisleri ve talepleri yönetin.
        </p>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label:  "Toplam Ofis",
            value:  agencies.length,
            icon:   Building2,
            color:  "text-blue-600",
            bg:     "bg-blue-50",
            href:   "/estate/super-dashboard/agencies-page",
          },
          {
            label:  "Yayındaki Ofis",
            value:  activeAgencies.length,
            icon:   Globe,
            color:  "text-green-600",
            bg:     "bg-green-50",
            href:   "/estate/super-dashboard/agencies-page",
          },
          {
            label:  "Toplam Başvuru",
            value:  contacts.length,
            icon:   MessageSquare,
            color:  "text-orange-600",
            bg:     "bg-orange-50",
            href:   "/estate/super-dashboard/contacts",
          },
          {
            label:  "Taslak Ofis",
            value:  agencies.length - activeAgencies.length,
            icon:   Clock,
            color:  "text-purple-600",
            bg:     "bg-purple-50",
            href:   "/estate/super-dashboard/agencies-page",
          },
        ].map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son İletişim Talepleri */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-orange-500" /> Son Başvurular
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/estate/super-dashboard/contacts">Tümü</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingContacts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Başvuru yok.</p>
            ) : pendingContacts.map((c) => (
              <div key={c.id} className="flex items-start justify-between gap-2 rounded-lg border p-3 hover:bg-gray-50">
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">{c.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {(c as any).school ?? (c as any).companyName ?? "—"}{" "}
                    {(c as any).country ? `— ${(c as any).country}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{c.email}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{fmtDate(c.createdAt)}</p>
                  {(c as any).students != null && (
                    <Badge variant="outline" className="text-xs mt-1">{(c as any).students} danışman</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Son Eklenen Ofisler */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-500" /> Son Ofisler
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-xs">
              <Link href="/estate/super-dashboard/agencies-page">Tümü</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAgencies.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Kayıtlı ofis yok.</p>
            ) : recentAgencies.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-2 rounded-lg border p-3 hover:bg-gray-50">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {a.city && <><MapPin className="w-3 h-3" />{a.city}</>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={a.siteEnabled ? "default" : "secondary"} className="text-xs">
                    {a.siteEnabled ? "Yayında" : "Taslak"}
                  </Badge>
                  <Button asChild variant="ghost" size="icon" className="h-7 w-7">
                    <Link href={`/estate/agency/${a.id}/customize`}>
                      <TrendingUp className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hızlı İşlemler */}
      <Card>
        <CardHeader><CardTitle className="text-base">Hızlı İşlemler</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Yeni Ofis Ekle",       href: "/estate/agency-onboarding",            icon: Building2,    color: "bg-blue-600"   },
              { label: "Ofis Listesi",          href: "/estate/super-dashboard/agencies-page",icon: Globe,        color: "bg-green-600"  },
              { label: "İletişim Talepleri",    href: "/estate/super-dashboard/contacts",     icon: MessageSquare,color: "bg-orange-600" },
              { label: "Rol Ata",               href: `/estate/agency-admin/`,                icon: Users,        color: "bg-purple-600" },
            ].map(({ label, href, icon: Icon, color }) => (
              <Button key={label} asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href={href}>
                  <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-center leading-tight">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
