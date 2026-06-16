import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET(req, context) {
  try {
    const orderId = context.params.id;
    console.log("xxxxx", orderId);

    const orders = await db.orderJob.findMany({
      where: {
        order_id: orderId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        company: true,
        plan: true,
      },
    });

    console.log("city", orders);

    return NextResponse.json(orders);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
