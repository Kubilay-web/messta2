"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../../../components/ui/badge";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import ActionColumn from "../../../../components/DataTableColumns/ActionColumn";

export type PropertyClientRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  occupation?: string | null;
  isBuyer: boolean;
  isSeller: boolean;
  isTenant: boolean;
  isLandlord: boolean;
  agencyName: string;
  createdAt: Date | string;
};

function ClientRoles({ c }: { c: PropertyClientRow }) {
  const roles = [
    c.isBuyer    && "Alıcı",
    c.isSeller   && "Satıcı",
    c.isTenant   && "Kiracı",
    c.isLandlord && "K.Veren",
  ].filter(Boolean) as string[];

  if (!roles.length) return <span className="text-muted-foreground text-xs">—</span>;
  return (
    <div className="flex flex-wrap gap-1">
      {roles.map((r) => (
        <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
      ))}
    </div>
  );
}

export const columns: ColumnDef<PropertyClientRow>[] = [
  {
    accessorKey: "name",
    header: "Müşteri",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 shrink-0">
            {c.firstName[0]}{c.lastName[0]}
          </div>
          <div>
            <p className="font-semibold text-sm">{c.firstName} {c.lastName}</p>
            <p className="text-xs text-muted-foreground">{c.nationality}</p>
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
        <div>
          <p className="text-sm font-medium">{c.email}</p>
          <p className="text-xs text-muted-foreground">{c.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Rol",
    cell: ({ row }) => <ClientRoles c={row.original} />,
  },
  {
    accessorKey: "agencyName",
    header: "Ofis",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.agencyName}</span>
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
        model="client"
        editEndpoint={`/estate/dashboard/users/clients/edit/${row.original.id}`}
        id={row.original.id}
      />
    ),
  },
];
