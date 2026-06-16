"use client";

import { useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash2, Building2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button }                from "../../components/ui/button";
import { Checkbox }              from "../../components/ui/checkbox";
import { Input }                 from "../../components/ui/input";
import { Badge }                 from "../../components/ui/badge";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../../components/ui/table";
import { deleteAgencyContact } from "../../actions/contact";

type Contact = {
  id:         string;
  fullName:   string;
  email:      string;
  phone:      string;
  school:     string;  // agencyName
  country:    string;  // city
  schoolPage: string;  // agencyWebsite
  students:   number;  // agentCount
  role:       string;
  media:      string;
  message:    string;
  createdAt:  Date | string;
};

export default function AgencyContactsTable({ contacts }: { contacts: Contact[] }) {
  const [data, setData]         = useState<Contact[]>(contacts);
  const [sorting, setSorting]   = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await deleteAgencyContact(id);
      setData((prev) => prev.filter((c) => c.id !== id));
      toast.success("Kayıt silindi.");
    } catch {
      toast.error("Silinemedi.");
    } finally {
      setDeleting(null);
    }
  }

  const columns: ColumnDef<Contact>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} />
      ),
      enableSorting: false,
      enableHiding:  false,
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ad Soyad <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-sm">{row.original.fullName}</p>
          <p className="text-xs text-muted-foreground">{row.original.role}</p>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "İletişim",
      cell: ({ row }) => (
        <div>
          <p className="text-sm">{row.original.email}</p>
          <p className="text-xs text-muted-foreground">{row.original.phone}</p>
        </div>
      ),
    },
    {
      accessorKey: "school",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Ofis / Şehir <ArrowUpDown className="ml-1 h-3.5 w-3.5" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.school}</p>
          <p className="text-xs text-muted-foreground">{row.original.country}</p>
        </div>
      ),
    },
    {
      accessorKey: "students",
      header: () => <div className="text-right">Danışman</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Badge variant="secondary">{row.original.students}</Badge>
        </div>
      ),
    },
    {
      accessorKey: "media",
      header: "Kaynak",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{row.original.media || "—"}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Tarih",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(row.original.createdAt).toLocaleDateString("tr-TR")}
        </span>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const c = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(c.email)}
                className="cursor-pointer"
              >
                E-postayı Kopyala
              </DropdownMenuItem>
              {c.schoolPage && (
                <DropdownMenuItem asChild>
                  <a href={c.schoolPage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 cursor-pointer">
                    <ExternalLink className="w-3.5 h-3.5" /> Web Sitesi
                  </a>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href={`/estate/agency-onboarding`} className="flex items-center gap-2 cursor-pointer text-blue-600">
                  <Building2 className="w-3.5 h-3.5" /> Ofis Oluştur
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDelete(c.id)}
                disabled={deleting === c.id}
                className="text-red-600 cursor-pointer focus:text-red-600"
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                {deleting === c.id ? "Siliniyor…" : "Sil"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel:       getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel:     getSortedRowModel(),
    getFilteredRowModel:   getFilteredRowModel(),
  });

  return (
    <div className="space-y-3">
      {/* Arama + Kolon Görünürlüğü */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Ad, e-posta veya ofis ara…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kolonlar <ChevronDown className="ml-1 w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {table.getAllColumns().filter((c) => c.getCanHide()).map((c) => (
              <DropdownMenuCheckboxItem
                key={c.id}
                checked={c.getIsVisible()}
                onCheckedChange={(v) => c.toggleVisibility(!!v)}
              >
                {c.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tablo */}
      <div className="rounded-xl border overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="text-xs font-semibold uppercase text-muted-foreground">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground text-sm">
                  İletişim talebi bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Sayfalama */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} seçili
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Önceki
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  );
}
