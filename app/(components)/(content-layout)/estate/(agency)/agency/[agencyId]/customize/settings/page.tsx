import { getAgencyById } from "../../../../../actions/agencies";
import AgencySettingsForm from "../../../../../components/agency/AgencySettingsForm";
import { notFound } from "next/navigation";

export default async function AgencySettingsPage({
  params,
}: {
  params: Promise<{ agencyId: string }>;
}) {
  const { agencyId } = await params;
  const agency = await getAgencyById(agencyId);
  if (!agency) return notFound();

  return (
    <div className="space-y-1 mb-6">
      <h1 className="text-xl font-semibold">Ajans Ayarları</h1>
      <p className="text-sm text-muted-foreground">
        Ajansınızın temel bilgilerini ve site yayın durumunu buradan yönetin.
      </p>
      <div className="pt-4">
        <AgencySettingsForm
          agencyId={agency.id}
          name={agency.name}
          logo={agency.logo}
          primaryEmail={agency.primaryEmail}
          phone={agency.phone}
          address={agency.address}
          city={agency.city}
          taxNumber={agency.taxNumber}
          licenseNo={agency.licenseNo}
          siteEnabled={agency.siteEnabled}
        />
      </div>
    </div>
  );
}
