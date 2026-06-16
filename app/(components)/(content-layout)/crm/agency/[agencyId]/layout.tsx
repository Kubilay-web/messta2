import { notFound } from "next/navigation";
import db from "@/app/lib/db";
import { ensureCrmSetup } from "../../actions/pipelines";
import { CrmSidebar } from "../../components/crm-sidebar";
import { requireAgencyAccess } from "../../lib/auth";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

export default async function CrmAgencyLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;

  // Yetki: giriş + CRM rolü + bu ofise erişim (aksi halde redirect)
  const user = await requireAgencyAccess(agencyId);

  const agency = await db.agency.findUnique({
    where: { id: agencyId },
    select: { id: true, name: true, logo: true },
  });

  if (!agency) return notFound();

  // İlk girişte varsayılan hatları/aşamaları oluştur
  await ensureCrmSetup(agency.id);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* <CrmSidebar
        agencyId={agency.id}
        agencyName={agency.name}
        agencyLogo={agency.logo}
        role={user.role}
      /> */}
      <main className="flex-1 min-w-0">{children}</main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
