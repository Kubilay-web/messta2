import { getAgencyById } from "../../../../../actions/agencies";
import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function LogoPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const [agency, section] = await Promise.all([
    getAgencyById(agencyId),
    getAgencySectionByType(agencyId, "LOGO_NAVIGATION"),
  ]);
  if (!agency) return notFound();

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="LOGO_NAVIGATION"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Logo & Navigasyon"
      fields={[
        { key: "logoUrl",    label: "Logo URL",        type: "image" },
        { key: "tagline",    label: "Slogan / Tagline", type: "text"  },
        { key: "phone",      label: "Telefon (Header)", type: "tel"   },
        { key: "email",      label: "E-posta (Header)", type: "email" },
        { key: "ctaText",    label: "CTA Buton Metni",  type: "text"  },
        { key: "ctaLink",    label: "CTA Buton Linki",  type: "url"   },
      ]}
    />
  );
}
