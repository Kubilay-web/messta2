"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Building2, Tag, HardHat, Wallet, Image as ImageIcon, LayoutDashboard } from "lucide-react";

export function ProjectSubnav({ agencyId, projectId }: { agencyId: string; projectId: string }) {
  const pathname = usePathname();
  const base = `/estateproject/agency/${agencyId}/projects/${projectId}`;

  const items = [
    { href: base, label: "Genel Bakış", icon: LayoutDashboard, exact: true },
    { href: `${base}/units`, label: "Daireler", icon: Layers },
    { href: `${base}/blocks`, label: "Bloklar", icon: Building2 },
    { href: `${base}/sales`, label: "Satışlar", icon: Tag },
    { href: `${base}/construction`, label: "İnşaat", icon: HardHat },
    { href: `${base}/budget`, label: "Bütçe", icon: Wallet },
    { href: `${base}/media`, label: "Medya", icon: ImageIcon },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-slate-800 min-w-max">
        {items.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                active
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
