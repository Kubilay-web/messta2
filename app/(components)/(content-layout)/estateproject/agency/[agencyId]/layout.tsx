import { notFound } from "next/navigation";
import db from "@/app/lib/db";
import { ProjectSidebar } from "../../components/project-sidebar";
import { requireAgencyAccess } from "../../lib/auth";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

export default async function ProjectAgencyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  await requireAgencyAccess(agencyId);

  const agency = await db.agency.findUnique({
    where: { id: agencyId },
    select: { id: true, name: true, logo: true },
  });
  if (!agency) return notFound();

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <ProjectSidebar agencyId={agency.id} agencyName={agency.name} agencyLogo={agency.logo} /> */}
      <main className="flex-1 min-w-0">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
