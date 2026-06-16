import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";
import { notFound } from "next/navigation";

export default async function ContactPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "CONTACT");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="CONTACT"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="İletişim Bölümü"
      fields={[
        { key: "phone",        label: "Telefon",             type: "tel"      },
        { key: "email",        label: "E-posta",             type: "email"    },
        { key: "address",      label: "Adres",               type: "textarea" },
        { key: "mapLink",      label: "Google Maps Linki",   type: "url"      },
        { key: "workingHours", label: "Çalışma Saatleri",   type: "text"     },
        { key: "whatsapp",     label: "WhatsApp Numarası",   type: "tel"      },
      ]}
    />
  );
}
