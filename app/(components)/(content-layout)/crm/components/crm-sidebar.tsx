"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  KanbanSquare,
  Users2,
  CheckSquare,
  CalendarClock,
  Settings2,
  Building2,
  Contact2,
  BarChart3,
  BadgeCheck,
  BellRing,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";

export function CrmSidebar({
  agencyId,
  agencyName,
  agencyLogo,
  role,
}: {
  agencyId: string;
  agencyName: string;
  agencyLogo?: string | null;
  role?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/crm/agency/${agencyId}`;

  const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN";
  const canReports = isAdmin || role === "ACCOUNTANT";

  const items = [
    { href: base, label: "Gösterge Paneli", icon: LayoutDashboard, exact: true, show: true },
    { href: `${base}/pipeline`, label: "Satış Hattı", icon: KanbanSquare, show: true },
    { href: `${base}/leads`, label: "Fırsatlar", icon: Users2, show: true },
    { href: `${base}/clients`, label: "Müşteriler", icon: Contact2, show: true },
    { href: `${base}/tasks`, label: "Görevler", icon: CheckSquare, show: true },
    { href: `${base}/activities`, label: "Ajanda", icon: CalendarClock, show: true },
    { href: `${base}/notifications`, label: "Eşleşme Uyarıları", icon: BellRing, show: true },
    { href: `${base}/attention`, label: "Dikkat Gerektirenler", icon: AlertTriangle, show: true },
    { href: `${base}/agents`, label: "Danışmanlar", icon: BadgeCheck, show: canReports },
    { href: `${base}/reports`, label: "Raporlar", icon: BarChart3, show: canReports },
    { href: `${base}/settings/pipelines`, label: "Hat Ayarları", icon: Settings2, show: isAdmin },
  ].filter((i) => i.show);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobil üst bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b bg-background sticky top-0 z-30">
        <span className="font-semibold">CRM</span>
        <button onClick={() => setOpen((o) => !o)} className="p-2 rounded-md hover:bg-muted">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <aside
        className={`fixed lg:sticky top-0 z-40 h-screen w-64 shrink-0 border-r bg-background flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-4 h-16 border-b">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
            {agencyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={agencyLogo} alt={agencyName} className="size-9 object-cover" />
            ) : (
              <Building2 className="size-5 text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-none">Emlak CRM</p>
            <p className="font-semibold text-sm truncate">{agencyName}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((item) => {
            const active = isActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t">
          <Link
            href={`/estate/agency/${agencyId}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Building2 className="size-4.5" />
            ERP&apos;ye Dön
          </Link>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
