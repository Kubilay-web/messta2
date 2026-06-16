import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    // Fetch all orders using Prisma
    const orders = await db.orderJob.findMany();

    console.log("Orders: ", orders);

    return NextResponse.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}
