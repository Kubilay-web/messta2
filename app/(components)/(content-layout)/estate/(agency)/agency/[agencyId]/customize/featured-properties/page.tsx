import { getAgencySectionByType } from "../../../../../actions/agency-site";
import { getAllProperties } from "../../../../../actions/properties";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function FeaturedPropertiesPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "FEATURED_PROPERTIES");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="FEATURED_PROPERTIES"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Öne Çıkan Mülkler"
      fields={[
        { key: "count",       label: "Gösterilecek Mülk Sayısı (max 6)", type: "text" },
        { key: "filterType",  label: "Filtre Tipi (SALE / RENT / boş)",  type: "text" },
        { key: "ctaText",     label: "Tüm İlanlar Buton Metni",          type: "text" },
        { key: "ctaLink",     label: "Tüm İlanlar Buton Linki",          type: "url"  },
      ]}
    />
  );
}
