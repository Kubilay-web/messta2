import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getTodayAttendanceOverview } from "../../../actions/agent-attendance";
import { getPendingLeaveCount } from "../../../actions/agent-leaves";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import AttendanceDashboard from "./components/AttendanceDashboard";

export const metadata: Metadata = { title: "Devam Takibi - EstatePro" };

export default async function AttendancePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";

  const [overview, pendingLeaves] = await Promise.all([
    getTodayAttendanceOverview(agencyId),
    getPendingLeaveCount(agencyId),
  ]);

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Devam Takibi</h1>
        <p className="text-sm text-black mt-1">
          {new Date().toLocaleDateString("tr-TR", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      </div>
      <AttendanceDashboard data={overview as any} pendingLeaves={pendingLeaves} />
    </div>
  );
}
