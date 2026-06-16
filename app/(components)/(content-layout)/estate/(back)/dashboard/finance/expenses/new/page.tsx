import { validateRequest } from "@/app/auth";
import { AgencyUser } from "../../../../../actions/auth";
import { getAllAgents } from "../../../../../actions/agents";
import { Card, CardContent } from "../../../../../components/ui/card";
import ExpenseForm from "../../../../../components/dashboard/forms/expenses/expense-form";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Yeni Gider - EstatePro" };

export default async function NewExpensePage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const agency   = await AgencyUser(user.id);
  const agencyId = agency?.id ?? "";
  const agents   = await getAllAgents(agencyId);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      <Card className="border-t-4 border-blue-600 shadow">
        <CardContent className="p-4 sm:p-6">
          <ExpenseForm agents={agents as any[]} agencyId={agencyId} />
        </CardContent>
      </Card>
    </div>
  );
}
