import { getAllGalleryCategories } from "../../../../../../actions/agency-gallery";
import { Metadata } from "next";
import { Card, CardContent } from "../../../../../../components/ui/card";
import GalleryImageForm from "./GalleryImageForm";

export const metadata: Metadata = { title: "Görsel Ekle - EstatePro" };

export default async function NewGalleryImagePage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const categories = await getAllGalleryCategories(agencyId);
  return (
    <div className="max-w-xl mx-auto">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <GalleryImageForm agencyId={agencyId} categories={categories as any[]} />
        </CardContent>
      </Card>
    </div>
  );
}
