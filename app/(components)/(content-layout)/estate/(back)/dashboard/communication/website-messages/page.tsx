import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgencyContactMessages } from "../../../../actions/website-messages";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AgencyMessagesTable from "./messages-table";

export const metadata: Metadata = { title: "Web Sitesi Mesajları - EstatePro" };

export default async function WebsiteMessagesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const messages = await getAllAgencyContactMessages(agency?.id ?? "");

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Web Sitesi Mesajları</h1>
        <p className="text-sm text-black mt-1">
          Ajans web sitenizden gelen iletişim formu mesajları.
        </p>
      </div>
      <AgencyMessagesTable messages={messages as any[]} />
    </div>
  );
}
