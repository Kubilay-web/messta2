import { getAllGalleryImages, getAllGalleryCategories, deleteGalleryImage } from "../../../../../actions/agency-gallery";
import { getAgencyById } from "../../../../../actions/agencies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, ImageIcon } from "lucide-react";
import { Badge } from "../../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Galeri - EstatePro" };

export default async function GalleryPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const agency = await getAgencyById(agencyId);
  if (!agency) return notFound();

  const [images, categories] = await Promise.all([
    getAllGalleryImages(agencyId),
    getAllGalleryCategories(agencyId),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Galeri</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Web sitesi galeri görselleri.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href={`/estate/agency/${agencyId}/customize/gallery/categories`}>Kategoriler</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/estate/agency/${agencyId}/customize/gallery/new`}>
              <Plus className="mr-1.5 w-4 h-4" /> Görsel Ekle
            </Link>
          </Button>
        </div>
      </div>

      {categories.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Kategoriler</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat: any) => (
                <div key={cat.id} className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5">
                  <span className="text-sm font-medium">{cat.name}</span>
                  <Badge variant="secondary" className="text-xs">{cat._count.images}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {images.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center">
          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Henüz görsel eklenmemiş.</p>
          <Button asChild size="sm" className="mt-3">
            <Link href={`/estate/agency/${agencyId}/customize/gallery/new`}>İlk Görseli Ekle</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img: any) => (
            <div key={img.id} className="group relative rounded-lg overflow-hidden border">
              <div className="aspect-square bg-gray-100">
                <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
              </div>
              <div className="p-2">
                <p className="text-xs font-medium truncate">{img.title}</p>
                {img.category && <p className="text-[10px] text-muted-foreground">{img.category.name}</p>}
              </div>
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="destructive" className="h-6 w-6"><Trash2 className="w-3 h-3" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="w-[92vw] max-w-sm bg-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Görsel silinsin mi?</AlertDialogTitle>
                      <AlertDialogDescription>"{img.title}" kalıcı olarak silinecek.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={async () => { "use server"; await deleteGalleryImage(img.id); }}
                      >Sil</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
