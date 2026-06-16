import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function AboutPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "ABOUT");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="ABOUT"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Hakkımızda"
      fields={[
        { key: "description",  label: "Açıklama",              type: "textarea" },
        { key: "image",        label: "Görsel URL",            type: "image"    },
        { key: "yearsActive",  label: "Hizmet Yılı",          type: "text"     },
        { key: "totalSales",   label: "Toplam Satış",          type: "text"     },
        { key: "totalAgents",  label: "Danışman Sayısı",       type: "text"     },
        { key: "totalCities",  label: "Hizmet Verilen Şehir",  type: "text"     },
        { key: "ctaText",      label: "Buton Metni",           type: "text"     },
        { key: "ctaLink",      label: "Buton Linki",           type: "url"      },
      ]}
    />
  );
}
