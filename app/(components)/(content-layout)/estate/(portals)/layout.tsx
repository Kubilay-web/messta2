import { validateRequest } from "@/app/auth";
import PortalHeader from "../components/portal/PortalHeader";
import PortalSidebar from "../components/portal/PortalSidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const role = (user as any).roleGayrimenkul as string;

  return (
    <div className="flex min-h-screen w-full">
      {/* <PortalSidebar userRole={role} /> */}
      <div className="flex flex-1 flex-col">
        <PortalHeader user={user as any} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
