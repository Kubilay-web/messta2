import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllAgencyLogs } from "../../../actions/agency-logs";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AgencyLogsUI from "./AgencyLogsUI";

export const metadata: Metadata = { title: "Aktivite Logları - EstatePro" };

export default async function LogsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const logs   = await getAllAgencyLogs(agency?.id ?? "");

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Aktivite Logları</h1>
        <p className="text-sm text-black mt-1">Son 200 ajans aktivite kaydı.</p>
      </div>
      <AgencyLogsUI logs={logs as any[]} agencyId={agency?.id ?? ""} />
    </div>
  );
}
