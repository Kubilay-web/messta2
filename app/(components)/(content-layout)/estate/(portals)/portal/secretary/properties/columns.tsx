"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../../../components/ui/badge";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import ActionColumn from "../../../../components/DataTableColumns/ActionColumn";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { Eye } from "lucide-react";

const propertyTypeLabel: Record<string, string> = {
  APARTMENT: "Daire", HOUSE: "Müstakil Ev", VILLA: "Villa",
  OFFICE: "Ofis", SHOP: "Dükkan", LAND: "Arsa",
  WAREHOUSE: "Depo", BUILDING: "Bina",
};

const statusLabel: Record<string, string> = {
  AVAILABLE: "Müsait", SOLD: "Satıldı", RENTED: "Kiralandı",
  UNDER_CONTRACT: "Sözleşmede", UNDER_MAINTENANCE: "Bakımda",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: "default",
  SOLD: "destructive",
  RENTED: "secondary",
  UNDER_CONTRACT: "outline",
  UNDER_MAINTENANCE: "outline",
};

export type PropertyRow = {
  id: string;
  title: string;
  city: string;
  district: string;
  propertyType: string;
  status: string;
  price?: number | null;
  currency: string;
  grossArea?: number | null;
  roomCount?: string | null;
  agencyName: string;
  createdAt: Date | string;
  _count?: { listings: number; visits: number; contracts: number };
};

export const columns: ColumnDef<PropertyRow>[] = [
  {
    accessorKey: "title",
    header: "Mülk",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div>
          <p className="font-semibold text-sm">{p.title}</p>
          <p className="text-xs text-muted-foreground">{p.city} / {p.district}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "propertyType",
    header: "Tip",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {propertyTypeLabel[row.original.propertyType] ?? row.original.propertyType}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Durum",
    cell: ({ row }) => (
      <Badge variant={statusVariant[row.original.status] ?? "outline"} className="text-xs">
        {statusLabel[row.original.status] ?? row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Fiyat",
    cell: ({ row }) => {
      const p = row.original;
      if (!p.price) return <span className="text-muted-foreground text-xs">—</span>;
      return (
        <span className="text-sm font-medium">
          {p.price.toLocaleString("tr-TR")} {p.currency}
        </span>
      );
    },
  },
  {
    accessorKey: "area",
    header: "Alan / Oda",
    cell: ({ row }) => {
      const p = row.original;
      return (
        <div className="text-sm">
          {p.grossArea ? `${p.grossArea} m²` : "—"}
          {p.roomCount && <p className="text-xs text-muted-foreground">{p.roomCount}</p>}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Eklenme",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    accessorKey: "view",
    header: "Detay",
    cell: ({ row }) => (
      <Button asChild size="icon" variant="outline" className="h-8 w-8">
        <Link href={`/estate/portal/secretary/properties/view/${row.original.id}`}>
          <Eye className="w-3.5 h-3.5" />
        </Link>
      </Button>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        model="property"
        editEndpoint={`/estate/dashboard/properties/edit/${row.original.id}`}
        id={row.original.id}
      />
    ),
  },
];
