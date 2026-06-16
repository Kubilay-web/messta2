import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllAgencyUsers, deleteAgencyUser } from "../../../actions/agency-users";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import UsersTable from "./UsersTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Kullanıcılar - EstatePro" };

export default async function UsersPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency = await AgencyUser(user.id);
  const users  = await getAllAgencyUsers(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Ajans Kullanıcıları"
        linkTitle="Yeni Kullanıcı"
        href="/estate/dashboard/users/new"
        data={users}
        model="user"
        showImport={false}
      />
      <UsersTable users={users as any[]} />
    </div>
  );
}
