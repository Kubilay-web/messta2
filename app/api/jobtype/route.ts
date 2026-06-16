import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const jobTypes = await db.jobtype.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobTypes);
  } catch (error: any) {
    return NextResponse.json({ err: error.message }, { status: 500 });
  }
}
