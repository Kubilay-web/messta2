import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllAgencyDepartments } from "../../../../actions/agencyDepartments";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import DepartmentTable from "./DepartmentTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Departmanlar - EstatePro" };

export default async function DepartmentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency      = await AgencyUser(user.id);
  const departments = await getAllAgencyDepartments(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Departmanlar"
        linkTitle="Yeni Departman"
        href="/estate/dashboard/users/departments/new"
        data={departments}
        model="department"
      />
      <DepartmentTable departments={departments as any[]} />
    </div>
  );
}
