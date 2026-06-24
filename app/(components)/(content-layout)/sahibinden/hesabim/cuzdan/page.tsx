import { validateRequest } from "@/app/auth";
import { getOrCreateWallet, listWalletTxns } from "../../wallet";
import { confirmStripeSession } from "../../lib/stripe-fulfill";
import WalletClient, { type TxnVM } from "../../components/wallet-client";

export const dynamic = "force-dynamic";

export default async function CuzdanPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; ok?: string }>;
}) {
  const { user } = await validateRequest();
  if (!user) return null;

  // Kart dönüşünde webhook'tan bağımsız doğrulama: ödeme tamamlandıysa bakiye yüklenir.
  const { session_id } = await searchParams;
  if (session_id) await confirmStripeSession(session_id);

  const wallet = await getOrCreateWallet(user.id);
  const txns = await listWalletTxns(user.id, 50);

  const txnVM: TxnVM[] = txns.map((t) => ({
    id: t.id,
    type: t.type,
    amount: t.amount,
    balanceAfter: t.balanceAfter,
    currency: t.currency,
    description: t.description,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-gray-800">Cüzdanım</h1>
      <WalletClient
        balance={wallet.balance}
        currency={wallet.currency}
        txns={txnVM}
        autoTopup={wallet.autoTopup}
        autoTopupThreshold={wallet.autoTopupThreshold}
        autoTopupAmount={wallet.autoTopupAmount}
      />
    </div>
  );
}
