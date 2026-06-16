import db from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const planId = context.params.id;

  try {
    const plan = await db.plan.findUnique({
      where: {
        id: planId,
      },
    });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
