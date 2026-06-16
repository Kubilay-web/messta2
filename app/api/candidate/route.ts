// app/api/candidates/route.ts
import { NextResponse } from "next/server";
import db from "@/app/lib/db";

export async function GET() {
  try {
    const candidates = await db.candidate.findMany({
      include: {
        city: true,
        state: true,
        country: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ candidates });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}
