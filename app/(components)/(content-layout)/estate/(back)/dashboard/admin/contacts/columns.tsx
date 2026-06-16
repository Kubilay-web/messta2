"use client";

import { ColumnDef } from "@tanstack/react-table";
import DateColumn from "../../../../components/DataTableColumns/DateColumn";
import ActionColumn from "../../../../components/DataTableColumns/ActionColumn";
import { Contact } from "../../../../types/types";
import ContactInfoModal from "../../../../components/DataTableColumns/ContactCard";
import { Badge } from "../../../../components/ui/badge";

const roleLabels: Record<string, string> = {
  owner: "Ofis Sahibi / GM",
  manager: "Yönetici",
  agent: "Danışman",
  it: "BT Sorumlusu",
  consultant: "Danışman / İş Ortağı",
  other: "Diğer",
};

const mediaLabels: Record<string, string> = {
  google: "Google",
  social_media: "Sosyal Medya",
  referral: "Referans",
  blog: "Blog",
  event: "Fuar / Etkinlik",
  other: "Diğer",
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "user",
    header: "Ad Soyad / Ofis",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="min-w-0">
          <p className="font-medium text-sm text-black truncate capitalize">
            {c.fullName}
          </p>
          <p className="text-xs text-gray-500 truncate">{c.school}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email-phone",
    header: "İletişim",
    cell: ({ row }) => {
      const c = row.original;
      return (
        <div className="min-w-0">
          <p className="text-sm text-black truncate">{c.email}</p>
          <p className="text-xs text-gray-500 truncate">{c.phone}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Şehir",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">{row.original.country}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Unvan",
    cell: ({ row }) => {
      const label = roleLabels[row.original.role] ?? row.original.role;
      return (
        <Badge variant="secondary" className="text-xs whitespace-nowrap">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "students",
    header: "Danışman",
    cell: ({ row }) => (
      <span className="text-sm text-gray-700 font-medium">
        {row.original.students}
      </span>
    ),
  },
  {
    accessorKey: "message",
    header: "Mesaj",
    cell: ({ row }) => (
      <p className="text-sm text-gray-700 line-clamp-2 max-w-[200px]">
        {row.original.message || <span className="text-gray-400">—</span>}
      </p>
    ),
  },
  {
    accessorKey: "view",
    header: "Detay",
    cell: ({ row }) => <ContactInfoModal contact={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Tarih",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionColumn
        row={row}
        model="contact"
        editEndpoint="#"
        id={row.original.id}
      />
    ),
  },
];
