import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getPropertyById } from "../../../../../actions/properties";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import PropertyForm from "../../../../../components/dashboard/forms/properties/property-form";
import PropertyPhotosManager from "../../../../../components/dashboard/PropertyPhotosManager";
import PropertyDocsManager   from "../../../../../components/dashboard/PropertyDocsManager";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Mülkü Düzenle - EstatePro" };

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const [agency, property] = await Promise.all([
    AgencyUser(user.id),
    getPropertyById(params.id),
  ]);

  if (!property) notFound();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Mülk Bilgileri */}
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <PropertyForm
            agencyId={agency?.id ?? ""}
            agencyName={agency?.name ?? ""}
            editingId={params.id}
            initialData={property as any}
          />
        </CardContent>
      </Card>

      {/* Fotoğraflar */}
      <Card className="border-t-4 border-green-500 shadow">
        <CardHeader>
          <CardTitle className="text-base text-black">Fotoğraflar</CardTitle>
          <p className="text-xs text-black">
            Birden fazla fotoğraf seçebilirsiniz. İlk yüklenen otomatik kapak olur.
            Kapak fotoğrafını değiştirmek için ★ butonuna tıklayın.
          </p>
        </CardHeader>
        <CardContent>
          <PropertyPhotosManager
            propertyId={params.id}
            initialPhotos={(property as any).images ?? []}
          />
        </CardContent>
      </Card>

      {/* Belgeler */}
      <Card className="border-t-4 border-amber-500 shadow">
        <CardHeader>
          <CardTitle className="text-base text-black">Belgeler</CardTitle>
          <p className="text-xs text-black">
            Tapu, sözleşme, ekspertiz, enerji kimlik belgesi gibi dosyaları yükleyin.
          </p>
        </CardHeader>
        <CardContent>
          <PropertyDocsManager
            propertyId={params.id}
            initialDocs={(property as any).documents ?? []}
          />
        </CardContent>
      </Card>
    </div>
  );
}
