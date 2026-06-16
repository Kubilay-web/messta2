import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const teams = await db.team.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(teams);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
