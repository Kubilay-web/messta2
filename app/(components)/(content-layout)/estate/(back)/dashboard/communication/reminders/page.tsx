import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllReminders, getReminderRecipientCounts } from "../../../../actions/reminders";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import RemindersUI from "./RemindersUI";

export const metadata: Metadata = { title: "Hatırlatıcılar - EstatePro" };

export default async function RemindersPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [reminders, counts] = await Promise.all([
    getAllReminders(agencyId),
    getReminderRecipientCounts(agencyId),
  ]);

  return (
    <div className="w-full p-2 sm:p-6 space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Hatırlatıcılar & Toplu E-posta</h1>
        <p className="text-sm text-black mt-1">
          Danışman ve müşterilere e-posta gönderin.
        </p>
      </div>
      <RemindersUI
        agencyId={agencyId}
        reminders={reminders as any[]}
        counts={counts}
      />
    </div>
  );
}
