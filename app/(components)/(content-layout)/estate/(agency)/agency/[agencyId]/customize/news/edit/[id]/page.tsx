import { getAgencyNewsById } from "../../../../../../../actions/agency-news";
import { notFound } from "next/navigation";
import { Card, CardContent } from "../../../../../../../components/ui/card";
import NewsForm from "../../new/NewsForm";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Haberi Düzenle - EstatePro" };

export default async function EditNewsPage({ params }: { params: Promise<{ agencyId: string; id: string }> }) {
  const { agencyId, id } = await params;
  const news = await getAgencyNewsById(id);
  if (!news) return notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <NewsForm agencyId={agencyId} editingId={news.id}
            initialData={{ title: news.title, content: news.content, image: news.image }} />
        </CardContent>
      </Card>
    </div>
  );
}
