import Link from "next/link";
import { capturePaypalOrder } from "../../lib/paypal";
import { fulfillBookingPayment } from "../../rentals";

export const dynamic = "force-dynamic";

export default async function RentalPaypalDonusPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; paymentId?: string; bookingId?: string }>;
}) {
  const { token, paymentId } = await searchParams;
  let ok = false;
  let message = "Ödeme doğrulanıyor...";

  if (token && paymentId) {
    try {
      const capture = await capturePaypalOrder(token);
      if (capture?.status === "COMPLETED") {
        const res = await fulfillBookingPayment(paymentId, "paypal", token);
        ok = res.ok;
        message = ok
          ? "Ödemeniz alındı, rezervasyonunuz oluşturuldu!"
          : res.error ?? "İşlem zaten tamamlanmış.";
      } else {
        message = "PayPal ödemesi tamamlanmadı.";
      }
    } catch {
      message = "PayPal ödemesi doğrulanamadı.";
    }
  } else {
    message = "Geçersiz istek.";
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-5xl">{ok ? "🎉" : "ℹ️"}</p>
        <h1 className="mt-4 text-xl font-bold text-gray-800">{ok ? "Rezervasyon Alındı" : "Bilgi"}</h1>
        <p className="mt-2 text-sm text-gray-500">{message}</p>
        <Link
          href="/sahibinden/hesabim/rezervasyonlarim"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Rezervasyonlarım
        </Link>
      </div>
    </div>
  );
}
