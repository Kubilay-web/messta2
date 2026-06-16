import { getAllAgencyContacts } from "../../../actions/contact";
import AgencyContactsTable from "../../../components/agency/AgencyContactsTable";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İletişim Talepleri - Süper Panel" };

export default async function ContactsPage() {
  const contacts = await getAllAgencyContacts();

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">İletişim Talepleri</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sisteme ofis kayıt talebi gönderen firmalar.
        </p>
      </div>
      <AgencyContactsTable contacts={contacts as any[]} />
    </div>
  );
}
