import { validateRequest } from "@/app/auth";
import { redirect } from "next/navigation";
import db from "@/app/lib/db";

const ROLE_REDIRECT: Record<string, string> = {
  SUPER_ADMIN: "/estate/dashboard",
  ADMIN:       "/estate/dashboard",
  ACCOUNTANT:  "/estate/portal/accountant",
  SECRETARY:   "/estate/portal/secretary",
  AGENT:       "/estate/portal/agent",
  CLIENT:      "/estate/portal/client",
};

export default async function PortalPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const dbUser = await db.user.findUnique({
    where:  { id: user.id },
    select: { roleGayrimenkul: true },
  });

  const role   = dbUser?.roleGayrimenkul ?? "CLIENT";
  const target = ROLE_REDIRECT[role] ?? "/estate/portal/client";

  redirect(target);
}
