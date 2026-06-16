import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const industries = await db.industry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(industries);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
