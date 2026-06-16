import React from "react";
import {
  LayoutDashboard, Building2, FileText, CalendarCheck,
  Users, User, BarChart3, MessageSquare, DollarSign,
  Activity, Settings2, Key, Globe, ChevronRight,
  ClipboardList, TrendingUp, Kanban,
} from "lucide-react";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail,
} from "../../../components/ui/sidebar";
import Logo    from "../../../components/logo";
import UserMenu from "./user-menu";
import { hasPermission } from "../../../lib/permissions";

type Props = { agencySlug: string; agencyName: string; userRole?: string };

export default function AppSidebar({ agencySlug, agencyName, userRole }: Props) {
  const base = "/estate/dashboard";

  const sidebarLinks = [
    {
      title: "Dashboard",
      icon:  LayoutDashboard,
      perm:  "dashboard.view",
      isActive: true,
      items: [
        { title: "Genel Bakış",        url: `${base}` },
        { title: "Analitik",           url: `${base}/analytics` },
        { title: "Gelişmiş Analitik",  url: `${base}/insights` },
        { title: "Denetim Kayıtları",  url: `${base}/audit-logs` },
        { title: "Aktivite Logları",   url: `${base}/logs` },
      ],
    },
    {
      title: "CRM",
      icon:  Kanban,
      perm:  "dashboard.view",
      items: [
        { title: "Genel Bakış",   url: `${base}/crm` },
        { title: "Potansiyeller", url: `${base}/crm/leads` },
        { title: "Fırsatlar",     url: `${base}/crm/deals` },
        { title: "Görevler",      url: `${base}/crm/tasks` },
        { title: "Takvim",        url: `${base}/crm/calendar` },
        { title: "Projeler",      url: `${base}/crm/projects` },
        { title: "Dosyalar",      url: `${base}/crm/files` },
        { title: "E-posta",       url: `${base}/crm/emails` },
        { title: "Aboneler",      url: `${base}/crm/subscribers` },
        { title: "Kategoriler",   url: `${base}/crm/categories` },
        { title: "Analitik",      url: `${base}/crm/analytics` },
        { title: "Pipeline Ayarları", url: `${base}/crm/pipelines` },
      ],
    },
    {
      title: "Mülk Yönetimi",
      icon:  Building2,
      perm:  "properties.view",
      items: [
        { title: "Mülkler",          url: `${base}/properties` },
        { title: "İlanlar",          url: `${base}/listings` },
        { title: "Teklifler",        url: `${base}/offers` },
        { title: "Rezervasyonlar",   url: `${base}/reservations` },
        { title: "Sözleşmeler",      url: `${base}/contracts` },
        { title: "Mülk Gezileri",    url: `${base}/visits` },
        { title: "Bakım Talepleri",  url: `${base}/maintenance` },
      ],
    },
    {
      title: "Ödeme Planları",
      icon:  ClipboardList,
      perm:  "finance.view",
      items: [
        { title: "Tüm Ödemeler",     url: `${base}/payments` },
      ],
    },
    {
      title: "Danışmanlar",
      icon:  User,
      perm:  "agents.view",
      items: [
        { title: "Tüm Danışmanlar",  url: `${base}/agents` },
        { title: "Yeni Danışman",    url: `${base}/agents/new` },
        { title: "Departmanlar",     url: `${base}/users/departments` },
      ],
    },
    {
      title: "Müşteriler",
      icon:  Users,
      perm:  "clients.view",
      items: [
        { title: "Tüm Müşteriler",   url: `${base}/users/clients` },
        { title: "Yeni Müşteri",     url: `${base}/users/clients/new` },
      ],
    },
    {
      title: "Devam Takibi",
      icon:  CalendarCheck,
      perm:  "agents.view",
      items: [
        { title: "Genel Bakış",         url: `${base}/attendance` },
        { title: "Departmana Göre",     url: `${base}/attendance/by-department` },
        { title: "Danışman Görüntüsü",  url: `${base}/attendance/agent` },
        { title: "İzin Takibi",         url: `${base}/attendance/leaves` },
      ],
    },
    {
      title: "İletişim",
      icon:  MessageSquare,
      perm:  "communications.view",
      items: [
        { title: "İletişim Kayıtları",   url: `${base}/communication/logs` },
        { title: "Bildirimler",          url: `${base}/notifications` },
        { title: "Hatırlatıcılar",       url: `${base}/communication/reminders` },
        { title: "Web Sitesi Mesajları", url: `${base}/communication/website-messages` },
      ],
    },
    {
      title: "Finans",
      icon:  DollarSign,
      perm:  "finance.view",
      items: [
        { title: "Komisyon Özeti",   url: `${base}/finance/commissions` },
        { title: "Komisyon Kayıtları", url: `${base}/finance/commission-records` },
        { title: "Faturalar",     url: `${base}/finance/invoices` },
        { title: "Giderler",      url: `${base}/finance/expenses` },
        { title: "Bordro / Maaş", url: `${base}/finance/payroll` },
        { title: "Gelir Takibi",  url: `${base}/finance/revenue` },
      ],
    },
    {
      title: "Kullanıcılar",
      icon:  Settings2,
      perm:  "settings.manage",
      items: [
        { title: "Ajans Kullanıcıları", url: `${base}/users` },
        { title: "Rol Ata",             url: `${base}/users/new` },
      ],
    },
    {
      title: "Admin",
      icon:  Key,
      perm:  "settings.manage",
      items: [
        { title: "Talepler / İletişim", url: `${base}/admin/contacts` },
      ],
    },
    {
      title: "Web Sitesi",
      icon:  Globe,
      perm:  "settings.manage",
      items: [
        { title: "Canlı Site",     url: `/estate/${agencySlug}` },
        { title: "Özelleştir",     url: `/estate/${agencySlug}/customize` },
        { title: "Haberler",       url: `/estate/${agencySlug}/customize/news` },
        { title: "Etkinlikler",    url: `/estate/${agencySlug}/customize/events` },
        { title: "Galeri",         url: `/estate/${agencySlug}/customize/gallery` },
      ],
    },
  ];

  // Rol bazlı görünürlük: perm tanımlı değilse herkese açık; tanımlıysa yetki gerekir.
  const visibleLinks = sidebarLinks.filter((g) => !(g as any).perm || hasPermission(userRole, (g as any).perm));

  return (
    <Sidebar className="!bg-gray-200 !text-black [&_*]:!text-black" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo href="/estate/dashboard" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {visibleLinks.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={sub.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={sub.url}>
                              <span>{sub.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
