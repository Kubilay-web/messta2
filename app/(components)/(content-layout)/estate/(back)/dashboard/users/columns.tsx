"use client";

import Image from "next/image";

import DateColumn from "../../../components/DataTableColumns/DateColumn";




import { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "../../../components/DataTableColumns/ActionColumn";
import { Parent, Staff } from "../../../types/types";

import { ParentInfoModal } from "../../../components/dashboard/modals/parent-info-modal";
export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div className="flex items-center gap-1">
          <Image
            src={staff.image}
            alt={staff.name}
            width={512}
            height={512}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-base">
              {staff.name.toLowerCase()}
            </h2>
            <p className="text-xs text-muted-foreground">{staff.role}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email-phone",
    header: "Contact",
    cell: ({ row }) => {
      const staff = row.original;
      return (
        <div>
          <h2 className="font-medium text-base">{staff.email.toLowerCase()}</h2>
          <p className="text-xs text-muted-foreground">{staff.phone}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      return (
        <ActionColumn
          row={row}
          model="contact"
          editEndpoint={`#`}
          id={contact.id}
        />
      );
    },
  },
];
