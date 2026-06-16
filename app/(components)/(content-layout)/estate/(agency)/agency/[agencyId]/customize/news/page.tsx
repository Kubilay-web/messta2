import { getAllAgencyNews, deleteAgencyNews } from "../../../../../actions/agency-news";
import { notFound } from "next/navigation";
import { getAgencyById } from "../../../../../actions/agencies";
import Link from "next/link";
import { Plus, Pencil, Trash2, Newspaper } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Haberler - EstatePro" };

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function NewsPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const agency = await getAgencyById(agencyId);
  if (!agency) return notFound();

  const news = await getAllAgencyNews(agencyId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Haberler</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Web sitesi haber içerikleri.</p>
        </div>
        <Button asChild size="sm">
          <Link href={`/estate/agency/${agencyId}/customize/news/new`}>
            <Plus className="mr-1.5 w-4 h-4" /> Yeni Haber
          </Link>
        </Button>
      </div>

      {news.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
          <Newspaper className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Henüz haber eklenmemiş.</p>
          <Button asChild size="sm" className="mt-3">
            <Link href={`/estate/agency/${agencyId}/customize/news/new`}>İlk Haberi Ekle</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n) => (
            <Card key={n.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {n.image && (
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                </div>
              )}
              <CardContent className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-2">{n.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{fmtDate(n.createdAt)}</p>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">{n.content}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs flex-1">
                    <Link href={`/estate/agency/${agencyId}/customize/news/edit/${n.id}`}>
                      <Pencil className="w-3 h-3 mr-1" /> Düzenle
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="h-7 text-xs">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[92vw] max-w-md bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Haber silinsin mi?</AlertDialogTitle>
                        <AlertDialogDescription>"{n.title}" kalıcı olarak silinecek.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={async () => { "use server"; await deleteAgencyNews(n.id); }}
                        >Sil</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
