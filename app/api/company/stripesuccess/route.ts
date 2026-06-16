import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import db from "@/app/lib/db";
import { validateRequest } from "@/app/auth";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  const { sessionid } = await req.json();
  const { user } = await validateRequest();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stripesession =
      await stripeInstance.checkout.sessions.retrieve(sessionid);

    if (stripesession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 },
      );
    }

    const planId = stripesession.metadata?.product_id!;
    const plan = await db.plan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error("Plan not found");

    const company = await db.company.findUnique({
      where: { userId: user?.id },
    });
    if (!company) throw new Error("Company not found");

    const order = await db.orderJob.create({
      data: {
        company_id: company.id,
        plan_id: plan.id,
        package_name: plan.leble,
        transaction_id: sessionid,
        order_id: uuidv4(),
        payment_provider: "Stripe",
        amount: stripesession.amount_total!.toString(),
        paid_in_currency: stripesession.currency!,
        default_amount: plan.price.toString(),
        payment_status: "paid",
      },
    });

    const existing = await db.userplan.findFirst({
      where: { company_id: company.id },
    });

    if (existing) {
      await db.userplan.update({
        where: { id: existing.id },
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

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error processing payment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
