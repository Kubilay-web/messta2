// app/api/payments/paypal/route.ts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

export async function POST(req: Request) {
  const { token } = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Verify PayPal payment
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString("base64");

    // Get access token
    const tokenResponse = await fetch(
      `${process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api.paypal.com" : "https://api-m.sandbox.paypal.com"}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${auth}`,
        },
        body: "grant_type=client_credentials",
      },
    );

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error("Failed to get PayPal access token");
    }

    // Capture payment
    const captureResponse = await fetch(
      `${process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api.paypal.com" : "https://api-m.sandbox.paypal.com"}/v2/checkout/orders/${token}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      },
    );

    const captureData = await captureResponse.json();

    if (captureData.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 },
      );
    }

    // 2. Process payment data
    const planId = captureData.purchase_units[0].reference_id;
    const amount =
      captureData.purchase_units[0].payments.captures[0].amount.value;
    const currency =
      captureData.purchase_units[0].payments.captures[0].amount.currency_code;

    // 3. Get plan and company
    const plan = await db.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error("Plan not found");

    const company = await db.company.findUnique({
      where: { userId: user.id },
    });
    if (!company) throw new Error("Company not found");

    // 4. Check if order already exists
    let order = await db.orderJob.findFirst({
      where: {
        company_id: company.id,
        plan_id: plan.id,
        payment_provider: "PayPal",
      },
    });

    if (order) {
      // If the order exists, update it
      order = await db.orderJob.update({
        where: { id: order.id },
        data: {
          transaction_id: captureData.id,
          order_id: uuidv4(),
          amount: amount.toString(),
          paid_in_currency: currency,
          default_amount: plan.price.toString(),
          payment_status: "paid",
        },
      });
    } else {
      // If no order exists, create a new one
      order = await db.orderJob.create({
        data: {
          company_id: company.id,
          plan_id: plan.id,
          package_name: plan.leble,
          transaction_id: captureData.id,
          order_id: uuidv4(),
          payment_provider: "PayPal",
          amount: amount.toString(),
          paid_in_currency: currency,
          default_amount: plan.price.toString(),
          payment_status: "paid",
        },
      });
    }

    // 5. Update or create user plan
    const existingUserPlan = await db.userplan.findFirst({
      where: { company_id: company.id },
    });

    if (existingUserPlan) {
      await db.userplan.update({
        where: { id: existingUserPlan.id },
        data: {
          plan_id: plan.id,
          profile_verify: plan.profileverify ? 1 : 0,
          job_limit: { increment: plan.joblimit },
          featured_job_limit: { increment: plan.featuredjoblimit },
          highlight_job_limit: { increment: plan.highlightjoblimit },
        },
      });
    } else {
      await db.userplan.create({
        data: {
          company_id: company.id,
          plan_id: plan.id,
          profile_verify: plan.profileverify ? 1 : 0,
          job_limit: plan.joblimit,
          featured_job_limit: plan.featuredjoblimit,
          highlight_job_limit: plan.highlightjoblimit,
        },
      });
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("PayPal payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed" },
      { status: 500 },
    );
  }
}
