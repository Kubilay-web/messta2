import "server-only";

const PAYPAL_BASE =
  process.env.PAYPAL_API_BASE ??
  (process.env.NODE_ENV === "production"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com");

export const paypalEnabled = !!(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET);

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
  ).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("PayPal token alınamadı");
  return data.access_token;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export async function createPaypalOrder(amount: number, currency: string, paymentId: string) {
  const token = await getAccessToken();
  // PayPal TRY desteklemez — TRY ise USD'ye yaklaşık çeviri (demo)
  const payCurrency = currency === "TRY" ? "USD" : currency;
  const payAmount = currency === "TRY" ? Math.max(1, amount / 32).toFixed(2) : amount.toFixed(2);

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: paymentId,
          amount: { currency_code: payCurrency, value: payAmount },
          description: "Sahibinden Doping",
        },
      ],
      application_context: {
        brand_name: "sahibinden",
        user_action: "PAY_NOW",
        return_url: `${BASE}/sahibinden/doping/paypal-donus?paymentId=${paymentId}`,
        cancel_url: `${BASE}/sahibinden/hesabim/ilanlarim`,
      },
    }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.id) throw new Error("PayPal order oluşturulamadı");
  const approveUrl = (data.links ?? []).find((l: any) => l.rel === "approve")?.href as string | undefined;
  return { id: data.id as string, approveUrl };
}

export async function capturePaypalOrder(orderId: string) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  return res.json();
}
