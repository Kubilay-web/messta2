import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function HeroPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "HERO");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="HERO"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Hero Bölümü"
      fields={[
        { key: "heading",         label: "Ana Başlık",          type: "text"     },
        { key: "subheading",      label: "Alt Başlık",          type: "textarea" },
        { key: "backgroundImage", label: "Arka Plan Görseli",   type: "image"    },
        { key: "ctaText",         label: "Birincil Buton",      type: "text"     },
        { key: "ctaLink",         label: "Birincil Buton Linki",type: "url"      },
        { key: "secondaryText",   label: "İkincil Buton",       type: "text"     },
        { key: "secondaryLink",   label: "İkincil Buton Linki", type: "url"      },
      ]}
    />
  );
}
