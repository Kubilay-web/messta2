import Link from "next/link";
import { stripe } from "../../lib/stripe";
import { fulfillDopingPayment } from "../../payments";

export const dynamic = "force-dynamic";

export default async function DopingBasariliPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let ok = false;
  let message = "Ödeme doğrulanıyor...";

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === "paid" && session.metadata?.paymentId) {
        const res = await fulfillDopingPayment(session.metadata.paymentId, "stripe", session.id);
        ok = res.ok;
        message = ok ? "Doping başarıyla uygulandı!" : "İşlem zaten tamamlanmış.";
      } else {
        message = "Ödeme henüz tamamlanmamış.";
      }
    } catch {
      message = "Ödeme doğrulanamadı.";
    }
  } else {
    message = "Geçersiz istek.";
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-5xl">{ok ? "🎉" : "ℹ️"}</p>
        <h1 className="mt-4 text-xl font-bold text-gray-800">
          {ok ? "Ödemeniz Alındı" : "Bilgi"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <Link
          href="/sahibinden/hesabim/ilanlarim"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          İlanlarıma Dön
        </Link>
      </div>
    </div>
  );
}
