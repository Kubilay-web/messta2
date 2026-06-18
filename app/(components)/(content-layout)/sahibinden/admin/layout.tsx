import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "@/app/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login?redirect=/sahibinden/admin");
  if ((user as any).role !== "ADMIN") redirect("/sahibinden");

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-2">
        <span className="px-2 text-sm font-bold text-gray-800">🛡️ Admin</span>
        <nav className="flex gap-1 overflow-x-auto">
          <Tab href="/sahibinden/admin" label="Panel" />
          <Tab href="/sahibinden/admin/ilanlar" label="İlanlar" />
          <Tab href="/sahibinden/admin/sikayetler" label="Şikayetler" />
        </nav>
      </div>
      {children}
    </div>
  );
}

function Tab({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
      {label}
    </Link>
  );
}
