import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const paymentsettings = await db.paymentSettings.findFirst();

    return NextResponse.json(paymentsettings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
