"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../../../components/ui/badge";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import ActionColumn from "../../../../components/DataTableColumns/ActionColumn";

export type AgentRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employeeId: string;
  designation: string;
  departmentName: string;
  commissionRate?: number | null;
  isActive: boolean;
  agencyName: string;
  createdAt: Date | string;
  _count?: { listings: number; contracts: number; visits: number };
};

export const columns: ColumnDef<AgentRow>[] = [
  {
    accessorKey: "name",
    header: "Danışman",
    cell: ({ row }) => {
      const a = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
            {a.firstName[0]}{a.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-sm">{a.firstName} {a.lastName}</p>
            <p className="text-xs text-muted-foreground">{a.employeeId}</p>
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
        <div>
          <p className="text-sm font-medium">{a.email}</p>
          <p className="text-xs text-muted-foreground">{a.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Ünvan / Departman",
    cell: ({ row }) => {
      const a = row.original;
      return (
        <div>
          <p className="text-sm font-medium">{a.designation}</p>
          <p className="text-xs text-muted-foreground">{a.departmentName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "commissionRate",
    header: "Komisyon",
    cell: ({ row }) => {
      const rate = row.original.commissionRate;
      return <span className="text-sm font-medium">{rate != null ? `%${rate}` : "—"}</span>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Durum",
    cell: ({ row }) => (
      <Badge variant={row.original.isActive ? "default" : "secondary"} className="text-xs">
        {row.original.isActive ? "Aktif" : "Pasif"}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Kayıt Tarihi",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        model="agent"
        editEndpoint={`/estate/dashboard/agents/edit/${row.original.id}`}
        id={row.original.id}
      />
    ),
  },
];
