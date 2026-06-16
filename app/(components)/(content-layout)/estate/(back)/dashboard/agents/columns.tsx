"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DateColumn from "../../../components/DataTableColumns/DateColumn";
import { Agent } from "../../../types/types";
import { Badge } from "../../../components/ui/badge";

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Danışman",
    cell: ({ row }) => {
      const a = row.original;
      return (
        <div className="flex items-center gap-2">
          <Image
            src={a.imageUrl || "/management/images/realestate-logo.svg"}
            alt={a.firstName}
            width={36} height={36}
            className="w-9 h-9 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-semibold text-sm text-black truncate capitalize">
              {a.title} {a.firstName} {a.lastName}
            </p>
            <p className="text-xs text-black">{a.employeeId}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "İletişim",
    cell: ({ row }) => {
      const a = row.original;
      return (
        <div className="min-w-0">
          <p className="text-sm text-black truncate">{a.email}</p>
          <p className="text-xs text-black">{a.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Pozisyon",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="text-sm text-black font-medium">{row.original.designation}</p>
        <p className="text-xs text-black">{row.original.departmentName}</p>
      </div>
    ),
  },
  {
    accessorKey: "commission",
    header: "Komisyon",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs text-black">
        %{row.original.commissionRate ?? 2.5}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Durum",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActive ? "default" : "secondary"}
        className="text-xs"
      >
        {row.original.isActive ? "Aktif" : "Pasif"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Kayıt Tarihi",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
];
