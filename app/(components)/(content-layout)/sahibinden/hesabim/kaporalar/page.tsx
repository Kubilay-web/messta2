import { validateRequest } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import DepositsClient, { type DepositVM } from "../../components/deposits-client";

export const dynamic = "force-dynamic";

export default async function KaporalarPage() {
  const { user } = await validateRequest();
  if (!user) return null;

  const deposits = await prisma.shDeposit.findMany({
    where: { OR: [{ buyerId: user.id }, { sellerId: user.id }] },
    include: {
      listing: { select: { title: true } },
      buyer: { select: { displayName: true, name: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Karşı taraf isimleri için satıcı kullanıcıları toplu çek
  const sellerIds = Array.from(new Set(deposits.map((d) => d.sellerId)));
  const sellers = await prisma.user.findMany({
    where: { id: { in: sellerIds } },
    select: { id: true, displayName: true, name: true, username: true },
  });
  const sellerMap = new Map(sellers.map((s) => [s.id, s]));

  const vms: DepositVM[] = deposits.map((d) => {
    const side: "buyer" | "seller" = d.buyerId === user.id ? "buyer" : "seller";
    const seller = sellerMap.get(d.sellerId);
    const otherName =
      side === "buyer"
        ? seller?.displayName || seller?.name || seller?.username || "Satıcı"
        : d.buyer?.displayName || d.buyer?.name || d.buyer?.username || "Alıcı";
    return {
      id: d.id,
      listingId: d.listingId,
      listingTitle: d.listing?.title ?? "İlan",
      amount: d.amount,
      currency: d.currency,
      status: d.status,
      side,
      otherName,
      disputeReason: d.disputeReason ?? null,
      createdAt: d.createdAt.toISOString(),
    };
  });

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-gray-800">Kaporalar</h1>
      <p className="mb-4 text-sm text-gray-500">
        Emanetteki kaporaları serbest bırakabilir, iade edebilir veya anlaşmazlık açabilirsiniz.
      </p>
      <DepositsClient deposits={vms} />
    </div>
  );
}
