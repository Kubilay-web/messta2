// app/api/company/paypalpayment/[id]/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // 1. Get the plan from database
    const plan = await db.plan.findUnique({
      where: { id },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // 2. Get PayPal access token
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString("base64");

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

    // 3. Create PayPal order
    const orderResponse = await fetch(
      `${process.env.PAYPAL_ENVIRONMENT === "production" ? "https://api.paypal.com" : "https://api-m.sandbox.paypal.com"}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.access_token}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: plan.id,
              description: `Subscription to ${plan.leble} plan`,
              amount: {
                currency_code: "USD",
                value: plan.price.toString(),
              },
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/jobs/paypal/success?planId=${plan.id}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/home/jobs/paypal/cancel`,
            brand_name: "Your Job Portal",
            user_action: "PAY_NOW",
          },
        }),
      },
    );

    const orderData = await orderResponse.json();
    const approvalLink = orderData.links.find(
      (link: any) => link.rel === "approve",
    )?.href;

    if (!approvalLink) {
      throw new Error("No approval link found in PayPal response");
    }

    return NextResponse.json({
      success: true,
      approvalUrl: approvalLink,
      paypalOrderId: orderData.id,
    });
  } catch (error: any) {
    console.error("PayPal payment error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Payment processing failed",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: 500 },
    );
  }
}
