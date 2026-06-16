import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";

export default async function TestimonialsPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "TESTIMONIALS");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="TESTIMONIALS"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Referanslar (Testimonials)"
      fields={[
        { key: "ref1Name",    label: "Referans 1 - Ad Soyad",  type: "text"     },
        { key: "ref1Role",    label: "Referans 1 - Ünvan",     type: "text"     },
        { key: "ref1Image",   label: "Referans 1 - Fotoğraf",  type: "image"    },
        { key: "ref1Comment", label: "Referans 1 - Yorum",     type: "textarea" },
        { key: "ref2Name",    label: "Referans 2 - Ad Soyad",  type: "text"     },
        { key: "ref2Role",    label: "Referans 2 - Ünvan",     type: "text"     },
        { key: "ref2Image",   label: "Referans 2 - Fotoğraf",  type: "image"    },
        { key: "ref2Comment", label: "Referans 2 - Yorum",     type: "textarea" },
        { key: "ref3Name",    label: "Referans 3 - Ad Soyad",  type: "text"     },
        { key: "ref3Role",    label: "Referans 3 - Ünvan",     type: "text"     },
        { key: "ref3Image",   label: "Referans 3 - Fotoğraf",  type: "image"    },
        { key: "ref3Comment", label: "Referans 3 - Yorum",     type: "textarea" },
      ]}
    />
  );
}
