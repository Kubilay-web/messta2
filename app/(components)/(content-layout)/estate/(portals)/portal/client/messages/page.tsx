import { validateRequest } from "@/app/auth";
import { getClientFromUserId, getClientMessages } from "../../../../actions/client-portal";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import ClientMessagesUI from "./ClientMessagesUI";

export const metadata: Metadata = { title: "Mesajlar - Müşteri Portalı" };

export default async function ClientMessagesPage() {
  const { user } = await validateRequest();
  if (!user) redirect("/login");

  const client  = await getClientFromUserId(user.id);
  const role    = (user as any).roleGayrimenkul as string;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  if (!client && !isAdmin) redirect("/login");

  const messages = client ? await getClientMessages(client.agencyId) : [];

  return (
    <div className="w-full p-4 sm:p-6 space-y-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">Mesajlar &amp; Bildirimler</h1>
        <p className="text-sm text-black mt-1">
          {client?.firstName} {client?.lastName} — {client?.agencyName}
        </p>
      </div>
      <ClientMessagesUI messages={messages as any[]} />
    </div>
  );
}
