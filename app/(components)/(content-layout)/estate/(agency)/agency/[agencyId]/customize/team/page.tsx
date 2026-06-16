import { getAgencySectionByType } from "../../../../../actions/agency-site";
import AgencySectionForm from "../../../../../components/agency/AgencySectionForm";

export default async function TeamPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const section = await getAgencySectionByType(agencyId, "TEAM");

  return (
    <AgencySectionForm
      sectionId={section.id}
      agencyId={agencyId}
      sectionType="TEAM"
      title={section.title}
      subtitle={section.subtitle}
      isActive={section.isActive}
      isComplete={section.isComplete}
      settings={(section.settings as Record<string, any>) ?? {}}
      sectionName="Ekip"
      fields={[
        { key: "member1Name",  label: "Üye 1 - Ad Soyad",   type: "text"  },
        { key: "member1Role",  label: "Üye 1 - Ünvan",      type: "text"  },
        { key: "member1Image", label: "Üye 1 - Fotoğraf",   type: "image" },
        { key: "member1Phone", label: "Üye 1 - Telefon",    type: "tel"   },
        { key: "member2Name",  label: "Üye 2 - Ad Soyad",   type: "text"  },
        { key: "member2Role",  label: "Üye 2 - Ünvan",      type: "text"  },
        { key: "member2Image", label: "Üye 2 - Fotoğraf",   type: "image" },
        { key: "member2Phone", label: "Üye 2 - Telefon",    type: "tel"   },
        { key: "member3Name",  label: "Üye 3 - Ad Soyad",   type: "text"  },
        { key: "member3Role",  label: "Üye 3 - Ünvan",      type: "text"  },
        { key: "member3Image", label: "Üye 3 - Fotoğraf",   type: "image" },
        { key: "member3Phone", label: "Üye 3 - Telefon",    type: "tel"   },
        { key: "member4Name",  label: "Üye 4 - Ad Soyad",   type: "text"  },
        { key: "member4Role",  label: "Üye 4 - Ünvan",      type: "text"  },
        { key: "member4Image", label: "Üye 4 - Fotoğraf",   type: "image" },
        { key: "member4Phone", label: "Üye 4 - Telefon",    type: "tel"   },
      ]}
    />
  );
}
