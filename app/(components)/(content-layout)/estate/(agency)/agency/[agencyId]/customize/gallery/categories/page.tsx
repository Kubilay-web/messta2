import { getAllGalleryCategories, deleteGalleryCategory } from "../../../../../../actions/agency-gallery";
import Link from "next/link";
import { Trash2, ArrowLeft, Layers } from "lucide-react";
import { Badge } from "../../../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { Button } from "../../../../../../components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "../../../../../../components/ui/alert-dialog";
import CategoryCreateForm from "./CategoryCreateForm";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Galeri Kategorileri - EstatePro" };

export default async function GalleryCategoriesPage({ params }: { params: Promise<{ agencyId: string }> }) {
  const { agencyId } = await params;
  const categories = await getAllGalleryCategories(agencyId);

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Galeri Kategorileri</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Galeri görselleri için kategori yönetimi.</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/estate/agency/${agencyId}/customize/gallery`}>
            <ArrowLeft className="mr-1 w-4 h-4" /> Galeri
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Yeni Kategori</CardTitle></CardHeader>
        <CardContent><CategoryCreateForm agencyId={agencyId} /></CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="w-4 h-4" /> Kategoriler ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {categories.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">Henüz kategori yok.</p>
          ) : (
            <div className="divide-y">
              {categories.map((cat: any) => (
                <div key={cat.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm font-medium truncate">{cat.name}</span>
                    <Badge variant="secondary" className="text-xs">{cat._count.images} görsel</Badge>
                    <Badge variant={cat.active ? "default" : "outline"} className="text-[10px]">{cat.active ? "Aktif" : "Pasif"}</Badge>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="icon" variant="destructive" className="h-7 w-7 shrink-0">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[92vw] max-w-sm bg-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Kategori silinsin mi?</AlertDialogTitle>
                        <AlertDialogDescription>"{cat.name}" silinirse görsellerin kategorisi kaldırılır.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={async () => { "use server"; await deleteGalleryCategory(cat.id); }}
                        >Sil</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
