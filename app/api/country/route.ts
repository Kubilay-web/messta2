import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const country = await db.countryJob.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(country);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
