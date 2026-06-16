import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getClientPayments } from "../../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ClientPaymentsUI from "./ClientPaymentsUI";

export const metadata: Metadata = { title: "Ödeme Planlarım - Müşteri Portalı" };

export default async function ClientPaymentsPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client  = await getClientFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!client && !isAdmin) redirect("/login");

  const payments = client ? await getClientPayments(client.id) : [];

  return (
    <div className="w-full p-4 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Ödeme Planlarım</h1>
        <p className="text-sm text-black mt-1">
          {client?.firstName} {client?.lastName} — {client?.agencyName}
        </p>
      </div>
      <ClientPaymentsUI payments={payments as any[]} />
    </div>
  );
}
