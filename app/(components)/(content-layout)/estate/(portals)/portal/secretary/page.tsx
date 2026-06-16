import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllProperties } from "../../../actions/properties";
import { getAllAgents } from "../../../actions/agents";
import { getAllPropertyClients } from "../../../actions/clients";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Building2, User, Users, ArrowRight, CalendarCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export const metadata: Metadata = { title: "Sekreter Portalı - EstatePro" };

export default async function SecretaryPortalPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const [properties, agents, clients] = await Promise.all([
    getAllProperties(agency.id),
    getAllAgents(agency.id),
    getAllPropertyClients(agency.id),
  ]);

  const activeProperties = properties.filter((p: any) => p.status === "AVAILABLE").length;
  const activeAgents     = agents.filter((a: any) => a.isActive).length;

  const h = new Date().getHours();
  const greeting = h < 12 ? "Günaydın" : h < 18 ? "İyi günler" : "İyi akşamlar";

  const shortcuts = [
    {
      title:   "Mülkler",
      href:    "/estate/portal/secretary/properties",
      icon:    Building2,
      total:   properties.length,
      sub:     `${activeProperties} müsait`,
      color:   "bg-blue-50 text-blue-600",
      newHref: "/estate/portal/secretary/properties/new",
    },
    {
      title:   "Danışmanlar",
      href:    "/estate/portal/secretary/agents",
      icon:    User,
      total:   agents.length,
      sub:     `${activeAgents} aktif`,
      color:   "bg-green-50 text-green-600",
      newHref: "/estate/portal/secretary/agents/new",
    },
    {
      title:   "Müşteriler",
      href:    "/estate/portal/secretary/clients",
      icon:    Users,
      total:   clients.length,
      sub:     `${clients.length} kayıtlı`,
      color:   "bg-amber-50 text-amber-600",
      newHref: "/estate/dashboard/users/clients/new",
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">

      {/* Hoşgeldin */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-5 sm:p-6 shadow">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {greeting}, {(user as any).firstName ?? (user as any).name ?? "Sekreter"}!
        </h1>
        <p className="text-blue-100 text-sm mt-1">{agency.name} · Sekreter Portalı</p>
      </div>

      {/* Kısayol Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {shortcuts.map(({ title, href, icon: Icon, total, sub, color, newHref }) => (
          <Card key={title} className="border border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-lg ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <Link href={newHref}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-md px-2.5 py-1 hover:bg-blue-50 transition-colors">
                  + Yeni
                </Link>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-black">{total}</p>
                <p className="text-sm font-medium text-black mt-0.5">{title}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
              <Link href={href}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                Tümünü Gör <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hızlı Erişim Linkleri */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-black flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-blue-600" /> Hızlı Erişim
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: "Mülk Listesi",       href: "/estate/portal/secretary/properties" },
              { label: "Yeni Mülk Ekle",     href: "/estate/portal/secretary/properties/new" },
              { label: "Danışman Listesi",   href: "/estate/portal/secretary/agents" },
              { label: "Yeni Danışman",      href: "/estate/portal/secretary/agents/new" },
              { label: "Müşteri Listesi",    href: "/estate/portal/secretary/clients" },
              { label: "Yeni Müşteri",       href: "/estate/dashboard/users/clients/new" },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-black hover:bg-gray-50 hover:border-blue-200 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
