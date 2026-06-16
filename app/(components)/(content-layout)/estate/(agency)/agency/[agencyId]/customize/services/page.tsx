import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function ServicesPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "SERVICES");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="SERVICES"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Hizmetler"
      fields={[
        { key: "service1Title", label: "Hizmet 1 Başlığı",    type: "text"     },
        { key: "service1Desc",  label: "Hizmet 1 Açıklaması", type: "textarea" },
        { key: "service2Title", label: "Hizmet 2 Başlığı",    type: "text"     },
        { key: "service2Desc",  label: "Hizmet 2 Açıklaması", type: "textarea" },
        { key: "service3Title", label: "Hizmet 3 Başlığı",    type: "text"     },
        { key: "service3Desc",  label: "Hizmet 3 Açıklaması", type: "textarea" },
        { key: "service4Title", label: "Hizmet 4 Başlığı",    type: "text"     },
        { key: "service4Desc",  label: "Hizmet 4 Açıklaması", type: "textarea" },
      ]}
    />
  );
}
