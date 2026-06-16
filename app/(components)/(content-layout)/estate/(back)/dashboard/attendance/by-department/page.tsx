import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAgencyDepartmentsWithAgents } from "../../../../actions/agent-attendance";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AgentAttendanceListing from "./components/AgentAttendanceListing";

export const metadata: Metadata = { title: "Departmana Göre Devam - EstatePro" };

export default async function ByDepartmentPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency      = await AgencyUser(user.id);
  const departments = await getAgencyDepartmentsWithAgents(agency?.id ?? "");

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Departmana Göre Devam Takibi</h1>
        <p className="text-black mt-1 text-sm">
          Departman ve tarih seçerek danışmanların günlük devam durumunu görüntüleyin ve işaretleyin.
        </p>
      </div>
      <AgentAttendanceListing departments={departments as any[]} />
    </div>
  );
}
