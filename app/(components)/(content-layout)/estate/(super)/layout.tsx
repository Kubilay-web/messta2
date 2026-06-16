import { validateRequest } from "@/app/auth";
import TopNav from "../components/super-admin-dasboard/top-nav";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function SuperAdminDashboardLayout({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const userRole = (user as any).roleGayrimenkul as string;
  if (!["SUPER_ADMIN", "ADMIN"].includes(userRole)) redirect("/estate/portal");

  return (
    <div className="flex h-screen">
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200">
          <TopNav user={user} />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white">{children}</main>
      </div>
    </div>
  );
}
