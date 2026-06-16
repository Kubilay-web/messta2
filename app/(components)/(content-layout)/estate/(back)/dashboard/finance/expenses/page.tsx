import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllExpenses } from "../../../../actions/expenses";
import TableHeader from "../../../../components/dashboard/Tables/TableHeader";
import ExpenseTable from "./ExpenseTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Giderler - EstatePro" };

export default async function ExpensesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const expenses = await getAllExpenses(agency?.id ?? "");

  return (
    <div className="w-full space-y-4 p-2 sm:p-4">
      <TableHeader
        title="Giderler"
        linkTitle="Yeni Gider"
        href="/estate/dashboard/finance/expenses/new"
        data={expenses}
        model="expense"
        showImport={false}
      />
      <ExpenseTable expenses={expenses as any[]} />
    </div>
  );
}
