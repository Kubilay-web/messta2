import { validateRequest } from "@/app/auth";
import {
  getClientFromUserId,
  getClientContracts,
  getClientVisits,
} from "../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ClientDashboard from "./ClientDashboard";

export const metadata: Metadata = { title: "Müşteri Portalı - EstatePro" };

export default async function ClientPortalPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client  = await getClientFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!client && !isAdmin) redirect("/login");

  const [contracts, visits] = client
    ? await Promise.all([getClientContracts(client.id), getClientVisits(client.id)])
    : [[], []];

  if (!client) return (
    <div className="max-w-xl mx-auto p-8 text-center text-muted-foreground">
      <p className="text-lg font-semibold">Müşteri profili bulunamadı.</p>
      <p className="text-sm mt-1">Bu hesaba bağlı bir müşteri kaydı yok.</p>
    </div>
  );

  return (
    <div className="w-full p-4 sm:p-6 space-y-6">
      <ClientDashboard
        client={client as any}
        contracts={contracts as any[]}
        visits={visits as any[]}
      />
    </div>
  );
}
