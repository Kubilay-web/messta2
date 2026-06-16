import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function FooterPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "FOOTER");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="FOOTER"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Alt Bilgi (Footer)"
      fields={[
        { key: "description", label: "Kısa Açıklama",     type: "textarea" },
        { key: "copyright",   label: "Telif Hakkı Metni", type: "text"     },
        { key: "instagram",   label: "Instagram URL",     type: "url"      },
        { key: "facebook",    label: "Facebook URL",      type: "url"      },
        { key: "twitter",     label: "Twitter/X URL",     type: "url"      },
        { key: "linkedin",    label: "LinkedIn URL",      type: "url"      },
        { key: "youtube",     label: "YouTube URL",       type: "url"      },
      ]}
    />
  );
}
