import Link from "next/link";
import { Home, KeyRound, Castle, Briefcase, Store, Trees, CalendarDays, LayoutGrid } from "lucide-react";
import { QUICK_CATEGORIES } from "../lib/categories";

const ICONS: Record<string, any> = { Home, KeyRound, Castle, Briefcase, Store, Trees, CalendarDays, LayoutGrid };

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {QUICK_CATEGORIES.map((c) => {
        const Icon = ICONS[c.icon] ?? LayoutGrid;
        return (
          <Link
            key={c.label}
            href={c.href}
            className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow ${c.accent}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-bold text-slate-700 group-hover:text-amber-700">{c.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
