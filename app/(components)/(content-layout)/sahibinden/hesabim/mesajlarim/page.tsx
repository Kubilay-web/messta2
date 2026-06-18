import { validateRequest } from "@/app/auth";
import { getUserConversations } from "../../data";
import MessagesClient, { type ConvDTO } from "../../components/messages-client";

export const dynamic = "force-dynamic";

export default async function MesajlarimPage() {
  const { user } = await validateRequest();
  if (!user) return null;

  const conversations = await getUserConversations(user.id);

  const dto: ConvDTO[] = conversations.map((c) => ({
    key: c.key,
    listingId: c.listing?.id ?? "",
    listingTitle: c.listing?.title ?? "İlan",
    listingImage: c.listing?.images?.[0] ?? null,
    listingPrice: c.listing?.price ?? 0,
    listingCurrency: c.listing?.currency ?? "TRY",
    otherId: c.other.id,
    otherName: c.other.displayName || c.other.username || "Üye",
    otherAvatar: c.other.avatarUrl ?? null,
    unread: c.unread,
    messages: c.messages
      .slice()
      .reverse()
      .map((m: any) => ({
        id: m.id,
        content: m.content,
        mine: m.senderId === user.id,
        createdAt: new Date(m.createdAt).toISOString(),
        isRead: m.isRead,
      })),
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Mesajlarım</h1>
      <MessagesClient conversations={dto} currentUserId={user.id} />
    </div>
  );
}
