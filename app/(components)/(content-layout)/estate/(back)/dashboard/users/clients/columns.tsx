"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import { PropertyClient } from "../../../../types/types";
import { Badge } from "../../../../components/ui/badge";

function clientTypeBadges(c: PropertyClient) {
  const types: string[] = [];
  if (c.isBuyer)    types.push("Alıcı");
  if (c.isSeller)   types.push("Satıcı");
  if (c.isTenant)   types.push("Kiracı");
  if (c.isLandlord) types.push("Kiraya Veren");
  return types;
}

export const columns: ColumnDef<PropertyClient>[] = [
  {
    accessorKey: "name",
    header: "Müşteri",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={c.imageUrl || "/management/images/realestate-logo.svg"}
            alt={c.firstName}
            width={36} height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-medium capitalize truncate max-w-[160px]">
              {c.title} {c.firstName} {c.lastName}
            </p>
            <p className="text-xs text-gray-400">{c.nationality}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "İletişim",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="min-w-0">
          <p className="text-sm truncate max-w-[180px]">{c.email}</p>
          <p className="text-xs text-gray-400">{c.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Tip",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {clientTypeBadges(row.original).map((t) => (
          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "budget",
    header: "Bütçe",
    cell: ({ row }) => {
      const c = row.original;
      if (!c.minBudget && !c.maxBudget) return <span className="text-gray-400 text-xs">—</span>;
      return (
        <p className="text-sm whitespace-nowrap">
          {c.minBudget?.toLocaleString("tr-TR")} –{" "}
          {c.maxBudget?.toLocaleString("tr-TR")}{" "}
          <span className="text-gray-400">{c.currency}</span>
        </p>
      );
    },
  },
  {
    accessorKey: "preferredCities",
    header: "Şehirler",
    cell: ({ row }) => {
      const cities = row.original.preferredCities;
      if (!cities?.length) return <span className="text-gray-400 text-xs">—</span>;
      return (
        <p className="text-sm truncate max-w-[140px]">
          {cities.join(", ")}
        </p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Kayıt Tarihi",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
];
