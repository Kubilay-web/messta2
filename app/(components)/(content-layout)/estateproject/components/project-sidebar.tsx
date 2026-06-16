"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Layers,
  Menu,
  X,
  HardHat,
} from "lucide-react";

export function ProjectSidebar({
  agencyId,
  agencyName,
  agencyLogo,
}: {
  agencyId: string;
  agencyName: string;
  agencyLogo?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const base = `/estateproject/agency/${agencyId}`;

  const items = [
    { href: base, label: "Portföy", icon: LayoutDashboard, exact: true },
    { href: `${base}/projects`, label: "Projeler", icon: Building2 },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b bg-background sticky top-0 z-30">
        <span className="font-semibold">Proje Yönetimi</span>
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
          <div className="size-9 rounded-lg bg-amber-500/10 flex items-center justify-center overflow-hidden">
            {agencyLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={agencyLogo} alt={agencyName} className="size-9 object-cover" />
            ) : (
              <HardHat className="size-5 text-amber-600" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-none">Proje Yönetimi</p>
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
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4.5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t space-y-1">
          <Link
            href={`/crm/agency/${agencyId}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Layers className="size-4.5" />
            CRM
          </Link>
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
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}
