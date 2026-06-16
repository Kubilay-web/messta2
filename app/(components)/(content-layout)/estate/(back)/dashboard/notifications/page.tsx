import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllNotifications } from "../../../actions/notifications";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import NotificationList from "./NotificationList";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Bildirimler - EstatePro" };

export default async function NotificationsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency        = await AgencyUser(user.id);
  const agencyId      = agency?.id ?? "";
  const notifications = await getAllNotifications(agencyId);

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Bildirimler"
        linkTitle="Yeni Bildirim"
        href="/estate/dashboard/notifications/new"
        data={notifications}
        model="notification"
        showImport={false}
      />
      <NotificationList notifications={notifications as any[]} agencyId={agencyId} />
    </div>
  );
}
