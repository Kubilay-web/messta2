import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const jobCategories = await db.jobcategory.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobCategories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
