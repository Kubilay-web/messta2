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

export async function createPaypalOrder(
  amount: number,
  currency: string,
  paymentId: string,
  opts?: { returnPath?: string; cancelPath?: string; description?: string },
) {
  const token = await getAccessToken();
  // PayPal TRY desteklemez — TRY ise USD'ye yaklaşık çeviri (demo)
  const payCurrency = currency === "TRY" ? "USD" : currency;
  const payAmount = currency === "TRY" ? Math.max(1, amount / 32).toFixed(2) : amount.toFixed(2);

  const returnPath = opts?.returnPath ?? `/sahibinden/doping/paypal-donus?paymentId=${paymentId}`;
  const cancelPath = opts?.cancelPath ?? `/sahibinden/hesabim/ilanlarim`;

  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: paymentId,
          amount: { currency_code: payCurrency, value: payAmount },
          description: opts?.description ?? "Sahibinden Doping",
        },
      ],
      application_context: {
        brand_name: "sahibinden",
        user_action: "PAY_NOW",
        return_url: `${BASE}${returnPath}`,
        cancel_url: `${BASE}${cancelPath}`,
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

// ---------------------------------------------------------------------------
//  PayPal Subscriptions (tekrarlayan ödeme)
// ---------------------------------------------------------------------------

type PpInterval = "DAY" | "WEEK" | "MONTH" | "YEAR";

/** PayPal TRY desteklemediği için tutarı PayPal'ın kabul ettiği para birimine çevirir. */
function payValue(amount: number, currency: string) {
  const payCurrency = currency === "TRY" ? "USD" : currency;
  const value = currency === "TRY" ? Math.max(1, amount / 32) : amount;
  return { payCurrency, value: value.toFixed(2) };
}

/**
 * Bir ShPlan için PayPal ürün + billing plan oluşturur (yoksa) ve plan id döndürür.
 * Çağıran, dönen id'yi ShPlan.paypalPlanId olarak saklamalı.
 */
export async function createPaypalBillingPlan(input: {
  name: string;
  price: number;
  currency: string;
  interval: PpInterval;
  intervalCount: number;
  trialDays?: number;
}): Promise<string> {
  const token = await getAccessToken();
  const { payCurrency, value } = payValue(input.price, input.currency);

  // 1) Ürün
  const productRes = await fetch(`${PAYPAL_BASE}/v1/catalogs/products`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name: input.name, type: "SERVICE", category: "SOFTWARE" }),
    cache: "no-store",
  });
  const product = await productRes.json();
  if (!product.id) throw new Error("PayPal ürün oluşturulamadı");

  // 2) Billing plan
  const billingCycles: any[] = [];
  if (input.trialDays && input.trialDays > 0) {
    billingCycles.push({
      frequency: { interval_unit: "DAY", interval_count: input.trialDays },
      tenure_type: "TRIAL",
      sequence: billingCycles.length + 1,
      total_cycles: 1,
      pricing_scheme: { fixed_price: { value: "0", currency_code: payCurrency } },
    });
  }
  billingCycles.push({
    frequency: { interval_unit: input.interval, interval_count: input.intervalCount },
    tenure_type: "REGULAR",
    sequence: billingCycles.length + 1,
    total_cycles: 0, // süresiz
    pricing_scheme: { fixed_price: { value, currency_code: payCurrency } },
  });

  const planRes = await fetch(`${PAYPAL_BASE}/v1/billing/plans`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: product.id,
      name: input.name,
      billing_cycles: billingCycles,
      payment_preferences: {
        auto_bill_outstanding: true,
        setup_fee_failure_action: "CONTINUE",
        payment_failure_threshold: 2,
      },
    }),
    cache: "no-store",
  });
  const plan = await planRes.json();
  if (!plan.id) throw new Error("PayPal plan oluşturulamadı");
  return plan.id as string;
}

/** Bir PayPal aboneliği başlatır; onay (approve) linkini döndürür. */
export async function createPaypalSubscription(input: {
  planId: string; // PayPal plan id (P-…)
  localSubId: string; // ShSubscription.id → custom_id
  returnUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; approveUrl?: string }> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      plan_id: input.planId,
      custom_id: input.localSubId,
      application_context: {
        brand_name: "sahibinden",
        user_action: "SUBSCRIBE_NOW",
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!data.id) throw new Error("PayPal abonelik oluşturulamadı");
  const approveUrl = (data.links ?? []).find((l: any) => l.rel === "approve")?.href as
    | string
    | undefined;
  return { id: data.id as string, approveUrl };
}

/**
 * Gelen PayPal webhook'unun gerçekten PayPal'dan geldiğini doğrular.
 * PAYPAL_WEBHOOK_ID tanımlı değilse (geliştirme) doğrulama atlanır.
 * Üretimde mutlaka PAYPAL_WEBHOOK_ID tanımlanmalı.
 */
export async function verifyPaypalWebhook(
  headers: {
    authAlgo?: string | null;
    certUrl?: string | null;
    transmissionId?: string | null;
    transmissionSig?: string | null;
    transmissionTime?: string | null;
  },
  rawBody: string,
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    // Üretimde imzasız kabul güvenlik açığıdır — uyar.
    if (process.env.NODE_ENV === "production") {
      console.warn("[paypal] PAYPAL_WEBHOOK_ID tanımsız — webhook doğrulanamıyor!");
      return false;
    }
    return true;
  }
  if (
    !headers.authAlgo ||
    !headers.certUrl ||
    !headers.transmissionId ||
    !headers.transmissionSig ||
    !headers.transmissionTime
  ) {
    return false;
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        auth_algo: headers.authAlgo,
        cert_url: headers.certUrl,
        transmission_id: headers.transmissionId,
        transmission_sig: headers.transmissionSig,
        transmission_time: headers.transmissionTime,
        webhook_id: webhookId,
        webhook_event: JSON.parse(rawBody),
      }),
      cache: "no-store",
    });
    const data = await res.json();
    return data?.verification_status === "SUCCESS";
  } catch {
    return false;
  }
}

/** PayPal aboneliğini iptal eder. */
export async function cancelPaypalSubscription(subId: string, reason = "Kullanıcı iptali") {
  const token = await getAccessToken();
  await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions/${subId}/cancel`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
    cache: "no-store",
  });
}
