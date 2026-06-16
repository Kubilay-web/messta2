import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../actions/auth";
import { getAllContracts } from "../../../actions/contracts";
import TableHeader from "../../../components/dashboard/Tables/TableHeader";
import ContractTable from "./ContractTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Sözleşmeler - EstatePro" };

export default async function ContractsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency    = await AgencyUser(user.id);
  const contracts = await getAllContracts(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Sözleşmeler"
        linkTitle="Yeni Sözleşme"
        href="/estate/dashboard/contracts/new"
        data={contracts}
        model="contract"
        showImport={false}
      />
      <ContractTable contracts={contracts as any[]} />
    </div>
  );
}
