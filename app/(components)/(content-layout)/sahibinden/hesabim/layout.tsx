import Link from "next/link";
import { redirect } from "next/navigation";
import { validateRequest } from "@/app/auth";
import AccountNav from "../components/account-nav";

export const dynamic = "force-dynamic";

export default async function HesabimLayout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login?redirect=/sahibinden/hesabim");

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-3">
          <p className="px-2 pb-2 text-sm font-bold text-gray-800">
            {user.displayName || user.username || "Hesabım"}
          </p>
          <AccountNav />
        </div>
        <Link
          href="/sahibinden/ilan-ver"
          className="mt-3 hidden w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700 lg:block"
        >
          + Yeni İlan Ver
        </Link>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
