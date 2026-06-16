import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const jobRoles = await db.jobrole.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobRoles);
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
