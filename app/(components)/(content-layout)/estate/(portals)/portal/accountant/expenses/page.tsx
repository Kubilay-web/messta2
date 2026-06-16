import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../actions/auth";
import { getAllExpenses } from "../../../../actions/expenses";
import ExpenseTable from "../../../../(back)/dashboard/finance/expenses/ExpenseTable";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Giderler - Muhasebe Portalı" };

export default async function AccountantExpensesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  if (!agency) redirect("/login");

  const expenses = await getAllExpenses(agency.id);

  return (
    <div className="w-full p-2 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Giderler</h1>
        <p className="text-sm text-black mt-1">Ofis giderleri ve kategorileri.</p>
      </div>
      <ExpenseTable expenses={expenses as any[]} />
    </div>
  );
}
