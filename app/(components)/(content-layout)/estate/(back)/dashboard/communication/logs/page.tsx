import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllCommLogs } from "../../../../actions/communication-logs";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import CommLogTable from "./CommLogTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "İletişim Kayıtları - EstatePro" };

export default async function CommLogsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const logs   = await getAllCommLogs(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="İletişim Kayıtları"
        linkTitle="Yeni Kayıt"
        href="/estate/dashboard/communication/logs/new"
        data={logs}
        model="comm-log"
        showImport={false}
      />
      <CommLogTable logs={logs as any[]} />
    </div>
  );
}
