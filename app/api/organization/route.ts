import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const organizations = await db.organization.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(organizations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
