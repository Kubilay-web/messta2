"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search, X, Loader2, Trash2, Globe, Settings, Plus, Building2,
} from "lucide-react";
import clsx from "clsx";
import { format } from "date-fns";
import { Button }                from "../../components/ui/button";
import { Input }                 from "../../components/ui/input";
import { Badge }                 from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress }              from "../../components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "../../components/ui/pagination";
import { deleteAgencyById } from "../../actions/agencies";

type Agency = {
  id:             string;
  name:           string;
  slug:           string;
  logo?:          string | null;
  city?:          string | null;
  primaryEmail?:  string | null;
  phone?:         string | null;
  siteEnabled:    boolean;
  siteCompletion: number;
  licenseNo?:     string | null;
  createdAt:      Date | string;
  /** Bu ofisi giriş yapan kullanıcı mı oluşturdu? Sadece bunlarda sil/düzenle açık. */
  isOwn?:         boolean;
};

const ITEMS = 10;

export default function AgencyTable({ agencies }: { agencies: Agency[] }) {
  const router = useRouter();
  const [data, setData]         = useState<Agency[]>(agencies);
  const [search, setSearch]     = useState("");
  const [page, setPage]         = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return data;
    return data.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.slug.toLowerCase().includes(q) ||
        a.city?.toLowerCase().includes(q) ||
        a.primaryEmail?.toLowerCase().includes(q)
    );
  }, [data, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS);
  const pageItems  = filtered.slice((page - 1) * ITEMS, page * ITEMS);

  async function handleDelete(id: string) {
    if (!confirm("Bu ofisi silmek istediğinizden emin misiniz?")) return;
    setDeleting(id);
    try {
      await deleteAgencyById(id);
      setData((prev) => prev.filter((a) => a.id !== id));
      toast.success("Ofis silindi.");
    } catch (e: any) {
      toast.error(e?.message || "Silinemedi.");
    } finally {
      setDeleting(null);
    }
  }

  const getPageNumbers = () => {
    const nums: (number | "e")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) nums.push(i);
    } else {
      if (page <= 3) { for (let i = 1; i <= 4; i++) nums.push(i); nums.push("e"); nums.push(totalPages); }
      else if (page >= totalPages - 2) { nums.push(1); nums.push("e"); for (let i = totalPages - 3; i <= totalPages; i++) nums.push(i); }
      else { nums.push(1); nums.push("e"); nums.push(page - 1); nums.push(page); nums.push(page + 1); nums.push("e"); nums.push(totalPages); }
    }
    return nums;
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle className="text-2xl text-blue-600">Emlak Ofisleri</CardTitle>
          <p className="text-muted-foreground text-sm mt-1">
            {data.length} ofis kayıtlı
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/estate/agency-onboarding">
            <Plus className="mr-1.5 w-4 h-4" /> Yeni Ofis
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Arama */}
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-600/80" />
          <Input
            placeholder="Ofis adı, şehir veya e-posta ara…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-8 border-blue-600/40 focus:ring-0"
          />
          {search && (
            <Button variant="ghost" size="icon" className="absolute right-1 top-1.5 h-6 w-6"
              onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Tablo */}
        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-blue-600/80">Ofis</TableHead>
                <TableHead className="text-blue-600/80">Şehir</TableHead>
                <TableHead className="text-blue-600/80">Site</TableHead>
                <TableHead className="text-blue-600/80">Tamamlanma</TableHead>
                <TableHead className="text-blue-600/80">Kayıt Tarihi</TableHead>
                <TableHead className="text-blue-600/80 text-right">İşlem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.length > 0 ? pageItems.map((a) => (
                <TableRow key={a.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center shrink-0">
                        {a.logo
                          ? <Image src={a.logo} alt={a.name} width={40} height={40} className="w-full h-full object-cover" />
                          : <Building2 className="w-5 h-5 text-muted-foreground" />
                        }
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.slug}</p>
                        {a.primaryEmail && <p className="text-xs text-muted-foreground">{a.primaryEmail}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{a.city ?? "—"}</TableCell>
                  <TableCell>
                    <Badge variant={a.siteEnabled ? "default" : "secondary"} className="text-xs">
                      {a.siteEnabled ? "Yayında" : "Taslak"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 min-w-[80px]">
                      <Progress value={a.siteCompletion} className="h-1.5" />
                      <p className="text-xs text-muted-foreground">%{a.siteCompletion}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {format(new Date(a.createdAt), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button asChild variant="outline" size="icon" title="Web Sitesi">
                        <Link href={`/estate/agency/${a.id}`} target="_blank">
                          <Globe className="w-4 h-4 text-blue-600/80" />
                        </Link>
                      </Button>
                      {a.isOwn ? (
                        <>
                          <Button asChild variant="outline" size="icon" title="Site Düzenle">
                            <Link href={`/estate/agency/${a.id}/customize`}>
                              <Settings className="w-4 h-4 text-blue-600/80" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline" size="icon"
                            title="Sil"
                            onClick={() => handleDelete(a.id)}
                            disabled={deleting === a.id}
                            className="hover:border-red-400 hover:text-red-600"
                          >
                            {deleting === a.id
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : <Trash2 className="w-4 h-4" />}
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground self-center px-1" title="Bu ofisi siz oluşturmadınız">
                          Salt görüntüleme
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground text-sm">
                    {search ? "Eşleşen ofis bulunamadı." : "Kayıtlı ofis yok."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Sayfalama */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>
              {getPageNumbers().map((p, i) =>
                p === "e" ? (
                  <PaginationItem key={`e-${i}`}><PaginationEllipsis /></PaginationItem>
                ) : (
                  <PaginationItem key={`p-${p}`}>
                    <PaginationLink onClick={() => setPage(p as number)}
                      className={clsx("cursor-pointer", page === p && "bg-primary text-primary-foreground")}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))}
                  className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
}
