"use client";

import { ColumnDef } from "@tanstack/react-table";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import { AgencyDepartment } from "../../../../types/types";
import { Badge } from "../../../../components/ui/badge";
import { Users } from "lucide-react";

export const columns: ColumnDef<AgencyDepartment>[] = [
  {
    accessorKey: "name",
    header: "Departman Adı",
    cell: ({ row }) => (
      <p className="font-semibold text-sm text-black">{row.original.name}</p>
    ),
  },
  {
    accessorKey: "manager",
    header: "Yönetici",
    cell: ({ row }) => {
      const d = row.original;
      return d.managerName ? (
        <div className="min-w-0">
          <p className="text-sm text-black font-medium truncate">{d.managerName}</p>
          {d.managerStartDate && (
            <p className="text-xs text-black">
              {new Date(d.managerStartDate).toLocaleDateString("tr-TR")}
            </p>
          )}
        </div>
      ) : (
        <span className="text-xs text-black">—</span>
      );
    },
  },
  {
    accessorKey: "agents",
    header: "Danışman",
    cell: ({ row }) => {
      const count = (row.original as any)._count?.agents ?? 0;
      return (
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-blue-600" />
          <Badge variant="secondary" className="text-xs text-black">{count} danışman</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: "Bütçe",
    cell: ({ row }) => {
      const d = row.original;
      return d.budget ? (
        <div className="min-w-0">
          <p className="text-sm text-black font-medium">
            ₺{d.budget.toLocaleString("tr-TR")}
          </p>
          {d.budgetYear && <p className="text-xs text-black">{d.budgetYear}</p>}
        </div>
      ) : (
        <span className="text-xs text-black">—</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Oluşturulma",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
];
