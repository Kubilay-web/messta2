import React from "react";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import { getAllAgencyContacts } from "../../../../actions/contact";
import { columns } from "./columns";
import ResponsiveTable from "./ResponsiveTable";

export default async function ContactsPage() {
  const contacts = await getAllAgencyContacts();

  return (
    <div className="w-full min-w-0 px-3 sm:px-4 md:px-0">
      <TableHeader
        title="Demo Talepleri"
        linkTitle="Yeni Talep"
        href="/estate/contact-us"
        data={contacts}
        model="contact"
      />

      <ResponsiveTable data={contacts} columns={columns} />
    </div>
  );
}
