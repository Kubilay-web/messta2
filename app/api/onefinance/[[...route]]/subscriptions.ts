// import crypto from "crypto";
// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client";
// import {
//   createCheckout,
//   getSubscription,
// } from "@lemonsqueezy/lemonsqueezy.js";

// import { setupLemon } from "@/app/(components)/(content-layout)/finance/ls";
// import { validateRequest } from "@/app/auth";

// setupLemon();

// const prisma = new PrismaClient();
// const app = new Hono();

// /**
//  * GET /api/onefinance/subscriptions/current
//  */
// app.get("/current", async (c) => {
//   const { user } = await validateRequest();

//   if (!user) {
//     return c.json({ error: "Unauthorized" }, 401);
//   }

//   const subscription = await prisma.subscriptionFinance.findUnique({
//     where: { userId: user.id },
//   });

//   return c.json({ data: subscription });
// });

// /**
//  * POST /api/onefinance/subscriptions/checkout
//  */
// app.post("/checkout", async (c) => {
//   const { user } = await validateRequest();

//   if (!user) {
//     return c.json({ error: "Unauthorized" }, 401);
//   }

//   const existing = await prisma.subscriptionFinance.findUnique({
//     where: { userId: user.id },
//   });

//   if (existing?.subscriptionId) {
//     const subscription = await getSubscription(existing.subscriptionId);

//     const portalUrl =
//       subscription.data?.data.attributes.urls.customer_portal;

//     if (!portalUrl) {
//       return c.json({ error: "Internal error" }, 500);
//     }

//     return c.json({ data: portalUrl });
//   }

//   const checkout = await createCheckout(
//     process.env.LEMONSQUEEZY_STORE_ID!,
//     process.env.LEMONSQUEEZY_PRODUCT_ID!, // VARIANT ID
//     {
//       checkoutData: {
//         custom: {
//           user_id: user.id,
//         },
//       },
//       productOptions: {
//         redirectUrl: process.env.NEXT_PUBLIC_BASE_URL!,
//       },
//     }
//   );

//   if (!checkout?.data?.data) {
//     console.error("Checkout failed:", checkout);
//     return c.json({ error: "Checkout failed" }, 500);
//   }

//   return c.json({
//     data: checkout.data.data.attributes.url,
//   });
// });

// /**
//  * POST /api/onefinance/subscriptions/webhook
//  */
// app.post("/webhook", async (c) => {
//   const rawBody = await c.req.text();

//   // ✅ SIGNATURE VERIFICATION
//   const hmac = crypto.createHmac(
//     "sha256",
//     process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
//   );

//   const digest = Buffer.from(
//     hmac.update(rawBody).digest("hex"),
//     "hex"
//   );

//   const signature = Buffer.from(
//     c.req.header("x-signature") || "",
//     "hex"
//   );

//   if (
//     digest.length !== signature.length ||
//     !crypto.timingSafeEqual(digest, signature)
//   ) {
//     return c.json({ error: "Unauthorized" }, 401);
//   }

//   const payload = JSON.parse(rawBody);

//   const event = payload.meta.event_name;
//   const userId = payload.meta.custom_data?.user_id;

//   if (!userId) {
//     console.error("Missing user_id in webhook");
//     return c.json({ ok: false });
//   }

//   let subscriptionId: string | null = null;
//   let status: string | null = null;

//   // 🔹 subscription object events
//   if (event === "subscription_created" || event === "subscription_updated") {
//     subscriptionId = payload.data.id;
//     status = payload.data.attributes.status;
//   }

//   // 🔹 invoice → subscription
//   if (event === "subscription_payment_success") {
//     subscriptionId =
//       payload.data.attributes.subscription_id?.toString();
//     status = "active";
//   }

//   if (!subscriptionId || !status) {
//     return c.json({ ok: true });
//   }

//   const existing = await prisma.subscriptionFinance.findUnique({
//     where: { subscriptionId },
//   });

//   if (existing) {
//     await prisma.subscriptionFinance.update({
//       where: { subscriptionId },
//       data: { status },
//     });
//   } else {
//     await prisma.subscriptionFinance.create({
//       data: {
//         userId,
//         subscriptionId,
//         status,
//       },
//     });
//   }

//   return c.json({ ok: true });
// });

// export default app;
