import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log(companies);
    return NextResponse.json(companies);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
